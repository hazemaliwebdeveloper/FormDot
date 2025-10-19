# 📁 هيكل المشروع

شرح شامل لهيكل ومكونات المشروع.

---

## 🗂️ البنية الأساسية

```
project/
├── src/
│   ├── components/           # مكونات React
│   │   ├── Logo.tsx
│   │   ├── RegistrationForm.tsx
│   │   └── LandingPage.tsx
│   ├── services/             # خدمات التطبيق
│   │   ├── supabase.ts       # تهيئة Supabase
│   │   ├── leadService.ts    # حفظ البيانات
│   │   └── otpService.ts     # خدمة OTP والـ WhatsApp
│   ├── types/                # أنواع TypeScript
│   │   └── lead.ts           # تعريف LeadFormData
│   ├── lib/                  # مكتبات
│   │   └── supabase.ts
│   ├── App.tsx               # المكون الرئيسي
│   ├── main.tsx              # نقطة الدخول
│   ├── index.css             # التصاميم العامة
│   └── vite-env.d.ts         # تعريفات Vite
├── supabase/                 # ملفات Supabase
│   └── migrations/           # هجرات قاعدة البيانات
├── public/                   # ملفات عامة
│   └── robots.txt
├── vite.config.ts            # إعدادات Vite
├── tailwind.config.js        # إعدادات Tailwind
├── postcss.config.js         # إعدادات PostCSS
├── tsconfig.json             # إعدادات TypeScript
├── package.json              # المكتبات المطلوبة
├── .env.example              # نموذج المتغيرات
├── .env.local.example        # نموذج البيئة المحلية
├── .gitignore                # ملفات Git المستثناة
├── .vercelignore             # ملفات Vercel المستثناة
├── vercel.json               # إعدادات Vercel
├── README.md                 # الوثائق الرئيسية
├── SETUP.md                  # دليل الإعداد السريع
├── DEPLOYMENT.md             # دليل النشر
├── TROUBLESHOOTING.md        # حل المشاكل
├── PRE-DEPLOYMENT-CHECKLIST.md
├── PERFORMANCE-TIPS.md
└── PROJECT-STRUCTURE.md      # هذا الملف
```

---

## 📦 المكونات (Components)

### Logo.tsx
- عرض شعار Dot Studio
- استخدام lucide-react (Code2 icon)
- تأثيرات بصرية باستخدام Tailwind

### RegistrationForm.tsx
- نموذج التسجيل الرئيسي
- مراحل: form → OTP → success
- التحقق من البيانات
- إرسال OTP عبر WhatsApp
- حفظ البيانات في Supabase

### LandingPage.tsx
- الصفحة الرئيسية (إن وجدت)

---

## 🔧 الخدمات (Services)

### supabase.ts
```typescript
// تهيئة عميل Supabase
// استخدام متغيرات البيئة:
// - VITE_SUPABASE_URL
// - VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key);
```

### leadService.ts
```typescript
// حفظ بيانات العميل في جدول 'leads'
// الأعمدة:
// - first_name
// - last_name
// - phone_number
// - email
// - business_name
// - business_field
// - city
// - website_url (اختياري)
// - instagram_url (اختياري)
// - youtube_url (اختياري)
// - tiktok_url (اختياري)
// - snapchat_url (اختياري)
// - is_verified

await saveLead(formData);
```

### otpService.ts
```typescript
// إرسال OTP عبر WhatsApp
// استخدام Supabase Edge Functions

// Step 1: إرسال OTP
const result = await sendOTP(phoneNumber);
// يعيد: { success, message, devOTP? }

// Step 2: التحقق من OTP
const verification = await verifyOTP(phoneNumber, otpCode);
// يعيد: { success, message }
```

---

## 📝 الأنواع (Types)

### lead.ts
```typescript
interface LeadFormData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  businessName: string;
  businessField: string;
  city: string;
  websiteUrl?: string;
  instagramUrl?: string;
  youtubeUrl?: string;
  tiktokUrl?: string;
  snapchatUrl?: string;
}

interface OTPVerification {
  phoneNumber: string;
  otpCode: string;
}
```

---

## 🗄️ قاعدة البيانات (Supabase)

### جدول `leads`
```sql
CREATE TABLE leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL,
  business_name TEXT NOT NULL,
  business_field TEXT NOT NULL,
  city TEXT NOT NULL,
  website_url TEXT,
  instagram_url TEXT,
  youtube_url TEXT,
  tiktok_url TEXT,
  snapchat_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW())
);
```

