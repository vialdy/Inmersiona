---
name: design-system
description: Creates and applies the Inmersiona design system for this project. Use whenever Codex creates, edits, reviews, or verifies frontend UI, layouts, components, visual styling, content tone, accessibility, responsive behavior, conversion flows, or design-system documentation in this repository.
---

# **Inmersiona — Guía de Diseño y Tokens (design.md)**

## **Project Usage**

Apply this skill as the default design authority for all UI, frontend, component, layout, styling, accessibility, responsive, and UX copy work in this repository. Before changing UI code, read these rules, preserve existing implementation patterns where they fit, and validate final work against the quality gates.

## **Mission**

Create implementation-ready, token-driven UI guidance for Inmersiona that is optimized for consistency, accessibility, and fast conversion delivery across our B2B consulting content site. Our visual rules establish high trustworthiness, removing unnecessary digital friction and avoiding superficial hype.4

## **Brand**

* Product/brand: Inmersiona (Consultoría de Procesos y Operaciones) 1  
* URL: [https://www.inmersiona.com/](https://www.inmersiona.com/)  
* Audience: Corporate directors (\~50 years old) in small and medium enterprises seeking operational efficiency, stability, and measurable ROI 1  
* Product surface: B2B corporate content and high-intent lead acquisition site 7

## **Style Foundations**

* Visual style: Structured, tokenized, content-first, minimalist, highly professional  
* Main font style: font.family.primary=Manrope, font.family.stack=Manrope, sans-serif, font.size.base=16px, font.weight.base=400, font.lineHeight.base=24px  
* Typography scale: font.size.xs=12px, font.size.sm=14px, font.size.md=16px, font.size.lg=18px, font.size.xl=20px, font.size.2xl=24px, font.size.3xl=36px, font.size.4xl=48px  
* Color palette: color.text.primary=\#132339 (Deep Navy), color.text.secondary=\#667b99 (Slate Grey), color.surface.muted=\#ffffff (Pure White), color.text.inverse=\#f8fafc (Light Slate), color.surface.base=\#ffffff (White background), color.surface.strong=\#f2f5f8 (Soft grey divider), color.border.default=\#dee6ed (Clean light borders), color.border.muted=\#1a4066 (Input borders), color.border.strong=\#c2410c (Accent Orange)  
* Spacing scale: space.1=8px, space.2=12px, space.3=16px, space.4=20px, space.5=24px, space.6=32px, space.7=40px, space.8=80px  
* Radius/shadow/motion tokens: radius.xs=10px, radius.sm=12px, radius.md=16px | shadow.1=rgba(26, 64, 102, 0.1) 0px 4px 20px \-4px, shadow.2=rgba(0, 0, 0, 0\) 0px 0px 0px 0px, rgba(0, 0, 0, 0\) 0px 0px 0px 0px, rgba(194, 65, 12, 0.35) 0px 4px 14px 0px, shadow.3=rgba(0, 0, 0, 0\) 0px 0px 0px 0px, rgba(0, 0, 0, 0\) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, shadow.4=rgba(0, 0, 0, 0\) 0px 0px 0px 0px, rgba(0, 0, 0, 0\) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 10px 15px \-3px, rgba(0, 0, 0, 0.1) 0px 4px 6px \-4px | motion.duration.instant=150ms, motion.duration.fast=300ms

## **Accessibility**

* Target: WCAG 2.2 AA (Critical for older corporate demographics with presbyopia or visual fatigue) 1  
* Keyboard-first interactions required for all forms and navigation components.  
* Focus-visible rules required: All interactive elements must show a high-contrast focus ring (using color.border.strong or shadow.2) when focused via keyboard.  
* Contrast constraints required: Text/background color combinations must maintain a minimum contrast ratio of 4.5:1.

## **Writing Tone**

Concise, confident, implementation-focused, objective, free of tech-hype and empty buzzwords.4

## **Rules: Do**

* Use semantic tokens (e.g., color.text.primary, space.4) instead of raw hex or pixel values in all component guidance.  
* Every component must define specific styling and behavior rules for all interactive states: default, hover, focus-visible, active, disabled, loading, and error.  
* Component behavior should specify responsive stacking (e.g., transition from grid to single-column) and overflow handling on smaller viewports.  
* Interactive components must explicitly document pointer, keyboard, and touch interactions.  
* Accessibility acceptance criteria must be testable through implementation checks.

## **Rules: Don't**

* Do not allow low-contrast text or hidden focus indicators.  
* Do not introduce one-off spacing, font-size, or border-radius exceptions.  
* Do not use ambiguous labels or non-descriptive actions (e.g., avoid "Hacer click aquí", prefer "Solicitar Diagnóstico Gratuito").7  
* Do not ship component guidance without explicit state rules.  
* Do not use heavy drop shadows on cards; always prefer clean 1px borders using color.border.default.5

## **Guideline Authoring Workflow**

1. Restate design intent in one sentence.  
2. Define foundations and semantic tokens.  
3. Define component anatomy, variants, interactions, and state behavior.  
4. Add accessibility acceptance criteria with pass/fail checks.  
5. Add anti-patterns, migration notes, and edge-case handling.  
6. End with a QA checklist.

## **Required Output Structure**

* Context and goals of the component.  
* Design tokens and foundations applied.  
* Component-level rules (anatomy, variants, states, responsive behavior).  
* Accessibility requirements and testable acceptance criteria.  
* Content and tone standards with clear examples.  
* Anti-patterns and prohibited implementations.  
* QA checklist.

## **Component Rule Expectations**

* Include keyboard, pointer, and touch behavior.  
* Include spacing and typography token requirements.  
* Include long-content, overflow, and empty-state handling.  
* Include known page component density: buttons (2), cards (2), inputs (5), links (3), navigation (1), list (1). This low-density layout avoids cognitive overload for the target executive.1  
* Document clear data formulas used in UI. When rendering ROI calculations, apply the mathematical formula 6:  
  ![][image1]

## **Quality Gates**

* Every non-negotiable rule must use "must".  
* Every recommendation should use "should".  
* Every accessibility rule must be testable in implementation.  
* Teams should prefer system consistency over local visual exceptions.

#### **Works cited**

1. Fractional CMO España: ¿Funciona aquí el Modelo Americano?, accessed on May 14, 2026, [https://sempatiza.es/fractional-cmo-en-espana/](https://sempatiza.es/fractional-cmo-en-espana/)  
2. Cómo hacer un Gemba Walk para mejorar procesos \- Lucidchart, accessed on May 14, 2026, [https://www.lucidchart.com/blog/es/blog/transforma-procesos-con-gemba-walk](https://www.lucidchart.com/blog/es/blog/transforma-procesos-con-gemba-walk)  
3. Qué es un Gemba Walk y cómo hacerlo en 4 pasos | SafetyCulture, accessed on May 14, 2026, [https://safetyculture.com/es/temas/gemba-walk](https://safetyculture.com/es/temas/gemba-walk)  
4. IA práctica con ROI | Rumbo & Resultados, accessed on May 14, 2026, [https://rumboyresultados.com/ia-practica-con-roi/](https://rumboyresultados.com/ia-practica-con-roi/)  
5. Consejos, estrategias y recomendaciones para la generación de contactos | LinkedIn Ads, accessed on May 14, 2026, [https://business.linkedin.com/es/es/advertise/resources/marketing-terms/lead-generation](https://business.linkedin.com/es/es/advertise/resources/marketing-terms/lead-generation)  
6. Procesos Comerciales: Cómo Auditarlos para Mejorar tus Resultados, accessed on May 14, 2026, [https://www.nelsonromerou.com/blog/procesos-comerciales-como-auditarlos](https://www.nelsonromerou.com/blog/procesos-comerciales-como-auditarlos)

[image1]: <data:image/png;base64,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>
