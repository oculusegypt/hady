'use client';

import { useMemo, useState } from "react";
import { calculateLivePrice, pricingRules } from "@/lib/pricing";
import { ChatState, initialChatState, nextStep } from "@/lib/chat/state-machine";
import { ServiceName } from "@/lib/services";

type Message = { role: "bot" | "user" | "provider"; text: string };

const providers = [
  { name: "أحمد الفني", rating: 4.9, distance: "1.2 كم", photo: "👷", priceDelta: 0 },
  { name: "عمرو الخبير", rating: 4.8, distance: "2.1 كم", photo: "🧰", priceDelta: 35 },
  { name: "مصطفى السريع", rating: 4.7, distance: "2.7 كم", photo: "🔧", priceDelta: -20 }
];

export function SmartChatbot({ service, onClose }: { service: ServiceName; onClose: () => void }) {
  const [state, setState] = useState<ChatState>(initialChatState(service));
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "إزيك يا باشا، عايز إيه النهاردة؟ أنا معاك لحد ما نخلص الطلب تمام." }
  ]);
  const [input, setInput] = useState("");

  const livePrice = useMemo(() => calculateLivePrice(state.service, state.hours, state.extras), [state]);

  const send = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    const step = nextStep(state.step);
    setState((prev) => ({ ...prev, step }));
    const botText: Record<string, string> = {
      details: "تمام يا معلم، محتاج الخدمة كام ساعة تقريبًا؟",
      photos: "ابعتلي صور المشكلة من كذا زاوية عشان أسعّرك بدقة.",
      pricing: `تمام، السعر المبدئي دلوقتي ${livePrice} جنيه.`,
      providers: "لقيتلك أقرب 3 فنيين حوالين موقعك.",
      confirm: "لو تمام أكد الطلب وهطلعلك رقم أوردر فورًا.",
      handover: "جاري توصيلك بأقرب فني... خليك معايا يا معلم"
    };
    if (step !== "greeting") {
      setMessages((prev) => [...prev, { role: "bot", text: botText[step] }]);
    }
    setInput("");
  };

  const toggleExtra = (extra: string) => {
    setState((prev) => ({
      ...prev,
      extras: prev.extras.includes(extra) ? prev.extras.filter((x) => x !== extra) : [...prev.extras, extra]
    }));
  };

  return (
    <section className="fixed inset-0 z-50 bg-black/45 p-4">
      <div className="mx-auto h-full max-w-3xl rounded-2xl bg-white p-4 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-bold">شات {service}</h3>
          <button onClick={onClose}>إغلاق ✖</button>
        </div>

        <div className="mb-3 grid gap-2 md:grid-cols-3">
          <div className="card"><p>الخطوة الحالية: {state.step}</p></div>
          <div className="card"><p>سعر مباشر: {livePrice} جنيه</p></div>
          <div className="card"><p>رقم الطلب: KH-{Math.floor(10000 + livePrice)}</p></div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {Object.keys(pricingRules[service].extras).map((extra) => (
            <button key={extra} onClick={() => toggleExtra(extra)} className={`rounded-full border px-3 py-1 ${state.extras.includes(extra) ? "border-brand bg-blue-50" : ""}`}>
              {extra} (+{pricingRules[service].extras[extra]}ج)
            </button>
          ))}
        </div>

        <div className="h-72 space-y-2 overflow-y-auto rounded-xl border p-3">
          {messages.map((m, idx) => (
            <p key={idx} className={m.role === "user" ? "text-left" : "text-right"}>{m.text}</p>
          ))}
          {state.step === "providers" && (
            <div className="grid gap-2 md:grid-cols-3">
              {providers.map((p) => (
                <div key={p.name} className="card text-sm">
                  <p>{p.photo} {p.name}</p>
                  <p>⭐ {p.rating} · 📍 {p.distance}</p>
                  <p>السعر: {livePrice + p.priceDelta} جنيه</p>
                </div>
              ))}
            </div>
          )}
          {state.step === "handover" && <p className="text-green-600">الفني دخل نفس المحادثة: "أنا معاك يا باشا وجاي في الطريق"</p>}
        </div>

        <div className="mt-3 flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 rounded-xl border p-3" placeholder="اكتب رسالتك..." />
          <input type="file" multiple className="w-52 rounded-xl border p-2" />
          <button onClick={send} className="rounded-xl bg-brand px-4 text-white">إرسال</button>
        </div>
      </div>
    </section>
  );
}
