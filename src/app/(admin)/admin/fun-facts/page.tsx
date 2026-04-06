"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminField, AdminButton, AdminMessage, AdminCard } from "@/lib/admin/components";

export default function FunFactsAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/funFact/branding-fun-fact.mdx");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Fun Facts</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save</AdminButton>
        </div>
      </div>
      <AdminCard title="Section Title">
        <AdminField label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
      </AdminCard>
      <p className="text-[#666] text-[13px] mt-4">Note: The stat numbers are configured in the component code. Contact your developer to change them.</p>
    </div>
  );
}
