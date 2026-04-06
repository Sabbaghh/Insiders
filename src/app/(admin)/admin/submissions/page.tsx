"use client";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard } from "@/lib/admin/components";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  submittedAt: string;
  read: boolean;
};

export default function SubmissionsAdmin() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = () => {
    fetch("/api/admin/submissions")
      .then((r) => r.json())
      .then((d) => {
        setSubmissions(d.submissions || []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const markRead = async (id: string) => {
    await fetch("/api/admin/submissions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  const remove = async (id: string) => {
    await fetch("/api/admin/submissions", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  };

  if (loading) return <p className="text-[#888]">Loading...</p>;

  return (
    <div>
      <h1 className="text-white text-[24px] font-semibold mb-8">
        Contact Submissions ({submissions.length})
      </h1>
      {submissions.length === 0 ? (
        <p className="text-[#666]">No submissions yet</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div
              key={s.id}
              className={`bg-[#111] border rounded-xl p-5 cursor-pointer transition-colors ${
                s.read ? "border-[#222]" : "border-[#E02379]/30"
              }`}
              onClick={() => {
                setExpanded(expanded === s.id ? null : s.id);
                if (!s.read) markRead(s.id);
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    {!s.read && <span className="w-[8px] h-[8px] rounded-full bg-[#E02379]" />}
                    <p className="text-white text-[15px] font-medium">{s.name}</p>
                  </div>
                  <p className="text-[#888] text-[13px] mt-1">{s.subject}</p>
                </div>
                <p className="text-[#666] text-[12px]">
                  {new Date(s.submittedAt).toLocaleDateString()}
                </p>
              </div>
              {expanded === s.id && (
                <div className="mt-4 pt-4 border-t border-[#222] space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-[13px]">
                    <div>
                      <span className="text-[#888]">Email: </span>
                      <span className="text-white">{s.email}</span>
                    </div>
                    <div>
                      <span className="text-[#888]">Phone: </span>
                      <span className="text-white">{s.phone || "N/A"}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#888] text-[12px] mb-1">Message:</p>
                    <p className="text-white text-[14px] leading-[1.6]">{s.message}</p>
                  </div>
                  <AdminButton variant="danger" onClick={(e: any) => { e?.stopPropagation(); remove(s.id); }}>
                    Delete
                  </AdminButton>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
