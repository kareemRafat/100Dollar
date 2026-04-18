# خطة مشروع — أفكار بـ 100 دولار

**المنصة العربية لأفكار المشاريع الصغيرة**

---

## معلومات المشروع

| البند           | التفاصيل                                          |
| --------------- | ------------------------------------------------- |
| اسم المشروع     | أفكار بـ 100 دولار                                |
| المدة الإجمالية | 8 أسابيع (شهران)                                  |
| التقنية         | Laravel 13 · Inertia.js 3 · React · MySQL |
| الاتجاه         | RTL — عربي / إنجليزي                              |
| الجدول الزمني   | الأسبوع 1 → الأسبوع 8                             |

---

## نظرة عامة على المراحل

```
الأسبوع 1-2  │ M1 — البنية التحتية والمصادقة
الأسبوع 2-3  │ M2 — الصفحات الأساسية للمستخدم
الأسبوع 3-4  │ M3 — لوحة تحكم المدير
الأسبوع 4-5  │ M4 — المتابعة والإشعارات
الأسبوع 5-6  │ M5 — SEO والمشاركة الاجتماعية والـ RTL
الأسبوع 6-7  │ M6 — الاختبارات والأداء والنشر
الأسبوع 7-8  │ M7 — العرض التجريبي وما بعد الإطلاق
```

---

## M1 — البنية التحتية والمصادقة

**الأسبوع 1 → 2**

### 🎯 Milestone

نظام كامل للمصادقة، قاعدة بيانات جاهزة، وبيئة تطوير مُهيأة.

---

### ⚙️ إعداد المشروع

- [ ] إنشاء مشروع Laravel 13 جديد مع Starter Kit (Fortify + Inertia + React)
- [ ] تثبيت وضبط Inertia.js 3 مع React
- [ ] ضبط TypeScript في جانب React
- [ ] إعداد قاعدة البيانات MySQL
- [ ] ضبط Laravel Sanctum للمصادقة
- [ ] إضافة Middleware `CheckRole` للتحقق من دور المستخدم (admin/user)
- [ ] إعداد Laravel Queue
- [ ] إعداد Laravel Scheduler
- [ ] ضبط بيئة البريد الإلكتروني (SMTP / Mailtrap للتطوير)
- [ ] إعداد Laravel Storage لرفع الملفات والصور
- [ ] ضبط متغيرات البيئة `.env`
- [ ] إعداد Git repository وهيكل الفروع (main / develop / feature)

---

### 📁 هيكل مجلدات `resources/js`

> كل domain معزول تماماً — الأدمن في مجلده والموقع في مجلده والمشترك في `shared/`.

```
resources/js/
│
├── admin/                        ← كل حاجة خاصة بالأدمن
│   ├── layouts/
│   │   └── AdminLayout.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── confirm-password.tsx
│   │   │   ├── forgot-password.tsx
│   │   │   ├── VerifyEmail.tsx
│   │   │   ├── two-factor-challenge.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── Dashboard.tsx
│   │   ├── ideas/
│   │   │   ├── Index.tsx
│   │   │   └── Review.tsx
│   │   ├── users/
│   │   │   └── Index.tsx
│   │   ├── sponsors/
│   │   │   └── Index.tsx
│   │   └── winners/
│   │       └── Index.tsx
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── StatsCard.tsx
│   │   └── IdeaTable.tsx
│   └── types/
│       └── admin.ts
│
├── app/                          ← كل حاجة خاصة بالموقع
│   ├── layouts/
│   │   └── AppLayout.tsx
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── VerifyEmail.tsx
│   │   │   ├── ResetPassword.tsx
│   │   │   └── ForgotPassword.tsx
│   │   ├── Home.tsx
│   │   ├── IdeaDetail.tsx
│   │   ├── SubmitIdea.tsx
│   │   ├── Archive.tsx
│   │   ├── Profile.tsx
│   │   ├── Sponsors.tsx
│   │   ├── About.tsx
│   │   ├── Terms.tsx
│   │   └── Contact.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── IdeaCard.tsx
│   │   ├── VoteModal.tsx
│   │   ├── CommentSection.tsx
│   │   └── CountdownTimer.tsx
│   └── types/
│       ├── idea.ts
│       ├── user.ts
│       └── notification.ts
│
└── shared/                       ← المشترك بين الأدمن والموقع
    ├── components/
    │   └── Toast.tsx
    ├── hooks/
    │   ├── useVote.ts
    │   ├── useFollow.ts
    │   └── useNotifications.ts
    └── types/
        └── global.ts
```

