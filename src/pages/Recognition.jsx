
import { useState, useRef, useEffect } from "react";
import {
  Zap, Search, Bell, ChevronDown, X, Award, Medal, Star,
  Heart, MessageSquare, Send, Check, Filter, Calendar,
  Users, Lightbulb, Handshake, TrendingUp, Shield, Smile,
  Plus, ArrowRight, Sparkles, Trophy, Crown, ThumbsUp,
  Building2, ChevronRight, SlidersHorizontal, Clock,
} from "lucide-react";

// ─── Mock Data ───────────────────────────────────────────────────────────────

const MOCK_FEED = [
  {
    id: 1,
    sender: { name: "Leila Ahmadi", avatar: "LA", dept: "Marketing", color: "bg-violet-600" },
    receiver: { name: "James Whitfield", avatar: "JW", dept: "Content", color: "bg-teal-600" },
    message: "James completely transformed our brand voice guidelines from scratch in under a week. The whole team is now aligned for the first time in years. Truly exceptional work that will have lasting impact.",
    tag: "Innovation",
    tagIcon: Lightbulb,
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    dotColor: "bg-amber-400",
    time: "2h ago",
    likes: 48,
    comments: 12,
    liked: false,
  },
  {
    id: 2,
    sender: { name: "Deepak Nair", avatar: "DN", dept: "Engineering", color: "bg-blue-600" },
    receiver: { name: "Sara Okonkwo", avatar: "SO", dept: "Platform", color: "bg-rose-600" },
    message: "Sara saved our entire APAC launch by resolving a P0 incident at 2am with zero escalation needed. Her calm under pressure and sheer technical depth are unmatched. The whole org owes her one.",
    tag: "Leadership",
    tagIcon: Shield,
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    dotColor: "bg-blue-500",
    time: "5h ago",
    likes: 91,
    comments: 23,
    liked: true,
  },
  {
    id: 3,
    sender: { name: "Nadia Petrov", avatar: "NP", dept: "Product", color: "bg-indigo-600" },
    receiver: { name: "Carlos Mendez", avatar: "CM", dept: "Design", color: "bg-orange-500" },
    message: "Carlos redesigned our entire onboarding experience in 3 days — drop-off went from 62% to 24%. He brought the whole cross-functional team along with workshops and made the process actually fun.",
    tag: "Teamwork",
    tagIcon: Handshake,
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    time: "1d ago",
    likes: 67,
    comments: 8,
    liked: false,
  },
  {
    id: 4,
    sender: { name: "Marcus Chen", avatar: "MC", dept: "Strategy", color: "bg-slate-700" },
    receiver: { name: "Yuki Tanaka", avatar: "YT", dept: "Engineering", color: "bg-cyan-600" },
    message: "Yuki's infrastructure refactor reduced our AWS bill by $180k/month without touching a single customer-facing feature. That's the kind of quiet excellence that makes companies thrive.",
    tag: "Impact",
    tagIcon: TrendingUp,
    tagColor: "bg-violet-50 text-violet-700 border-violet-200",
    dotColor: "bg-violet-500",
    time: "2d ago",
    likes: 134,
    comments: 31,
    liked: false,
  },
  {
    id: 5,
    sender: { name: "Amara Diallo", avatar: "AD", dept: "Sales", color: "bg-emerald-600" },
    receiver: { name: "Priya Sharma", avatar: "PS", dept: "Product", color: "bg-pink-600" },
    message: "Priya stayed two extra hours every night to help close our biggest deal of the year. She translated technical specs into language the client could trust. She's the reason we won it.",
    tag: "Teamwork",
    tagIcon: Handshake,
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    dotColor: "bg-emerald-500",
    time: "3d ago",
    likes: 55,
    comments: 7,
    liked: false,
  },
];

const LEADERBOARD = [
  { rank: 1, name: "Yuki Tanaka", dept: "Engineering", avatar: "YT", color: "bg-cyan-600", points: 1840, badges: 12 },
  { rank: 2, name: "Sara Okonkwo", dept: "Platform", avatar: "SO", color: "bg-rose-600", points: 1620, badges: 10 },
  { rank: 3, name: "Carlos Mendez", dept: "Design", avatar: "CM", color: "bg-orange-500", points: 1455, badges: 9 },
  { rank: 4, name: "Priya Sharma", dept: "Product", avatar: "PS", color: "bg-pink-600", points: 1204, badges: 7 },
  { rank: 5, name: "James Whitfield", dept: "Content", avatar: "JW", color: "bg-teal-600", points: 980, badges: 6 },
];

