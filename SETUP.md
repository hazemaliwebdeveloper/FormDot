# 🚀 بدء التطبيق - دليل الإعداد السريع

دليل سريع لتشغيل المشروع محلياً أو على Vercel.

---

## ⚡ التثبيت السريع (5 دقائق)

### 1️⃣ استنساخ المشروع
```bash
git clone <your-repo-url>
cd project
```

### 2️⃣ تثبيت المكتبات
```bash
npm install
```

### 3️⃣ إعداد البيئة
```bash
cp .env.example .env.local
```

ثم عدّل `.env.local` وأضف:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4️⃣ تشغيل محلياً
```bash
npm run dev
```

سيفتح على: **http://localhost:5173** ✅

---

## 🌐 النشر على Vercel (3 دقائق)

### بدون CLI (الأسهل):

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط "New Project"
3. اختر repository من GitHub
4. اضغط "Import"
5. أضف Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
6. اضغط "Deploy"

✅ **تم!** سيكون لديك رابط مباشر بعد دقيقتين

---

## 📱 التحقق من الموقع

- [ ] الموقع يحمل بدون أخطاء
- [ ] الشعار واضح
- [ ] النموذج يعمل
- [ ] البيانات تُحفظ

---

## 🔗 الروابط المهمة

| الموارد | الرابط |
|--------|--------|
| دليل النشر التفصيلي | [DEPLOYMENT.md](./DEPLOYMENT.md) |
| حل المشاكل | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) |
| قائمة التحقق | [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) |
| تحسين الأداء | [PERFORMANCE-TIPS.md](./PERFORMANCE-TIPS.md) |

---

## ⚙️ الأوامر المهمة

```bash
# تطوير محلي
npm run dev

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview

# فحص الأخطاء
npm run typecheck

# فحص الكود
npm run lint
```

---

## 🆘 مشكلة سريعة؟

**الحل الأول:** امسح وأعد التثبيت
```bash
rm -r node_modules
rm package-lock.json
npm install
```

**الحل الثاني:** شوف [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

---

**مستعد؟** ابدأ الآن بـ `npm run dev`! 🚀