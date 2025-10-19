# 🗄️ دليل إعداد Supabase

دليل كامل لإعداد Supabase والجداول المطلوبة للمشروع.

---

## ✅ الخطوات الأساسية

### 1. إنشاء حساب Supabase

1. اذهب إلى [supabase.com](https://supabase.com)
2. اضغط "Start your project"
3. اختر "Sign up"
4. استخدم GitHub أو البريد الإلكتروني

### 2. إنشاء Project جديد

1. اضغط "New Project"
2. املأ البيانات:
   - **Name**: أي اسم (مثل: dot-studio)
   - **Database Password**: كلمة مرور قوية
   - **Region**: اختر الأقرب لك (مثل: Frankfurt)
3. اضغط "Create new project"
4. انتظر 2-3 دقائق

### 3. الحصول على المفاتيح

بعد الانتهاء:

1. اذهب إلى "Settings" → "API"
2. انسخ:
   - **Project URL**: `https://...supabase.co`
   - **anon public**: `eyJ...` (مفتاح عام)

أضفهما إلى `.env.local`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

---

## 🗂️ إنشاء جداول قاعدة البيانات

### الجدول الأساسي: leads

اذهب إلى "SQL Editor" واختر "New Query"

ثم انسخ واللصق الكود التالي:

```sql
-- إنشاء جدول leads
CREATE TABLE IF NOT EXISTS leads (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::TEXT, NOW()),
  UNIQUE(phone_number)
);

-- إنشاء index للبحث السريع
CREATE INDEX IF NOT EXISTS idx_leads_phone ON leads(phone_number);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);

-- تفعيل RLS (صرامة الوصول)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- سياسة الإدراج: السماح للجميع بإدخال بيانات
CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT 
  WITH CHECK (TRUE);

-- سياسة القراءة: السماح للمستخدمين المصرح لهم فقط
CREATE POLICY "Enable select for authenticated users" ON leads
  FOR SELECT 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- سياسة التحديث: السماح للـ service_role فقط
CREATE POLICY "Enable update for service role" ON leads
  FOR UPDATE 
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- سياسة الحذف: السماح للـ service_role فقط
CREATE POLICY "Enable delete for service_role" ON leads
  FOR DELETE 
  USING (auth.role() = 'service_role');
```

اضغط "Run" ✅

---

## 🔑 إضافة سياسات Row Level Security (RLS)

RLS مفعل بالفعل في الـ SQL أعلاه، لكن يمكنك إدارته:

1. اذهب إلى "SQL Editor"
2. اختر جدول "leads"
3. اضغط "Enable RLS"
4. أضف السياسات من القائمة

---

## 🌐 إعدادات CORS

للسماح لتطبيقك بالاتصال من أي مكان:

1. اذهب إلى "Settings" → "API"
2. اذهب إلى "CORS"
3. أضف الرابط:
   - تطوير محلي: `http://localhost:5173`
   - إنتاج: `https://your-vercel-domain.vercel.app`

```
Allowed origins:
- http://localhost:5173
- http://localhost:3000
- https://your-vercel-domain.vercel.app
```

---

## 📞 إعداد WhatsApp OTP (Edge Function)

### إنشاء Edge Function

1. اذهب إلى "Functions"
2. اضغط "Create a new function"
3. اختر "send-whatsapp-otp"
4. الصق الكود التالي:

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  // CORS headers
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
      },
    });
  }

  try {
    const { phoneNumber, otpCode } = await req.json();
    
    if (req.url.endsWith('/send')) {
      // توليد كود OTP عشوائي (في التطوير)
      const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
      
      console.log(`OTP for ${phoneNumber}: ${generatedOTP}`);
      
      // في الإنتاج: أرسل عبر WhatsApp API
      // await sendWhatsAppOTP(phoneNumber, generatedOTP);
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'OTP sent successfully',
          devOTP: generatedOTP, // للتطوير فقط
        }),
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    } else if (req.url.endsWith('/verify')) {
      // تحقق من OTP
      // في الإنتاج: تحقق من قاعدة البيانات
      
      return new Response(
        JSON.stringify({
          success: true,
          message: 'OTP verified successfully',
        }),
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
```

5. اضغط "Deploy"

---

## 🧪 الاختبار المحلي

### 1. اختبر الاتصال

أضف هذا في console (F12):

```javascript
// استورد Supabase
const { createClient } = supabase;

// أنشئ عميل
const client = createClient('YOUR_URL', 'YOUR_KEY');

// اختبر الاتصال
client.from('leads').select().limit(1).then(console.log);
```

### 2. اختبر الإدراج

```javascript
const { data, error } = await client.from('leads').insert([
  {
    first_name: 'أحمد',
    last_name: 'محمد',
    phone_number: '+966501234567',
    email: 'ahmed@example.com',
    business_name: 'عيادتي',
    business_field: 'طبيب',
    city: 'الرياض',
    is_verified: false,
  }
]);

console.log(data, error);
```

---

## 🔐 متغيرات البيئة على Vercel

بعد إنشاء الجداول على Supabase:

1. اذهب إلى Vercel Dashboard
2. اختر Project
3. اذهب إلى "Settings" → "Environment Variables"
4. أضف:

```
Key: VITE_SUPABASE_URL
Value: https://your-project.supabase.co

Key: VITE_SUPABASE_ANON_KEY
Value: your-anon-key-here
```

5. **أهم شيء:** أعد النشر بعد إضافة المتغيرات!

---

## 📊 مراقبة البيانات

### عرض البيانات المُدخلة

1. اذهب إلى Supabase Dashboard
2. اختر "Table Editor"
3. اختر "leads"
4. شوف جميع البيانات المُدخلة

### الاستعلام المتقدم

استخدم SQL Editor:

```sql
-- عرض عدد الرسائل من كل مدينة
SELECT city, COUNT(*) as count FROM leads GROUP BY city;

-- عرض آخر 10 رسائل
SELECT * FROM leads ORDER BY created_at DESC LIMIT 10;

-- عرض رسائل اليوم
SELECT * FROM leads 
WHERE DATE(created_at) = CURRENT_DATE
ORDER BY created_at DESC;

-- عرض رسائل موثقة فقط
SELECT * FROM leads WHERE is_verified = TRUE;
```

---

## 🆘 مشاكل شائعة

### المشكلة: "401 Unauthorized"

**الحل:**
- تأكد من API Key صحيح
- تحقق من CORS settings
- تأكد من متغيرات البيئة

### المشكلة: "Table does not exist"

**الحل:**
- تأكد من تشغيل SQL query للإنشاء
- تحقق من اسم الجدول (leads)
- أعد تحميل الصفحة

### المشكلة: "Row Level Security violation"

**الحل:**
```sql
-- تحقق من السياسات
SELECT * FROM pg_policies WHERE tablename = 'leads';

-- أعد السياسات
DROP POLICY IF EXISTS "Enable insert for all users" ON leads;

CREATE POLICY "Enable insert for all users" ON leads
  FOR INSERT WITH CHECK (TRUE);
```

### المشكلة: "Duplicate phone_number"

**الحل:**
- تأكد من أن رقم الهاتف فريد
- أضف تحقق من البيانات قبل الإدراج
- أو اسمح بالتحديث بدلاً من الإدراج المتكرر

---

## 🎯 الخطوات التالية

- [ ] إنشاء حساب Supabase
- [ ] إنشاء project جديد
- [ ] نسخ URL و API Key
- [ ] إنشاء جدول `leads`
- [ ] إضافة RLS policies
- [ ] اختبار الاتصال محلياً
- [ ] إضافة متغيرات البيئة على Vercel
- [ ] اختبار على الموقع المنشور

---

## 📚 موارد إضافية

- [Supabase Documentation](https://supabase.com/docs)
- [SQL Reference](https://supabase.com/docs/guides/sql)
- [RLS Policies](https://supabase.com/docs/guides/auth#policies)
- [Edge Functions](https://supabase.com/docs/guides/functions)

---

**ملاحظة مهمة:** احفظ API Key في مكان آمن ولا تشاركه مع أحد! 🔐