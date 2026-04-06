"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminCard } from "@/lib/admin/components";

export default function AdminDashboard() {
  const [subCount, setSubCount] = useState(0);

  useEffect(() => {
    fetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((d) => setSubCount(d.submissions?.length || 0));
  }, []);

  const sections = [
    { label: "Hero Section", href: "/admin/hero", desc: "Title, description, video" },
    { label: "Fun Facts", href: "/admin/fun-facts", desc: "Stats and numbers" },
    { label: "Team", href: "/admin/team", desc: "Team members" },
    { label: "Process Steps", href: "/admin/process", desc: "The Insiders Passport" },
    { label: "Testimonials", href: "/admin/testimonials", desc: "Client quotes" },
    { label: "CTA Section", href: "/admin/cta", desc: "Call to action + form" },
    { label: "Site Config", href: "/admin/site-config", desc: "Contact info, social links" },
    { label: "Media Library", href: "/admin/media", desc: "Upload and manage images" },
  ];

  return (
    <div>
      <h1 className="text-white text-[24px] font-semibold mb-8">Dashboard</h1>
      <div className="mb-8">
        <Link href="/admin/submissions">
          <AdminCard title="Contact Submissions">
            <p className="text-[40px] font-semibold text-[#E02379]">{subCount}</p>
            <p className="text-[#888] text-[14px] mt-1">total submissions</p>
          </AdminCard>
        </Link>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {sections.map((s) => (
          <Link key={s.href} href={s.href}>
            <div className="bg-[#111] border border-[#222] rounded-xl p-5 hover:border-[#E02379] transition-colors h-full">
              <h3 className="text-white text-[15px] font-medium">{s.label}</h3>
              <p className="text-[#666] text-[13px] mt-1">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
