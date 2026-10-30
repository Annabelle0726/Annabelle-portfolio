# Visual style: jewel blue and champagne gold

The user approved a richer, luminous visual direction: saturated sapphire and lake turquoise, refined champagne gold, warm ivory and deep navy. The earlier muted yellow-and-blue palette is superseded. Keep the page elegant and legible, with room for work and content; use vivid blue and gold deliberately rather than flooding every surface.

## Shared root colors

`src/theme.css` defines the canonical root variables. Use the semantic aliases for component styling and the named palette variables when a specific accent is needed. Avoid independent hard-coded palettes. Project imagery and social brand marks can retain their original colors.

| Variable | Color | Intended use |
| --- | --- | --- |
| `--color-sapphire` | `#0055A4` | Primary actions and strong blue accents |
| `--color-royal-blue` | `#0042A8` | Deep, vivid blue for bold emphasis |
| `--color-deep-sapphire` | `#003B78` | Hover states and secondary text |
| `--color-azure` | `#007BC4` | Bright blue accents and illustrations |
| `--color-lake` | `#00A8B5` | Luminous turquoise accent and visual details |
| `--color-lagoon` | `#007E91` | Deeper turquoise accents |
| `--color-aqua-light` | `#D9F4F3` | Light turquoise interaction backgrounds |
| `--color-champagne-gold` | `#D4A43A` | Restrained gold accents and fine details |
| `--color-imperial-gold` | `#B67B08` | Rich darker gold details |
| `--color-golden-sun` | `#E9B829` | Bright golden decorative accents |
| `--color-pale-gold` | `#F4DA91` | Soft decorative backgrounds and frames |
| `--color-gold-light` | `#FFF2CC` | Light warm backgrounds |
| `--color-ivory` | `#FCFAF3` | Warm page background |
| `--color-ink-navy` | `#082D49` | Primary text and dark elements |

The same file retains semantic variables for surfaces, secondary text, borders, selected states, hover and focus. Ensure text, control and focus contrast against actual backgrounds; gold and lake turquoise are accents, not automatically suitable for small text. Do not rely on color alone to communicate selection or focus.

## Hero and interaction

The user likes the flowing blue-and-gold artwork in the approved image and would like it to be interactive. Treat this as a direction for later design and implementation, not as an existing feature. Explore subtle, responsive motion that complements the content, works on touch as well as pointer devices, and respects reduced-motion preferences; the concrete interaction is not yet specified. The generated reference is conceptual, and its copy is not approved biography.

## Navigation and content

### About page

The user approved an editorial About layout: original portrait and original handwritten mark near the introduction, static blue/gold artwork behind the portrait, a compact city/work/study strip with expandable personal facts, and three numbered prose chapters. Preserve the full approved Chinese and English copy. The neutral `--color-paper` surface (`#FAF8F2`) is used for About; the shared ivory palette remains available elsewhere. On mobile and narrow tablets, show the heading, portrait, introduction, summary and chapters in reading order. Keep decorative curves away from text and place the About return-to-top link in the footer rather than over the prose.

Use sidebar navigation to open different content views rather than stacking the entire site into one continuous page. Individual views can scroll normally. Preserve keyboard access, visible focus, browser navigation and existing deep links when implementing the change. The user will confirm About text and which historical projects to feature, hide or remove. See [portfolio-direction.md](portfolio-direction.md).