**ملاحظة Inertia:** بتبعت اسم الـ component من Laravel كالتالي:

```php
// Controllers عادية
return Inertia::render('app/pages/Home');
return Inertia::render('admin/pages/Dashboard');

// Fortify — بتسجّل الـ views في FortifyServiceProvider
Fortify::loginView(fn () => Inertia::render('admin/pages/auth/Login'));
Fortify::loginView(fn () => Inertia::render('app/pages/auth/Login'));
```

**مهام إنشاء الهيكل:**

- [ ] إنشاء مجلد `resources/js/admin/` بالهيكل الكامل
- [ ] إنشاء مجلد `resources/js/app/` بالهيكل الكامل
- [ ] إنشاء مجلد `resources/js/shared/` بالهيكل الكامل
- [ ] نقل صفحات Starter Kit من `pages/auth/` إلى `admin/pages/auth/` ← **الخيار 2**
- [ ] تعديل مسارات Fortify في `FortifyServiceProvider` لتشير إلى `admin/pages/auth/`
- [ ] حذف صفحات Starter Kit الافتراضية غير المستخدمة (Welcome.tsx, Dashboard.tsx القديم)
- [ ] ضبط `wayfinder` و `inertia` resolve path ليتعرف على المجلدات الجديدة في `vite.config.ts`

---

### 🗄️ قاعدة البيانات — Migrations

- [x] Migration: `users`
- [x] Migration: `ideas`
- [x] Migration: `votes`
- [x] Migration: `comments`
- [x] Migration: `comment_likes`
- [x] Migration: `user_follows`
- [x] Migration: `idea_follows`
- [x] Migration: `notifications`
- [x] Migration: `sponsors`
- [x] Migration: `prize_records`
- [x] إضافة Indexes على الحقول الأكثر استخداماً في الاستعلامات
- [x] إضافة Unique Constraints: `(idea_id, voter_email)` في votes، `(follower_id, following_id)` في user_follows، `(user_id, idea_id)` في idea_follows

---

### 🔐 المصادقة — Authentication

> جدول `users` واحد يخدم اليوزر والأدمن معاً — Guard واحد `auth` + Middleware `role:admin` على مسارات الأدمن.
> الـ Starter Kit بيستخدم **Fortify** لإدارة المصادقة — مش Controllers عادية.
> Fortify بيشتغل في الخلفية تلقائياً، انت بس بتسجّل الـ Views وتخصّص الـ Actions.

**Admin Auth — نقل صفحات Fortify لمجلد الأدمن**

- [ ] نقل `pages/auth/login.tsx` → `admin/pages/auth/Login.tsx`
- [ ] نقل `pages/auth/forgot-password.tsx` → `admin/pages/auth/ForgotPassword.tsx`
- [ ] نقل `pages/auth/reset-password.tsx` → `admin/pages/auth/ResetPassword.tsx`
- [ ] نقل `pages/auth/confirm-password.tsx` → `admin/pages/auth/ConfirmPassword.tsx`
- [ ] نقل `pages/auth/two-factor-challenge.tsx` → `admin/pages/auth/TwoFactorChallenge.tsx`
- [ ] نقل `pages/auth/verify-email.tsx` → `admin/pages/auth/VerifyEmail.tsx`
- [ ] ⚠️ تعديل مسارات Fortify في `FortifyServiceProvider.php` لتشير للمسارات الجديدة:

```php
Fortify::loginView(fn () => Inertia::render('admin/pages/auth/Login'));
Fortify::requestPasswordResetLinkView(fn () => Inertia::render('admin/pages/auth/ForgotPassword'));
Fortify::resetPasswordView(fn ($r) => Inertia::render('admin/pages/auth/ResetPassword', ['token' => $r->route('token')]));
Fortify::confirmPasswordView(fn () => Inertia::render('admin/pages/auth/ConfirmPassword'));
Fortify::verifyEmailView(fn () => Inertia::render('admin/pages/auth/VerifyEmail'));
```

**App Auth — صفحات جديدة بتصميم الموقع**

- [ ] إنشاء `app/pages/auth/Login.tsx` بتصميم الذهبي
- [ ] إنشاء `app/pages/auth/Register.tsx` مع الحقول المطلوبة (phone, country, nationality)
- [ ] إنشاء `app/pages/auth/VerifyEmail.tsx`
- [ ] إنشاء `app/pages/auth/ForgotPassword.tsx`
- [ ] إنشاء `app/pages/auth/ResetPassword.tsx`
- [ ] إضافة Routes منفصلة في `routes/web.php` للـ app auth تشير لـ Inertia render مباشرة:

