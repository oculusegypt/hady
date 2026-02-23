'use client';

import { useState } from "react";

const incoming = [
  { id: "KH-18291", service: "سباكة", area: "مدينة نصر", price: 420 },
  { id: "KH-22931", service: "كهرباء", area: "المعادي", price: 510 }
];

export function ProviderDashboard() {
  const [available, setAvailable] = useState(true);
  const [activeChat, setActiveChat] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="card flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">لوحة الفني</h2>
          <p className="text-sm text-slate-500">كمّل نفس الشات بعد التسليم من البوت</p>
        </div>
        <button onClick={() => setAvailable((v) => !v)} className="rounded-xl border px-4 py-2">
          {available ? "متاح ✅" : "غير متاح ⛔"}
        </button>
      </div>

      <div className="grid gap-3">
        {incoming.map((req) => (
          <div key={req.id} className="card flex items-center justify-between">
            <div>
              <p className="font-bold">{req.service} - {req.id}</p>
              <p className="text-sm">{req.area} · {req.price} جنيه</p>
            </div>
            <div className="flex gap-2">
              <button className="rounded-xl bg-green-600 px-3 py-2 text-white" onClick={() => setActiveChat(req.id)}>قبول</button>
              <button className="rounded-xl bg-red-600 px-3 py-2 text-white">رفض</button>
            </div>
          </div>
        ))}
      </div>

      {activeChat && (
        <div className="card">
          <h3 className="font-bold">شات مباشر للطلب {activeChat}</h3>
          <p>"أنا الفني يا باشا، وصلت خلال 15 دقيقة"</p>
          <input type="file" multiple className="my-2 w-full rounded-xl border p-2" />
          <div className="flex gap-2">
            <button className="rounded-xl border px-3 py-2">قبل التنفيذ</button>
            <button className="rounded-xl border px-3 py-2">بعد التنفيذ</button>
            <button className="rounded-xl bg-brand px-3 py-2 text-white">تحديث الحالة</button>
          </div>
        </div>
      )}
    </div>
  );
}
