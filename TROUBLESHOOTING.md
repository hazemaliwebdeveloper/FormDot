# 🔧 دليل حل المشاكل

دليل شامل لحل المشاكل الشائعة في المشروع.

## 🚨 مشاكل النشر على Vercel

### ❌ "VITE_SUPABASE_URL is not defined" أو "VITE_SUPABASE_ANON_KEY is not defined"

**السبب:**
- متغيرات البيئة لم تُضف على Vercel Dashboard
- متغيرات البيئة لم تُعاد للعملاء بشكل صحيح

**الحل:**

1. **اذهب إلى Vercel Dashboard:**
   - اختر المشروع
   - اذهب إلى "Settings" → "Environment Variables"

2. **أضف المتغيرات:**
   ```
   Key: VITE_SUPABASE_URL
   Value: https://your-project.supabase.co
   
   Key: VITE_SUPABASE_ANON_KEY
   Value: your-anon-key-here
   ```

3. **أعد النشر:**
   - اذهب إلى "Deployments"
   - اضغط على آخر deployment
   - اضغط "Redeploy"

### ❌ "[vite:terser] terser not found"

**السبب:**
- Vite يحاول استخدام terser لكنه غير مثبت

**الحل (تم بالفعل):**
- تم تغيير `vite.config.ts` ليستخدم `esbuild` بدلاً من `terser`
- تأكد من التحديث بـ `git push`

### ❌ "404 Not Found" بعد النشر

**السبب:**
- المسار غير محدد بشكل صحيح
- ملفات عدم موجودة في الـ build

**الحل:**

1. **تحقق من البناء محلياً:**
   ```bash
   npm run build
   npm run preview
   ```

2. **تأكد من وجود `dist` folder:**
   ```bash
   ls dist/
   ```

3. **تحقق من `vite.config.ts`:**
   ```typescript
   build: {
     outDir: 'dist',  // تأكد من هذا
   }
   ```

### ❌ الموقع يُحمل ثم يصبح فارغاً

**السبب:**
- خطأ في JavaScript على Vercel
- متغيرات البيئة غير محملة

**الحل:**

1. **فتح DevTools:**
   - اضغط F12
   - انظر إلى Console tab
   - شوف الأخطاء

2. **تحقق من Network tab:**
   - هل الملفات تُحمّل؟
   - هل هناك أخطاء 404؟

3. **أعد بناء:**
   ```bash
   npm run build
   git push
   ```

---

## 🚨 مشاكل البيئة المحلية

### ❌ "Cannot find module 'react'" أو أخطاء تثبيت

**الحل:**

```bash
# امسح المشروع القديم
rm -r node_modules
rm package-lock.json

# أعد التثبيت
npm install

# تشغيل التطبيق
npm run dev
```

### ❌ ".env file not found"

**الحل:**

1. **انسخ ملف النموذج:**
   ```bash
   cp .env.example .env.local
   ```

2. **أضف بيانات Supabase:**
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **أعد تشغيل التطبيق:**
   ```bash
   npm run dev
   ```

### ❌ منفذ 5173 مستخدم بالفعل

**الحل:**

```bash
# اختر منفذ آخر
npm run dev -- --port 3000
```

---

## 🚨 مشاكل Supabase

### ❌ "Failed to connect to Supabase"

**الحل:**

1. **تحقق من الإنترنت:**
   - تأكد من وجود اتصال إنترنت

2. **تحقق من البيانات:**
   ```bash
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_ANON_KEY
   ```

