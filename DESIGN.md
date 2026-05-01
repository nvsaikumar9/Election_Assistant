---
name: Cloud Enterprise
colors:
  surface: '#faf9fd'
  surface-dim: '#dbd9dd'
  surface-bright: '#faf9fd'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f7'
  surface-container: '#efedf1'
  surface-container-high: '#e9e7eb'
  surface-container-highest: '#e3e2e6'
  on-surface: '#1a1b1e'
  on-surface-variant: '#414754'
  inverse-surface: '#2f3033'
  inverse-on-surface: '#f1f0f4'
  outline: '#727785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005bc0'
  primary: '#005bbf'
  on-primary: '#ffffff'
  primary-container: '#1a73e8'
  on-primary-container: '#ffffff'
  inverse-primary: '#adc7ff'
  secondary: '#b51b15'
  on-secondary: '#ffffff'
  secondary-container: '#d9372b'
  on-secondary-container: '#fffbff'
  tertiary: '#006d2c'
  on-tertiary: '#ffffff'
  tertiary-container: '#008939'
  on-tertiary-container: '#ffffff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc7ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#ffdad5'
  secondary-fixed-dim: '#ffb4a9'
  on-secondary-fixed: '#410001'
  on-secondary-fixed-variant: '#930004'
  tertiary-fixed: '#89fa9b'
  tertiary-fixed-dim: '#6ddd81'
  on-tertiary-fixed: '#002108'
  on-tertiary-fixed-variant: '#005320'
  background: '#faf9fd'
  on-background: '#1a1b1e'
  surface-variant: '#e3e2e6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 56px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  container-max: 1280px
  section-gap: 120px
  content-gap: 48px
  gutter: 24px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

The design system embodies a "Corporate Modern" aesthetic, prioritizing clarity, trust, and high-velocity innovation. It is engineered for a technical audience—developers, IT decision-makers, and architects—who require a platform that feels both powerful and easy to navigate. 

The visual narrative is built on a foundation of extreme cleanliness. By utilizing a "White-Label Plus" approach, the interface remains primarily neutral to ensure content is the hero, while strategically injecting the signature multi-color palette to signal brand personality and categorize complex information. The emotional response should be one of "structured empowerment": the UI stays out of the way until the user needs to take a decisive action.

## Colors

The color strategy uses a hierarchy of "Functional Color." 
- **Primary Blue (#1A73E8):** Reserved for primary actions, navigation links, and progress indicators. It is the color of "Utility."
- **Secondary Accents:** Red (#EA4335), Yellow (#FBBC04), and Green (#34A853) are used sparingly as categorical markers, icon accents, or illustrative flourishes to break the monochromatic layout.
- **Neutral Palette:** High-contrast dark charcoal (#202124) is used for maximum legibility in typography, while off-white surfaces (#F8F9FA) create subtle containment for secondary content blocks or "gray-scale" sections that need to feel distinct from the pure white background.

## Typography

This design system utilizes **Inter** across all levels to achieve a systematic, neo-grotesque feel that mirrors modern cloud infrastructure. 

Headlines use a medium weight with slightly tightened letter-spacing to appear authoritative and grounded. Body text leverages a generous 1.6 line height to ensure readability in long-form technical documentation. Labels and "Overline" text styles utilize a slightly heavier weight and increased tracking to differentiate them from standard body copy and navigation items.

## Layout & Spacing

The layout philosophy is based on a **Fixed Grid** model with a central container maxing out at 1280px. This ensures a consistent reading eye-line on ultra-wide monitors.

Spacing is used to create clear vertical hierarchies:
- **Section Gaps:** Significant 120px vertical padding between major landing page modules to provide "breathing room."
- **Content Blocks:** 48px to 64px gaps between headlines and their respective body/CTA clusters.
- **Internal Rhythm:** An 8px baseline grid governs small-scale components, ensuring buttons, icons, and text labels are perfectly aligned.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Low-Contrast Outlines**. 
- **Surface Elevation:** The design system avoids heavy shadows. Instead, it uses different background tones (White vs. #F8F9FA) to separate content sections.
- **Ambient Depth:** For interactive elements like cards or dropdowns, use an extremely diffused, low-opacity shadow (e.g., `0px 4px 20px rgba(0,0,0,0.05)`).
- **Ghost Borders:** Subtle 1px borders in a light gray are preferred over shadows to define input fields and secondary containers, maintaining a flat, professional profile.

## Shapes

The shape language is primarily **Soft (Level 1)**. 
Standard containers and cards use a 0.25rem (4px) radius to maintain a crisp, architectural feel. However, interactive elements such as buttons and search bars adopt a fully rounded "Pill" shape (Level 3/Circle) to provide a clear visual affordance for "clickability" and to soften the overall technical aesthetic.

## Components

- **Buttons:** Primary buttons are pill-shaped, filled with Primary Blue, and use white text. Secondary buttons are outlined with a 1px gray border or appear as plain text links with an icon suffix.
- **Cards:** Cards should be white with a subtle 1px border. On hover, they may transition to a light ambient shadow to indicate interactivity.
- **Accordions:** Used for dense navigation (e.g., product lists). Use thin horizontal dividers and Primary Blue for active text states and chevron icons.
- **Chips/Badges:** Use these for "Product Announcements" or "Status." Apply a light background tint of the accent colors (Red, Green, Yellow) with high-contrast text.
- **Input Fields:** Flat design with a light gray border. Focus states must use a 2px Primary Blue border.
- **Illustrative Accents:** Use simple, geometric shapes or thin-line iconography that incorporates the brand's multi-color palette to represent abstract cloud concepts.