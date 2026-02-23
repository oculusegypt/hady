import { ServiceName } from "@/lib/services";

export type ChatStep = "greeting" | "details" | "photos" | "pricing" | "providers" | "confirm" | "handover";

export type ChatState = {
  service: ServiceName;
  step: ChatStep;
  hours: number;
  extras: string[];
  photos: string[];
};

export const initialChatState = (service: ServiceName): ChatState => ({
  service,
  step: "greeting",
  hours: 1,
  extras: [],
  photos: []
});

export function nextStep(step: ChatStep): ChatStep {
  const order: ChatStep[] = ["greeting", "details", "photos", "pricing", "providers", "confirm", "handover"];
  const idx = order.indexOf(step);
  return order[Math.min(order.length - 1, idx + 1)];
}
