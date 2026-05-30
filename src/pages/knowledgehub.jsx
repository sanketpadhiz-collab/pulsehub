import { useState, useEffect, useRef } from "react";
import {
  Search, FileText, Shield, Code2, DollarSign, Users, Settings,
  Download, ExternalLink,  X, ChevronRight, MessageSquare,
  ThumbsUp, Clock, BookOpen, Filter,
  ChevronDown, Send, ArrowUpRight, Folder, Bell, Hash,
  LayoutGrid, List, Eye, Lock, Globe, Star, MoreHorizontal
} from "lucide-react";

// ─── DUMMY DATA ──────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all", label: "All", icon: Folder },
  { id: "hr", label: "HR", icon: Users, color: "bg-violet-100 text-violet-700" },
  { id: "engineering", label: "Engineering", icon: Code2, color: "bg-sky-100 text-sky-700" },
  { id: "finance", label: "Finance", icon: DollarSign, color: "bg-emerald-100 text-emerald-700" },
  { id: "admin", label: "Admin", icon: Settings, color: "bg-amber-100 text-amber-700" },
  { id: "legal", label: "Legal", icon: Shield, color: "bg-rose-100 text-rose-700" },
  { id: "general", label: "General", icon: BookOpen, color: "bg-slate-100 text-slate-700" },
];

const DOCUMENTS = [
  { id: 1, title: "Employee Handbook 2025", category: "hr", type: "PDF", size: "4.2 MB", updated: "Jan 15, 2025", access: "public", starred: true, description: "Complete onboarding guide for all employees." },
  { id: 2, title: "Remote Work Policy", category: "hr", type: "PDF", size: "1.1 MB", updated: "Mar 3, 2025", access: "public", starred: false, description: "Guidelines and expectations for remote employees." },
  { id: 3, title: "Leave & Attendance Policy", category: "hr", type: "DOCX", size: "890 KB", updated: "Feb 20, 2025", access: "public", starred: false, description: "Annual leave, sick leave, and attendance rules." },
  { id: 4, title: "Engineering Onboarding Guide", category: "engineering", type: "PDF", size: "6.8 MB", updated: "Apr 1, 2025", access: "public", starred: true, description: "Technical stack overview and dev setup walkthrough." },
  { id: 5, title: "Code Review Standards", category: "engineering", type: "MD", size: "320 KB", updated: "Mar 28, 2025", access: "public", starred: false, description: "PR guidelines, commit conventions, and review checklists." },
  { id: 6, title: "CI/CD Pipeline Runbook", category: "engineering", type: "PDF", size: "2.4 MB", updated: "Apr 8, 2025", access: "restricted", starred: false, description: "Step-by-step deployment and rollback procedures." },
  { id: 7, title: "Q1 2025 Budget Allocation", category: "finance", type: "XLSX", size: "1.9 MB", updated: "Jan 2, 2025", access: "restricted", starred: false, description: "Departmental budget breakdown for Q1." },
  { id: 8, title: "Reimbursement Policy", category: "finance", type: "PDF", size: "780 KB", updated: "Dec 10, 2024", access: "public", starred: false, description: "Expense claims and reimbursement procedures." },
  { id: 9, title: "Office Security Protocol", category: "admin", type: "PDF", size: "540 KB", updated: "Feb 5, 2025", access: "public", starred: false, description: "Visitor registration, access cards, and emergency exits." },
  { id: 10, title: "Data Privacy & GDPR Guidelines", category: "legal", type: "PDF", size: "3.1 MB", updated: "Mar 14, 2025", access: "public", starred: true, description: "Compliance requirements and data handling policies." },
  { id: 11, title: "NDA Template — Vendor", category: "legal", type: "DOCX", size: "210 KB", updated: "Jan 30, 2025", access: "restricted", starred: false, description: "Standard NDA for third-party vendor agreements." },
  { id: 12, title: "All-Hands Meeting Notes — Apr 2025", category: "general", type: "PDF", size: "620 KB", updated: "Apr 10, 2025", access: "public", starred: false, description: "Summary of April all-hands: OKRs, wins, and announcements." },
];



