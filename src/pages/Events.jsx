import { useState, useRef, useEffect, useCallback } from "react";
import {
  Search, SlidersHorizontal, ChevronLeft, ChevronRight, Star,
  Calendar, Building2, Tag, ThumbsUp, MessageSquare, ArrowRight,
  X, Heart, Laugh, PartyPopper, HandMetal, Send, Clock,
  TrendingUp, Award, Users, Megaphone, Filter, ChevronDown,
  CheckCircle2, Hash, Sparkles, ArrowUpRight, Play, MoreHorizontal,
  Bookmark, Share2
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const EVENTS = [
  {
    id: 1,
    title: "Q1 2025 All-Hands Townhall",
    category: "Townhall",
    department: "Leadership",
    date: "April 10, 2025",
    featured: true,
    impact: "Company-wide",
    coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80",
    summary: "CEO Anika Sharma unveiled the company's 3-year vision and unveiled Project Horizon — a strategic pivot into AI-native infrastructure.",
    story: "The Q1 All-Hands brought together 400+ employees across 6 offices in a hybrid setting. CEO Anika Sharma opened with a retrospective on FY2024 — a year of 40% revenue growth and two marquee client acquisitions. The session's centrepiece was the unveiling of Project Horizon, a company-wide initiative to rebuild core product infrastructure around AI-native architecture. Engineering, Product, and Design leads each presented their roadmaps, followed by a live Q&A that ran 45 minutes over time due to high engagement. The session closed with a surprise announcement: a company-wide performance bonus and two weeks of flexible work ahead of the new fiscal year.",
    tags: ["Leadership", "Strategy", "AI", "Bonus"],
    people: [
      { name: "Anika Sharma", role: "CEO", color: "bg-violet-500" },
      { name: "Rohan Mehta", role: "CTO", color: "bg-sky-500" },
      { name: "Priya Das", role: "CPO", color: "bg-rose-500" },
      { name: "Dev Kapoor", role: "CFO", color: "bg-emerald-500" },
    ],
    likes: 148, comments: 34,
    gallery: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=900&q=80",
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=900&q=80",
    ],
  },
  {
    id: 2,
    title: "Best Tech Employer Award — NASSCOM 2025",
    category: "Achievement",
    department: "HR & Culture",
    date: "March 28, 2025",
    featured: true,
    impact: "Industry Recognition",
    coverImage: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=1200&q=80",
    summary: "PulseHub was ranked #3 Best Tech Employer in India at the NASSCOM Future of Work Awards 2025.",
    story: "At the NASSCOM Future of Work Summit held in Bengaluru, PulseHub was named the #3 Best Tech Employer in India — a recognition driven by employee satisfaction scores, L&D investment, and the company's industry-leading parental leave policy. HR Director Meena Iyer accepted the award alongside three employees who were nominated as 'Culture Champions' by their peers. The recognition follows a year in which PulseHub launched its Wellbeing Fund, flexible Friday initiative, and internal mentorship program 'Elevate'. This recognition is a testament to the 400+ people who make PulseHub a place where great work happens.",
    tags: ["Award", "Culture", "HR", "Recognition"],
    people: [
      { name: "Meena Iyer", role: "HR Director", color: "bg-amber-500" },
      { name: "Sanket Padhi", role: "Culture Champ", color: "bg-indigo-500" },
      { name: "Rani Mohapatra", role: "Culture Champ", color: "bg-pink-500" },
    ],
    likes: 212, comments: 51,
    gallery: [
      "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=900&q=80",
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=900&q=80",
    ],
  },
  {
    id: 3,
    title: "PulseOS v3.0 — Public Launch",
    category: "Achievement",
    department: "Engineering",
    date: "March 15, 2025",
    featured: true,
    impact: "Product Milestone",
    coverImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
    summary: "After 14 months of development, PulseOS v3 shipped to 2,400 enterprise clients — the largest release in company history.",
    story: "PulseOS v3.0 went live on March 15th after 14 months of intensive engineering work across 6 squads. The release introduced a redesigned API layer, real-time event streaming, and the much-anticipated AI Co-pilot feature. On launch day, the engineering Slack channel saw over 900 messages in 4 hours. The release was adopted by 2,400 enterprise clients within the first 72 hours, with a 99.98% uptime record. CTO Rohan Mehta published a detailed post-launch retrospective, crediting the success to cross-functional collaboration and the dedicated QA team who ran 11,000 automated tests prior to release.",
    tags: ["Engineering", "Product", "Launch", "AI"],
    people: [
      { name: "Rohan Mehta", role: "CTO", color: "bg-sky-500" },
      { name: "Karan Joshi", role: "Lead Engineer", color: "bg-indigo-500" },
      { name: "Priya Das", role: "CPO", color: "bg-rose-500" },
    ],
    likes: 189, comments: 42,
    gallery: [
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
    ],
  },
  {
    id: 4,
    title: "Holi Bash 2025 — Mumbai Office",
    category: "Celebration",
    department: "Culture Team",
    date: "March 14, 2025",
    featured: false,
    impact: "Team Morale",
    coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    summary: "The Mumbai office turned into a riot of color and laughter as 180 employees celebrated Holi together.",
    story: "The Culture Team outdid themselves this year, transforming the Mumbai office terrace into a Holi celebration zone complete with organic colors, water guns, a DJ set, and a legendary buffet of traditional sweets. 180 employees from across departments showed up in white kurtas and left in every color of the spectrum. The post-event pulse survey gave the event a 98% happiness score — the highest for any in-office event in 3 years. The Culture Team's planning committee, led by Anjali Rao, started organizing 6 weeks out and coordinated with building management, safety, and catering to make it seamless.",
    tags: ["Festival", "Mumbai", "Culture", "Celebration"],
    people: [
      { name: "Anjali Rao", role: "Culture Lead", color: "bg-pink-500" },
      { name: "Arjun Nair", role: "Events Coord.", color: "bg-amber-500" },
    ],
    likes: 304, comments: 67,
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&q=80",
    ],
  },
  {
    id: 5,
    title: "Design Sprint — New Onboarding Flow",
    category: "Meeting",
    department: "Product & Design",
    date: "March 6–7, 2025",
    featured: false,
    impact: "UX Improvement",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80",
    summary: "A cross-functional 2-day design sprint produced a new onboarding flow, cutting drop-off by 34% in prototype testing.",
    story: "Twelve people from Product, Design, Engineering, and Customer Success locked themselves in the workshop room for two days with a single goal: fix the onboarding drop-off problem. Using Google's Design Sprint methodology, the team mapped the problem, sketched 40+ solution ideas, voted, prototyped, and tested — all within 48 hours. The winning prototype reduced task completion time by 41% and cut drop-off by 34% in unmoderated user tests. The sprint output went directly into the Q2 roadmap, making it one of the fastest idea-to-roadmap cycles in the product team's history.",
    tags: ["Design", "Product", "UX", "Sprint"],
    people: [
      { name: "Priya Das", role: "CPO", color: "bg-rose-500" },
      { name: "Karan Joshi", role: "Design Lead", color: "bg-indigo-500" },
      { name: "Sneha Patil", role: "CS Lead", color: "bg-teal-500" },
    ],
    likes: 76, comments: 18,
    gallery: [
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&q=80",
    ],
  },
  {
    id: 6,
    title: "10-Year Work Anniversary — Dev Kapoor",
    category: "Celebration",
    department: "Finance",
    date: "February 20, 2025",
    featured: false,
    impact: "People",
    coverImage: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=80",
    summary: "CFO Dev Kapoor marked 10 years at PulseHub — celebrated by the entire company with a surprise recognition ceremony.",
    story: "On February 20th, Dev Kapoor walked into what he thought was a routine leadership sync — and walked into a room of 60 colleagues, balloons, and a video montage compiled by his team. Dev joined PulseHub as a junior financial analyst in 2015 and has been the CFO since 2021. His decade of contribution has spanned three funding rounds, two acquisitions, and the company's 10x revenue growth. CEO Anika Sharma presented him with a custom trophy and announced the 'Dev Kapoor Finance Excellence Scholarship' — an annual grant for finance students from underrepresented communities. The gesture brought the room to tears.",
    tags: ["People", "Anniversary", "Leadership", "Culture"],
    people: [
      { name: "Dev Kapoor", role: "CFO", color: "bg-emerald-500" },
      { name: "Anika Sharma", role: "CEO", color: "bg-violet-500" },
    ],
    likes: 261, comments: 89,
    gallery: [
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=900&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80",
    ],
  },
];

