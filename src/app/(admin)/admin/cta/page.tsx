"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminField, AdminButton, AdminMessage, AdminCard } from "@/lib/admin/components";

export default function CtaAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/ctas/cta1.mdx");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">CTA Section</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save</AdminButton>
        </div>
      </div>
      <AdminCard title="Content">
        <div className="space-y-5">
          <AdminField label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
          <AdminField label="Subtitle" value={data.sub_title} onChange={(v) => setData({ ...data, sub_title: v })} />
        </div>
      </AdminCard>
    </div>
  );
}
