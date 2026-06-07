export const runtime = "nodejs";

const allowedFields = [
  "name",
  "company",
  "phone",
  "revenueRange",
  "bottleneck",
  "privacy",
] as const;

type AllowedField = (typeof allowedFields)[number];
type ContactPayload = Record<AllowedField, string>;

function sanitizeText(value: unknown, maxLength = 1000) {
  if (typeof value !== "string") {
    return "";
  }

  return value
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

async function readPayload(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  if (contentType.includes("application/json")) {
    const body = (await request.json()) as unknown;
    return body && typeof body === "object" ? body : {};
  }

  return {};
}

export async function POST(request: Request) {
  let rawPayload: unknown;

  try {
    rawPayload = await readPayload(request);
  } catch {
    return Response.json(
      { success: false, message: "Datos de contacto no válidos" },
      { status: 400 },
    );
  }

  if (!rawPayload || typeof rawPayload !== "object") {
    return Response.json(
      { success: false, message: "La solicitud no puede estar vacía" },
      { status: 400 },
    );
  }

  const source = rawPayload as Record<string, unknown>;
  const sanitizedPayload = allowedFields.reduce((payload, field) => {
    payload[field] = sanitizeText(source[field], field === "bottleneck" ? 2000 : 180);
    return payload;
  }, {} as ContactPayload);

  const hasAnyValue = allowedFields.some((field) => sanitizedPayload[field].length > 0);

  if (!hasAnyValue) {
    return Response.json(
      { success: false, message: "La solicitud no puede estar vacía" },
      { status: 400 },
    );
  }

  const missingRequiredField = allowedFields.find(
    (field) => sanitizedPayload[field].length === 0,
  );

  if (missingRequiredField) {
    return Response.json(
      { success: false, message: "Faltan campos obligatorios" },
      { status: 400 },
    );
  }

  if (sanitizedPayload.privacy !== "accepted") {
    return Response.json(
      { success: false, message: "Debes aceptar la política de privacidad" },
      { status: 400 },
    );
  }

  Object.freeze(sanitizedPayload);

  return Response.json({
    success: true,
    message: "Solicitud procesada con éxito",
  });
}