const CATEGORY_META = {
  Celebration: { color: "bg-pink-100 text-pink-700 border-pink-200", dot: "bg-pink-400", icon: PartyPopper },
  Achievement: { color: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-400", icon: Award },
  Townhall: { color: "bg-violet-100 text-violet-700 border-violet-200", dot: "bg-violet-400", icon: Megaphone },
  Meeting: { color: "bg-sky-100 text-sky-700 border-sky-200", dot: "bg-sky-400", icon: Users },
};

const SAMPLE_COMMENTS = [
  { id: 1, author: "Priya Sharma", avatar: "PS", color: "bg-violet-500", time: "2h ago", text: "This was incredible! The energy in the room was unlike anything I've experienced at a company event." },
  { id: 2, author: "Arjun Nair", avatar: "AN", color: "bg-sky-500", time: "1h ago", text: "Rohan's presentation on Project Horizon gave me chills. The roadmap is ambitious but totally believable given what the team has already built." },
  { id: 3, author: "Sneha Patil", avatar: "SP", color: "bg-rose-500", time: "45m ago", text: "The bonus announcement made my entire week. Leadership really walks the talk here. 🙌" },
];

const REACTIONS = [
  { icon: Heart, label: "Love", color: "text-rose-500", bg: "hover:bg-rose-50" },
  { icon: PartyPopper, label: "Celebrate", color: "text-amber-500", bg: "hover:bg-amber-50" },
  { icon: HandMetal, label: "Clap", color: "text-sky-500", bg: "hover:bg-sky-50" },
  { icon: TrendingUp, label: "Inspired", color: "text-emerald-500", bg: "hover:bg-emerald-50" },
];

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function CategoryBadge({ category, size = "sm" }) {
  const meta = CATEGORY_META[category] || {};
  const Icon = meta.icon || Tag;
  const small = size === "sm";
  return (
    <span className={`inline-flex items-center gap-1 border rounded-full font-medium ${meta.color} ${small ? "text-xs px-2 py-0.5" : "text-xs px-2.5 py-1"}`}>
      <Icon size={small ? 10 : 11} />
      {category}
    </span>
  );
}

function Avatar({ name, color, size = "sm" }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2);
  const sz = size === "sm" ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} rounded-full ${color} flex items-center justify-center text-white font-bold shrink-0`}>
      {initials}
    </div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────

function EventDetail({ event, onClose }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [reaction, setReaction] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(SAMPLE_COMMENTS);
  const gallery = event.gallery || [event.coverImage];

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose]);

  const submitComment = () => {
    if (!comment.trim()) return;
    setComments(c => [{ id: Date.now(), author: "You", avatar: "ME", color: "bg-slate-500", time: "Just now", text: comment }, ...c]);
    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" />
      <div
        className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col lg:flex-row"
        style={{ maxHeight: "92vh" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Left — Visual */}
        <div className="lg:w-[48%] bg-slate-950 flex flex-col shrink-0">
          <div className="relative flex-1 flex items-center justify-center overflow-hidden" style={{ minHeight: 280 }}>
            <img
              src={gallery[imgIdx]}
              alt=""
              className="w-full h-full object-cover"
              style={{ maxHeight: 420 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />

            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setImgIdx(i => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  onClick={() => setImgIdx(i => (i + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition backdrop-blur-sm"
                >
                  <ChevronRight size={15} />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {gallery.map((_, i) => (
                    <button key={i} onClick={() => setImgIdx(i)} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? "bg-white w-4" : "bg-white/40"}`} />
                  ))}
                </div>
              </>
            )}

            <button onClick={onClose} className="absolute top-3 right-3 w-7 h-7 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center text-white transition">
              <X size={14} />
            </button>
          </div>

          {/* Reactions */}
          <div className="px-5 py-4 border-t border-slate-800">
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">React to this event</p>
            <div className="flex items-center gap-2">
              {REACTIONS.map(r => {
                const Icon = r.icon;
                const active = reaction === r.label;
                return (
                  <button
                    key={r.label}
                    onClick={() => setReaction(active ? null : r.label)}
                    className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all border ${active ? `${r.color} border-current bg-white/10` : "text-slate-400 border-slate-700 hover:border-slate-500"}`}
                  >
                    <Icon size={16} />
                    <span className="text-xs leading-none">{r.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right — Story */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5" style={{ scrollbarWidth: "thin" }}>
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <CategoryBadge category={event.category} />
                {event.featured && (
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                    <Star size={10} className="fill-amber-500 text-amber-500" /> Featured
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{event.title}</h2>
              <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                <span className="flex items-center gap-1"><Calendar size={11} />{event.date}</span>
                <span className="flex items-center gap-1"><Building2 size={11} />{event.department}</span>
              </div>
            </div>

            {/* Story */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">What happened</p>
              <p className="text-sm text-slate-700 leading-relaxed">{event.story}</p>
            </div>

            {/* Impact */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">Impact</p>
              <p className="text-sm font-semibold text-slate-700">{event.impact}</p>
            </div>

            {/* People */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">People involved</p>
              <div className="flex flex-wrap gap-2">
                {event.people.map(p => (
                  <div key={p.name} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-full pl-0.5 pr-3 py-0.5">
                    <Avatar name={p.name} color={p.color} size="sm" />
                    <div>
                      <p className="text-xs font-medium text-slate-700 leading-none">{p.name}</p>
                      <p className="text-xs text-slate-400 leading-none mt-0.5">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {event.tags.map(t => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">#{t}</span>
              ))}
            </div>

            {/* Comments */}
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Comments ({comments.length})</p>
              <div className="space-y-3 mb-4">
                {comments.map(c => (
                  <div key={c.id} className="flex gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${c.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>{c.avatar}</div>
                    <div className="flex-1 bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-slate-700">{c.author}</span>
                        <span className="text-xs text-slate-400">{c.time}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold shrink-0">ME</div>
                <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5">
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && submitComment()}
                    placeholder="Add a comment…"
                    className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder-slate-400"
                  />
                  <button onClick={submitComment} className="text-slate-400 hover:text-indigo-600 transition-colors">
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CAROUSEL ─────────────────────────────────────────────────────────────────

function FeaturedCarousel({ events, onSelect }) {
  const [idx, setIdx] = useState(0);
  const featured = events.filter(e => e.featured);
  const prev = () => setIdx(i => (i - 1 + featured.length) % featured.length);
  const next = () => setIdx(i => (i + 1) % featured.length);
  const ev = featured[idx];

  if (!featured.length) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg mb-10" style={{ height: 340 }}>
      {/* BG */}
      <div className="absolute inset-0">
        <img src={ev.coverImage} alt="" className="w-full h-full object-cover transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-white/15 text-white border border-white/20 backdrop-blur-sm font-medium">
              <Star size={10} className="fill-amber-400 text-amber-400" /> Featured
            </span>
            <CategoryBadge category={ev.category} />
          </div>
          <h2 className="text-2xl font-bold text-white leading-tight mb-2">{ev.title}</h2>
          <p className="text-sm text-white/75 leading-relaxed mb-4 line-clamp-2">{ev.summary}</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Calendar size={12} />
              {ev.date}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Building2 size={12} />
              {ev.department}
            </div>
            <button
              onClick={() => onSelect(ev)}
              className="ml-auto flex items-center gap-1.5 bg-white text-slate-900 text-xs font-semibold px-4 py-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              Read Story <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* Nav */}
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition border border-white/20">
        <ChevronLeft size={16} />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition border border-white/20">
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 right-8 flex gap-1.5">
        {featured.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "bg-white w-5" : "bg-white/40 w-1.5"}`} />
        ))}
      </div>

      {/* Thumbnail strip */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        {featured.map((f, i) => i !== idx && (
          <button key={f.id} onClick={() => setIdx(i)} className="w-14 h-10 rounded-lg overflow-hidden border-2 border-white/30 hover:border-white/70 transition opacity-70 hover:opacity-100">
            <img src={f.coverImage} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── EVENT CARD ───────────────────────────────────────────────────────────────

function EventCard({ event, onSelect }) {
  const [liked, setLiked] = useState(false);
  const meta = CATEGORY_META[event.category] || {};

  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-slate-300 transition-all duration-200 group flex flex-col sm:flex-row">
      {/* Image */}
      <div className="sm:w-56 shrink-0 relative overflow-hidden bg-slate-100" style={{ minHeight: 160 }}>
        <img
          src={event.coverImage}
          alt={event.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          style={{ minHeight: 160 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={event.category} />
        </div>
        {event.featured && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-0.5 text-xs px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-900 font-semibold">
              <Star size={9} className="fill-amber-900" />
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col gap-3">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-1.5">
            <span className="flex items-center gap-1"><Calendar size={11} />{event.date}</span>
            <span className="flex items-center gap-1"><Building2 size={11} />{event.department}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-indigo-700 transition-colors">{event.title}</h3>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed line-clamp-2">{event.summary}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {event.tags.slice(0, 3).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">#{t}</span>
          ))}
          {event.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-400">+{event.tags.length - 3}</span>
          )}
        </div>

        {/* People */}
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {event.people.slice(0, 3).map(p => (
              <div key={p.name} title={`${p.name} — ${p.role}`} className={`w-6 h-6 rounded-full ${p.color} border-2 border-white flex items-center justify-center text-white text-xs font-bold`}>
                {p.name.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
            ))}
            {event.people.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-500 text-xs font-bold">+{event.people.length - 3}</div>
            )}
          </div>
          <span className="text-xs text-slate-400">{event.people.length} people involved</span>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 mt-auto">
          <button
            onClick={() => setLiked(l => !l)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? "text-rose-500" : "text-slate-400 hover:text-rose-500"}`}
          >
            <Heart size={13} className={liked ? "fill-rose-500" : ""} />
            {event.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors">
            <MessageSquare size={13} />
            {event.comments}
          </button>
          <button
            onClick={() => onSelect(event)}
            className="ml-auto flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors group/btn"
          >
            Read Story
            <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

const CATEGORIES_FILTER = ["All", "Celebration", "Achievement", "Townhall", "Meeting"];
const SORT_OPTIONS = [
  { label: "Latest", key: "latest" },
  { label: "Featured", key: "featured" },
  { label: "Most Engaged", key: "engaged" },
];

export default function EventsModule() {
  const [query, setQuery] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [sortOpen, setSortOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const sortRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = EVENTS
    .filter(e => {
      const q = query.toLowerCase();
      const matchQ = !q || e.title.toLowerCase().includes(q) || e.department.toLowerCase().includes(q) || e.tags.some(t => t.toLowerCase().includes(q));
      const matchCat = catFilter === "All" || e.category === catFilter;
      return matchQ && matchCat;
    })
    .sort((a, b) => {
      if (sort === "featured") return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sort === "engaged") return (b.likes + b.comments) - (a.likes + a.comments);
      return 0; // latest = default order
    });

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Sora', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
      `}</style>

      {/* ── STICKY HEADER ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4 flex-wrap">

            {/* Title */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-sm">
                <Sparkles size={15} className="text-white" />
              </div>
              <div>
                <h1 className="text-base font-bold text-slate-900 leading-none">Events</h1>
                <p className="text-xs text-slate-400 leading-none mt-0.5">Company Highlights & Stories</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 min-w-48 flex items-center gap-2 bg-slate-100 rounded-xl px-3.5 py-2.5">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search events, departments, tags…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />
              {query && <button onClick={() => setQuery("")} className="text-slate-400 hover:text-slate-600"><X size={13} /></button>}
            </div>

            {/* Sort */}
            <div className="relative shrink-0" ref={sortRef}>
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 hover:border-slate-300 transition-colors"
              >
                <Filter size={13} className="text-slate-400" />
                {SORT_OPTIONS.find(s => s.key === sort)?.label}
                <ChevronDown size={13} className={`text-slate-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50 min-w-36">
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.key}
                      onClick={() => { setSort(o.key); setSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${sort === o.key ? "text-indigo-600 bg-indigo-50 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-0.5">
            {CATEGORIES_FILTER.map(cat => {
              const active = catFilter === cat;
              const meta = CATEGORY_META[cat];
              const Icon = meta?.icon || null;
              return (
                <button
                  key={cat}
                  onClick={() => setCatFilter(cat)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 border ${active ? "bg-indigo-600 text-white border-indigo-600 shadow-sm" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:text-slate-700"}`}
                >
                  {Icon && <Icon size={11} />}
                  {cat}
                </button>
              );
            })}
            <span className="text-xs text-slate-400 ml-2 whitespace-nowrap shrink-0">{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </header>

      {/* ── PAGE BODY ── */}
      <main className="max-w-6xl mx-auto px-6 py-8">

        {/* Featured Carousel — only when no filter active */}
        {catFilter === "All" && !query && (
          <section>
            <div className="flex items-center gap-2 mb-4">
              <Star size={14} className="text-amber-500 fill-amber-500" />
              <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">Featured Events</h2>
            </div>
            <FeaturedCarousel events={EVENTS} onSelect={setSelected} />
          </section>
        )}

        {/* Event Feed */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Clock size={14} className="text-slate-400" />
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-widest">
              {catFilter === "All" && !query ? "All Events" : `Results — ${filtered.length}`}
            </h2>
          </div>

          {filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map(ev => (
                <EventCard key={ev.id} event={ev} onSelect={setSelected} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-slate-200 rounded-2xl py-20 text-center">
              <Sparkles size={32} className="mx-auto mb-3 text-slate-200" />
              <p className="text-slate-500 font-medium">No events found</p>
              <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
              <button onClick={() => { setQuery(""); setCatFilter("All"); }} className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">Clear filters</button>
            </div>
          )}
        </section>
      </main>

      {/* ── DETAIL MODAL ── */}
      {selected && <EventDetail event={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}