"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminField, AdminButton, AdminMessage, AdminCard } from "@/lib/admin/components";

export default function TestimonialsAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/testimonial/branding-testimonial.mdx");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  const updateTestimonial = (index: number, key: string, value: any) => {
    const list = [...data.testimonial_list];
    if (key.startsWith("author.")) {
      const authorKey = key.replace("author.", "");
      list[index] = { ...list[index], author: { ...list[index].author, [authorKey]: value } };
    } else {
      list[index] = { ...list[index], [key]: value };
    }
    setData({ ...data, testimonial_list: list });
  };

  const addTestimonial = () => {
    setData({
      ...data,
      testimonial_list: [
        ...data.testimonial_list,
        { icon: "/assets/imgs/icon/icon-s-15.png", text: "", author: { name: "", post: "", publisher: { logo: { light: "", dark: "" } } } },
      ],
    });
  };

  const removeTestimonial = (index: number) => {
    const list = data.testimonial_list.filter((_: any, i: number) => i !== index);
    setData({ ...data, testimonial_list: list });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Testimonials</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save All</AdminButton>
        </div>
      </div>
      <AdminCard title="Section">
        <AdminField label="Title" value={data.title} onChange={(v) => setData({ ...data, title: v })} />
      </AdminCard>
      <div className="mt-6 space-y-4">
        {data.testimonial_list?.map((t: any, i: number) => (
          <AdminCard key={i} title={`Testimonial ${i + 1}`}>
            <div className="space-y-4">
              <AdminField label="Quote (use {text} for highlighted words)" value={t.text} onChange={(v) => updateTestimonial(i, "text", v)} rows={3} />
              <div className="grid grid-cols-2 gap-4">
                <AdminField label="Author Name" value={t.author?.name || ""} onChange={(v) => updateTestimonial(i, "author.name", v)} />
                <AdminField label="Author Title" value={t.author?.post || ""} onChange={(v) => updateTestimonial(i, "author.post", v)} />
              </div>
              <AdminButton variant="danger" onClick={() => removeTestimonial(i)}>Remove</AdminButton>
            </div>
          </AdminCard>
        ))}
        <AdminButton variant="secondary" onClick={addTestimonial}>Add Testimonial</AdminButton>
      </div>
    </div>
  );
}
