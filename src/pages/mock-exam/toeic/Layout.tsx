import type { ReactNode } from "react";

interface LayoutProps {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}

export default function Layout({ header, footer, children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-100 text-slate-800 lg:h-screen">
      {header}
      <main className="flex min-h-0 flex-1 flex-col p-3 sm:p-5 lg:p-6">{children}</main>
      {footer}
    </div>
  );
}
