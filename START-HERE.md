# 🚀 ابدأ من هنا!

## ⚡ 3 خطوات فقط للنشر على Vercel

---

## 1️⃣ الإعداد المحلي (5 دقائق)

```bash
# 1. نسخ متغيرات البيئة
cp .env.example .env.local

# 2. ملء البيانات
# افتح .env.local وأضف:
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=your-anon-key-here

# 3. تثبيت المكتبات
npm install

# 4. تشغيل محلياً
npm run dev
# الموقع على: http://localhost:5173 ✅
```

---

## 2️⃣ إعداد Supabase (10 دقائق)

**اتبع [SUPABASE-SETUP.md](./SUPABASE-SETUP.md)** لـ:
- ✅ إنشاء project على Supabase
- ✅ إنشاء جدول `leads`
- ✅ نسخ URL و API Key

---

## 3️⃣ النشر على Vercel (3 دقائق)

```bash
# 1. دفع إلى GitHub
git add -A
git commit -m "Deploy: Project ready"
git push

# 2. اذهب إلى vercel.com
# 3. اختر "New Project"
# 4. اختر GitHub repository
# 5. أضف متغيرات البيئة:
#    - VITE_SUPABASE_URL
#    - VITE_SUPABASE_ANON_KEY
# 6. اضغط "Deploy"
```

**تم! الموقع مباشر بدقائق! 🎉**

---

## 📖 الدليل الكامل

| المرحلة | الملف | الوقت |
|--------|------|-------|
| البدء السريع | [SETUP.md](./SETUP.md) | 5 دقائق |
| تفاصيل النشر | [DEPLOYMENT.md](./DEPLOYMENT.md) | 20 دقيقة |
| إعداد قاعدة البيانات | [SUPABASE-SETUP.md](./SUPABASE-SETUP.md) | 15 دقيقة |
| حل المشاكل | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | عند الحاجة |
| قائمة التحقق | [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md) | 10 دقائق |
| تحسين الأداء | [PERFORMANCE-TIPS.md](./PERFORMANCE-TIPS.md) | اختياري |
| فهم البنية | [PROJECT-STRUCTURE.md](./PROJECT-STRUCTURE.md) | اختياري |

---

## ⚠️ الأخطاء الشائعة

### "VITE_SUPABASE_URL is not defined"
❌ **السبب:** متغيرات البيئة غير محددة
✅ **الحل:** أضفها على Vercel Dashboard → Settings → Environment Variables

### "terser not found" (خطأ البناء)
❌ **السبب:** Vite يحتاج terser
✅ **الحل:** تم إصلاحه - يستخدم `esbuild` الآن

### النموذج لا يحفظ البيانات
❌ **السبب:** مشكلة في Supabase
✅ **الحل:** تحقق من [SUPABASE-SETUP.md](./SUPABASE-SETUP.md)

---

## 🎯 الخطوات التالية

- [ ] اقرأ [SETUP.md](./SETUP.md)
- [ ] أعدّ Supabase من [SUPABASE-SETUP.md](./SUPABASE-SETUP.md)
- [ ] اتبع [DEPLOYMENT.md](./DEPLOYMENT.md)
- [ ] تحقق من [PRE-DEPLOYMENT-CHECKLIST.md](./PRE-DEPLOYMENT-CHECKLIST.md)
- [ ] انشر على Vercel
- [ ] اختبر الموقع
- [ ] راقب الأداء

---

## 🆘 مساعدة فوراً

🔴 **هناك مشكلة؟**
→ اقرأ [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

🟡 **تحتاج للتفاصيل؟**
→ اقرأ [DEPLOYMENT.md](./DEPLOYMENT.md)

🟢 **كل شيء بخير؟**
→ ابدأ بـ `npm run dev`

---

## 📞 الملفات المهمة

```
المشروع
├── .env.local              ← ضع بيانات Supabase هنا (لا تشارك!)
├── vite.config.ts          ← إعدادات Vite ✅ محسّن
├── vercel.json             ← إعدادات Vercel ✅
├── package.json            ← المكتبات المطلوبة
├── SETUP.md                ← ابدأ هنا
├── DEPLOYMENT.md           ← النشر المفصل
└── TROUBLESHOOTING.md      ← حل المشاكل
```

---

## ✨ جاهز؟

اكتب الأمر التالي وابدأ:

```bash
npm run dev
```

**موفق! 🚀**

---

**هل تحتاج المزيد من المساعدة؟**
→ شوف ملف README.md الشامل

**هل تريد فهم البنية الكاملة؟**
→ اقرأ PROJECT-STRUCTURE.md

**جاهز للنشر الفوري؟**
→ اتبع DEPLOYMENT.md

---

**آخر تحديث:** الآن
**الحالة:** ✅ جاهز 100%
**الإصدار:** 1.0.0 Production-Ready