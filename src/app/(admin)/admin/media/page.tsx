"use client";
import { useEffect, useState } from "react";
import { AdminButton } from "@/lib/admin/components";

export default function MediaAdmin() {
  const [images, setImages] = useState<{ path: string; folder: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [folder, setFolder] = useState("general");

  const load = () => {
    fetch("/api/admin/upload")
      .then((r) => r.json())
      .then((d) => {
        setImages(d.images || []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    await fetch("/api/admin/upload", { method: "POST", body: formData });
    setUploading(false);
    load();
  };

  const folders = Array.from(new Set(images.map((i) => i.folder).filter(Boolean)));

  if (loading) return <p className="text-[#888]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Media Library</h1>
        <div className="flex items-center gap-3">
          <select
            value={folder}
            onChange={(e) => setFolder(e.target.value)}
            className="bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-2 text-white text-[13px] outline-none"
          >
            <option value="general">general</option>
            <option value="team">team</option>
            <option value="process">process</option>
            <option value="works">works</option>
          </select>
          <label className={`${uploading ? "opacity-50" : ""} bg-[#E02379] hover:bg-[#B92786] text-white rounded-lg px-5 py-[10px] text-[13px] font-medium cursor-pointer transition-colors uppercase tracking-wide`}>
            {uploading ? "Uploading..." : "Upload"}
            <input type="file" accept="image/*" onChange={handleUpload} className="hidden" disabled={uploading} />
          </label>
        </div>
      </div>

      {folders.map((f) => (
        <div key={f} className="mb-8">
          <h2 className="text-[#888] text-[13px] uppercase tracking-wide mb-3">{f || "root"}</h2>
          <div className="grid grid-cols-4 xl:grid-cols-6 gap-3">
            {images
              .filter((i) => i.folder === f)
              .map((img) => (
                <div key={img.path} className="bg-[#111] border border-[#222] rounded-lg overflow-hidden group relative">
                  <img src={img.path} alt={img.name} className="w-full aspect-square object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-[10px] text-white truncate">{img.name}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}