const FORUM_POSTS = [
  {
    id: 1,
    title: "Best practices for async API error handling in Node.js?",
    category: "engineering",
    author: "Arjun Nair",
    avatar: "AN",
    avatarColor: "bg-sky-500",
    posted: "2 hours ago",
    views: 84,
    likes: 12,
    replies: [
      { id: 1, author: "Priya Sharma", avatar: "PS", avatarColor: "bg-violet-500", time: "1 hour ago", content: "We wrap all async calls in a custom `tryCatch` utility that logs to Sentry and returns a typed error object. Keeps the controllers very clean." },
      { id: 2, author: "Dev Kapoor", avatar: "DK", avatarColor: "bg-emerald-500", time: "45 min ago", content: "Agreed with Priya. Also make sure you're handling unhandledPromiseRejection at the process level as a last resort." },
    ],
    body: "Looking for team consensus on how we standardize error handling for async endpoints. Currently each service does it slightly differently.",
  },
  {
    id: 2,
    title: "When does the updated leave policy for FY2026 take effect?",
    category: "hr",
    author: "Sneha Patil",
    avatar: "SP",
    avatarColor: "bg-rose-500",
    posted: "Yesterday",
    views: 210,
    likes: 5,
    replies: [
      { id: 1, author: "Meena Iyer (HR)", avatar: "MI", avatarColor: "bg-amber-500", time: "Yesterday", content: "The updated policy goes live April 1st, 2026. You can find the full document in the HR section of the Knowledge Hub." },
    ],
    body: "Saw an announcement about policy changes but couldn't find the exact effective date. Can HR confirm?",
  },
  {
    id: 3,
    title: "Recommendation: Standardize on pnpm across all frontend repos",
    category: "engineering",
    author: "Karan Joshi",
    avatar: "KJ",
    avatarColor: "bg-indigo-500",
    posted: "3 days ago",
    views: 148,
    likes: 22,
    replies: [],
    body: "npm and yarn are both being used across different repos which is causing lockfile conflicts in CI. Proposing we standardize on pnpm. Anyone have concerns or +1s?",
  },
  {
    id: 4,
    title: "Office pantry restocking — can we add healthier snack options?",
    category: "admin",
    author: "Rohan Mehta",
    avatar: "RM",
    avatarColor: "bg-teal-500",
    posted: "5 days ago",
    views: 312,
    likes: 41,
    replies: [
      { id: 1, author: "Admin Team", avatar: "AT", avatarColor: "bg-amber-500", time: "4 days ago", content: "Great feedback! We're updating the vendor list this week. Feel free to fill the snack preference form shared on Slack #office-admin." },
    ],
    body: "The current pantry has mostly chips and sugary drinks. Would love to see protein bars, nuts, and fruit options added.",
  },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const typeColor = (type) => {
  const m = { PDF: "bg-rose-50 text-rose-600 border-rose-200", DOCX: "bg-sky-50 text-sky-600 border-sky-200", XLSX: "bg-emerald-50 text-emerald-600 border-emerald-200", MD: "bg-violet-50 text-violet-600 border-violet-200" };
  return m[type] || "bg-slate-50 text-slate-600 border-slate-200";
};

const catColor = (catId) => {
  const c = CATEGORIES.find(c => c.id === catId);
  return c?.color || "bg-slate-100 text-slate-600";
};

const catLabel = (catId) => CATEGORIES.find(c => c.id === catId)?.label || catId;

// ─── MODAL ───────────────────────────────────────────────────────────────────

function MediaModal({ item, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: "90vh" }}
      >
        <div className="relative bg-slate-950 flex items-center justify-center" style={{ minHeight: 340 }}>
          {item.type === "image" ? (
            <img src={item.src} alt={item.title} className="w-full object-contain" style={{ maxHeight: 420 }} />
          ) : (
            <video src={item.src} controls autoPlay className="w-full" style={{ maxHeight: 420 }} />
          )}
          <button onClick={onClose} className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white rounded-full p-1.5 transition">
            <X size={18} />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-slate-800 text-base leading-snug">{item.title}</h3>
              {item.description && <p className="text-slate-500 text-sm mt-1">{item.description}</p>}
            </div>
            <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${item.type === "video" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"}`}>
              {item.type === "video" ? "Video" : "Photo"}
            </span>
          </div>
          <div className="flex items-center gap-4 mt-3 text-xs text-slate-400 border-t border-slate-100 pt-3">
            <span className="flex items-center gap-1"><Upload size={12} />{item.uploader}</span>
            <span className="flex items-center gap-1"><Clock size={12} />{item.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── FORUM POST ───────────────────────────────────────────────────────────────

function ForumThread({ post }) {
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [localReplies, setLocalReplies] = useState(post.replies);

  const handleReply = () => {
    if (!replyText.trim()) return;
    setLocalReplies(r => [...r, { id: Date.now(), author: "You", avatar: "ME", avatarColor: "bg-slate-500", time: "Just now", content: replyText }]);
    setReplyText("");
  };

  const catC = catColor(post.category);

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-all duration-200">
      <div className="p-5">
        <div className="flex items-start gap-3">
          <div className={`w-9 h-9 rounded-full ${post.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {post.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-slate-700">{post.author}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catC}`}>{catLabel(post.category)}</span>
              <span className="text-xs text-slate-400 ml-auto">{post.posted}</span>
            </div>
            <button onClick={() => setOpen(o => !o)} className="text-left mt-1.5">
              <h4 className="font-semibold text-slate-800 text-sm leading-snug hover:text-indigo-600 transition-colors">{post.title}</h4>
            </button>
            <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{post.body}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
          <button onClick={() => setLiked(l => !l)} className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"}`}>
            <ThumbsUp size={13} />
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button onClick={() => setOpen(o => !o)} className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors">
            <MessageSquare size={13} />
            <span>{localReplies.length} {localReplies.length === 1 ? "reply" : "replies"}</span>
          </button>
          <span className="flex items-center gap-1.5 text-xs text-slate-400 ml-auto">
            <Eye size={13} />{post.views}
          </span>
        </div>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50/60">
          {localReplies.length > 0 && (
            <div className="px-5 py-4 space-y-4">
              {localReplies.map(r => (
                <div key={r.id} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full ${r.avatarColor} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
                    {r.avatar}
                  </div>
                  <div className="flex-1 bg-white rounded-lg px-3.5 py-2.5 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-700">{r.author}</span>
                      <span className="text-xs text-slate-400">{r.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="px-5 pb-4 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold shrink-0">ME</div>
            <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Write a reply…"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleReply()}
                className="flex-1 text-xs outline-none text-slate-700 placeholder-slate-400 bg-transparent"
              />
              <button onClick={handleReply} className="text-indigo-500 hover:text-indigo-700 transition-colors">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function KnowledgeHub() {
  const [activeSection, setActiveSection] = useState("docs");
  const [docCategory, setDocCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [docView, setDocView] = useState("grid");

  const filteredDocs = DOCUMENTS.filter(doc => {
    const matchCat = docCategory === "all" || doc.category === docCategory;
    const q = searchQuery.toLowerCase();
    const matchSearch = !q || doc.title.toLowerCase().includes(q) || doc.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  
  const NAV = [
    { id: "docs", label: "Documents", icon: FileText },
    { id: "forum", label: "Discussions", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; height: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>

      {/* ── TOPBAR ── */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <Hash size={14} className="text-white" />
            </div>
            <span className="font-semibold text-slate-800 text-sm tracking-tight">PulseHub</span>
            <span className="text-slate-300 mx-1">·</span>
            <span className="text-slate-500 text-sm">Knowledge Hub</span>
          </div>

          <nav className="flex items-center gap-1 flex-1">
            {NAV.map(n => {
              const Icon = n.icon;
              const active = activeSection === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setActiveSection(n.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${active ? "bg-indigo-50 text-indigo-700" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100"}`}
                >
                  <Icon size={14} />
                  {n.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1.5 rounded-lg hover:bg-slate-100">
              <Bell size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">SK</div>
          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="max-w-7xl mx-auto px-6 py-8">

        {/* ══ DOCUMENTS ══ */}
        {activeSection === "docs" && (
          <div>
            {/* Section Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">Document & Policy Center</h1>
                <p className="text-sm text-slate-500 mt-0.5">Official company documents, handbooks, and guidelines</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => setDocView("grid")} className={`p-1.5 rounded-lg transition ${docView === "grid" ? "bg-slate-200 text-slate-700" : "text-slate-400 hover:bg-slate-100"}`}><LayoutGrid size={15} /></button>
                <button onClick={() => setDocView("list")} className={`p-1.5 rounded-lg transition ${docView === "list" ? "bg-slate-200 text-slate-700" : "text-slate-400 hover:bg-slate-100"}`}><List size={15} /></button>
              </div>
            </div>

            {/* Search + Filter */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                <Search size={15} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search documents, policies, guidelines…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="flex-1 text-sm outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                />
                {searchQuery && <button onClick={() => setSearchQuery("")} className="text-slate-400 hover:text-slate-600"><X size={14} /></button>}
              </div>
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-thin pb-1">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                const active = docCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setDocCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 border ${active ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                  >
                    <Icon size={12} />
                    {cat.label}
                  </button>
                );
              })}
              <span className="text-xs text-slate-400 ml-2 whitespace-nowrap">{filteredDocs.length} document{filteredDocs.length !== 1 ? "s" : ""}</span>
            </div>

            {/* Grid View */}
            {docView === "grid" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs.map(doc => (
                  <div key={doc.id} className="bg-white border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-md transition-all duration-200 group flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                          <FileText size={16} className="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-xs px-1.5 py-0.5 rounded border font-mono font-medium ${typeColor(doc.type)}`}>{doc.type}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        {doc.starred && <Star size={13} className="text-amber-400 fill-amber-400" />}
                        {doc.access === "restricted" ? <Lock size={12} className="text-rose-400" /> : <Globe size={12} className="text-emerald-400" />}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-2">{doc.title}</h3>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{doc.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor(doc.category)}`}>{catLabel(doc.category)}</span>
                        <span className="text-xs text-slate-400">{doc.size}</span>
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Download size={13} /></button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><ExternalLink size={13} /></button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={11} />
                      <span>Updated {doc.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {docView === "list" && (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="grid grid-cols-12 text-xs font-medium text-slate-400 uppercase tracking-wide px-5 py-3 border-b border-slate-100 bg-slate-50">
                  <span className="col-span-5">Document</span>
                  <span className="col-span-2">Category</span>
                  <span className="col-span-2">Updated</span>
                  <span className="col-span-2">Size</span>
                  <span className="col-span-1"></span>
                </div>
                {filteredDocs.map((doc, i) => (
                  <div key={doc.id} className={`grid grid-cols-12 items-center px-5 py-3.5 hover:bg-slate-50 transition-colors group ${i < filteredDocs.length - 1 ? "border-b border-slate-100" : ""}`}>
                    <div className="col-span-5 flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                        <FileText size={14} className="text-slate-500 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-medium text-slate-800 line-clamp-1">{doc.title}</span>
                          {doc.starred && <Star size={11} className="text-amber-400 fill-amber-400 shrink-0" />}
                        </div>
                        <span className={`text-xs px-1.5 py-0.5 rounded border font-mono ${typeColor(doc.type)}`}>{doc.type}</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${catColor(doc.category)}`}>{catLabel(doc.category)}</span>
                    </div>
                    <span className="col-span-2 text-xs text-slate-500">{doc.updated}</span>
                    <span className="col-span-2 text-xs text-slate-500">{doc.size}</span>
                    <div className="col-span-1 flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"><Download size={13} /></button>
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50"><ExternalLink size={13} /></button>
                    </div>
                  </div>
                ))}
                {filteredDocs.length === 0 && (
                  <div className="py-16 text-center text-slate-400">
                    <FileText size={32} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">No documents match your search.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        {/* ══ FORUM ══ */}
        {activeSection === "forum" && (
          <div>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold text-slate-800">Discussions</h1>
                <p className="text-sm text-slate-500 mt-0.5">Ask questions, share knowledge, and collaborate internally</p>
              </div>
              <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors shadow-sm">
                <MessageSquare size={14} />
                New Post
              </button>
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-2 mb-5 overflow-x-auto scrollbar-thin pb-1">
              {CATEGORIES.filter(c => c.id !== "all").map(cat => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id} className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border border-slate-200 bg-white text-slate-600 whitespace-nowrap cursor-default`}>
                    <Icon size={11} />
                    {cat.label}
                  </div>
                );
              })}
            </div>

            <div className="space-y-3">
              {FORUM_POSTS.map(post => <ForumThread key={post.id} post={post} />)}
            </div>

            <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <BookOpen size={18} className="text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-indigo-800">Before posting, check the Document Center</p>
                <p className="text-xs text-indigo-600 mt-0.5">Many common questions are already answered in official policies and guides.</p>
              </div>
              <button onClick={() => setActiveSection("docs")} className="text-xs text-indigo-600 font-medium hover:text-indigo-800 flex items-center gap-1 whitespace-nowrap transition-colors">
                Browse Docs <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}

      </main>

      
    </div>
  );
}