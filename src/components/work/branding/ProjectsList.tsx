"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

type Project = {
  slug: string;
  title: string;
  image: string;
  date: string;
  client: string;
  venue: string;
  tags: string[];
};

const PAGE_SIZE = 6;

const ProjectsList = ({ projects }: { projects: Project[] }) => {
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return projects;
    const q = search.toLowerCase();
    return projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.date.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [projects, search]);

  // Reset visible count when search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search]);

  // Intersection observer for lazy loading
  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount < filtered.length) {
          setVisibleCount((c) => Math.min(c + PAGE_SIZE, filtered.length));
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [visibleCount, filtered.length]);

  const visible = filtered.slice(0, visibleCount);

  return (
    <div>
      {/* Search */}
      <div className="max-w-[560px] mb-[40px] xl:mb-[60px]">
        <div className="relative group">
          <div className="absolute inset-y-0 left-[20px] flex items-center pointer-events-none text-[#6D6E71] group-focus-within:text-[#E02379] transition-colors">
            <FaMagnifyingGlass className="text-[14px]" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project, client, year, or venue..."
            className="w-full bg-white dark:bg-[#1a1a1a] border border-[#DEDEDE] dark:border-[#434343] rounded-full py-[14px] pl-[50px] pr-[50px] text-[14px] md:text-[15px] outline-none focus:border-[#E02379] focus:shadow-[0_0_0_4px_rgba(224,35,121,0.1)] transition-all placeholder:text-[#9B9B9B]"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-[20px] flex items-center text-[#6D6E71] hover:text-[#E02379] transition-colors"
            >
              <FaXmark className="text-[16px]" />
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <p className="text-center text-[#6D6E71] py-[60px]">
          No projects found
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[24px] xl:gap-[32px]">
          {visible.map((p) => (
            <Link
              key={p.slug}
              href={`/work/branding/${p.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-[16px] aspect-[4/3]">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  loading="lazy"
                  className="object-cover group-hover:scale-[1.05] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-[20px] xl:p-[24px] text-white">
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-white/70">
                    {p.client} {p.date && `• ${p.date}`}
                  </p>
                  <h3 className="text-[18px] md:text-[20px] xl:text-[22px] font-semibold mt-[6px] leading-[1.2]">
                    {p.title}
                  </h3>
                  {p.venue && (
                    <p className="text-[11px] md:text-[12px] text-white/60 mt-[4px]">
                      {p.venue}
                    </p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Loader sentinel for intersection observer */}
      {visibleCount < filtered.length && (
        <div ref={loaderRef} className="text-center py-[40px]">
          <div className="inline-block w-[24px] h-[24px] border-2 border-[#DEDEDE] border-t-[#E02379] rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
