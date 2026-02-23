import "./globals.css";
import type { Metadata } from "next";
import { DemoModeSwitch } from "@/components/common/demo-mode-switch";

export const metadata: Metadata = {
  title: "Khidmati خدماتي",
  description: "منصة خدمات منزلية ذكية باللهجة المصرية"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
          <div className="mx-auto flex max-w-6xl items-center justify-between p-4">
            <h1 className="text-lg font-bold">🚀 خدماتي Khidmati</h1>
            <DemoModeSwitch />
          </div>
        </header>
        <main className="mx-auto max-w-6xl p-4">{children}</main>
      </body>
    </html>
  );
}
