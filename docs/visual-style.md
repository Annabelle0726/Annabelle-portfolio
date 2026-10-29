# Visual style: soft yellow and blue

The user selected sketch 01, the soft yellow-and-blue direction. See the [homepage sketch](../.oil-ui/palette-sketch/01.html). The intended feeling is bright, welcoming, clear and lively without excessive saturation, with work and content as the focus. The sketch uses top navigation for visual exploration; the actual site should use the sidebar described below.

## Shared palette

The first six colors come from the selected sketch; the rest are suggested supporting colors. Check contrast and adjust as needed in the actual interface. Avoid separate, inconsistent palettes across components. Social brand marks and project images may retain their original colors.

| Purpose | Color | Guidance |
| --- | --- | --- |
| Page background | `#FAF8EE` | Warm, light background for most of the page |
| Main text and headings | `#163961` | Legible dark blue |
| Primary button and emphasis | `#173B6C` | Primary actions, important links and selected states |
| Button text and white surfaces | `#FFFFFF` | Text on dark blue or distinct light surfaces |
| Yellow accent | `#E8BB3F` | Small decorative accents, not small text on light backgrounds |
| Soft yellow | `#F3D878` | Photo frames or restrained decorative backgrounds |
| Divider | `#DEDDD4` | Borders and section separators |
| Secondary text | `#425B70` | Supporting text with sufficient contrast |
| Light blue background | `#E8EFF4` | Selected sidebar items or subtle distinction |
| Light yellow background | `#FFF3C8` | Subtle notices and labels |
| Primary button hover | `#102E55` | Hover and pressed feedback |
| Keyboard focus | `#173B6C` | Visible outline; use white on dark backgrounds |

Define shared semantic CSS variables for sidebar, buttons, text, borders and backgrounds. Do not rely on color alone for selected or focused states. Use yellow as an accent and avoid competing large areas of bright yellow and blue. Verify contrast for text, controls, focus and states against their actual backgrounds.

## Layout and navigation

- The user wants sidebar clicks to open different content views rather than one continuous page containing every section.
- Keep a clear sidebar and current-item state on desktop, and an accessible menu on mobile. Allow normal scrolling within a view when its content exceeds the screen.
- Support keyboard navigation, visible focus and browser back. Decide routing or state implementation later; assess and handle existing deep links and sidebar features during implementation.
- The homepage may feature the name, a short introduction and an entry to work. The user will confirm actual content, featured projects and About. The sketch's photo frame, layout and copy are references, not fixed requirements.

## Scope

This guidance does not itself change existing CSS, layout, personal details or historical work. See [portfolio-direction.md](portfolio-direction.md) for content decisions.
