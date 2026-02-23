import Link from "next/link";

export default function Page() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Link href="/customer" className="card hover:border-brand">
        <h2 className="text-xl font-bold">وضع العميل</h2>
        <p>ابدأ من تسجيل الدخول لحد تتبع الفني والدفع والتقييم.</p>
      </Link>
      <Link href="/provider" className="card hover:border-brand">
        <h2 className="text-xl font-bold">وضع الفني</h2>
        <p>استقبل الطلبات وكمّل نفس الشات مع العميل.</p>
      </Link>
      <Link href="/admin" className="card hover:border-brand">
        <h2 className="text-xl font-bold">وضع الأدمن</h2>
        <p>تابع الطلبات والأسعار ومؤشرات التشغيل.</p>
      </Link>
    </div>
  );
}
