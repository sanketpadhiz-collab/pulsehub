import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, Grid3X3, List, SlidersHorizontal, X, Heart, Eye,
  Bookmark, MessageSquare, Send, ChevronDown, Play, Lock,
  Globe, Clock, Tag, Building2, Download, Share2, MoreHorizontal,
  Image as ImageIcon, Film, ChevronLeft, ChevronRight, Reply,
  Filter, Check, ArrowUpDown, Camera
} from "lucide-react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const MEDIA_ITEMS = [
  {
    id: 1, type: "image",
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=70",
    title: "Engineering Offsite — Goa 2024",
    description: "The annual engineering offsite brought together 80 engineers across frontend, backend, and infra squads for two days of deep-dive workshops, async retros, and team bonding by the coast.",
    uploader: "Rohan Mehta", uploaderInitials: "RM", uploaderColor: "bg-sky-500",
    department: "Engineering", date: "Dec 12, 2024",
    access: "public", tags: ["#Engineering", "#Offsite", "#Team"],
    likes: 84, views: 312, saved: false,
    aspectRatio: "landscape",
    comments: [
      { id: 1, author: "Priya Das", initials: "PD", color: "bg-rose-500", time: "2d ago", text: "Best offsite yet! The workshop on day 2 was genuinely transformative.", replies: [{ id: 11, author: "Rohan Mehta", initials: "RM", color: "bg-sky-500", time: "2d ago", text: "Agreed! The async-first discussion alone was worth the trip." }] },
      { id: 2, author: "Karan Joshi", initials: "KJ", color: "bg-indigo-500", time: "1d ago", text: "The beachside retro was something I'll remember for years. Well organized team.", replies: [] },
    ],
  },
  {
    id: 2, type: "image",
    src: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=70",
    title: "Diwali Celebrations 2024",
    description: "The Mumbai office lit up for Diwali with decorations, traditional sweets, and a team rangoli competition that ran 3 hours longer than planned — because no one wanted to stop.",
    uploader: "Anjali Rao", uploaderInitials: "AR", uploaderColor: "bg-amber-500",
    department: "Culture Team", date: "Nov 1, 2024",
    access: "public", tags: ["#Festival", "#Mumbai", "#Culture"],
    likes: 210, views: 891, saved: true,
    aspectRatio: "portrait",
    comments: [
      { id: 1, author: "Dev Kapoor", initials: "DK", color: "bg-emerald-500", time: "3d ago", text: "The rangoli was stunning. Whoever did the central mandala — absolute talent.", replies: [] },
    ],
  },
  {
    id: 3, type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumb: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&q=70",
    title: "CEO Year-End Address — 2024",
    description: "CEO Anika Sharma reflects on FY2024 milestones — 40% revenue growth, two acquisitions, and the launch of Project Horizon — and shares a candid vision for 2025.",
    uploader: "Communications", uploaderInitials: "CO", uploaderColor: "bg-violet-500",
    department: "Leadership", date: "Dec 28, 2024",
    access: "public", tags: ["#Leadership", "#Strategy", "#2025"],
    likes: 156, views: 1240, saved: false,
    aspectRatio: "landscape",
    comments: [
      { id: 1, author: "Meena Iyer", initials: "MI", color: "bg-pink-500", time: "5d ago", text: "Anika's segment on culture and belonging genuinely moved me. Proud to be here.", replies: [] },
      { id: 2, author: "Sanket Padhi", initials: "SP", color: "bg-indigo-500", time: "4d ago", text: "The Project Horizon preview was fire. Cannot wait for Q1 kickoff.", replies: [{ id: 21, author: "Communications", initials: "CO", color: "bg-violet-500", time: "4d ago", text: "Full deep-dive session coming Jan 15! Watch for the calendar invite." }] },
    ],
  },
  {
    id: 4, type: "image",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&q=70",
    title: "PulseOS v3 Launch Moment",
    description: "The exact moment the deploy button was hit on PulseOS v3.0. 14 months of work, 11,000 automated tests, and one very nervous CTO.",
    uploader: "Karan Joshi", uploaderInitials: "KJ", uploaderColor: "bg-indigo-500",
    department: "Engineering", date: "Mar 15, 2025",
    access: "public", tags: ["#Launch", "#Engineering", "#Milestone"],
    likes: 198, views: 756, saved: false,
    aspectRatio: "landscape",
    comments: [],
  },
  {
    id: 5, type: "image",
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=70",
    title: "Design Sprint — New Onboarding UX",
    description: "Two days, one room, twelve people, forty sticky notes. The sprint that produced a 34% drop-off reduction before it even shipped.",
    uploader: "Priya Das", uploaderInitials: "PD", uploaderColor: "bg-rose-500",
    department: "Product", date: "Mar 6, 2025",
    access: "public", tags: ["#Design", "#Product", "#UX"],
    likes: 63, views: 284, saved: false,
    aspectRatio: "portrait",
    comments: [],
  },
  {
    id: 6, type: "image",
    src: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1528605105345-5344ea20e269?w=600&q=70",
    title: "HR Town Hall — Q4 2024",
    description: "The quarterly HR town hall drew 350 attendees across offices. Open Q&A ran 90 minutes — the longest in company history, and a good sign.",
    uploader: "Meena Iyer", uploaderInitials: "MI", uploaderColor: "bg-pink-500",
    department: "HR", date: "Nov 14, 2024",
    access: "restricted", tags: ["#HR", "#Townhall", "#Q4"],
    likes: 44, views: 502, saved: false,
    aspectRatio: "landscape",
    comments: [],
  },
  {
    id: 7, type: "video",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
    thumb: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=70",
    title: "Company Day 2025 — Highlights Reel",
    description: "Three minutes. Three hundred people. One unforgettable day. The Culture Team's official highlights reel from Company Day 2025.",
    uploader: "Culture Team", uploaderInitials: "CT", uploaderColor: "bg-teal-500",
    department: "Culture Team", date: "Mar 22, 2025",
    access: "public", tags: ["#CompanyDay", "#Culture", "#2025"],
    likes: 287, views: 1890, saved: true,
    aspectRatio: "landscape",
    comments: [],
  },
  {
    id: 8, type: "image",
    src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=70",
    title: "Dev Kapoor — 10-Year Anniversary",
    description: "The surprise recognition ceremony for CFO Dev Kapoor's decade at PulseHub. Reportedly the first time anyone has seen him cry at work.",
    uploader: "Anjali Rao", uploaderInitials: "AR", uploaderColor: "bg-amber-500",
    department: "Finance", date: "Feb 20, 2025",
    access: "public", tags: ["#People", "#Anniversary", "#Finance"],
    likes: 311, views: 1104, saved: false,
    aspectRatio: "portrait",
    comments: [],
  },
  {
    id: 9, type: "image",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
    thumb: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=70",
    title: "Bengaluru Office — New Space",
    description: "The newly renovated Bengaluru office opened in January 2025, featuring open collaboration zones, focus pods, and a rooftop terrace.",
    uploader: "Admin Team", uploaderInitials: "AT", uploaderColor: "bg-slate-500",
    department: "Admin", date: "Jan 8, 2025",
    access: "public", tags: ["#Office", "#Bengaluru", "#Spaces"],
    likes: 102, views: 630, saved: false,
    aspectRatio: "landscape",
    comments: [],
  },
];

