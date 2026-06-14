# Milestone 5: Image Optimization Plan

## Overview
Optimize images through efficient upload handling and proper frontend rendering. The focus is on high-impact, low-complexity changes rather than a full dynamic resizing pipeline.

## Goals
1. **Reduce Disk Usage:** Resize original uploads to a sane maximum (1920px) and convert to WebP.
2. **Improve Performance:** Generate a compressed WebP thumbnail per image at upload time for card/list views.
3. **Eliminate CLS:** Add explicit dimensions to all `<img>` elements.
4. **Lazy Loading:** Add `loading="lazy"` to below-fold images.

---

## Phase 1: Infrastructure
- [ ] **Install Dependencies:** Add `intervention/image-laravel` to the project.
- [ ] **Configure Storage:** Ensure a cache directory exists for optimized images (e.g., `storage/app/public/cache`).

## Phase 2: Server-Side Upload Optimization
- [ ] **Intercept Uploads:** Create a service class or job that:
  - Resizes images to max 1920px width/height before saving.
  - Converts the master file to WebP (~80% quality).
  - Generates a 400px-wide WebP thumbnail prefixed with `thumb_` for list views.
- [ ] **Model Helper:** Add `thumbnailUrl()` method to `App\Models\Media` returning the thumb path.
- [ ] **Trait Helper:** Update `HasMedia` trait to include a `thumbnail` attribute.

## Phase 3: Frontend CLS & Performance Fixes
- [ ] **Add explicit dimensions:** Audit all `<img>` tags in React components and ensure parent containers have explicit `w-`/`h-` or `aspect-` classes:
  - Hero banners (13 unsplash.com / googleusercontent images)
  - User avatars in idea-card, winner-card, comment-section, top-nav-bar, mobile-nav-sheet
  - Idea images in idea-card
  - Sponsor logos in sponsor-week-grid
  - Logo previews in sponsor-logo-uploader
- [ ] **Add `loading="lazy"`** to all below-fold `<img>` elements.
- [ ] **Update Resources:** Update `IdeaResource`, `PublicUserResource`, and `SponsorResource` to include `thumbnail_url`.
- [ ] **Component updates:** Replace direct image URLs with thumbnail URLs in card/list views (keep full-res for detail pages).

## Phase 4: Cleanup & Maintenance
- [ ] **Re-optimize existing uploads:** Create an Artisan command to retro-process existing media (resize + WebP + thumbnails).
- [ ] **Testing:** Add tests for the upload resizing logic.

---

## Key Design Decisions

**Why not a dynamic resizing middleware?**
A dynamic middleware (signed routes, Intervention on every request) adds significant complexity — cache management, cache invalidation, route setup — with minimal benefit for the current upload volume (~3 images). Resizing at upload time is simpler, produces predictable files, and doesn't require a request-time processing pipeline.

**Why a 400px thumbnail for lists?**
Idea cards, sponsor cards, and user avatars are rendered in containers of 300-400px wide. Serving a 400px WebP instead of the original 2MB image reduces transfer by ~90% with no visible quality loss in those contexts.