### Row Level Security (RLS)
```sql
-- السماح للجميع بالإدراج (إضافة بيانات جديدة)
CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT WITH CHECK (TRUE);

-- السماح للمستخدمين المصرح لهم بالقراءة
CREATE POLICY "Enable select for authenticated" ON leads
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## 🚀 Edge Functions (Supabase)

### send-whatsapp-otp
```
نقطة النهاية: {SUPABASE_URL}/functions/v1/send-whatsapp-otp

Methods:
- POST /send      → إرسال OTP
- POST /verify    → التحقق من OTP
```

---

## ⚙️ ملفات التكوين

### vite.config.ts
```typescript
// تكوين Vite:
// - منفذ التطوير: 5173
// - مجلد الإخراج: dist
// - تصغير: esbuild
// - استثناء lucide-react من optimization
```

### tailwind.config.js
```javascript
// تكوين Tailwind:
// - ملفات المحتوى: HTML, TSX, JSX
// - إزالة CSS غير المستخدمة تلقائياً
```

### tsconfig.json
```json
// تكوين TypeScript:
// - ECMAScript: ES2020
// - JSX: react-jsx
// - Strict mode مفعل
```

### package.json
```json
// المكتبات الأساسية:
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@supabase/supabase-js": "^2.57.4",
    "lucide-react": "^0.344.0"
  },
  "devDependencies": {
    "vite": "^5.4.2",
    "typescript": "^5.5.3",
    "tailwindcss": "^3.4.1",
    "@vitejs/plugin-react": "^4.3.1"
  }
}
```

---

## 📱 متغيرات البيئة

### متطلوبة (Required)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### اختيارية (Optional)
```env
# Analytics (إذا كنت تستخدم Google Analytics)
VITE_GA_ID=...

# الأخرى حسب احتياجاتك
```

---

## 🔄 سير العمل (Workflow)

### التطوير المحلي
```
1. npm install      → تثبيت المكتبات
2. npm run dev      → تشغيل التطبيق محلياً
3. التعديل والاختبار
4. npm run build    → بناء للإنتاج
5. git commit       → حفظ التغييرات
6. git push         → دفع إلى GitHub
```

### النشر على Vercel
```
1. git push إلى GitHub
2. Vercel يكتشف التغيير تلقائياً
3. Vercel يعيد البناء والنشر
4. الموقع الجديد متاح بدقائق
```

---

## 🎨 التصميم

### Tailwind CSS
- Mobile-first approach
- دعم RTL (Right-to-Left)
- Responsive design

### الألوان الأساسية
- Blue: من التصميم الأساسي
- Gradients: تأثيرات بصرية

### الأيقونات
- lucide-react: مكتبة أيقونات عصرية

---

## 📊 الأداء

### التحسينات المطبقة
- Code splitting مع Vite
- Minification مع esbuild
- CSS purging مع Tailwind
- Lazy loading للصور

### Core Web Vitals الأهداف
- FCP: < 1.5s
- LCP: < 2.5s
- CLS: < 0.1

---

## 🔐 الأمان

### متغيرات البيئة
- لا تُخزن في الكود
- تُحفظ فقط في `.env.local` و `.env`
- تُستثنى من Git (في `.gitignore`)

### Supabase Security
- استخدام anon key (آمن للعملاء)
- Row Level Security (RLS) مفعل
- سياسات الوصول محددة بوضوح

---

## 📈 المراقبة

### Vercel Dashboard
- Analytics
- Deployments
- Logs

### Supabase Console
- Database queries
- API usage
- Errors

---

## 🆘 استكشاف الأخطاء

### المشاكل الشائعة
1. **خطأ متغيرات البيئة**: راجع TROUBLESHOOTING.md
2. **فشل البناء**: تحقق من الأخطاء في Vercel logs
3. **مشاكل Supabase**: تحقق من الاتصال والأذونات

---

## 📚 الموارد

- [دليل الإعداد السريع](./SETUP.md)
- [دليل النشر](./DEPLOYMENT.md)
- [حل المشاكل](./TROUBLESHOOTING.md)
- [قائمة التحقق](./PRE-DEPLOYMENT-CHECKLIST.md)
- [تحسين الأداء](./PERFORMANCE-TIPS.md)

---

**ملاحظة:** هذا الملف يوضح البنية الحالية. تم تصميم المشروع ليكون قابلاً للتوسع بسهولة! 🚀