const DEPARTMENTS = ["All", "Engineering", "HR", "Culture Team", "Leadership", "Product", "Finance", "Admin"];
const SORT_OPTIONS = [
  { key: "latest", label: "Latest" },
  { key: "liked", label: "Most Liked" },
  { key: "viewed", label: "Most Viewed" },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function fmtCount(n) {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return String(n);
}

// ─── COMMENT THREAD ───────────────────────────────────────────────────────────

function CommentThread({ comment, onReply }) {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const submit = () => {
    if (!replyText.trim()) return;
    onReply(comment.id, replyText);
    setReplyText("");
    setShowReplyInput(false);
  };

  return (
    <div>
      <div className="flex gap-2.5 group">
        <div className={`w-7 h-7 rounded-full ${comment.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
          {comment.initials}
        </div>
        <div className="flex-1">
          <div className="bg-slate-50 rounded-xl px-3.5 py-2.5 border border-slate-100">
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs font-semibold text-slate-800">{comment.author}</span>
              <span className="text-xs text-slate-400">{comment.time}</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{comment.text}</p>
          </div>
          <button
            onClick={() => setShowReplyInput(s => !s)}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 mt-1.5 ml-1 transition-colors"
          >
            <Reply size={11} /> Reply
          </button>
          {showReplyInput && (
            <div className="flex items-center gap-2 mt-2 ml-1">
              <div className="flex-1 flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2">
                <input
                  autoFocus
                  type="text"
                  placeholder={`Reply to ${comment.author}…`}
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && submit()}
                  className="flex-1 text-xs outline-none text-slate-700 placeholder-slate-400 bg-transparent"
                />
                <button onClick={submit} className="text-slate-400 hover:text-indigo-500 transition-colors"><Send size={12} /></button>
              </div>
            </div>
          )}
        </div>
      </div>

      {comment.replies?.length > 0 && (
        <div className="ml-9 mt-2 space-y-2 pl-3 border-l-2 border-slate-100">
          {comment.replies.map(r => (
            <div key={r.id} className="flex gap-2.5">
              <div className={`w-6 h-6 rounded-full ${r.color} flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5`}>
                {r.initials}
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xs font-semibold text-slate-800">{r.author}</span>
                  <span className="text-xs text-slate-400">{r.time}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{r.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── DETAIL MODAL ─────────────────────────────────────────────────────────────

function MediaModal({ item, items, onClose, onNavigate }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(item.saved);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(item.comments);
  const currentIdx = items.findIndex(i => i.id === item.id);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const esc = e => { if (e.key === "Escape") onClose(); if (e.key === "ArrowLeft") onNavigate(-1); if (e.key === "ArrowRight") onNavigate(1); };
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [onClose, onNavigate]);

  const addComment = () => {
    if (!newComment.trim()) return;
    setComments(c => [...c, { id: Date.now(), author: "You", initials: "ME", color: "bg-slate-500", time: "Just now", text: newComment, replies: [] }]);
    setNewComment("");
  };

  const addReply = (commentId, text) => {
    setComments(c => c.map(cm => cm.id === commentId
      ? { ...cm, replies: [...cm.replies, { id: Date.now(), author: "You", initials: "ME", color: "bg-slate-500", time: "Just now", text }] }
      : cm
    ));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch" onClick={onClose}>
      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-md" />

      {/* Prev */}
      {currentIdx > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate(-1); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/20 backdrop-blur-sm transition"
        >
          <ChevronLeft size={18} />
        </button>
      )}
      {/* Next */}
      {currentIdx < items.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate(1); }}
          className="absolute right-4 lg:right-[420px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white border border-white/20 backdrop-blur-sm transition"
        >
          <ChevronRight size={18} />
        </button>
      )}

      <div className="relative z-10 flex w-full" onClick={e => e.stopPropagation()}>
        {/* Media Side */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-10 min-w-0">
          {item.type === "image" ? (
            <img
              src={item.src}
              alt={item.title}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
              style={{ maxHeight: "calc(100vh - 48px)" }}
            />
          ) : (
            <video
              src={item.src}
              controls
              autoPlay
              className="max-w-full rounded-xl shadow-2xl"
              style={{ maxHeight: "calc(100vh - 48px)" }}
            />
          )}
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-96 xl:w-[420px] bg-white flex flex-col shrink-0 overflow-hidden hidden lg:flex">
          {/* Header */}
          <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${item.uploaderColor} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                {item.uploaderInitials}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 leading-none">{item.uploader}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-xs text-slate-400">{item.department}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition shrink-0">
              <X size={16} />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
            <div className="px-5 py-4 space-y-4">
              {/* Title + description */}
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h2 className="text-base font-bold text-slate-900 leading-snug flex-1">{item.title}</h2>
                  <span className={`shrink-0 flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${item.access === "restricted" ? "bg-rose-50 text-rose-600 border-rose-200" : "bg-emerald-50 text-emerald-600 border-emerald-200"}`}>
                    {item.access === "restricted" ? <Lock size={10} /> : <Globe size={10} />}
                    {item.access === "restricted" ? "Restricted" : "Public"}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map(t => (
                  <span key={t} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200">{t}</span>
                ))}
              </div>

              {/* Stats + Actions */}
              <div className="flex items-center gap-2 pt-1 pb-3 border-b border-slate-100">
                <button
                  onClick={() => setLiked(l => !l)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ${liked ? "bg-rose-50 text-rose-600 border-rose-200" : "text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  <Heart size={14} className={liked ? "fill-rose-500 text-rose-500" : ""} />
                  {fmtCount(item.likes + (liked ? 1 : 0))}
                </button>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm text-slate-500 border border-slate-200">
                  <Eye size={14} />
                  {fmtCount(item.views)}
                </div>
                <button
                  onClick={() => setSaved(s => !s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all border ml-auto ${saved ? "bg-amber-50 text-amber-600 border-amber-200" : "text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                >
                  <Bookmark size={14} className={saved ? "fill-amber-500 text-amber-500" : ""} />
                  {saved ? "Saved" : "Save"}
                </button>
              </div>

              {/* Comments */}
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Comments {comments.length > 0 && `(${comments.length})`}
                </p>
                <div className="space-y-4">
                  {comments.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">No comments yet. Be the first to comment.</p>
                  )}
                  {comments.map(c => (
                    <CommentThread key={c.id} comment={c} onReply={addReply} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Comment Input */}
          <div className="px-5 py-4 border-t border-slate-100 bg-white">
            <div className="flex gap-2.5">
              <div className="w-7 h-7 rounded-full bg-slate-400 flex items-center justify-center text-white text-xs font-bold shrink-0">ME</div>
              <div className="flex-1 flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-indigo-300 transition-colors">
                <input
                  type="text"
                  placeholder="Add a comment…"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && addComment()}
                  className="flex-1 text-xs outline-none bg-transparent text-slate-700 placeholder-slate-400"
                />
                <button onClick={addComment} className="text-slate-400 hover:text-indigo-500 transition-colors shrink-0">
                  <Send size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MEDIA CARD ───────────────────────────────────────────────────────────────

function MediaCard({ item, view, onClick }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(item.saved);

  if (view === "list") {
    return (
      <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-slate-300 hover:shadow-sm transition-all group cursor-pointer" onClick={onClick}>
        <div className="relative w-20 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
          <img src={item.thumb} alt={item.title} loading="lazy" className="w-full h-full object-cover" />
          {item.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30">
              <div className="w-5 h-5 rounded-full bg-white/80 flex items-center justify-center">
                <Play size={9} className="text-slate-800 ml-0.5 fill-slate-800" />
              </div>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${item.type === "video" ? "bg-rose-50 text-rose-600" : "bg-sky-50 text-sky-600"}`}>
              {item.type === "video" ? "Video" : "Image"}
            </span>
            {item.access === "restricted" && <Lock size={11} className="text-slate-400" />}
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mt-1 truncate group-hover:text-indigo-700 transition-colors">{item.title}</h3>
          <div className="flex items-center gap-3 mt-1 text-xs text-slate-400">
            <span>{item.uploader}</span>
            <span className="text-slate-300">·</span>
            <span>{item.department}</span>
            <span className="text-slate-300">·</span>
            <span>{item.date}</span>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 text-xs text-slate-400">
          <span className="flex items-center gap-1"><Heart size={12} />{fmtCount(item.likes)}</span>
          <span className="flex items-center gap-1"><Eye size={12} />{fmtCount(item.views)}</span>
          <span className="flex items-center gap-1"><MessageSquare size={12} />{item.comments.length}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden bg-slate-100" style={{ aspectRatio: item.aspectRatio === "portrait" ? "3/4" : "16/10" }}>
        <img
          src={item.thumb}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ${hovered ? "scale-105" : "scale-100"}`}
        />

        {/* Video overlay */}
        {item.type === "video" && (
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${hovered ? "bg-slate-900/40" : "bg-slate-900/20"}`}>
            <div className={`w-12 h-12 rounded-full bg-white/20 border border-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 ${hovered ? "scale-110 bg-white/30" : ""}`}>
              <Play size={18} className="text-white fill-white ml-0.5" />
            </div>
          </div>
        )}

        {/* Hover overlay for images */}
        {item.type === "image" && (
          <div className={`absolute inset-0 bg-slate-900/0 transition-all duration-200 ${hovered ? "bg-slate-900/20" : ""}`} />
        )}

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium backdrop-blur-sm border ${item.type === "video" ? "bg-slate-900/60 text-white border-white/20" : "bg-white/80 text-slate-700 border-white/60"}`}>
            {item.type === "video" ? <span className="flex items-center gap-1"><Film size={10} /> Video</span> : <span className="flex items-center gap-1"><ImageIcon size={10} /> Photo</span>}
          </span>
          {item.access === "restricted" && (
            <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-rose-500/90 text-white border border-white/20 backdrop-blur-sm flex items-center gap-1">
              <Lock size={9} /> Restricted
            </span>
          )}
        </div>

        {/* Quick actions on hover */}
        <div className={`absolute top-2.5 right-2.5 flex flex-col gap-1.5 transition-all duration-200 ${hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1"}`}>
          <button
            onClick={e => { e.stopPropagation(); setSaved(s => !s); }}
            className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm border transition-colors ${saved ? "bg-amber-400/90 text-white border-amber-300" : "bg-white/80 text-slate-600 border-white/60 hover:bg-white"}`}
          >
            <Bookmark size={13} className={saved ? "fill-white" : ""} />
          </button>
          <button
            onClick={e => { e.stopPropagation(); setLiked(l => !l); }}
            className={`w-7 h-7 rounded-full flex items-center justify-center backdrop-blur-sm border transition-colors ${liked ? "bg-rose-500/90 text-white border-rose-400" : "bg-white/80 text-slate-600 border-white/60 hover:bg-white"}`}
          >
            <Heart size={13} className={liked ? "fill-white" : ""} />
          </button>
        </div>
      </div>

      {/* Card footer */}
      <div className="p-3.5">
        <h3 className="text-sm font-semibold text-slate-800 leading-snug line-clamp-1 mb-2">{item.title}</h3>

        <div className="flex items-center gap-2 mb-2.5">
          <div className={`w-5 h-5 rounded-full ${item.uploaderColor} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {item.uploaderInitials[0]}
          </div>
          <span className="text-xs text-slate-500 truncate">{item.uploader}</span>
          <span className="text-xs text-slate-300 shrink-0">·</span>
          <span className="text-xs px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded-md shrink-0">{item.department}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-2.5">
          {item.tags.slice(0, 2).map(t => (
            <span key={t} className="text-xs text-slate-400">{t}</span>
          ))}
          {item.tags.length > 2 && <span className="text-xs text-slate-300">+{item.tags.length - 2}</span>}
        </div>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100">
          <span className="flex items-center gap-1"><Clock size={10} />{item.date}</span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Heart size={11} />{fmtCount(item.likes + (liked ? 1 : 0))}</span>
            <span className="flex items-center gap-1"><Eye size={11} />{fmtCount(item.views)}</span>
            <span className="flex items-center gap-1"><MessageSquare size={11} />{item.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function MediaGallery() {
  const [query, setQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [sort, setSort] = useState("latest");
  const [view, setView] = useState("grid");
  const [selected, setSelected] = useState(null);
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const h = e => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const filtered = MEDIA_ITEMS
    .filter(item => {
      const q = query.toLowerCase();
      const matchQ = !q || item.title.toLowerCase().includes(q) || item.uploader.toLowerCase().includes(q) || item.department.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
      const matchDept = deptFilter === "All" || item.department === deptFilter;
      const matchType = typeFilter === "All" || item.type === typeFilter.toLowerCase();
      return matchQ && matchDept && matchType;
    })
    .sort((a, b) => {
      if (sort === "liked") return (b.likes) - (a.likes);
      if (sort === "viewed") return b.views - a.views;
      return 0;
    });

  const selectedIdx = selected ? filtered.findIndex(i => i.id === selected.id) : -1;

  const navigate = useCallback((dir) => {
    const next = filtered[selectedIdx + dir];
    if (next) setSelected(next);
  }, [filtered, selectedIdx]);

  const images = MEDIA_ITEMS.filter(m => m.type === "image").length;
  const videos = MEDIA_ITEMS.filter(m => m.type === "video").length;

  return (
    <div className="min-h-screen bg-slate-50" style={{ fontFamily: "'Plus Jakarta Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        * { box-sizing: border-box; }
        .line-clamp-1 { display:-webkit-box; -webkit-line-clamp:1; -webkit-box-orient:vertical; overflow:hidden; }
        .masonry { columns: 1; column-gap: 1rem; }
        @media (min-width: 640px) { .masonry { columns: 2; } }
        @media (min-width: 1024px) { .masonry { columns: 3; } }
        @media (min-width: 1280px) { .masonry { columns: 4; } }
        .masonry-item { break-inside: avoid; margin-bottom: 1rem; }
      `}</style>

      {/* ── HEADER ── */}
      <header className="sticky top-0 z-40 bg-white/96 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center shadow-sm">
                <Camera size={15} className="text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 leading-none">Media Hub</h1>
                <p className="text-xs text-slate-400 mt-0.5 leading-none">{images} photos · {videos} videos</p>
              </div>
            </div>

            {/* Search */}
            <div className="flex-1 flex items-center gap-2 bg-slate-100 rounded-xl px-3.5 py-2.5 focus-within:bg-white focus-within:border focus-within:border-indigo-200 transition-all border border-transparent">
              <Search size={14} className="text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Search by title, uploader, department, or tag…"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="flex-1 text-sm bg-transparent outline-none text-slate-700 placeholder-slate-400"
              />
              {query && <button onClick={() => setQuery("")}><X size={13} className="text-slate-400 hover:text-slate-600" /></button>}
            </div>

            {/* View Toggle */}
            <div className="flex items-center bg-slate-100 rounded-xl p-1 shrink-0">
              <button onClick={() => setView("grid")} className={`p-1.5 rounded-lg transition-all ${view === "grid" ? "bg-white shadow-sm text-slate-700" : "text-slate-400 hover:text-slate-600"}`}>
                <Grid3X3 size={14} />
              </button>
              <button onClick={() => setView("list")} className={`p-1.5 rounded-lg transition-all ${view === "list" ? "bg-white shadow-sm text-slate-700" : "text-slate-400 hover:text-slate-600"}`}>
                <List size={14} />
              </button>
            </div>

            {/* Sort */}
            <div className="relative shrink-0" ref={sortRef}>
              <button
                onClick={() => setSortOpen(o => !o)}
                className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 hover:border-slate-300 transition-colors"
              >
                <ArrowUpDown size={13} className="text-slate-400" />
                {SORT_OPTIONS.find(s => s.key === sort)?.label}
                <ChevronDown size={12} className={`text-slate-400 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </button>
              {sortOpen && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-50 min-w-36 overflow-hidden">
                  {SORT_OPTIONS.map(o => (
                    <button
                      key={o.key}
                      onClick={() => { setSort(o.key); setSortOpen(false); }}
                      className={`w-full flex items-center justify-between px-4 py-2 text-sm transition-colors ${sort === o.key ? "text-indigo-600 bg-indigo-50 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
                    >
                      {o.label}
                      {sort === o.key && <Check size={12} />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-slate-100">
            {/* Department */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide shrink-0">Dept</span>
              <div className="flex items-center gap-1.5">
                {DEPARTMENTS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDeptFilter(d)}
                    className={`text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all border font-medium ${deptFilter === d ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="w-px h-5 bg-slate-200 shrink-0" />

            {/* Type */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide shrink-0">Type</span>
              <div className="flex items-center gap-1.5">
                {["All", "Image", "Video"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full whitespace-nowrap transition-all border font-medium ${typeFilter === t ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"}`}
                  >
                    {t === "Image" && <ImageIcon size={10} />}
                    {t === "Video" && <Film size={10} />}
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-slate-400 ml-auto shrink-0">{filtered.length} item{filtered.length !== 1 ? "s" : ""}</span>
          </div>
        </div>
      </header>

      {/* ── BODY ── */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {filtered.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl py-20 text-center">
            <Camera size={36} className="mx-auto mb-3 text-slate-200" />
            <p className="text-slate-500 font-semibold">No media found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filters</p>
            <button onClick={() => { setQuery(""); setDeptFilter("All"); setTypeFilter("All"); }} className="mt-4 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
              Clear all filters
            </button>
          </div>
        ) : view === "grid" ? (
          <div className="masonry">
            {filtered.map(item => (
              <div key={item.id} className="masonry-item">
                <MediaCard item={item} view="grid" onClick={() => setSelected(item)} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map(item => (
              <MediaCard key={item.id} item={item} view="list" onClick={() => setSelected(item)} />
            ))}
          </div>
        )}
      </main>

      {/* ── MODAL ── */}
      {selected && (
        <MediaModal
          item={selected}
          items={filtered}
          onClose={() => setSelected(null)}
          onNavigate={navigate}
        />
      )}
    </div>
  );
}