```php
Route::middleware('guest')->group(function () {
    Route::get('login',           fn () => Inertia::render('app/pages/auth/Login'));
    Route::get('register',        fn () => Inertia::render('app/pages/auth/Register'));
    Route::get('forgot-password', fn () => Inertia::render('app/pages/auth/ForgotPassword'));
});
// POST routes تتعامل معها Fortify تلقائياً
```

- [ ] ⚠️ التأكد إن Fortify بيستقبل الـ POST requests من صفحات الـ app وبيعمل redirect صح بعد Login/Register

**تخصيص Fortify Actions للـ App**

- [ ] تعديل `app/Actions/Fortify/CreateNewUser.php` لإضافة حقول الموقع (phone, country, nationality, role='user')
- [ ] تعديل `app/Actions/Fortify/UpdateUserProfileInformation.php` لدعم الحقول الجديدة
- [ ] Validation كامل في `CreateNewUser.php` (phone format, country, unique email)
- [ ] إرسال إيميل تفعيل الحساب بعد التسجيل باللغتين (ar/en)
- [ ] Rate Limiting على محاولات تسجيل الدخول

**Middleware & Guards**

- [ ] إنشاء `CheckRole` Middleware للتحقق من `user->role === 'admin'`
- [ ] تسجيل Middleware في `bootstrap/app.php`
- [ ] تطبيق `middleware(['auth', 'role:admin'])` على جميع مسارات `/admin`
- [ ] Middleware: التحقق من تفعيل الإيميل `verified` قبل تقديم الأفكار

**إنشاء أول أدمن**

- [ ] إضافة `AdminSeeder` لإنشاء حساب أدمن ثابت بـ `role = admin`
- [ ] أمر Artisan مخصص `php artisan admin:create` لإنشاء أدمن من الـ terminal

---

### 🧩 Models & Relationships

- [x] Model: `User` مع علاقات `hasMany` للأفكار والتعليقات والمتابعات والإشعارات
- [x] Model: `Idea` مع علاقات `belongsTo` و `hasMany`
- [x] Model: `Vote` مع scope للتحقق من التكرار
- [x] Model: `Comment` مع `hasMany` للإعجابات
- [x] Model: `CommentLike`
- [x] Model: `UserFollow`
- [x] Model: `IdeaFollow`
- [x] Model: `Notification`
- [x] Model: `Sponsor`
- [x] Model: `PrizeRecord`

---

### 🏭 Factories

> تُستخدم في الاختبارات (Testing) وفي توليد بيانات تجريبية واقعية للعرض على الرعاة.

- [x] Factory: `UserFactory`
  - [x] حقول عربية واقعية للاسم (name_first, name_last)
  - [x] إيميل فريد لكل مستخدم
  - [x] رقم هاتف عشوائي مع مفتاح دولة
  - [x] دول عربية عشوائية (الأردن، السعودية، مصر، الإمارات...)
  - [x] State: `admin()` لإنشاء مستخدم بدور المدير
  - [x] State: `unverified()` لمستخدم غير مفعّل الإيميل

- [x] Factory: `IdeaFactory`
  - [x] عناوين أفكار عربية واقعية (مشاريع صغيرة حقيقية)
  - [x] أوصاف تفصيلية لكل فكرة
  - [x] تصنيفات متنوعة: تجارة، تقنية، خدمات، غذاء، تعليم...
  - [x] submission_day عشوائي (0→6)
  - [x] week_number و year تلقائيان
  - [x] State: `pending()` — status = pending
  - [x] State: `approved()` — status = approved مع approved_at
  - [x] State: `rejected()` — status = rejected مع rejection_reason
  - [x] State: `winner()` — is_winner = true مع winner_announced_at
  - [x] State: `withImage()` — إرفاق صورة placeholder

- [x] Factory: `VoteFactory`
  - [x] voter_email فريد لكل فكرة
  - [x] otp_verified_at محدد (صوت مؤكد)
  - [x] ip_address عشوائي

- [x] Factory: `CommentFactory`
  - [x] تعليقات عربية واقعية تحسيناً للأفكار
  - [x] likes_count عشوائي بين 0 و 50

- [x] Factory: `SponsorFactory`
  - [x] أسماء شركات عربية واقعية
  - [x] day_of_week من 0 إلى 6 (فريد لكل راعٍ)
  - [x] contract_start = بداية السنة الحالية
  - [x] contract_end = نهاية السنة الحالية
  - [x] State: `active()` و `inactive()`

