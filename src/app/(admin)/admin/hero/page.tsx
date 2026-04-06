"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminField, AdminButton, AdminMessage, AdminCard } from "@/lib/admin/components";

export default function HeroAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/heros/branding-hero.mdx");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  const update = (key: string, value: any) => setData({ ...data, [key]: value });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Hero Section</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save</AdminButton>
        </div>
      </div>
      <AdminCard title="Content">
        <div className="space-y-5">
          <AdminField label="Title (use <br> for line break)" value={data.title} onChange={(v) => update("title", v)} />
          <AdminField label="Subtitle" value={data.sub_title} onChange={(v) => update("sub_title", v)} />
          <AdminField label="Description" value={data.description} onChange={(v) => update("description", v)} rows={3} />
          <AdminField label="Video URL" value={data.video} onChange={(v) => update("video", v)} />
          <AdminField label="Button Label" value={data.action_btn?.label} onChange={(v) => update("action_btn", { ...data.action_btn, label: v })} />
          <AdminField label="Button Link" value={data.action_btn?.link} onChange={(v) => update("action_btn", { ...data.action_btn, link: v })} />
        </div>
      </AdminCard>
    </div>
  );
}
