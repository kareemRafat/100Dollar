# Social Share Feature Implementation Plan (M2)

This plan outlines the implementation of high-fidelity social sharing buttons for Idea pages. The goal is to encourage community growth by making it easy for users to share their favorite ideas across popular platforms.

## 1. Supported Platforms
We will support the most relevant platforms for the Arab region:
- **WhatsApp:** (High priority for regional sharing).
- **X (Twitter):** (High priority for professional/startup ecosystem).
- **Facebook:** (High priority for general community reach).
- **LinkedIn:** (For professional validation of ideas).
- **Copy Link:** (General utility with visual feedback).

## 2. Technical Architecture

### Component Structure
- **Location:** `resources/js/app/pages/idea/partials/social-share.tsx`
- **Props:** Accepts the `Idea` object to generate titles and dynamic URLs.

### Social URL Generation
The implementation will use standard URL intent schemes:
- **WhatsApp:** `https://wa.me/?text={text}`
- **X:** `https://twitter.com/intent/tweet?text={text}&url={url}`
- **Facebook:** `https://www.facebook.com/sharer/sharer.php?u={url}`
- **LinkedIn:** `https://www.linkedin.com/sharing/share-offsite/?url={url}`

### Copy to Clipboard
- Use the modern `navigator.clipboard.writeText()` API.
- Provide immediate visual feedback using `toast.success()`.

## 3. Localization Requirements
New translation keys will be added to `lang/ar/messages.php` and `lang/en/messages.php`:
- `messages.social.share_title`: "شارك الفكرة مع أصدقائك" / "Share this idea with friends"
- `messages.social.share_text`: "اكتشف فكرة {title} على منصة أفكار بـ 100 دولار" / "Check out this idea: {title} on 100 Dollar Ideas"
- `messages.social.copy_success`: "تم نسخ الرابط بنجاح!" / "Link copied successfully!"

## 4. UI/UX Design (High Fidelity)
- **Grid Layout:** A clean grid of icon-only or icon+text buttons.
- **Brand Colors:** Each button will use its respective platform's brand color on hover (e.g., WhatsApp Green, X Black).
- **Animations:** Subtle `hover:scale-105` and `active:scale-95` transitions.
- **Glassmorphism:** Consistent with the existing "Golden Ledger" aesthetic (backdrop-blur, thin borders).

## 5. Implementation Steps
1. **Translations:** Update PHP language files with the keys defined in section 3.
2. **Icons:** Import Lucide-react icons (`Share2`, `Twitter`, `Facebook`, `Linkedin`, `Link2`).
3. **Logic:** Implement the `handleShare` helper function to process different platform intents.
4. **Component Update:** Replace the current placeholder in `social-share.tsx` with the new interactive grid.
5. **Validation:** Verify URL encoding (especially for Arabic titles) to ensure links don't break.

## 6. Verification Checklist
- [ ] WhatsApp opens with pre-filled Arabic text.
- [ ] X intent includes the hashtag (e.g., #أفكار_بـ100_دولار).
- [ ] Copy Link works on both desktop and mobile browsers.
- [ ] RTL/LTR alignment is correct for icons.