- [x] Factory: `NotificationFactory`
  - [x] جميع أنواع الإشعارات الخمسة
  - [x] State: `unread()` — is_read = false
  - [x] State: `read()` — is_read = true مع read_at

- [x] Factory: `UserFollowFactory`
- [x] Factory: `IdeaFollowFactory`
- [x] Factory: `PrizeRecordFactory`
  - [x] State: `pending()` و `delivered()`

---

### 🌱 Seeders

> ترتيب تشغيل الـ Seeders مهم — يجب أن يتبع ترتيب العلاقات.

**الترتيب الصحيح للتشغيل:**

```
AdminSeeder → SponsorSeeder → UserSeeder → IdeaSeeder
→ VoteSeeder → CommentSeeder → FollowSeeder
→ PrizeRecordSeeder → NotificationSeeder
```

- [x] Seeder: `DatabaseSeeder` — يُنظّم استدعاء جميع الـ Seeders بالترتيب الصحيح

- [x] Seeder: `AdminSeeder`
  - [x] إنشاء حساب أدمن ثابت: `admin@afkar100.com` / `password`
  - [x] إنشاء حساب Demo Admin للعرض على الرعاة

- [x] Seeder: `SponsorSeeder`
  - [x] إنشاء 7 رعاة — راعٍ لكل يوم من الأسبوع
  - [x] أسماء شركات عربية واقعية أو placeholder احترافي
  - [x] ربط كل راعٍ بيومه (day_of_week 0→6)

- [x] Seeder: `UserSeeder`
  - [x] إنشاء 50 مستخدم تجريبي بـ `UserFactory`
  - [x] 10 مستخدمين من كل دولة: الأردن، السعودية، مصر، الإمارات، الكويت

- [x] Seeder: `IdeaSeeder`
  - [x] إنشاء 7 أفكار معتمدة — فكرة لكل يوم من الأسبوع الحالي (للتصويت الحي)
  - [x] إنشاء 49 فكرة معتمدة للأسابيع السبعة الماضية (للأرشيف)
  - [x] إنشاء 7 أفكار فائزة — فائز لكل يوم من الأسبوع الماضي
  - [x] إنشاء 10 أفكار قيد الانتظار (pending) للوحة تحكم المدير
  - [x] إنشاء 5 أفكار مرفوضة مع أسباب رفض

- [x] Seeder: `VoteSeeder`
  - [x] إنشاء أصوات تجريبية للأفكار الحالية (بين 50 و 500 صوت لكل فكرة)
  - [x] تحديث votes_count في جدول ideas بعد الإنشاء
  - [x] التأكد من عدم تكرار (idea_id + voter_email)

- [x] Seeder: `CommentSeeder`
  - [x] إنشاء 3 إلى 8 تعليقات لكل فكرة معتمدة
  - [x] تعليقات عربية واقعية تحاكي تحسيناً حقيقياً للأفكار
  - [x] إنشاء إعجابات عشوائية على التعليقات عبر `CommentLike`

- [x] Seeder: `FollowSeeder`
  - [x] إنشاء متابعات عشوائية بين المستخدمين (user_follows)
  - [x] إنشاء متابعات عشوائية للأفكار (idea_follows)

- [x] Seeder: `PrizeRecordSeeder`
  - [x] إنشاء سجل جائزة لكل فكرة فائزة مرتبطاً بالراعي المناسب لليوم
  - [x] نصف الجوائز بحالة `delivered`، النصف الآخر `pending`

- [x] Seeder: `NotificationSeeder`
  - [x] إنشاء إشعارات تجريبية متنوعة الأنواع الخمسة لكل مستخدم
  - [x] بعضها مقروء (is_read = true) وبعضها غير مقروء

---

## M2 — الصفحات الأساسية للمستخدم

**الأسبوع 2 → 3**

### 🎯 Milestone

المستخدم يقدر يتصفح الأفكار ويصوّت ويقدّم فكرته.

---

### 🏠 الصفحة الرئيسية (Home)

- [ ] عرض أفكار اليوم الحالي مع عدد الأصوات
- [ ] تبويبات الأيام (الأحد → السبت)
- [ ] بانر الراعي الخاص باليوم
- [ ] عداد تنازلي لانتهاء وقت التصويت
- [ ] كارد الفكرة مع زر «صوّت الآن»
- [ ] قسم «الفائزون السابقون» — آخر 7 فائزين
- [ ] SSR للصفحة الرئيسية عبر Inertia SSR

