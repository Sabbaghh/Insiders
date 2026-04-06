"use client";
import { useContentEditor } from "@/lib/admin/useContentEditor";
import { AdminButton, AdminMessage, AdminCard, ImageUploadField } from "@/lib/admin/components";

export default function ClientsAdmin() {
  const { data, loading, saving, message, save, setData } = useContentEditor("/brands/brands1.mdx");

  if (loading) return <p className="text-[#888]">Loading...</p>;
  if (!data) return <p className="text-[#888]">Failed to load</p>;

  const updateBrand = (index: number, theme: "dark" | "light", value: string) => {
    const brands = [...data.brands];
    brands[index] = { ...brands[index], image: { ...brands[index].image, [theme]: value } };
    setData({ ...data, brands });
  };

  const addBrand = () => {
    setData({
      ...data,
      brands: [...data.brands, { image: { dark: "", light: "" } }],
    });
  };

  const removeBrand = (index: number) => {
    const brands = data.brands.filter((_: any, i: number) => i !== index);
    setData({ ...data, brands });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Client Logos</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => save(data)} loading={saving}>Save All</AdminButton>
        </div>
      </div>
      <div className="space-y-4">
        {data.brands?.map((brand: any, i: number) => (
          <AdminCard key={i} title={`Logo ${i + 1}`}>
            <div className="space-y-4">
              <ImageUploadField
                label="Dark Version (for light backgrounds)"
                value={brand.image.dark}
                onChange={(v) => updateBrand(i, "dark", v)}
                folder="brand"
              />
              <ImageUploadField
                label="Light Version (for dark backgrounds)"
                value={brand.image.light}
                onChange={(v) => updateBrand(i, "light", v)}
                folder="brand"
              />
              <AdminButton variant="danger" onClick={() => removeBrand(i)}>Remove</AdminButton>
            </div>
          </AdminCard>
        ))}
        <AdminButton variant="secondary" onClick={addBrand}>Add Logo</AdminButton>
      </div>
    </div>
  );
}
