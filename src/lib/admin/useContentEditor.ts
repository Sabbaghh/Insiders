"use client";
import { useState, useEffect, useCallback } from "react";

export function useContentEditor(filePath: string) {
  const [data, setData] = useState<any>(null);
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch(`/api/admin/content?file=${encodeURIComponent(filePath)}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d.data);
        setContent(d.content || "");
        setLoading(false);
      })
      .catch(() => {
        setMessage({ type: "error", text: "Failed to load content" });
        setLoading(false);
      });
  }, [filePath]);

  const save = useCallback(
    async (newData: any, newContent?: string) => {
      setSaving(true);
      setMessage(null);
      try {
        const res = await fetch("/api/admin/content", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            file: filePath,
            data: newData,
            content: newContent ?? content,
          }),
        });
        if (res.ok) {
          setData(newData);
          setMessage({ type: "success", text: "Saved successfully" });
        } else {
          setMessage({ type: "error", text: "Failed to save" });
        }
      } catch {
        setMessage({ type: "error", text: "Failed to save" });
      }
      setSaving(false);
    },
    [filePath, content]
  );

  return { data, content, loading, saving, message, save, setData, setContent };
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);

  const upload = async (file: File, folder: string): Promise<string | null> => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      setUploading(false);
      return data.path || null;
    } catch {
      setUploading(false);
      return null;
    }
  };

  return { upload, uploading };
}