---

### 💡 صفحة تفاصيل الفكرة (Idea Detail)

- [ ] عرض كامل بيانات الفكرة (عنوان، وصف، تصنيف، دولة)
- [ ] صورة الفكرة أو placeholder افتراضي
- [ ] عداد الأصوات مع Progress Bar
- [ ] زر «صوّت الآن» — يفتح OTP Modal
- [ ] أزرار المشاركة: واتساب، فيسبوك، تويتر/X، نسخ الرابط
- [ ] زر «تابع الفكرة» و «تابع صاحب الفكرة»
- [ ] قسم التعليقات مع إعجاب على كل تعليق
- [ ] نموذج إضافة تعليق جديد
- [ ] Open Graph meta tags ديناميكية لكل فكرة

---

### 🗳️ نظام التصويت بـ OTP

- [ ] Controller: `VoteController@sendOtp` — إرسال OTP للإيميل
- [ ] Controller: `VoteController@verifyOtp` — التحقق والتصويت
- [ ] OTP Modal في React — خطوتين (إيميل → رمز)
- [ ] Rate Limiting: 3 طلبات OTP / ساعة لكل IP
- [ ] OTP يكون مشفّراً في قاعدة البيانات
- [ ] OTP ينتهي بعد 10 دقائق
- [ ] منع التصويت المكرر عبر Unique Constraint
- [ ] تحديث `votes_count` في جدول ideas بعد كل صوت

---

### 📝 صفحة تقديم فكرة (Submit Idea)

- [ ] نموذج كامل: الدولة/المدينة، التصنيف، العنوان، الوصف
- [ ] رفع صورة الفكرة مع Preview قبل الإرسال (اختياري)
- [ ] رفع ملف PDF توضيحي (اختياري)
- [ ] Validation: الحجم الأقصى للصورة 2MB، للملف 5MB
- [ ] 3 checkboxes إلزامية للموافقات
- [ ] الفكرة تدخل حالة `pending` بعد الإرسال
- [ ] إشعار داخلي للمدير عند وجود فكرة جديدة بانتظار الموافقة
- [ ] رسالة تأكيد للمستخدم بعد الإرسال

---

### 🗂️ أرشيف الأفكار (Archive)

- [ ] عرض جميع الأفكار المعتمدة (فائزة وغير فائزة)
- [ ] فلترة: التصنيف، اليوم، الشهر، الحالة
- [ ] بحث نصي في العنوان والوصف
- [ ] ترتيب: الأحدث، الأكثر أصواتاً
- [ ] Pagination أو Infinite Scroll
- [ ] Badge «فائزة 🏆» على الأفكار الفائزة

---

### 👤 الملف الشخصي (Profile)

- [ ] عرض بيانات المستخدم مع إمكانية التعديل
- [ ] تاب: أفكاري — مع حالة كل فكرة (pending/approved/rejected/winner)
- [ ] تاب: الأفكار التي صوّت عليها
- [ ] تاب: الأفكار التي يتابعها
- [ ] تاب: الأشخاص الذين يتابعهم
- [ ] تاب: الرسائل والإشعارات الداخلية
- [ ] تعليم الإشعارات كمقروءة عند الضغط عليها

---

### 📄 الصفحات الثانوية

- [ ] صفحة الرعاة (Sponsors) — 7 كروت مع هايلايت لراعي اليوم
- [ ] صفحة من نحن (About)
- [ ] صفحة الشروط والأحكام (Terms)
- [ ] صفحة تواصل معنا (Contact) مع نموذج

---

## M3 — لوحة تحكم المدير

**الأسبوع 3 → 4**

### 🎯 Milestone

المدير يقدر يدير كل عمليات المنصة من لوحة تحكم مستقلة.

---

### 🛡️ لوحة التحكم — Admin Panel

- [ ] Middleware: `AdminOnly` على جميع مسارات `/admin`
- [ ] Dashboard رئيسية: 4 metric cards (أفكار، أصوات، مستخدمون، رعاة)
- [ ] Sidebar navigation مع icons

---

### 📋 إدارة الأفكار

- [ ] قائمة الأفكار قيد الانتظار مع فلترة وبحث
- [ ] صفحة مراجعة الفكرة: عرض كامل التفاصيل والصورة والملف
- [ ] زر الموافقة: تحديد اليوم المخصص للفكرة قبل النشر
- [ ] زر الرفض: إدخال سبب الرفض — يُرسَل إشعار للمستخدم
- [ ] قائمة الأفكار المعتمدة مع إمكانية التعديل على اليوم المخصص
- [ ] قائمة الأفكار المرفوضة

