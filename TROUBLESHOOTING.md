# تشخيص المشاكل - Troubleshooting

## 🔍 المشاكل الشائعة وحلولها

### 1. ❌ "Missing Supabase environment variables" عند الفتح

**المشكلة:** رسالة خطأ تقول أن متغيرات البيئة مفقودة

**الحلول:**
- ✅ تحقق من أن `.env` موجود بمتغيرات صحيحة محليًا
- ✅ على Vercel: اذهب إلى Settings → Environment Variables
- ✅ تأكد من أسماء المتغيرات بالضبط:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- ✅ بعد إضافة المتغيرات، أعد النشر (Redeploy)

---

### 2. ❌ التصميم مشوه أو ألوان غريبة

**المشكلة:** Tailwind CSS لا يعمل بشكل صحيح

**الحلول:**
- ✅ تأكد من بناء Vercel نجح: اذهب إلى Deployments → View Build Logs
- ✅ لا توجد أخطاء Build؟ امسح الـ cache: Settings → Git → Clear Build Cache
- ✅ أعد النشر (Redeploy)
- ✅ امسح الـ cache من المتصفح (Ctrl+Shift+Delete)

---

### 3. ❌ النموذج لا يعمل / لا يحفظ البيانات

**المشكلة:** عند الضغط على الزر لا يحدث شيء أو رسالة خطأ

**الحلول:**

**أولاً - فتّش Console:**
- اضغط F12 → Console
- شوف الأخطاء الحمراء

**إذا رأيت "Failed to fetch":**
- ✅ تأكد من Supabase URL صحيح
- ✅ تأكد من الاتصال بالإنترنت

**إذا رأيت خطأ من Supabase:**
- ✅ اذهب إلى Supabase Dashboard
- ✅ تحقق من أن جدول `form_submissions` موجود
- ✅ اذهب إلى Authentication → Policies → Row Level Security (RLS)
- ✅ تأكد من وجود Policy يسمح بـ INSERT بدون تسجيل دخول

**إذا لم تري جدول form_submissions:**
- اذهب إلى SQL Editor
- اتبع هذا الأمر:
```sql
CREATE TABLE IF NOT EXISTS form_submissions (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  whatsapp_number VARCHAR(20),
  company_name VARCHAR(255),
  website VARCHAR(255),
  email VARCHAR(255),
  instagram_link VARCHAR(255),
  telegram_link VARCHAR(255),
  whatsapp_link VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON form_submissions
  FOR INSERT WITH CHECK (true);
```

---

### 4. ❌ الصفحة تظهر بدون CSS على الهاتف

**المشكلة:** التصميم يعمل على الكمبيوتر لكن على الهاتف فقط النصوص

**الحلول:**
- ✅ امسح كل الـ cache والبيانات من المتصفح
- ✅ استخدم Incognito Tab (Tab خاص)
- ✅ حاول متصفح مختلف
- ✅ تحقق من أن viewport meta tag موجود في `index.html`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

---

### 5. ❌ عرض سريع: لكن بعد شوية بيتوقف

**المشكلة:** الموقع يعمل أول مرة لكن بعد دقيقة بيصير بطيء

**الحلول:**
- ✅ قد يكون Vercel Function بطيء → تحتاج خطة مدفوعة
- ✅ اختبر البناء محليًا:
```bash
npm run build
npm run preview
```
- ✅ إذا كان سريع محليًا → المشكلة من Vercel Infrastructure

---

### 6. ❌ Vercel يقول "Build Failed"

**الحل السريع:**
1. اضغط على الـ Deployment الفاشل
2. اضغط Logs لترى الأخطاء
3. الأخطاء الشائعة:
   - `npm install` فشل → تحقق من `package.json`
   - TypeScript errors → استخدم `npm run typecheck` محليًا
   - Missing files → تحقق من `.gitignore`

**اختبار محليًا أولاً:**
```bash
npm install
npm run build
npm run preview
```

---

### 7. ❌ الأيقونات من lucide-react لا تظهر

**الحل:**
- تحقق من أن lucide-react مثبت: `npm ls lucide-react`
- أعد البناء: `npm run build`
- امسح الـ cache: `Ctrl+Shift+Delete`

---

## 🔧 اختبار سريع قبل النشر

قبل ما تضغط Deploy على Vercel، اختبر محليًا:

```bash
# 1. التأكد من التثبيت
npm install

# 2. التحقق من الأخطاء
npm run typecheck

# 3. البناء للإنتاج
npm run build

# 4. المعاينة
npm run preview
```

إذا كل هذا اشتغل بدون أخطاء → يجب يشتغل على Vercel ✅

---

## 📞 معلومات إضافية

### Links مفيدة:
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

### أوامر مفيدة:
```bash
# مسح cache و reinstall
rm -r node_modules package-lock.json
npm install

# تنظيف dist
rm -r dist

# Build مع verbose للأخطاء المفصلة
npm run build -- --debug
```

---

**نصيحة:** احفظ رابط Vercel Deployment Logs، قد تحتاجه للتشخيص!