"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Hero", href: "/admin/hero" },
  { label: "Fun Facts", href: "/admin/fun-facts" },
  { label: "Clients", href: "/admin/clients" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Team", href: "/admin/team" },
  { label: "Process", href: "/admin/process" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "CTA", href: "/admin/cta" },
  { label: "Site Config", href: "/admin/site-config" },
  { label: "Submissions", href: "/admin/submissions" },
  { label: "Media", href: "/admin/media" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("/api/auth/check")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated && pathname !== "/admin/login") {
          router.push("/admin/login");
        } else {
          setAuthenticated(d.authenticated);
        }
      });
  }, [pathname, router]);

  // Login page — no shell
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <p className="text-[#6D6E71]">Loading...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#111] border-r border-[#222] flex flex-col fixed h-screen">
        <div className="px-5 py-6 border-b border-[#222]">
          <Link href="/admin" className="text-white text-[18px] font-semibold tracking-tight">
            INSIDERS CMS
          </Link>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-5 py-[10px] text-[13px] uppercase tracking-wide transition-colors ${
                pathname === item.href
                  ? "text-[#E02379] bg-[#E023790D]"
                  : "text-[#888] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-[#222]">
          <button
            onClick={handleLogout}
            className="text-[#666] text-[13px] hover:text-[#E02379] transition-colors uppercase tracking-wide"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-[220px] p-8">{children}</main>
    </div>
  );
}