---

### 👥 إدارة المستخدمين

- [ ] قائمة المستخدمين مع بحث وفلترة بالدولة والدور
- [ ] عرض تفاصيل مستخدم: أفكاره، أصواته، تاريخ التسجيل
- [ ] تفعيل/تعطيل حساب مستخدم مخالف

---

### 🤝 إدارة الرعاة

- [ ] إضافة راعٍ جديد: الاسم، الشعار، اليوم المخصص، تواريخ العقد
- [ ] تعديل بيانات راعٍ موجود
- [ ] تفعيل/إيقاف راعٍ
- [ ] تتبع حالة دفع الجوائز الأسبوعية لكل راعٍ

---

### 🏆 إدارة الفائزين

- [ ] عرض الفائز المحتمل (الأعلى أصواتاً) لكل يوم قبل الإعلان
- [ ] زر تأكيد الفائز وإطلاق الإعلان الرسمي
- [ ] تسجيل حالة تسليم الجائزة: pending / delivered
- [ ] إرسال إشعار للفائز تلقائياً عند التأكيد
- [ ] Laravel Scheduler: إعلان تلقائي عند منتصف الليل إذا لم يُعلن يدوياً

---

### 📊 إحصائيات المنصة

- [ ] عدد الأفكار المقدمة يومياً وأسبوعياً (Chart)
- [ ] عدد الأصوات الإجمالية عبر الزمن (Chart)
- [ ] عدد المستخدمين الجدد أسبوعياً
- [ ] أكثر الأفكار مشاركةً (top 5)
- [ ] توزيع الأفكار حسب الدولة

---

## M4 — المتابعة والإشعارات

**الأسبوع 4 → 5**

### 🎯 Milestone

نظام متابعة كامل مع إشعارات داخلية وإيميل يعمل عبر Laravel Queue.

---

### 👁️ نظام المتابعة

- [ ] Controller: `UserFollowController@toggle` — متابعة/إلغاء متابعة مستخدم
- [ ] Controller: `IdeaFollowController@toggle` — متابعة/إلغاء متابعة فكرة
- [ ] زر «تابع» ديناميكي في صفحة الفكرة وصفحة الملف الشخصي
- [ ] عداد المتابعين في الملف الشخصي
- [ ] قائمة «الذين أتابعهم» في تاب الملف الشخصي

---

### 📨 Events & Listeners

- [ ] Event: `IdeaApproved` — يُطلَق عند موافقة الأدمن على فكرة
- [ ] Listener: `NotifyUserFollowers` — يُنشئ إشعارات لمتابعي صاحب الفكرة
- [ ] Event: `CommentCreated` — يُطلَق عند إضافة تعليق جديد
- [ ] Listener: `NotifyIdeaFollowers` — يُنشئ إشعارات لمتابعي الفكرة
- [ ] Event: `WinnerAnnounced` — يُطلَق عند إعلان الفائز
- [ ] Listener: `NotifyWinner` — يُرسِل إشعاراً للفائز

---

### 📬 إرسال الإيميلات عبر Queue

- [ ] Job: `SendFollowerNotificationEmail` — إيميل لمتابعي صاحب الفكرة
- [ ] Job: `SendIdeaCommentEmail` — إيميل لمتابعي الفكرة
- [ ] Job: `SendWinnerEmail` — إيميل تهنئة للفائز
- [ ] Job: `SendIdeaStatusEmail` — إيميل عند الموافقة أو الرفض
- [ ] تعليم `is_email_sent = true` بعد نجاح إرسال كل إيميل
- [ ] معالجة حالات الفشل: `failed_jobs` table

---

### 🔔 الإشعارات الداخلية (In-App)

- [ ] أيقونة جرس في الـ Navbar مع عداد للإشعارات الغير مقروءة
- [ ] Dropdown الإشعارات: آخر 10 إشعارات مع الوقت النسبي
- [ ] تعليم «مقروء» عند الضغط على الإشعار
- [ ] زر «تعليم الكل كمقروء»
- [ ] صفحة «كل الإشعارات» في الملف الشخصي مع pagination

---

## M5 — SEO والمشاركة الاجتماعية والـ RTL

**الأسبوع 5 → 6**

### 🎯 Milestone

الموقع جاهز للانتشار على وسائل التواصل والظهور في محركات البحث.

---

### 🌐 SEO

