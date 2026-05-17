import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import PageHeader from "@/components/PageHeader";
import { FileText, BookOpen, Video, Search, ArrowRight, ExternalLink, Tag } from "lucide-react";

type ContentType = "all" | "article" | "paper" | "video";

const content = [
  { type: "article" as const, title: "The Future of AI in Library Management", description: "How artificial intelligence is reshaping cataloging, search, and user services in modern libraries.", tags: ["AI", "Library Tech"], date: "Mar 2026" },
  { type: "paper" as const, title: "Open Access Publishing: A Decade in Review", description: "Comprehensive analysis of open access adoption trends across Indian academic institutions.", tags: ["Open Access", "Research"], date: "Feb 2026" },
  { type: "video" as const, title: "Masterclass: Research Design for LIS", description: "Recorded keynote from our 2025 conference covering research methodology best practices.", tags: ["Research", "Methodology"], date: "Jan 2026" },
  { type: "article" as const, title: "Digital Preservation Best Practices", description: "A practical guide to preserving digital collections for long-term accessibility.", tags: ["Preservation", "Digital"], date: "Jan 2026" },
  { type: "paper" as const, title: "Bibliometrics and Research Evaluation", description: "Understanding citation analysis, h-index, and impact factor in the LIS context.", tags: ["Bibliometrics", "Evaluation"], date: "Dec 2025" },
  { type: "video" as const, title: "Workshop Recording: Metadata Standards", description: "Full recording of our Dublin Core and MARC21 metadata workshop.", tags: ["Metadata", "Standards"], date: "Nov 2025" },
  { type: "article" as const, title: "Building Community in Academic Libraries", description: "Strategies for creating inclusive, engaging library spaces and programs.", tags: ["Community", "Academic"], date: "Oct 2025" },
  { type: "paper" as const, title: "Information Literacy in the Age of Misinformation", description: "Framework for teaching critical information evaluation skills.", tags: ["Literacy", "Education"], date: "Sep 2025" },
  { type: "video" as const, title: "Panel: Future of Library Professionals", description: "Industry leaders discuss evolving roles and skills for LIS professionals.", tags: ["Career", "Future"], date: "Aug 2025" },
];

const typeIcon = { article: BookOpen, paper: FileText, video: Video };
const typeLabel = { article: "Article", paper: "Research Paper", video: "Video" };

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function KnowledgeHub() {
  const [filter, setFilter] = useState<ContentType>("all");
  const [search, setSearch] = useState("");

  const filtered = content.filter((item) => {
    const matchesType = filter === "all" || item.type === filter;
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesType && matchesSearch;
  });

  const filters: { value: ContentType; label: string }[] = [
    { value: "all", label: "All" },
    { value: "article", label: "Articles" },
    { value: "paper", label: "Papers" },
    { value: "video", label: "Videos" },
  ];

  return (
    <PageLayout>
      <PageHeader tag="Knowledge Hub" title="Explore & Learn" description="Access our curated library of articles, research papers, and educational videos." />

      <section className="section-padding bg-[#0d1b3e]">
        <div className="max-w-6xl mx-auto">
          {/* Filters */}
          <FadeIn>
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">
              <div className="flex gap-2 flex-wrap">
                {filters.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      filter === f.value
                        ? "text-[#0d1b3e] shadow-lg"
                        : "border border-white/15 bg-white/5 text-white/60 hover:text-white hover:border-white/30"
                    }`}
                    style={filter === f.value ? { background: "linear-gradient(135deg, #f0d080, #c9a84c)" } : {}}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={16} />
                <input
                  placeholder="Search resources..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/8 border border-white/15 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-[#c9a84c]/50"
                />
              </div>
            </div>
          </FadeIn>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item, i) => {
              const Icon = typeIcon[item.type];
              return (
                <FadeIn key={item.title} delay={i * 0.05}>
                  <div className="group p-6 rounded-xl border border-white/10 bg-white/5 hover:-translate-y-1 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon style={{ color: "#c9a84c" }} size={16} />
                      <span className="text-xs font-medium" style={{ color: "#c9a84c" }}>{typeLabel[item.type]}</span>
                      <span className="ml-auto text-xs text-white/35">{item.date}</span>
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-white mb-2 group-hover:text-[#c9a84c] transition-colors">{item.title}</h3>
                    <p className="text-sm text-white/50 leading-relaxed flex-1 mb-4">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1.5 flex-wrap">
                        {item.tags.map((tag) => (
                          <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium bg-[#c9a84c]/12 text-[#c9a84c]">
                            <Tag size={8} />{tag}
                          </span>
                        ))}
                      </div>
                      <button className="p-1 text-white/40 hover:text-white transition-colors">
                        <ExternalLink size={14} />
                      </button>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-white/40 py-12">No resources found. Try a different search or filter.</p>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
