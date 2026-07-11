---
name: roi-calculator
description: Instructions for modifying and reusing the ROI Calculator widget
---

# ROI Calculator Widget

## Brand Configuration
All brand-specific values live at the top of `src/App.tsx` in the `CONFIG` object.
To deploy this calculator for a different brand, only modify this block.

## Colors
The primary accent color is `bg-orange-500` / `hover:bg-orange-600`.
To change it for a brand, do a project-wide find-and-replace on these class strings.
Do not build Tailwind color classes dynamically (e.g. `bg-${color}-500`).

## SEO Content
Keep the four-heading structure intact in the SEO section when adapting for a new vertical, only rewrite the prose.

## Icons
Only import from `lucide-react`.
