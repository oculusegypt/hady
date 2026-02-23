import { ServiceName } from "@/lib/services";

export type PricingRule = {
  baseFee: number;
  perHour: number;
  extras: Record<string, number>;
};

export const pricingRules: Record<ServiceName, PricingRule> = {
  "تنظيف المنزل": { baseFee: 180, perHour: 90, extras: { "تنظيف عميق": 150, "مستلزمات علينا": 70, "عدد 2 عامل": 120 } },
  "سباكة": { baseFee: 220, perHour: 120, extras: { "تغيير خلاط": 180, "تسليك صرف": 140, "زيارة ليلية": 100 } },
  "كهرباء": { baseFee: 230, perHour: 130, extras: { "تركيب نجف": 160, "زيادة نقاط": 90, "فحص شامل": 150 } },
  "صيانة مكيفات": { baseFee: 260, perHour: 160, extras: { "شحن فريون": 300, "غسيل شامل": 190, "تغيير حساس": 240 } },
  "دهان وديكور": { baseFee: 300, perHour: 180, extras: { "دهان مقاوم رطوبة": 250, "معجون": 140, "تصميم لون": 100 } },
  "نجارة وتركيب أثاث": { baseFee: 250, perHour: 150, extras: { "تركيب غرفة": 280, "فك وتركيب": 220, "قطع خشب": 130 } },
  "مكافحة حشرات": { baseFee: 280, perHour: 120, extras: { "مكافحة بق": 350, "ضمان 3 شهور": 200, "مادة مستوردة": 240 } },
  "صيانة أجهزة منزلية": { baseFee: 240, perHour: 140, extras: { "كشف غسالة": 180, "كشف ثلاجة": 180, "قطع غيار": 260 } },
  "أعمال يدوية عامة (فني متعدد المهارات)": { baseFee: 210, perHour: 110, extras: { "تركيب ستارة": 80, "تعليق شاشة": 170, "صيانة باب": 150 } },
  "تنظيف سجاد وكنب وستائر": { baseFee: 260, perHour: 135, extras: { "سجاد كبير": 140, "كنبة ركنة": 180, "تعقيم": 120 } }
};

export function calculateLivePrice(service: ServiceName, hours: number, selectedExtras: string[]) {
  const rule = pricingRules[service];
  const extrasTotal = selectedExtras.reduce((sum, item) => sum + (rule.extras[item] ?? 0), 0);
  return rule.baseFee + rule.perHour * hours + extrasTotal;
}
