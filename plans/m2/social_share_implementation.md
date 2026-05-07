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

## 5. Milestones & Tasks

### Milestone 1: Preparation & Assets
- [ ] **Task 1.1: Add Localization Keys**
  - Update `lang/ar/messages.php` and `lang/en/messages.php` with social share strings.
- [ ] **Task 1.2: Prepare Icon Assets**
  - don`t change the current icons.

### Milestone 2: Core Logic & Component
- [ ] **Task 2.1: Implement Share Logic**
  - Create URL generation helpers with proper encoding for Arabic text.
- [ ] **Task 2.2: Build SocialShare Component**
  - Implement the grid layout with platform-specific branding.
- [ ] **Task 2.3: Implement Copy to Clipboard**
  - Add `navigator.clipboard` logic with toast notification.

### Milestone 3: Integration & Styling
- [ ] **Task 3.1: Integrate into Idea Show Page**
  - Ensure the component is correctly mounted in `resources/js/app/pages/idea/show.tsx`.
- [ ] **Task 3.2: Apply High-Fidelity Styling**
  - Add hover animations, transitions.

### Milestone 4: Quality Assurance
- [ ] **Task 4.1: Cross-Platform Testing**
  - Test on WhatsApp, X, Facebook, and LinkedIn on mobile and desktop.
- [ ] **Task 4.2: RTL/LTR Audit**
  - Ensure layout mirrors correctly when switching between Arabic and English.

## 6. Verification Checklist
- [ ] WhatsApp opens with pre-filled Arabic text.
- [ ] X intent includes the hashtag (e.g., #أفكار_بـ100_دولار).
- [ ] Copy Link works on both desktop and mobile browsers.
- [ ] RTL/LTR alignment is correct for icons.
