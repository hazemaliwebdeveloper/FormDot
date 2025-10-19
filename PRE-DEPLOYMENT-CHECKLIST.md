# ✅ قائمة التحقق قبل النشر

تأكد من جميع هذه الخطوات قبل نشر المشروع على Vercel!

---

## 🖥️ البيئة المحلية

- [ ] Node.js 16+ مثبت: `node --version`
- [ ] npm/yarn محدثة: `npm --version`
- [ ] git مثبت: `git --version`
- [ ] المشروع مستنسخ بنجاح: `git status`
- [ ] `npm install` نجح بدون أخطاء
- [ ] لا توجد رسائل خطأ في node_modules

---

## 📝 الملفات الضرورية

- [ ] `.env.local` موجود و يحتوي على:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`
- [ ] `vite.config.ts` موجود ويحتوي على build config
- [ ] `package.json` موجود وبه الـ dependencies الصحيحة
- [ ] `tailwind.config.js` موجود
- [ ] `tsconfig.json` موجود

---

## 🧪 الاختبار المحلي

- [ ] `npm run dev` يعمل بدون أخطاء
  ```bash
  npm run dev
  # يجب يظهر: "Local:   http://localhost:5173"
  ```

- [ ] الموقع يُحمّل بدون أخطاء في المتصفح
  ```bash
  # افتح http://localhost:5173 في المتصفح
  ```

- [ ] جميع المكونات تعرض بشكل صحيح:
  - [ ] الشعار (Logo) يظهر
  - [ ] الخدمات الأربع تظهر
  - [ ] نموذج التسجيل يظهر
  - [ ] الأيقونات (lucide-react) تظهر
  - [ ] الألوان صحيحة

- [ ] الموقع مستجيب (responsive):
  - [ ] على شاشة كبيرة (1920px+)
  - [ ] على شاشة وسيطة (768px)
  - [ ] على جوال (375px)

- [ ] النموذج يعمل:
  - [ ] يمكن ملء الحقول
  - [ ] يمكن إرسال البيانات
  - [ ] لا توجد أخطاء في console

---

## 🔍 فحوصات الجودة

- [ ] لا توجد أخطاء TypeScript:
  ```bash
  npm run typecheck
  # يجب ما تطلع أي errors
  ```

- [ ] لا توجد تحذيرات ESLint:
  ```bash
  npm run lint
  # يجب ما تطلع أي warnings أو errors
  ```

- [ ] البناء ينجح:
  ```bash
  npm run build
  # يجب يكمل بدون أخطاء
  ```

- [ ] مجلد `dist/` موجود و يحتوي على:
  - [ ] `index.html`
  - [ ] `assets/` folder
  - [ ] `vite.svg` (أو ملفات أخرى)

- [ ] يمكن معاينة البناء:
  ```bash
  npm run preview
  # يجب يعمل مثل `npm run dev`
  ```

---

## 🗄️ قاعدة البيانات (Supabase)

- [ ] حساب Supabase مُنشأ
- [ ] Project جديد مُنشأ على Supabase
- [ ] جدول `form_submissions` موجود مع الأعمدة:
  - [ ] `id` (BigInt Primary Key)
  - [ ] `name` (Text)
  - [ ] `email` (Text)
  - [ ] `phone` (Text)
  - [ ] `company` (Text)
  - [ ] `project_description` (Text)
  - [ ] `budget` (Text)
  - [ ] `created_at` (Timestamp)
  - [ ] `updated_at` (Timestamp)

- [ ] Row Level Security (RLS) مفعل على الجدول
- [ ] السياسات موجودة:
  - [ ] Allow INSERT for all users
  - [ ] Allow SELECT for authenticated users

- [ ] SUPABASE_URL محفوظ: `https://...supabase.co`
- [ ] SUPABASE_ANON_KEY محفوظ

---

## 🔐 الأمان والبيئة

- [ ] `.env` ملف في `.gitignore`:
  ```bash
  grep ".env" .gitignore
  ```

- [ ] المفاتيح السرية غير مكتوبة في الكود
- [ ] `node_modules/` في `.gitignore`
- [ ] `dist/` في `.gitignore`

---

## 🐙 GitHub

- [ ] GitHub account موجود
- [ ] Repository جديد مُنشأ
- [ ] Repository connected محلياً:
  ```bash
  git remote -v
  # يجب تشوف origin مشيرة للـ repo
  ```

- [ ] كل التعديلات تم حفظها:
  ```bash
  git status
  # يجب يقول "nothing to commit"
  ```

- [ ] آخر commit تم push:
  ```bash
  git log --oneline
  # يجب تشوف commits على main
  ```

---

## 🚀 Vercel

- [ ] Vercel account مُنشأ
- [ ] Vercel متصل بـ GitHub
- [ ] Project جديد على Vercel مُنشأ
- [ ] Project متصل بـ GitHub repository

- [ ] متغيرات البيئة تم إضافتها على Vercel:
  - [ ] `VITE_SUPABASE_URL`
  - [ ] `VITE_SUPABASE_ANON_KEY`

- [ ] Build settings صحيحة:
  - [ ] Framework: Vite
  - [ ] Build Command: `npm run build`
  - [ ] Output Directory: `dist`

---

## 📱 اختبار الإنتاج

بعد النشر على Vercel:

- [ ] الموقع يُحمّل بدون أخطاء
  ```bash
  # اضغط على الرابط اللي Vercel أعطاك
  ```

- [ ] جميع الملفات موجودة:
  - [ ] الشعار يظهر
  - [ ] الخدمات تظهر
  - [ ] النموذج يظهر
  - [ ] الأيقونات تظهر

- [ ] النموذج يعمل:
  - [ ] ملء البيانات يعمل
  - [ ] الإرسال يعمل
  - [ ] الرسالة تظهر بعد الإرسال

- [ ] البيانات تُحفظ في Supabase:
  - [ ] اذهب إلى Supabase Console
  - [ ] اختر `form_submissions` table
  - [ ] شوف البيانات اللي أرسلتها

- [ ] المتصفح console بدون أخطاء:
  - [ ] اضغط F12
  - [ ] اذهب إلى Console tab
  - [ ] شوف ما في أخطاء حمراء

---

## 🎯 الأداء

- [ ] الموقع يُحمّل بسرعة معقولة (< 3 ثواني)
- [ ] لا توجد رسائل خطأ في Network tab
- [ ] Google Lighthouse score جيد (> 80):
  ```bash
  # على المتصفح
  # F12 → Lighthouse → Analyze page load
  ```

---

## 📚 التوثيق

- [ ] README.md محدثة و شاملة
- [ ] DEPLOYMENT.md موجود و دقيق
- [ ] TROUBLESHOOTING.md موجود و مفيد
- [ ] PRE-DEPLOYMENT-CHECKLIST.md (هذا الملف) موجود
- [ ] PERFORMANCE-TIPS.md موجود

---

## 🎬 النشر النهائي

- [ ] كل الاختبارات نجحت محلياً
- [ ] البناء ينجح
- [ ] Vercel deployment نجح
- [ ] الموقع المنشور يعمل بدون مشاكل

---

## ✨ مبروك! 🎉

إذا وضعت checkmark على كل شيء، المشروع جاهز 100%!

**الخطوات التالية:**
1. شارك الرابط مع الآخرين
2. راقب الأداء والأخطاء
3. أضف نطاق مخصص (اختياري)
4. أضف Google Analytics (اختياري)

---

**ملاحظة مهمة:** تأكد من أن `git push` وصل قبل النشر على Vercel، لأن Vercel يسحب من GitHub! 🔄