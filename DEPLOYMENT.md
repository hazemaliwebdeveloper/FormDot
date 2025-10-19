# 📚 دليل النشر على Vercel

هذا الدليل يساعدك على نشر تطبيق React/Vite على Vercel بسهولة.

## 📋 المتطلبات

- حساب على [GitHub](https://github.com) (مجاني)
- حساب على [Vercel](https://vercel.com) (مجاني)
- حساب على [Supabase](https://supabase.com) (مجاني)
- Node.js 16 أو أحدث

## ✅ قبل البدء - قائمة التحقق

- [ ] تم تثبيت المشروع محلياً بنجاح
- [ ] تعمل جميع المكتبات بدون أخطاء
- [ ] تم إنشاء قاعدة بيانات Supabase
- [ ] تم الحصول على SUPABASE_URL و SUPABASE_ANON_KEY
- [ ] تم اختبار النموذج محلياً

## 🚀 خطوات النشر

### الخطوة 1: تحضير GitHub

1. **أنشئ مستودع على GitHub:**
   - اذهب إلى [github.com/new](https://github.com/new)
   - أضف اسم للمستودع
   - اختر "Public" (يمكنك تغييره لاحقاً)
   - اضغط "Create repository"

2. **أضف المشروع إلى Git:**
   ```bash
   cd your-project
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **اربط المستودع البعيد:**
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

### الخطوة 2: إعداد Supabase

1. **أنشئ حساب على [supabase.com](https://supabase.com)**

2. **أنشئ project جديد:**
   - اضغط "New Project"
   - اختر اسم للمشروع
   - اختر password قوي
   - اختر المنطقة الأقرب لك
   - اضغط "Create new project"

3. **احصل على مفاتيح الوصول:**
   - اذهب إلى "Project Settings" → "API"
   - انسخ:
     - `Project URL` (سيكون URL الخاص بك)
     - `anon public` key (مفتاح عام للعملاء)

4. **أنشئ جدول قاعدة البيانات:**
   - اذهب إلى "SQL Editor"
   - اضغط "New Query"
   - اختر "New Query"
   - أضف الـ SQL التالي:

```sql
CREATE TABLE form_submissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  project_description TEXT,
  budget TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW())
);

-- Enable RLS (Row Level Security)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- إنشع سياسة للإدراج (السماح للجميع بإضافة بيانات)
CREATE POLICY "Enable insert for all users" ON form_submissions
  FOR INSERT WITH CHECK (TRUE);

-- إنشاء سياسة للقراءة (للقراءة من لوحة التحكم)
CREATE POLICY "Enable read for authenticated users" ON form_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
```

   - اضغط "Run"

### الخطوة 3: نشر على Vercel

#### الطريقة الأولى: عبر واجهة الويب (الأسهل)

1. **اذهب إلى [vercel.com](https://vercel.com)**

2. **سجل الدخول أو أنشئ حساب:**
   - يمكنك التسجيل باستخدام GitHub

3. **أضف مشروع جديد:**
   - اضغط "Add New" → "Project"
   - اختر "Import Git Repository"
   - اختر مستودعك من GitHub

4. **إعدادات المشروع:**
   - **Project Name**: اختر اسم
   - **Framework**: Vite (يجب أن يكون محدداً تلقائياً)
   - **Root Directory**: `./`

5. **أضف متغيرات البيئة:**
   - اذهب إلى "Environment Variables"
   - أضف المتغيرات:
     ```
     VITE_SUPABASE_URL = https://your-project.supabase.co
     VITE_SUPABASE_ANON_KEY = your-anon-key-here
     ```

6. **اضغط "Deploy"**

7. **انتظر حتى ينتهي النشر:**
   - ستظهر نقطة زرقاء تتحرك = جاري النشر
   - عندما تصبح خضراء = تم النشر بنجاح

#### الطريقة الثانية: استخدام Vercel CLI

1. **ثبت Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **سجل الدخول:**
   ```bash
   vercel login
   ```

3. **اجعل المشروع جاهزاً:**
   ```bash
   npm run build
   ```

4. **اضغط على النشر:**
   ```bash
   vercel --prod
   ```

### الخطوة 4: التحقق من النشر

1. **تحقق من URL:**
   - Vercel سيعطيك رابط الموقع
   - اختبره في متصفح جديد

2. **اختبر النموذج:**
   - ملأ النموذج ببيانات اختبار
   - اضغط "Submit"
   - تحقق من البيانات وصلت في Supabase

3. **شغّل Google Lighthouse:**
   - فتح DevTools (F12)
   - اختر Lighthouse
   - اختر "Analyze page load"
   - شوف النتائج

## 🔄 تحديث الموقع المنشور

بعد كل تغيير في الكود:

1. **التغيير + الحفظ:**
   ```bash
   git add .
   git commit -m "تحديث: وصف التغييرات"
   git push
   ```

2. **Vercel سيعيد النشر تلقائياً:**
   - سيكتشف التغيير تلقائياً
   - سينشر النسخة الجديدة

## 🆘 مشاكل شائعة

### المشكلة: "VITE_SUPABASE_URL is not defined"

**الحل:**
- تأكد من إضافة متغيرات البيئة على Vercel Dashboard
- متغيرات البيئة يجب أن تبدأ بـ `VITE_`
- أعد النشر بعد إضافة المتغيرات

### المشكلة: البناء فشل بخطأ "terser not found"

**الحل:**
- تم إصلاحه في `vite.config.ts` - يستخدم `esbuild` الآن
- امسح `node_modules` و أعد التثبيت

### المشكلة: النموذج لا يحفظ البيانات

**الحل:**
- تحقق من Supabase URL و API Key
- تأكد من تفعيل الإدراج في قاعدة البيانات
- تحقق من RLS policies

### المشكلة: الموقع بطيء جداً

**الحل:**
- تحقق من Core Web Vitals في Lighthouse
- تأكد من استخدام `minify: 'esbuild'` في vite.config.ts
- تقليل حجم الصور
- استخدام CDN للموارد الثقيلة

## 📊 مراقبة الأداء

1. **على Vercel:**
   - اذهب إلى Project Dashboard
   - شوف Analytics
   - راقب الأخطاء والأداء

2. **Google Analytics:**
   - أضف Google Analytics إلى الموقع (اختياري)

## 🎯 التالي

- [ ] تم النشر بنجاح
- [ ] اختبار الموقع
- [ ] إضافة نطاق مخصص (اختياري)
- [ ] إعداد SSL (تلقائي على Vercel)
- [ ] مراقبة الأداء

## 💡 نصائح إضافية

1. **استخدم عنوان مخصص:**
   - اذهب إلى Project Settings → Domains
   - أضف نطاقك الخاص

2. **سجل SSL تلقائي:**
   - Vercel يفعل هذا تلقائياً

3. **تحسين الأداء:**
   - استخدم Image Optimization
   - فعّل Caching

4. **النسخ الاحتياطية:**
   - استخدم GitHub كنسخة احتياطية

---

**لا تنسى:** كل تغيير في الكود على GitHub سيتم نشره تلقائياً! 🚀