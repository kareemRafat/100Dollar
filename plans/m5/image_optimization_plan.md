# Milestone 5: Image Optimization Plan

## Overview
Implement a dynamic image optimization system that reduces server disk usage and improves frontend performance through resizing and WebP conversion.

## Goals
1. **Reduce Disk Usage:** Automatically resize "Original" uploads to a sane maximum (1920px).
2. **Improve Performance:** Serve optimized thumbnails (WebP) via dynamic middleware.
3. **Seamless Integration:** Use existing `Media` model and `HasMedia` trait.

---

## Phase 1: Infrastructure
- [ ] **Install Dependencies:** Add `intervention/image` (v3) to the project.
- [ ] **Configure Storage:** Ensure a cache directory exists for optimized images (e.g., `storage/app/public/cache`).
- [ ] **Middleware Skeleton:** Create `App\Http\Middleware\ImageOptimizerMiddleware`.

## Phase 2: Sane Max Upload Logic
- [ ] **Intercept Uploads:** Update the media upload logic (to be identified in controllers/actions) to resize images to a maximum of 1920px width/height before saving to disk.
- [ ] **Format Conversion:** Convert original uploads to high-quality WebP to save further space.

## Phase 3: Dynamic Resizing Middleware
- [ ] **Route Definition:** Add a signed or open route `/img/{path}` that points to the middleware/controller.
- [ ] **Middleware Implementation:**
    - Parse `w` (width), `h` (height), and `q` (quality).
    - Check for existing cached version.
    - If missing: Use Intervention Image to resize original and save to cache.
    - Serve the file with proper headers (`image/webp`, cache-control).

## Phase 4: Frontend & Model Integration
- [ ] **Model Helper:** Add `thumbnailUrl(int $width, int $height)` method to `App\Models\Media`.
- [ ] **Trait Helper:** Add `thumbnail` attribute to `HasMedia` trait.
- [ ] **Resource Update:** Update `IdeaResource`, `PublicUserResource`, and `SponsorResource` to include optimized URLs.
- [ ] **Component Update:** Update React components to use optimized thumbnails instead of original images where appropriate.

## Phase 5: Cleanup & Maintenance
- [ ] **Cache Clearing Command:** Create an Artisan command to clear the optimized image cache.
- [ ] **Testing:** Add Pest tests for the optimization route and upload logic.