- [ ] Dynamic meta tags لكل صفحة فكرة (title، description)
- [ ] Open Graph tags: `og:title`، `og:description`، `og:image`، `og:url`
- [ ] Twitter Card tags
- [ ] Canonical URLs
- [ ] Sitemap.xml ديناميكي يشمل كل الأفكار المعتمدة
- [ ] Robots.txt
- [ ] Slugs عربية صديقة للمحركات في روابط الأفكار

---

### 📱 المشاركة الاجتماعية

- [ ] زر مشاركة واتساب مع نص جاهز بعنوان الفكرة ورابطها
- [ ] زر مشاركة فيسبوك
- [ ] زر مشاركة تويتر/X
- [ ] زر نسخ الرابط مع Toast تأكيد «تم النسخ»
- [ ] صورة OG ديناميكية لكل فكرة (أو صورة افتراضية للمنصة)

---

### 🌍 اللغتان والـ RTL

> بدون i18n library — بنستخدم Laravel Localization مباشرة ونبعت الترجمات عبر Inertia Shared Data.

**Laravel — ملفات الترجمة**

- [ ] إنشاء `lang/ar/app.php` — كل نصوص الموقع بالعربي
- [ ] إنشاء `lang/en/app.php` — كل نصوص الموقع بالإنجليزي
- [ ] إنشاء `lang/ar/validation.php` — رسائل الـ Validation بالعربي
- [ ] إنشاء `lang/en/validation.php` — رسائل الـ Validation بالإنجليزي

**Inertia — مشاركة الترجمات مع React**

- [ ] تعديل `HandleInertiaRequests.php` لإضافة `translations`، `locale`، `direction` في `share()`
- [ ] إنشاء `LocaleController` مع route `POST /locale/{locale}` لتبديل اللغة وحفظها في الـ session
- [ ] إضافة `app()->setLocale()` في `AppServiceProvider` بناءً على `session('locale', 'ar')`

**React — استخدام الترجمات**

- [ ] إنشاء `shared/hooks/useTranslation.ts` — hook بسيط يقرأ `translations` من `usePage().props`
- [ ] تطبيق `direction` (rtl/ltr) على `<html>` tag ديناميكياً من `AppLayout.tsx`
- [ ] إضافة زري تبديل اللغة في `Navbar.tsx`
- [ ] دعم RTL كامل في جميع الصفحات والمكونات
- [ ] التحقق من صحة RTL في جميع الصفحات على موبايل وديسكتوب

---

### 📐 الاستجابة (Responsive Design)

- [ ] تدقيق جميع الصفحات الـ 13 على موبايل (375px)
- [ ] تدقيق على تابلت (768px)
- [ ] تدقيق على ديسكتوب (1280px+)
- [ ] تدقيق على أجهزة iOS و Android

---

## M6 — الاختبارات والأداء والنشر

**الأسبوع 6 → 7**

### 🎯 Milestone

الموقع مختبر وآمن وجاهز للنشر على السيرفر.

---

### 🧪 الاختبارات

- [ ] Feature Tests: تسجيل الدخول والتسجيل والتفعيل
- [ ] Feature Tests: تقديم الفكرة والموافقة والرفض
- [ ] Feature Tests: نظام التصويت بـ OTP
- [ ] Feature Tests: نظام المتابعة والإشعارات
- [ ] Feature Tests: لوحة تحكم المدير
- [ ] Unit Tests: Scheduler إعلان الفائز
- [ ] Unit Tests: Queue Jobs الإيميل
- [ ] Browser Tests (Dusk): تجربة المستخدم الكاملة من التسجيل للتصويت

---

### ⚡ الأداء

- [ ] Cache للأفكار اليومية
- [ ] Cache لإحصائيات الصفحة الرئيسية
- [ ] Eager Loading لتجنب N+1 queries
- [ ] Image Optimization لصور الأفكار عند الرفع
- [ ] Lazy Loading للصور في صفحة الأرشيف
- [ ] قياس Lighthouse score — الهدف: 90+ في Performance و SEO

---

### 🔒 الأمان

- [ ] مراجعة جميع نقاط CSRF Protection
- [ ] مراجعة Rate Limiting على جميع الـ endpoints الحساسة
- [ ] مراجعة File Upload Validation (نوع الملف والحجم)
- [ ] مراجعة SQL Injection Protection (Eloquent ORM)
- [ ] مراجعة XSS Protection في مخرجات React
- [ ] إعداد HTTPS والـ SSL Certificate

---

