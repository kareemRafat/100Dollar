# Design System Document

## 1. Overview & Creative North Star: "The Golden Ledger"
This design system moves away from the sterile, "bootstrap" look of typical fintech applications to embrace an editorial, high-end aesthetic tailored for the Arabic-speaking market. Our Creative North Star is **"The Golden Ledger"**—a concept that treats every digital interaction as a curated entry in a premium financial journal.

By leveraging the Right-to-Left (RTL) flow as a narrative journey, we utilize intentional asymmetry, exaggerated white space, and a sophisticated tonal palette to guide the user’s eye. We reject the "boxed-in" layout of standard SaaS tools, opting instead for an expansive, airy experience where depth is felt through color shifts rather than heavy lines.

---

## 2. Colors & Surface Logic

### The Palette
The core of this system is the interplay between the authoritative `primary` (#B8860B / Goldenrod) and the grounding `secondary` (#1A1A2E / Dark Navy).

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment.
*   **Boundaries:** Use background color shifts. A `surface_container_low` section sitting on a `surface` background is the preferred method for defining structural zones.
*   **The Glass & Gradient Rule:** For primary CTAs and hero headers, utilize a subtle linear gradient (from `primary` to `primary_container`) to add "soul" and avoid a flat, plastic appearance. For floating navigation or modals, apply Glassmorphism: `surface` color at 80% opacity with a `24px` backdrop-blur.

### Surface Hierarchy (Nesting)
Treat the UI as physical layers of fine stationery.
*   **Layer 0 (Base):** `surface` (#F9F9F7) – The canvas.
*   **Layer 1 (Sections):** `surface_container_low` (#F4F4F2) – Large structural areas.
*   **Layer 2 (Cards):** `surface_container_lowest` (#FFFFFF) – High-priority interactive elements.
*   **Layer 3 (Floating):** `surface_bright` – Elements that demand immediate attention.

---

## 3. Typography: The Editorial Voice

We utilize a dual-font strategy to balance fintech precision with high-end editorial flair. For Arabic implementation, **Cairo** or **Tajawal** must be used with specific optical sizing.

*   **Display & Headline (The Statement):** Using `plusJakartaSans` (paired with Bold Arabic weights). These are oversized to create "Entry Points" into the content. The `secondary` (#1A1A2E) color is mandatory for all headlines to ensure an authoritative tone.
*   **Title & Body (The Content):** Using `inter` (paired with Regular/Medium Arabic weights). Designed for maximum legibility in financial tables and idea descriptions.
*   **The Scale:**
    *   `display-lg`: 3.5rem (For hero figures and "100 دولار" branding)
    *   `headline-md`: 1.75rem (For section titles)
    *   `body-md`: 0.875rem (The workhorse for data and descriptions)

---

## 4. Elevation & Depth

### The Layering Principle
Forget traditional drop shadows. Hierarchy is achieved through **Tonal Layering**. Place a `surface_container_lowest` card on top of a `surface_container_low` background. This creates a "soft lift" that feels architectural rather than digital.

### Ambient Shadows
When a card must float (e.g., a featured startup idea), use an **Ambient Shadow**:
*   **Blur:** 32px to 48px.
*   **Spread:** -4px.
*   **Color:** `on_surface` at 4% to 6% opacity.
*   **Intent:** The shadow should feel like a soft glow of light blocked by paper, not a dark smudge.

### The "Ghost Border" Fallback
If accessibility requirements demand a border (e.g., in high-contrast modes), use a **Ghost Border**: `outline_variant` (#D3C4AF) at 15% opacity. Never use a 100% opaque border.

---

## 5. Components

### Buttons (The Precision Tools)
*   **Primary:** `primary` (#B8860B) background with `on_primary` (#FFFFFF) text. Radius: `md` (0.75rem). No border.
*   **Secondary:** `surface_container_highest` background. Subtle and integrated.
*   **Tertiary:** No background. Bold `primary` text. Used for "Read More" or "Cancel" actions.

### Input Fields
*   **Style:** Minimalist. No bottom line only; use a full container in `surface_container_low`.
*   **States:** On focus, the container shifts to `surface_container_lowest` and gains a 1px `primary` Ghost Border.

### Data Tables & Lists
*   **The Divider Ban:** Explicitly forbid horizontal divider lines between list items.
*   **Separation:** Use `16px` of vertical whitespace or alternating subtle background tints (`surface` vs `surface_container_low`) to distinguish rows.
*   **Progress Indicators:** Use a thick `4px` stroke. The track should be `outline_variant` and the indicator should be a `primary` to `primary_container` gradient.

### Financial Idea Cards
*   **Radius:** `lg` (1rem).
*   **Layout:** Use asymmetrical padding (e.g., 32px on the right/start, 24px on the left/end) to create a dynamic RTL flow that feels custom-designed for the Arabic language.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** embrace the RTL "F-Pattern." Place high-value metrics (like the $100 price point) in the top-right of cards.
*   **Do** use "Breathing Room." The `spacing` parameter is set to `2`, indicating a normal level of whitespace, providing a balanced feel.
*   **Do** use the `secondary` (#1A1A2E) for icons to give them weight and importance.

### Don't:
*   **Don't** use pure black (#000) for text. Always use `on_surface` or `secondary`.
*   **Don't** use standard 4px or 8px "box-shadow" presets. They look "cheap" and break the editorial feel.
*   **Don't** center-align long-form Arabic text. Always right-align to maintain the "The Golden Ledger" journal aesthetic.
*   **Don't** use sharp 90-degree corners. The `roundedness` parameter is set to `2`, providing a moderate level of roundedness (default).