"use client";
import { useEffect, useState } from "react";
import { AdminButton, AdminCard, AdminField, AdminMessage, ImageUploadField } from "@/lib/admin/components";

type Project = {
  file: string;
  data: any;
  content: string;
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [creating, setCreating] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    image: "",
    date: "",
    tags: "",
    client: "",
    gallery: [] as string[],
    description: "",
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const res = await fetch("/api/admin/content");
    const d = await res.json();
    const workFiles = d.mdx.filter(
      (f: string) =>
        f.startsWith("/works/branding/") &&
        !f.includes("_index") &&
        !f.includes("_main")
    );

    const loaded: Project[] = [];
    for (const file of workFiles) {
      const r = await fetch(`/api/admin/content?file=${encodeURIComponent(file)}`);
      const c = await r.json();
      if (c.data) loaded.push({ file, data: c.data, content: c.content || "" });
    }
    loaded.sort((a, b) => (a.data.id || 0) - (b.data.id || 0));
    setProjects(loaded);
    setLoading(false);
  };

  const startEdit = (p: Project) => {
    setEditing(p.file);
    setEditData({
      ...p.data,
      tags: p.data.tags || [],
      gallery: p.data.gallery || [],
    });
    setEditContent(p.content);
    setMessage(null);
  };

  const saveProject = async () => {
    if (!editing || !editData) return;
    setSaving(true);
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: editing, data: editData, content: editContent }),
    });
    if (res.ok) {
      setMessage({ type: "success", text: "Saved" });
      setEditing(null);
      loadProjects();
    } else {
      setMessage({ type: "error", text: "Failed to save" });
    }
    setSaving(false);
  };

  const createProject = async () => {
    if (!newProject.title) return;
    setSaving(true);
    const slug = newProject.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/-+$/, "");
    const maxId = Math.max(0, ...projects.map((p) => p.data.id || 0));
    const data = {
      draft: false,
      id: maxId + 1,
      title: newProject.title,
      image: newProject.image || "/assets/imgs/works/img-s-31.jpg",
      date: newProject.date,
      tags: newProject.tags
        .split(",")
        .map((t: string) => t.trim())
        .filter(Boolean),
      client: newProject.client,
      gallery: newProject.gallery,
      action_btn: { enable: false, label: "", link: "" },
      meta: {
        meta_title: `${newProject.title} - INSIDERS Tourism`,
        meta_description: newProject.description,
      },
    };

    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: `/works/branding/${slug}.mdx`,
        data,
        content: newProject.description
          ? `### ${newProject.title}\n\n${newProject.description}`
          : "",
      }),
    });

    if (res.ok) {
      setMessage({ type: "success", text: "Project created" });
      setCreating(false);
      setNewProject({ title: "", image: "", date: "", tags: "", client: "", gallery: [], description: "" });
      loadProjects();
    } else {
      setMessage({ type: "error", text: "Failed to create" });
    }
    setSaving(false);
  };

  const addGalleryImage = (isNew: boolean) => {
    if (isNew) {
      setNewProject({ ...newProject, gallery: [...newProject.gallery, ""] });
    } else if (editData) {
      setEditData({ ...editData, gallery: [...(editData.gallery || []), ""] });
    }
  };

  const updateGalleryImage = (index: number, value: string, isNew: boolean) => {
    if (isNew) {
      const g = [...newProject.gallery];
      g[index] = value;
      setNewProject({ ...newProject, gallery: g });
    } else if (editData) {
      const g = [...(editData.gallery || [])];
      g[index] = value;
      setEditData({ ...editData, gallery: g });
    }
  };

  const removeGalleryImage = (index: number, isNew: boolean) => {
    if (isNew) {
      setNewProject({ ...newProject, gallery: newProject.gallery.filter((_, i) => i !== index) });
    } else if (editData) {
      setEditData({ ...editData, gallery: (editData.gallery || []).filter((_: any, i: number) => i !== index) });
    }
  };

  if (loading) return <p className="text-[#888]">Loading...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-white text-[24px] font-semibold">Projects ({projects.length})</h1>
        <div className="flex items-center gap-4">
          <AdminMessage message={message} />
          <AdminButton onClick={() => { setCreating(true); setEditing(null); }}>New Project</AdminButton>
        </div>
      </div>

      {/* Create new project */}
      {creating && (
        <AdminCard title="New Project">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <AdminField label="Title" value={newProject.title} onChange={(v) => setNewProject({ ...newProject, title: v })} />
              <AdminField label="Client" value={newProject.client} onChange={(v) => setNewProject({ ...newProject, client: v })} />
              <AdminField label="Date" value={newProject.date} onChange={(v) => setNewProject({ ...newProject, date: v })} />
              <AdminField label="Tags (comma separated)" value={newProject.tags} onChange={(v) => setNewProject({ ...newProject, tags: v })} />
            </div>
            <ImageUploadField label="Cover Image" value={newProject.image} onChange={(v) => setNewProject({ ...newProject, image: v })} folder="works" />
            <AdminField label="Description" value={newProject.description} onChange={(v) => setNewProject({ ...newProject, description: v })} rows={3} />

            {/* Gallery */}
            <div>
              <label className="block text-[12px] uppercase tracking-wide text-[#888] mb-3">Gallery Images</label>
              <div className="space-y-3">
                {newProject.gallery.map((img, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="flex-1">
                      <ImageUploadField label={`Image ${i + 1}`} value={img} onChange={(v) => updateGalleryImage(i, v, true)} folder="works" />
                    </div>
                    <button onClick={() => removeGalleryImage(i, true)} className="text-red-400 text-[12px] mt-7 hover:text-red-300">Remove</button>
                  </div>
                ))}
                <AdminButton variant="secondary" onClick={() => addGalleryImage(true)}>Add Image</AdminButton>
              </div>
            </div>

            <div className="flex gap-3">
              <AdminButton onClick={createProject} loading={saving}>Create</AdminButton>
              <AdminButton variant="secondary" onClick={() => setCreating(false)}>Cancel</AdminButton>
            </div>
          </div>
        </AdminCard>
      )}

      {/* Project list */}
      <div className="mt-6 space-y-3">
        {projects.map((p) => (
          <div key={p.file} className="bg-[#111] border border-[#222] rounded-xl p-5">
            {editing === p.file ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <AdminField label="Title" value={editData.title} onChange={(v) => setEditData({ ...editData, title: v })} />
                  <AdminField label="Client" value={editData.client || ""} onChange={(v) => setEditData({ ...editData, client: v })} />
                  <AdminField label="Date" value={editData.date || ""} onChange={(v) => setEditData({ ...editData, date: v })} />
                  <AdminField label="Tags (comma separated)" value={(editData.tags || []).join(", ")} onChange={(v) => setEditData({ ...editData, tags: v.split(",").map((t: string) => t.trim()).filter(Boolean) })} />
                </div>
                <ImageUploadField label="Cover Image" value={editData.image} onChange={(v) => setEditData({ ...editData, image: v })} folder="works" />
                <AdminField label="Body Content (markdown)" value={editContent} onChange={(v) => setEditContent(v)} rows={5} />

                {/* Gallery */}
                <div>
                  <label className="block text-[12px] uppercase tracking-wide text-[#888] mb-3">Gallery Images</label>
                  <div className="space-y-3">
                    {(editData.gallery || []).map((img: string, i: number) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="flex-1">
                          <ImageUploadField label={`Image ${i + 1}`} value={img} onChange={(v) => updateGalleryImage(i, v, false)} folder="works" />
                        </div>
                        <button onClick={() => removeGalleryImage(i, false)} className="text-red-400 text-[12px] mt-7 hover:text-red-300">Remove</button>
                      </div>
                    ))}
                    <AdminButton variant="secondary" onClick={() => addGalleryImage(false)}>Add Image</AdminButton>
                  </div>
                </div>

                <div className="flex gap-3">
                  <AdminButton onClick={saveProject} loading={saving}>Save</AdminButton>
                  <AdminButton variant="secondary" onClick={() => setEditing(null)}>Cancel</AdminButton>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {p.data.image && <img src={p.data.image} className="w-[60px] h-[40px] rounded object-cover" alt="" />}
                  <div>
                    <p className="text-white text-[15px] font-medium">{p.data.title}</p>
                    <p className="text-[#888] text-[13px]">
                      {p.data.client} {p.data.date && `| ${p.data.date}`}
                      {p.data.gallery?.length > 0 && ` | ${p.data.gallery.length} gallery images`}
                    </p>
                  </div>
                </div>
                <AdminButton variant="secondary" onClick={() => startEdit(p)}>Edit</AdminButton>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
