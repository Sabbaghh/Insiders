"use client";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminField, AdminMessage, ImageUploadField } from "@/lib/admin/components";
import { useContentEditor } from "@/lib/admin/useContentEditor";

type TeamMember = {
  file: string;
  data: any;
};

export default function TeamAdmin() {
  const sectionEditor = useContentEditor("/team/branding/_main.mdx");
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(async (d) => {
        const teamFiles = d.mdx.filter(
          (f: string) => f.startsWith("/team/main/") && !f.includes("_index") && !f.includes("oliver")
        );
        const loaded: TeamMember[] = [];
        for (const file of teamFiles) {
          const res = await fetch(`/api/admin/content?file=${encodeURIComponent(file)}`);
          const content = await res.json();
          if (content.data && !content.data.draft) {
            loaded.push({ file, data: content.data });
          }
        }
        loaded.sort((a, b) => (a.data.id || 0) - (b.data.id || 0));
        setMembers(loaded);
        setLoading(false);
      });
  }, []);

  const startEdit = (m: TeamMember) => {
    setEditing(m.file);
    setEditData({ ...m.data });
    setMessage(null);
  };

  const saveMember = async () => {
    if (!editing || !editData) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: editing, data: editData, content: "" }),
    });
    if (res.ok) {
      setMembers((prev) => prev.map((m) => (m.file === editing ? { ...m, data: editData } : m)));
      setMessage({ type: "success", text: "Saved" });
      setEditing(null);
    } else {
      setMessage({ type: "error", text: "Failed to save" });
    }
    setSaving(false);
  };

  if (loading || sectionEditor.loading) return <p className="text-[#888]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Team</h1>
        <AdminMessage message={message} />
      </div>

      {/* Section header */}
      <AdminCard title="Section Header">
        <div className="space-y-4">
          <AdminField label="Title" value={sectionEditor.data?.title || ""} onChange={(v) => sectionEditor.setData({ ...sectionEditor.data, title: v })} />
          <AdminField label="Description" value={sectionEditor.data?.text || ""} onChange={(v) => sectionEditor.setData({ ...sectionEditor.data, text: v })} rows={2} />
          <AdminButton onClick={() => sectionEditor.save(sectionEditor.data)} loading={sectionEditor.saving}>Save Header</AdminButton>
          <AdminMessage message={sectionEditor.message} />
        </div>
      </AdminCard>

      {/* Team members */}
      <div className="mt-6 space-y-4">
        {members.map((m) => (
          <div key={m.file} className="bg-[#111] border border-[#222] rounded-xl p-5">
            {editing === m.file ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <AdminField label="Name" value={editData.name} onChange={(v) => setEditData({ ...editData, name: v })} />
                  <AdminField label="Post" value={editData.post} onChange={(v) => setEditData({ ...editData, post: v })} />
                  <AdminField label="Nickname" value={editData.nickname || ""} onChange={(v) => setEditData({ ...editData, nickname: v })} />
                  <AdminField label="Social Link" value={editData.social_link || ""} onChange={(v) => setEditData({ ...editData, social_link: v })} />
                </div>
                <AdminField label="Description" value={editData.description} onChange={(v) => setEditData({ ...editData, description: v })} rows={4} />
                <ImageUploadField label="Avatar" value={editData.avatar} onChange={(v) => setEditData({ ...editData, avatar: v })} folder="team" />
                <div className="flex gap-3">
                  <AdminButton onClick={saveMember} loading={saving}>Save</AdminButton>
                  <AdminButton variant="secondary" onClick={() => setEditing(null)}>Cancel</AdminButton>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {m.data.avatar && <img src={m.data.avatar} className="w-[40px] h-[40px] rounded-full object-cover" alt="" />}
                  <div>
                    <p className="text-white text-[15px] font-medium">{m.data.name}</p>
                    <p className="text-[#888] text-[13px]">{m.data.post}</p>
                  </div>
                </div>
                <AdminButton variant="secondary" onClick={() => startEdit(m)}>Edit</AdminButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