3. **تحقق من Supabase status:**
   - اذهب إلى [status.supabase.com](https://status.supabase.com)

### ❌ "Permission denied" عند الإدراج

**السبب:**
- Row Level Security (RLS) مفعل لكن السياسات غير صحيحة

**الحل:**

1. **اذهب إلى Supabase Console:**
   - Select your project
   - Go to "SQL Editor"

2. **تحقق من السياسات:**
   ```sql
   -- شوف السياسات الحالية
   SELECT * FROM pg_policies WHERE tablename = 'form_submissions';
   ```

3. **أنشئ سياسة جديدة:**
   ```sql
   -- اسمح للجميع بالإدراج
   CREATE POLICY "Enable insert for all users" ON form_submissions
     FOR INSERT WITH CHECK (TRUE);
   ```

### ❌ البيانات لا تُحفظ في قاعدة البيانات

**الحل:**

1. **تحقق من اتصال Supabase:**
   ```javascript
   // في المتصفح console
   const { createClient } = require('@supabase/supabase-js');
   const supabase = createClient(URL, KEY);
   supabase.from('form_submissions').select().then(console.log);
   ```

2. **تحقق من جدول البيانات موجود:**
   - اذهب إلى Supabase → "Table Editor"
   - شوف `form_submissions` موجود

3. **تحقق من الأعمدة صحيحة:**
   - name, email, phone, company, project_description, budget

---

## 🚨 مشاكل التصميم والأداء

### ❌ Tailwind CSS لا يعمل / الألوان غير ظاهرة

**الحل:**

1. **تأكد من تثبيت Tailwind:**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. **تحقق من `tailwind.config.js`:**
   ```javascript
   module.exports = {
     content: [
       "./index.html",
       "./src/**/*.{js,ts,jsx,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

3. **تحقق من `index.css`:**
   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

### ❌ الأيقونات (lucide-react) لا تظهر

**الحل:**

1. **تثبيت lucide-react:**
   ```bash
   npm install lucide-react
   ```

2. **تحقق من الاستخدام:**
   ```jsx
   import { Sparkles } from 'lucide-react';
   <Sparkles className="w-6 h-6" />
   ```

3. **تحقق من تكوين Vite:**
   ```typescript
   optimizeDeps: {
     exclude: ['lucide-react'],
   }
   ```

### ❌ الموقع بطيء جداً

**الحل:**

1. **شغّل Google Lighthouse:**
   - اضغط F12
   - اذهب إلى "Lighthouse"
   - اختر "Analyze page load"

2. **حسّن الصور:**
   - استخدم صيغ عصرية (WebP)
   - قلل حجم الصور

3. **تحقق من الـ bundle size:**
   ```bash
   npm run build
   # شوف حجم dist/ folder
   ```

4. **استخدم Code Splitting:**
   - قسّم المكونات الكبيرة

---

## 🚨 مشاكل Git و GitHub

### ❌ "fatal: not a git repository"

**الحل:**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### ❌ "Permission denied (publickey)"

**الحل:**

1. **أنشئ SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your-email@example.com"
   ```

2. **أضفها إلى GitHub:**
   - اذهب إلى GitHub Settings
   - اختر "SSH and GPG keys"
   - أضف المفتاح الجديد

3. **جرب الاتصال:**
   ```bash
   ssh -T git@github.com
   ```

---

## 📊 قائمة التشخيص

قبل طلب المساعدة، تحقق من:

- [ ] Node.js الإصدار صحيح: `node --version` (يجب 16+)
- [ ] npm/yarn مثبت: `npm --version`
- [ ] git مثبت: `git --version`
- [ ] `npm install` يعمل بدون أخطاء
- [ ] `npm run dev` يعمل محلياً
- [ ] `npm run build` يعمل بنجاح
- [ ] `.env.local` موجود وبه البيانات الصحيحة
- [ ] Supabase project مُنشأ وبه جدول `form_submissions`
- [ ] GitHub repository مُنشأ و `git push` يعمل
- [ ] Vercel project مُنشأ ومتصل بـ GitHub
- [ ] متغيرات البيئة على Vercel صحيحة

---

## 💬 الحصول على مساعدة

إذا لم تجد الحل:

1. **شغّل DevTools (F12) وانسخ الأخطاء**
2. **تحقق من Supabase Dashboard للأخطاء**
3. **تحقق من Vercel Deployment Logs**
4. **جرب في متصفح مختلف**
5. **امسح cache و أعد المحاولة**

---

**ملاحظة:** معظم المشاكل سببها متغيرات البيئة المفقودة أو الخاطئة! 🔑