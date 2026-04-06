"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminField, AdminButton, AdminMessage, AdminCard } from "@/lib/admin/components";

export default function SiteConfigAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/siteConfig.json");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  const updateFooter = (key: string, value: string) => {
    setData({ ...data, footer_info: { ...data.footer_info, [key]: value } });
  };

  const updateAddress = (key: string, value: string) => {
    setData({
      ...data,
      footer_info: { ...data.footer_info, address: { ...data.footer_info.address, [key]: value } },
    });
  };

  const updateSocial = (index: number, key: string, value: string) => {
    const social = [...data.social];
    social[index] = { ...social[index], [key]: value };
    setData({ ...data, social });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Site Config</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save</AdminButton>
        </div>
      </div>
      <div className="space-y-6">
        <AdminCard title="Contact Info">
          <div className="space-y-4">
            <AdminField label="Email" value={data.footer_info?.email || ""} onChange={(v) => updateFooter("email", v)} />
            <AdminField label="Phone" value={data.footer_info?.mobile || ""} onChange={(v) => updateFooter("mobile", v)} />
            <AdminField label="Address" value={data.footer_info?.address?.name || ""} onChange={(v) => updateAddress("name", v)} />
            <AdminField label="Address Link" value={data.footer_info?.address?.link || ""} onChange={(v) => updateAddress("link", v)} />
          </div>
        </AdminCard>
        <AdminCard title="Social Links">
          <div className="space-y-4">
            {data.social?.map((s: any, i: number) => (
              <div key={i} className="grid grid-cols-2 gap-4">
                <AdminField label={`Platform ${i + 1}`} value={s.name} onChange={(v) => updateSocial(i, "name", v)} />
                <AdminField label="URL" value={s.link} onChange={(v) => updateSocial(i, "link", v)} />
              </div>
            ))}
          </div>
        </AdminCard>
        <AdminCard title="SEO">
          <div className="space-y-4">
            <AdminField label="Meta Author" value={data.metadata?.meta_author || ""} onChange={(v) => setData({ ...data, metadata: { ...data.metadata, meta_author: v } })} />
            <AdminField label="Meta Description" value={data.metadata?.meta_description || ""} onChange={(v) => setData({ ...data, metadata: { ...data.metadata, meta_description: v } })} rows={2} />
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