const DEPARTMENTS = ["All Departments", "Engineering", "Marketing", "HR", "Sales", "Product", "Design", "Operations"];
const REC_TYPES = ["All Types", "Innovation", "Teamwork", "Leadership", "Impact", "Excellence"];
const DATE_RANGES = ["Any Time", "Today", "This Week", "This Month", "This Quarter"];

const TAG_OPTIONS = [
  { label: "Teamwork", icon: Handshake, color: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  { label: "Innovation", icon: Lightbulb, color: "bg-amber-50 text-amber-700 border border-amber-200" },
  { label: "Leadership", icon: Shield, color: "bg-blue-50 text-blue-700 border border-blue-200" },
  { label: "Impact", icon: TrendingUp, color: "bg-violet-50 text-violet-700 border border-violet-200" },
  { label: "Excellence", icon: Star, color: "bg-rose-50 text-rose-700 border border-rose-200" },
  { label: "Culture", icon: Smile, color: "bg-pink-50 text-pink-700 border border-pink-200" },
];

const EMPLOYEE_OPTIONS = [
  { name: "Yuki Tanaka", dept: "Engineering", avatar: "YT", color: "bg-cyan-600" },
  { name: "Sara Okonkwo", dept: "Platform", avatar: "SO", color: "bg-rose-600" },
  { name: "Carlos Mendez", dept: "Design", avatar: "CM", color: "bg-orange-500" },
  { name: "James Whitfield", dept: "Content", avatar: "JW", color: "bg-teal-600" },
  { name: "Amara Diallo", dept: "Sales", avatar: "AD", color: "bg-emerald-600" },
  { name: "Deepak Nair", dept: "Engineering", avatar: "DN", color: "bg-blue-600" },
  { name: "Leila Ahmadi", dept: "Marketing", avatar: "LA", color: "bg-violet-600" },
  { name: "Marcus Chen", dept: "Strategy", avatar: "MC", color: "bg-slate-700" },
];

// ─── Primitives ───────────────────────────────────────────────────────────────

function Avatar({ initials, color = "bg-slate-700", size = "md" }) {
  const sz = {
    sm: "w-7 h-7 text-xs",
    md: "w-9 h-9 text-sm",
    lg: "w-11 h-11 text-base",
    xl: "w-14 h-14 text-lg",
  };
  return (
    <div className={`${sz[size]} ${color} rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 select-none`}>
      {initials}
    </div>
  );
}

function RankMedal({ rank }) {
  if (rank === 1) return <Crown className="w-4 h-4 text-amber-500" />;
  if (rank === 2) return <Medal className="w-4 h-4 text-slate-400" />;
  if (rank === 3) return <Medal className="w-4 h-4 text-amber-700" />;
  return <span className="text-xs font-bold text-slate-400 w-4 text-center">{rank}</span>;
}

function FilterDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${value !== options[0] ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
      >
        {value === options[0] ? label : value}
        <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute top-full mt-1.5 left-0 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-1 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${opt === value ? "text-blue-600 bg-blue-50 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {opt}
              {opt === value && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Recognition Card ─────────────────────────────────────────────────────────

function RecognitionCard({ item, onLike }) {
  const TagIcon = item.tagIcon;
  return (
    <div className="bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-5 group">
      {/* Sender → Receiver */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Avatar initials={item.sender.avatar} color={item.sender.color} size="sm" />
          <div>
            <p className="text-xs font-semibold text-slate-800 leading-none">{item.sender.name}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{item.sender.dept}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 mx-1">
          <div className="h-px w-5 bg-slate-200" />
          <div className="w-5 h-5 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          </div>
          <div className="h-px w-5 bg-slate-200" />
        </div>

        <div className="flex items-center gap-2">
          <Avatar initials={item.receiver.avatar} color={item.receiver.color} size="sm" />
          <div>
            <p className="text-xs font-semibold text-slate-800 leading-none">{item.receiver.name}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">{item.receiver.dept}</p>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-2 flex-shrink-0">
          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${item.tagColor}`}>
            <TagIcon className="w-2.5 h-2.5" />
            {item.tag}
          </span>
          <span className="flex items-center gap-1 text-[10px] text-slate-400">
            <Clock className="w-3 h-3" /> {item.time}
          </span>
        </div>
      </div>

      {/* Message */}
      <p className="text-sm text-slate-600 leading-relaxed mb-4 pl-0">{item.message}</p>

      {/* Actions */}
      <div className="flex items-center gap-1 pt-3 border-t border-slate-50">
        <button
          onClick={() => onLike(item.id)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${item.liked ? "bg-rose-50 text-rose-600 border border-rose-200" : "text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent"}`}
        >
          <Heart className={`w-3.5 h-3.5 ${item.liked ? "fill-rose-500 text-rose-500" : ""}`} />
          {item.likes + (item.liked ? 0 : 0)}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent transition-all">
          <MessageSquare className="w-3.5 h-3.5" />
          {item.comments}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-700 border border-transparent transition-all">
          <ThumbsUp className="w-3.5 h-3.5" />
          Celebrate
        </button>
      </div>
    </div>
  );
}

// ─── Give Recognition Modal ───────────────────────────────────────────────────

function GiveRecognitionModal({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const filtered = EMPLOYEE_OPTIONS.filter(
    (e) =>
      e.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      e.dept.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  function handleSubmit() {
    if (!selectedEmployee || !message.trim() || !selectedTag) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({ selectedEmployee, message, selectedTag });
      onClose();
    }, 1800);
  }

  const canProceed1 = !!selectedEmployee;
  const canSubmit = !!selectedEmployee && message.trim().length > 10 && !!selectedTag;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: "rgba(15,23,42,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">

        {/* Modal header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-amber-500" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">Give Recognition</h2>
                <p className="text-[11px] text-slate-400">Celebrate a colleague's contribution</p>
              </div>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Step indicator */}
          {!submitted && (
            <div className="flex items-center gap-2 mt-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold transition-all ${step >= s ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    {step > s ? <Check className="w-3 h-3" /> : s}
                  </div>
                  <span className={`text-[11px] transition-colors ${step === s ? "text-slate-700 font-medium" : "text-slate-400"}`}>
                    {s === 1 ? "Select colleague" : s === 2 ? "Write message" : "Choose tag"}
                  </span>
                  {s < 3 && <ChevronRight className="w-3 h-3 text-slate-300" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal body */}
        <div className="px-6 py-5">
          {submitted ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <div className="w-14 h-14 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center">
                <Check className="w-7 h-7 text-emerald-500" />
              </div>
              <p className="text-base font-bold text-slate-800">Recognition sent!</p>
              <p className="text-sm text-slate-500 text-center">
                Your appreciation for <span className="font-medium text-slate-700">{selectedEmployee?.name}</span> has been shared with the team.
              </p>
            </div>
          ) : step === 1 ? (
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-3">Who are you recognizing?</p>
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Search by name or department…"
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 focus:border-blue-300 focus:bg-white rounded-xl outline-none transition-all text-slate-700 placeholder-slate-400"
                />
              </div>
              <div className="space-y-1.5 max-h-56 overflow-y-auto">
                {filtered.map((emp) => (
                  <button
                    key={emp.name}
                    onClick={() => setSelectedEmployee(emp)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${selectedEmployee?.name === emp.name ? "border-blue-300 bg-blue-50" : "border-transparent hover:bg-slate-50 hover:border-slate-200"}`}
                  >
                    <Avatar initials={emp.avatar} color={emp.color} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-slate-800">{emp.name}</p>
                      <p className="text-[11px] text-slate-400">{emp.dept}</p>
                    </div>
                    {selectedEmployee?.name === emp.name && (
                      <div className="ml-auto w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            <div>
              {selectedEmployee && (
                <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <Avatar initials={selectedEmployee.avatar} color={selectedEmployee.color} size="sm" />
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{selectedEmployee.name}</p>
                    <p className="text-[11px] text-slate-400">{selectedEmployee.dept}</p>
                  </div>
                  <button onClick={() => { setSelectedEmployee(null); setStep(1); }} className="ml-auto text-slate-400 hover:text-slate-600 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
              <p className="text-xs font-semibold text-slate-700 mb-2">Write your recognition</p>
              <textarea
                autoFocus
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe what they did and why it mattered. Be specific — it makes the recognition more meaningful…"
                rows={5}
                className="w-full px-4 py-3 text-xs bg-slate-50 border border-slate-200 focus:border-blue-300 focus:bg-white rounded-xl outline-none transition-all text-slate-700 placeholder-slate-400 resize-none leading-relaxed"
              />
              <p className={`text-[11px] mt-1.5 text-right transition-colors ${message.length < 10 ? "text-slate-300" : "text-slate-400"}`}>
                {message.length} characters {message.length >= 10 ? "✓" : "(min 10)"}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xs font-semibold text-slate-700 mb-3">What best describes this recognition?</p>
              <div className="grid grid-cols-2 gap-2">
                {TAG_OPTIONS.map((tag) => {
                  const Icon = tag.icon;
                  return (
                    <button
                      key={tag.label}
                      onClick={() => setSelectedTag(tag.label)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border transition-all text-left ${selectedTag === tag.label ? "border-blue-300 bg-blue-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"}`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tag.color.split(" ")[0]} border ${tag.color.split(" ")[2]}`}>
                        <Icon className={`w-3.5 h-3.5 ${tag.color.split(" ")[1]}`} />
                      </div>
                      <span className={`text-xs font-medium ${selectedTag === tag.label ? "text-blue-700" : "text-slate-700"}`}>{tag.label}</span>
                      {selectedTag === tag.label && <Check className="w-3.5 h-3.5 text-blue-500 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal footer */}
        {!submitted && (
          <div className="px-6 pb-6 flex items-center justify-between gap-3">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                Back
              </button>
            ) : (
              <button onClick={onClose} className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors">
                Cancel
              </button>
            )}
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !canProceed1 : message.trim().length < 10}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all"
              >
                Continue <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="flex items-center gap-1.5 px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl transition-all shadow-sm shadow-blue-200"
              >
                <Send className="w-3.5 h-3.5" /> Send Recognition
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RecognitionHub() {
  const [feed, setFeed] = useState(MOCK_FEED);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState(DEPARTMENTS[0]);
  const [typeFilter, setTypeFilter] = useState(REC_TYPES[0]);
  const [dateFilter, setDateFilter] = useState(DATE_RANGES[0]);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  function handleLike(id) {
    setFeed((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
    );
  }

  function handleSubmit({ selectedEmployee, message, selectedTag }) {
    const tag = TAG_OPTIONS.find((t) => t.label === selectedTag);
    const newCard = {
      id: Date.now(),
      sender: { name: "Priya Sharma", avatar: "PS", dept: "Product", color: "bg-pink-600" },
      receiver: {
        name: selectedEmployee.name,
        avatar: selectedEmployee.avatar,
        dept: selectedEmployee.dept,
        color: selectedEmployee.color,
      },
      message,
      tag: selectedTag,
      tagIcon: tag.icon,
      tagColor: tag.color.includes("amber") ? "bg-amber-50 text-amber-700 border-amber-200"
        : tag.color.includes("emerald") ? "bg-emerald-50 text-emerald-700 border-emerald-200"
        : tag.color.includes("blue") ? "bg-blue-50 text-blue-700 border-blue-200"
        : tag.color.includes("violet") ? "bg-violet-50 text-violet-700 border-violet-200"
        : "bg-rose-50 text-rose-700 border-rose-200",
      dotColor: "bg-blue-500",
      time: "Just now",
      likes: 0,
      comments: 0,
      liked: false,
    };
    setFeed((prev) => [newCard, ...prev]);
  }

  const filteredFeed = feed.filter((item) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      item.sender.name.toLowerCase().includes(q) ||
      item.receiver.name.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q) ||
      item.tag.toLowerCase().includes(q);
    const matchDept =
      deptFilter === DEPARTMENTS[0] ||
      item.sender.dept === deptFilter ||
      item.receiver.dept === deptFilter;
    const matchType = typeFilter === REC_TYPES[0] || item.tag === typeFilter;
    return matchSearch && matchDept && matchType;
  });

  const activeFilterCount = [
    deptFilter !== DEPARTMENTS[0],
    typeFilter !== REC_TYPES[0],
    dateFilter !== DATE_RANGES[0],
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-4" style={{ height: "52px" }}>
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-tight">PulseHub</span>
          </div>

          <div className="w-px h-4 bg-slate-200 mx-1 hidden sm:block" />

          <div className="hidden sm:flex items-center gap-1">
            {["Home", "Recognition Hub", "Leadership", "People", "Events"].map((item) => (
              <button
                key={item}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${item === "Recognition Hub" ? "bg-blue-50 text-blue-700" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex-1 max-w-xs ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search recognitions…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-100 border border-transparent focus:border-blue-200 focus:bg-white rounded-lg outline-none transition-all placeholder-slate-400 text-slate-700"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            </button>
            <button className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <Avatar initials="PS" color="bg-pink-600" size="sm" />
              <span className="text-xs font-medium text-slate-700 hidden sm:block">Priya</span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-center">
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <span className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">Recognition Hub</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 leading-tight">
                Celebrate achievements<br className="hidden sm:block" /> across PulseHub
              </h1>
              <p className="text-sm text-slate-500 mt-1.5">
                {feed.length} recognitions shared this month · <span className="text-emerald-600 font-medium">+23% vs last month</span>
              </p>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setLeaderboardOpen(!leaderboardOpen)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 rounded-xl transition-all"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> View Leaderboard
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm shadow-blue-200"
              >
                <Plus className="w-3.5 h-3.5" /> Give Recognition
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-slate-100">
            {[
              { label: "Recognitions this month", value: "1,204", icon: Award, color: "text-amber-500" },
              { label: "Employees recognized", value: "342", icon: Users, color: "text-blue-500" },
              { label: "Departments active", value: "9 / 9", icon: Building2, color: "text-emerald-500" },
              { label: "Avg. per employee", value: "3.5", icon: Star, color: "text-violet-500" },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${s.color}`} />
                  <div>
                    <p className="text-sm font-bold text-slate-800 leading-none">{s.value}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Feed ── */}
          <div className="lg:col-span-2">

            {/* Filters */}
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
                {activeFilterCount > 0 && (
                  <span className="w-4 h-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold">{activeFilterCount}</span>
                )}
              </div>
              <FilterDropdown label="Department" options={DEPARTMENTS} value={deptFilter} onChange={setDeptFilter} />
              <FilterDropdown label="Type" options={REC_TYPES} value={typeFilter} onChange={setTypeFilter} />
              <FilterDropdown label="Date" options={DATE_RANGES} value={dateFilter} onChange={setDateFilter} />
              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setDeptFilter(DEPARTMENTS[0]); setTypeFilter(REC_TYPES[0]); setDateFilter(DATE_RANGES[0]); }}
                  className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors ml-1"
                >
                  <X className="w-3 h-3" /> Clear all
                </button>
              )}
            </div>

            {/* Feed */}
            <div className="space-y-4">
              {filteredFeed.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-slate-100">
                  <Sparkles className="w-8 h-8 text-slate-200 mb-3" />
                  <p className="text-sm font-semibold text-slate-400">No recognitions found</p>
                  <p className="text-xs text-slate-400 mt-1">Try adjusting your filters or search query</p>
                </div>
              ) : (
                filteredFeed.map((item) => (
                  <RecognitionCard key={item.id} item={item} onLike={handleLike} />
                ))
              )}
            </div>

            {filteredFeed.length > 0 && (
              <button className="w-full mt-4 py-3 text-xs font-medium text-slate-500 hover:text-blue-600 bg-white border border-slate-200 rounded-2xl hover:border-blue-200 transition-all flex items-center justify-center gap-1.5">
                Load more recognitions <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* ── Right: Leaderboard + Quick Tags ── */}
          <div className="space-y-4">

            {/* Leaderboard */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <p className="text-xs font-bold text-slate-800">Top Recognized · June</p>
                </div>
                <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100">This month</span>
              </div>
              <div className="divide-y divide-slate-50">
                {LEADERBOARD.map((person) => (
                  <div key={person.rank} className="flex items-center gap-3 px-5 py-3 hover:bg-slate-50 transition-colors">
                    <RankMedal rank={person.rank} />
                    <Avatar initials={person.avatar} color={person.color} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-800 truncate">{person.name}</p>
                      <p className="text-[10px] text-slate-400">{person.dept}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-bold text-slate-700">{person.points.toLocaleString()}</p>
                      <p className="text-[10px] text-slate-400">{person.badges} badges</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-slate-50">
                <button className="w-full text-xs text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 font-medium">
                  Full leaderboard <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Quick recognition by tag */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm p-5">
              <p className="text-xs font-bold text-slate-800 mb-1">Browse by Category</p>
              <p className="text-[11px] text-slate-400 mb-4">Filter feed by recognition type</p>
              <div className="space-y-2">
                {TAG_OPTIONS.map((tag) => {
                  const Icon = tag.icon;
                  const count = feed.filter((f) => f.tag === tag.label).length;
                  return (
                    <button
                      key={tag.label}
                      onClick={() => setTypeFilter(typeFilter === tag.label ? REC_TYPES[0] : tag.label)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl border transition-all text-left ${typeFilter === tag.label ? "border-blue-200 bg-blue-50" : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"}`}
                    >
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${tag.color.split(" ")[0]}`}>
                        <Icon className={`w-3.5 h-3.5 ${tag.color.split(" ")[1]}`} />
                      </div>
                      <span className={`text-xs font-medium flex-1 ${typeFilter === tag.label ? "text-blue-700" : "text-slate-700"}`}>{tag.label}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Give recognition CTA */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white">
              <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-sm font-bold mb-1">Recognize someone today</p>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">Recognition takes 2 minutes and means the world to the person receiving it.</p>
              <button
                onClick={() => setModalOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 rounded-xl transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Give Recognition
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <GiveRecognitionModal
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