### 🚀 النشر (Deployment)

- [ ] إعداد السيرفر (Ubuntu + apache + PHP 8.3)
- [ ] إعداد قاعدة البيانات على السيرفر
- [ ] إعداد Supervisor لـ Laravel Queue Worker
- [ ] إعداد Laravel Scheduler في Crontab
- [ ] إعداد متغيرات البيئة الإنتاجية `.env.production`
- [ ] نشر الكود وتشغيل Migrations
- [ ] ضبط Storage Link للملفات المرفوعة
- [ ] اختبار شامل على بيئة الإنتاج قبل الإطلاق

---

## M7 — العرض التجريبي وما بعد الإطلاق

**الأسبوع 7 → 8**

### 🎯 Milestone

الموقع جاهز للعرض على الرعاة المحتملين وإطلاق المنصة رسمياً.

---

### 🎬 العرض التجريبي للرعاة

- [ ] إعداد بيانات تجريبية واقعية (seed data)
- [ ] إضافة 7 أفكار نموذجية مع صور لكل يوم من الأسبوع
- [ ] إضافة تعليقات وأصوات تجريبية
- [ ] إعداد Demo Account للمدير والمستخدم للعرض
- [ ] اختبار كامل لدورة العمل: تقديم فكرة ← موافقة ← تصويت ← إعلان فائز
- [ ] تحضير Presentation مختصرة تشرح قيمة الرعاية للشركات

---

### 🔧 التعديلات بعد ملاحظات الرعاة

- [ ] جمع ملاحظات الرعاة المحتملين
- [ ] تحديد التعديلات المطلوبة وترتيبها بالأولوية
- [ ] تنفيذ التعديلات ذات الأولوية العالية
- [ ] إعادة اختبار التعديلات

---

### 🚦 قائمة تحقق ما قبل الإطلاق الرسمي

- [ ] التحقق من عمل جميع الصفحات الـ 13
- [ ] التحقق من عمل لوحة تحكم المدير بالكامل
- [ ] التحقق من استقبال الإيميلات (OTP + إشعارات + تفعيل)
- [ ] التحقق من عمل Scheduler لإعلان الفائز تلقائياً
- [ ] التحقق من عمل Queue Workers بشكل مستمر
- [ ] التحقق من OG Tags في واتساب وفيسبوك وتويتر
- [ ] التحقق من RTL في جميع الصفحات على موبايل
- [ ] التحقق من السرعة (أقل من 2 ثانية تحميل)
- [ ] Backup قاعدة البيانات مُهيأ تلقائياً
- [ ] مراقبة الأخطاء مُهيأة (Sentry أو Laravel Telescope)

---

## ملخص المهام الكلي

| المرحلة                       | عدد المهام   | الأسابيع     |
| ----------------------------- | ------------ | ------------ |
| M1 — البنية التحتية والمصادقة | 48 مهمة      | 1 - 2        |
| M1 — Factories (10 factories) | 28 مهمة      | 1 - 2        |
| M1 — Seeders (9 seeders)      | 22 مهمة      | 1 - 2        |
| M2 — الصفحات الأساسية         | 40 مهمة      | 2 - 3        |
| M3 — لوحة تحكم المدير         | 24 مهمة      | 3 - 4        |
| M4 — المتابعة والإشعارات      | 22 مهمة      | 4 - 5        |
| M5 — SEO والـ RTL واللغتان    | 25 مهمة      | 5 - 6        |
| M6 — الاختبارات والنشر        | 26 مهمة      | 6 - 7        |
| M7 — العرض والإطلاق           | 14 مهمة      | 7 - 8        |
| **المجموع**                   | **249 مهمة** | **8 أسابيع** |

---

> **ملاحظة 1:** جدول `users` واحد يخدم اليوزر والأدمن — Guard واحد `auth` + Middleware `role:admin` على مسارات الأدمن. لا يوجد جدول أدمن منفصل.

> **ملاحظة 2:** المهام المرتبطة بـ Queue و Scheduler تحتاج اختبار مستمر من الأسبوع الأول لضمان استقرارها قبل الإطلاق.

> **ملاحظة 2:** يجب تشغيل `php artisan db:seed` بالترتيب المحدد في `DatabaseSeeder` — أي تعديل على ترتيب الـ Seeders قد يُسبب أخطاء في العلاقات.

> **ملاحظة 3:** لا تُشغَّل الـ Seeders على بيئة الإنتاج (Production) — خصصها للتطوير (Development) والعرض التجريبي فقط عبر `--env=demo`.
