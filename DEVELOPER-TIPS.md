# 💡 نصائح المطورين السريعة

نصائح عملية لتطوير واختبار وتطوير المشروع بكفاءة.

---

## 🏃 أوامر مهمة

### التطوير المحلي
```bash
npm run dev              # تشغيل محلياً على 5173
npm run build            # بناء للإنتاج
npm run preview          # معاينة البناء محلياً
```

### فحوصات الجودة
```bash
npm run typecheck        # فحص أخطاء TypeScript
npm run lint             # فحص مشاكل الكود
npm run lint -- --fix    # إصلاح تلقائي
```

### Git
```bash
git status              # حالة التغييرات
git diff                # الفروقات
git log --oneline       # سجل التعديلات
git stash               # حفظ مؤقت للتغييرات
```

---

## 🧪 الاختبار المحلي

### 1. فتح DevTools
```
F12 أو Ctrl+Shift+I (Windows)
```

### 2. فحص الأخطاء
```javascript
// Console tab
// شوف الأخطاء الحمراء
```

### 3. فحص الشبكة
```javascript
// Network tab
// شوف الطلبات والاستجابات
// قيّم بطء التحميل
```

### 4. اختبر الوظائف
```javascript
// تجربة يدوية للنموذج
// ملء البيانات والإرسال
// تحقق من Supabase
```

---

## 🔍 تصحيح المشاكل

### المشكلة: الموقع لا يحمل
```bash
# 1. امسح الـ cache
Ctrl+Shift+Delete

# 2. أعد تحميل الصفحة
F5

# 3. جرب Hard Refresh
Ctrl+F5 (Windows)
Cmd+Shift+R (Mac)
```

### المشكلة: التحديثات لا تظهر
```bash
# 1. اوقف الخادم
Ctrl+C

# 2. امسح node_modules
rm -r node_modules

# 3. أعد التثبيت
npm install

# 4. شغّل مرة أخرى
npm run dev
```

### المشكلة: أخطاء TypeScript
```bash
# افتح ملف الخطأ
npm run typecheck

# اقرأ رسالة الخطأ بعناية
# غالباً تقول المشكلة بوضوح
```

---

## 📱 الاختبار على الجوال

### في متصفح المتطور
```
F12 → Toggle Device Toolbar (Ctrl+Shift+M)
→ اختر الجهاز (iPhone, iPad, etc)
```

### على جهاز حقيقي
```bash
# اكتشف IP المحلي
ipconfig getifaddr en0  # Mac
ipconfig              # Windows

# اتصل من الجوال
http://your-ip:5173
```

---

## 🚀 نصائح الأداء

### تقليل حجم Bundles
```typescript
// ❌ سيء: استيراد كل شيء
import * as lodash from 'lodash';

// ✅ جيد: استيراد محدد
import { debounce } from 'lodash';
```

### Lazy Loading
```typescript
// استخدم React.lazy لـ Heavy Components
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => 
  import('./HeavyComponent')
);

// استخدم مع Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### الصور
```jsx
// استخدم WebP بدلاً من JPG
<img src="image.webp" loading="lazy" alt="" />

// أو استخدم picture element
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="" />
</picture>
```

---

## 🐛 Debugging Tips

### استخدم console.log بذكاء
```javascript
// ❌ سيء
console.log(data);

// ✅ جيد
console.log('Form data:', data);
console.table(data);  // جدول أفضل
```

### استخدم Debugger
```javascript
// أضف في الكود
debugger;

// ثم F12 سيتوقف عندها
// استكشف المتغيرات والحالة
```

### تتبع الأخطاء
```javascript
try {
  // الكود الذي قد يفشل
} catch (error) {
  console.error('Error:', error);
  console.error('Stack:', error.stack);
}
```

---

## 📦 إدارة المكتبات

### تحديث المكتبات
```bash
# شوف المكتبات القديمة
npm outdated

# حدّث بأمان
npm update

# أو حدّث يدوياً
npm install package-name@latest
```

### إزالة مكتبات غير مستخدمة
```bash
# ابحث عن البرامج المثبتة غير المستخدمة
npm prune
```

---

## 🔒 الأمان

### لا تنسى المفاتيس السرية!
```
❌ لا تضع في الكود:
- API Keys
- Passwords
- Secret Tokens

