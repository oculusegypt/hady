export function AdminPanel() {
  return (
    <div className="space-y-4">
      <div className="card">
        <h2 className="text-xl font-bold">لوحة الأدمن</h2>
        <p>الطلبات النشطة: 48 · إيراد اليوم: 32,400 جنيه · متوسط التقييم: 4.8</p>
      </div>
      <div className="card">
        <h3 className="font-bold">تنبيهات مباشرة</h3>
        <ul className="list-disc pr-6 text-sm">
          <li>طلب KH-22931 اتسلم للفني عمرو الخبير.</li>
          <li>تم تصعيد شكوى جودة لخدمة تنظيف المنزل.</li>
        </ul>
      </div>
    </div>
  );
}
