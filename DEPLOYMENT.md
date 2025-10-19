# دليل نشر التطبيق على Vercel

## المتطلبات
- حساب على [Vercel](https://vercel.com)
- حساب على [Supabase](https://supabase.com)
- Git و GitHub (أو GitLab / Bitbucket)

## خطوات النشر:

### 1. تحضير Supabase
- تأكد من أن لديك مشروع Supabase نشط
- احصل على:
  - `VITE_SUPABASE_URL` - رابط المشروع
  - `VITE_SUPABASE_ANON_KEY` - مفتاح API العلني

### 2. رفع المشروع على GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

### 3. نشر على Vercel
**الطريقة الأولى - من خلال الموقع:**
1. اذهب إلى https://vercel.com
2. اضغط "New Project"
3. اختر Repository من GitHub
4. اختر مشروعك
5. في "Environment Variables" أضف:
   - `VITE_SUPABASE_URL` = قيمتها
   - `VITE_SUPABASE_ANON_KEY` = قيمتها
6. اضغط "Deploy"

**الطريقة الثانية - من خلال CLI:**
```bash
npm install -g vercel
vercel
```

### 4. تكوين متغيرات البيئة على Vercel
1. اذهب إلى إعدادات المشروع
2. Project Settings → Environment Variables
3. أضف كل متغير:
   - الاسم: `VITE_SUPABASE_URL`
   - القيمة: رابط Supabase الخاص بك
4. كرر مع `VITE_SUPABASE_ANON_KEY`
5. اضغط "Deploy" أو انتظر التوزيع التلقائي

### 5. التحقق من التطبيق
- الرابط الخاص بك سيكون: `https://your-project.vercel.app`
- تحقق من أن:
  - التصميم يظهر بشكل صحيح
  - النموذج يعمل ويحفظ البيانات في Supabase
  - لا توجد رسائل خطأ في Console

## التشخيص

### إذا لم يظهر التصميم بشكل صحيح:
- تحقق من متغيرات البيئة في Vercel
- اذهب إلى Project Settings → Deployments وأعد النشر

### إذا كان النموذج لا يعمل:
- افتح أدوات الكشف F12 وانظر إلى Console
- تحقق من أن `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` موجودة
- تأكد من أن جداول Supabase موجودة: `form_submissions`
- تحقق من صلاحيات RLS على Supabase

### إذا استمرت المشاكل:
```bash
# اختبر البناء محليًا
npm run build
npm run preview
```

## تحديثات التطبيق
- كل push إلى `main` على GitHub سيؤدي لإعادة نشر تلقائية على Vercel
- يمكنك معاينة التغييرات قبل الدمج باستخدام Preview Deployments

## الملفات المهمة
- `.env` - متغيرات البيئة المحلية (لا تشاركها)
- `.env.example` - مثال على المتغيرات المطلوبة
- `vercel.json` - تكوين Vercel
- `vite.config.ts` - تكوين البناء
- `package.json` - المكتبات والبرامج