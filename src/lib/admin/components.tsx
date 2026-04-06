"use client";

export function AdminField({ label, value, onChange, type = "text", rows }: {
  label: string; value: string; onChange: (v: string) => void; type?: string; rows?: number;
}) {
  return (
    <div>
      <label className="block text-[12px] uppercase tracking-wide text-[#888] mb-2">{label}</label>
      {rows ? (
        <textarea
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white text-[14px] outline-none focus:border-[#E02379] transition-colors resize-y"
        />
      ) : (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white text-[14px] outline-none focus:border-[#E02379] transition-colors"
        />
      )}
    </div>
  );
}

export function AdminButton({ children, onClick, loading, variant = "primary" }: {
  children: React.ReactNode; onClick?: () => void; loading?: boolean; variant?: "primary" | "secondary" | "danger";
}) {
  const colors = {
    primary: "bg-[#E02379] hover:bg-[#B92786]",
    secondary: "bg-[#333] hover:bg-[#444]",
    danger: "bg-red-600 hover:bg-red-700",
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${colors[variant]} text-white rounded-lg px-5 py-[10px] text-[13px] font-medium transition-colors disabled:opacity-50 uppercase tracking-wide`}
    >
      {loading ? "Saving..." : children}
    </button>
  );
}

export function AdminMessage({ message }: { message: { type: "success" | "error"; text: string } | null }) {
  if (!message) return null;
  return (
    <p className={`text-[13px] ${message.type === "success" ? "text-green-400" : "text-[#E02379]"}`}>
      {message.text}
    </p>
  );
}

export function AdminCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-6">
      <h2 className="text-white text-[18px] font-semibold mb-5">{title}</h2>
      {children}
    </div>
  );
}

export function ImageUploadField({ label, value, onChange, folder }: {
  label: string; value: string; onChange: (v: string) => void; folder: string;
}) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.path) onChange(data.path);
  };

  return (
    <div>
      <label className="block text-[12px] uppercase tracking-wide text-[#888] mb-2">{label}</label>
      <div className="flex gap-3 items-center">
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-[#1a1a1a] border border-[#333] rounded-lg px-4 py-3 text-white text-[14px] outline-none focus:border-[#E02379] transition-colors"
          placeholder="/assets/imgs/..."
        />
        <label className="bg-[#333] hover:bg-[#444] text-white rounded-lg px-4 py-3 text-[13px] cursor-pointer transition-colors">
          Upload
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>
      {value && (
        <img src={value} alt="" className="mt-2 h-[60px] rounded object-cover" />
      )}
    </div>
  );
}
