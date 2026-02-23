'use client';

import { useMemo, useState } from "react";
import { SERVICES } from "@/lib/services";
import { VoiceSearch } from "@/components/customer/voice-search";
import { SmartChatbot } from "@/components/chat/smart-chatbot";
import { TrackingPanel } from "@/components/customer/tracking";
import { AuthLocationCard } from "@/components/customer/auth-location";

export function CustomerHome() {
  const [query, setQuery] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const filtered = useMemo(
    () => SERVICES.filter((service) => service.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  return (
    <div className="space-y-4">
      <AuthLocationCard />
      <div className="card">
        <h2 className="mb-2 text-xl font-bold">إزيك يا باشا 👋</h2>
        <p className="mb-3 text-sm text-slate-500">سجّل بالموبايل + OTP، حدد موقعك، وقولي محتاج إيه النهاردة.</p>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="دور على الخدمة..."
          className="w-full rounded-xl border p-3"
        />
        <VoiceSearch onResult={setQuery} />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((service) => (
          <button key={service} className="card text-right hover:border-brand" onClick={() => setSelectedService(service)}>
            <h3 className="font-bold">{service}</h3>
            <p className="text-sm text-slate-500">اضغط عشان تفتح الشات الذكي فورًا</p>
          </button>
        ))}
      </div>
      {selectedService && <SmartChatbot service={selectedService as any} onClose={() => setSelectedService(null)} />}
      <TrackingPanel />
    </div>
  );
}
