'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDemoStore } from "@/lib/stores/demo-store";

export function DemoModeSwitch() {
  const pathname = usePathname();
  const { role, setRole, darkMode, toggleDark } = useDemoStore();

  return (
    <div className="flex items-center gap-2">
      <Link href={role === "customer" ? "/provider" : "/customer"}>
        <button
          className="rounded-xl bg-brand px-3 py-2 text-sm font-semibold text-white"
          onClick={() => setRole(role === "customer" ? "provider" : "customer")}
        >
          {role === "customer" ? "حوّل لفني" : "حوّل لعميل"}
        </button>
      </Link>
      <button className="rounded-xl border px-3 py-2 text-sm" onClick={toggleDark}>
        {darkMode ? "نهاري" : "ليلي"}
      </button>
      <span className="text-xs text-slate-500">{pathname}</span>
    </div>
  );
}