✅ استخدم .env.local:
VITE_API_KEY=...
```

### تحقق من Dependencies
```bash
# ابحث عن مكتبات بها ثغرات أمان
npm audit

# أصلح المشاكل تلقائياً
npm audit fix
```

---

## 📝 الكود الجيد

### Naming Convention
```typescript
// ✅ أسماء واضحة
const userEmail = getUserEmail();
const isFormValid = validateForm();

// ❌ أسماء غير واضحة
const ue = getUE();
const v = validate();
```

### Comments
```typescript
// ✅ اكتب ماذا ولماذا
// تحقق من البريد الإلكتروني
const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// ❌ لا حاجة لـ obvious comments
const x = 5; // خمسة
```

### Error Handling
```typescript
try {
  await saveLead(formData);
  showSuccess('تم الحفظ بنجاح');
} catch (error) {
  console.error(error);
  showError('فشل الحفظ');
}
```

---

## 🎨 التصميم

### Tailwind Tips
```jsx
// استخدم responsive classes
<div className="text-sm md:text-base lg:text-lg">
  
// استخدم dark mode إن أمكن
<div className="bg-white dark:bg-gray-900">

// استخدم المتغيرات
<div className="hover:shadow-lg transition-all duration-300">
```

### إزالة CSS غير المستخدمة
```javascript
// tailwind.config.js يقوم بهذا تلقائياً
// لكن تأكد من أن جميع الملفات مدرجة

content: [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
  // أضف أي مجلدات أخرى هنا
],
```

---

## 🔄 Git Workflow

### أفضل ممارسات
```bash
# 1. أنشئ branch جديد للميزة
git checkout -b feature/amazing-feature

# 2. اعمل وعدّل الملفات
# 3. أضف التغييرات المرحلية
git add .

# 4. احفظ برسالة واضحة
git commit -m "Add: amazing feature with benefits"

# 5. ارجع للـ main
git checkout main

# 6. ادمج التغييرات
git merge feature/amazing-feature

# 7. ادفع إلى البعيد
git push origin main
```

### رسائل Commit جيدة
```
❌ سيء:
- "fixed bug"
- "update"
- "asdfgh"

✅ جيد:
- "Fix: form validation error on email field"
- "Add: responsive design for mobile"
- "Update: dependencies to latest version"
- "Refactor: extract logo to separate component"
```

---

## 📊 الاختبار

### اختبر كل شيء محلياً أولاً
```bash
# قبل البناء
npm run typecheck

# قبل الدفع
npm run build
npm run preview

# قبل النشر
تحقق من CHECKLIST
```

### اختبر على أجهزة مختلفة
- ✅ Desktop (Large screen)
- ✅ Tablet (Medium screen)
- ✅ Mobile (Small screen)
- ✅ Different browsers

---

## ⏱️ نصائح الإنتاجية

### استخدم VS Code Extensions
```
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Prettier
- Thunder Client (API testing)
```

### Shortcuts مهمة
```
Ctrl+Shift+P     → Command Palette
Ctrl+P           → Quick File Open
Ctrl+F           → Find
Ctrl+H           → Find & Replace
Ctrl+/           → Comment
Alt+Up/Down      → Move Line
```

### Multi-Cursor
```
Ctrl+D           → Select word
Ctrl+Shift+L     → Select all occurrences
Alt+Click        → Multiple cursors
```

---

## 🎯 قائمة التحقق اليومية

- [ ] شغّل `npm run typecheck` - لا يوجد أخطاء
- [ ] شغّل `npm run lint` - لا توجد تحذيرات
- [ ] اختبر محلياً - كل شيء يعمل
- [ ] جرّب على الموبايل - مستجيب
- [ ] اختبر الأداء - Lighthouse > 80
- [ ] اكتب رسالة commit واضحة
- [ ] ادفع إلى GitHub
- [ ] تحقق من Vercel deployment

---

## 🆘 موارد سريعة

| المشكلة | الحل |
|--------|------|
| الموقع بطيء | شوف PERFORMANCE-TIPS.md |
| مشكلة في البناء | اقرأ Vercel logs |
| بيانات لا تُحفظ | تحقق من Supabase RLS |
| أخطاء TypeScript | اقرأ الرسالة بعناية |
| Git مشاكل | ابحث عن الحل في Google |

---

**تذكر:** الكود الجيد يوفر الوقت لاحقاً! 💪

استمتع بالتطوير! 🚀