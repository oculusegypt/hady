# معاينة المشروع محليًا (Troubleshooting)

لو ظهر خطأ `403 Forbidden` أثناء `npm install` من `registry.npmjs.org` فده معناه إن بيئة التشغيل نفسها عليها سياسة أمنية مانعة تنزيل الحزم.

## الحل على جهازك المحلي
1. تأكد إن npm registry الافتراضي شغال:
   - `npm config set registry https://registry.npmjs.org/`
2. احذف أي proxy policy غير مطلوب.
3. شغل:
   - `npm install`
   - `npm run dev`
4. افتح:
   - `http://localhost:3000`

## ملاحظات
- الكود نفسه جاهز للتشغيل، والعطل بيكون من الشبكة/السياسات في البيئة الحالية.
- لو عندك mirror داخلي للشركة، استخدمه بدل npmjs مباشرة.
