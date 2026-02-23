'use client';

import { useState } from "react";

export function AuthLocationCard() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [address, setAddress] = useState("مدينة نصر - القاهرة");

  return (
    <div className="card space-y-2">
      <h3 className="font-bold">تسجيل موبايل + OTP (محاكاة Supabase)</h3>
      <input className="w-full rounded-xl border p-2" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="01xxxxxxxxx" />
      <div className="flex gap-2">
        <input className="flex-1 rounded-xl border p-2" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="OTP" />
        <button className="rounded-xl bg-brand px-3 py-2 text-white" onClick={() => setVerified(otp.length >= 4)}>
          تأكيد
        </button>
      </div>
      <p className="text-sm">الحالة: {verified ? "مفعل ✅" : "في انتظار التفعيل"}</p>
      <h4 className="font-semibold">الموقع (GPS + يدوي) - OSM/Leaflet Placeholder</h4>
      <input className="w-full rounded-xl border p-2" value={address} onChange={(e) => setAddress(e.target.value)} />
      <div className="rounded-xl border p-3 text-sm">📍 الخريطة التفاعلية تتوصل هنا بـ Leaflet + OpenStreetMap.</div>
    </div>
  );
}
