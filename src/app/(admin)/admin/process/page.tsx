"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminField, AdminButton, AdminMessage, AdminCard, ImageUploadField } from "@/lib/admin/components";

export default function ProcessAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/process/branding-process.mdx");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  const updateStep = (index: number, key: string, value: string) => {
    const list = [...data.process_list];
    list[index] = { ...list[index], [key]: value };
    setData({ ...data, process_list: list });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Process Steps</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save All</AdminButton>
        </div>
      </div>
      <AdminCard title="Section Title">
        <AdminField label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
      </AdminCard>
      <div className="mt-6 space-y-4">
        {data.process_list?.map((step: any, i: number) => (
          <AdminCard key={i} title={`Step ${step.serial_no}`}>
            <div className="space-y-4">
              <AdminField label="Title" value={step.title} onChange={(v) => updateStep(i, "title", v)} />
              <AdminField label="Subtitle" value={step.subtitle || ""} onChange={(v) => updateStep(i, "subtitle", v)} />
              <AdminField label="Description" value={step.description || ""} onChange={(v) => updateStep(i, "description", v)} rows={3} />
              <ImageUploadField label="Image" value={step.image} onChange={(v) => updateStep(i, "image", v)} folder="process" />
            </div>
          </AdminCard>
        ))}
      </div>
    </div>
  );
}
