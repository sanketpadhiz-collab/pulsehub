import { useState } from "react";
import {
  Bell, Search, ChevronDown, ChevronUp, Star, Users, Briefcase,
  MessageSquare, TrendingUp, Heart, Award, Zap, ArrowRight, Plus,
  Clock, Building2, BarChart3, Megaphone, Target, Sparkles, Video,
  Hash, Flame, Crown, CheckCircle2, Layers, Activity, UserPlus,
  Send, MapPin, Lock, Rss, Smile, Quote, BarChart2, CalendarDays,
  X, ChevronRight, Mic, FileText, Globe, PieChart, ThumbsUp,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const EMPLOYEE = {
  name: "Priya Sharma",
  role: "Senior Product Manager · Product",
  avatar: "PS",
  points: 4820,
  streak: 12,
};

const LEADERSHIP_MESSAGES = [
  {
    id: "ceo",
    author: "Rajesh Kapoor",
    role: "Chief Executive Officer",
    avatar: "RK",
    time: "2h ago",
    label: "CEO Vision",
    title: "Q2 Results: Record Growth & What Comes Next",
    preview:
      "We've achieved 34% YoY revenue growth — our strongest quarter since founding. The road ahead is even more exciting: Southeast Asia expansion, doubling engineering headcount, and three new product lines by Q4.",
    full: "This milestone belongs to every one of you. Our culture of relentless execution and genuine collaboration is what sets us apart. The road ahead is even more exciting. We're accelerating our expansion into Southeast Asia, doubling our engineering headcount, and launching three new product lines by Q4. Thank you for your trust, your energy, and your belief in what we're building together.",
    likes: 312,
    comments: 48,
    featured: true,
  },
  {
    id: "coo",
    author: "Fatima Al-Rashid",
    role: "Chief Operating Officer",
    avatar: "FR",
    time: "1d ago",
    label: "Operations",
    title: "H2 Execution Framework: Where Every Team Fits",
    preview:
      "Our H2 operational blueprint is finalized. Every department now has clear KPIs tied to company-level OKRs, with bi-weekly syncs replacing the monthly review cadence.",
    full: "We're moving from a quarterly-review culture to a continuous-improvement culture. The new operational rhythm means faster decisions, clearer accountability, and less time in status meetings. Department leads will receive the detailed playbook this week.",
    likes: 178,
    comments: 31,
    featured: false,
  },
  {
    id: "cso",
    author: "Marcus Chen",
    role: "Chief Strategy Officer",
    avatar: "MC",
    time: "1d ago",
    label: "Strategy",
    title: "FY2025 OKR Mid-Year Review: 91% Achievement",
    preview:
      "We're tracking at 91% overall OKR achievement at mid-year, with Engineering and Sales leading the pack. Three key initiatives have been elevated to Tier-1 priority.",
    full: "The Product-Led Growth initiative has exceeded its activation metric by 22%. Our enterprise pipeline has grown 3.4x. Areas requiring attention: NPS score (currently 47, target 55) and internal tool adoption. Cross-functional squads have been activated to course-correct by EOQ.",
    likes: 204,
    comments: 37,
    featured: false,
  },
];

const STRATEGIC_PRIORITIES = [
  { label: "PLG Activation", progress: 78, target: "85%", status: "on-track", color: "bg-blue-600" },
  { label: "Enterprise Pipeline", progress: 92, target: "80%", status: "exceeded", color: "bg-emerald-500" },
  { label: "eNPS Score", progress: 54, target: "72%", status: "at-risk", color: "bg-amber-500" },
  { label: "APAC Expansion", progress: 61, target: "70%", status: "on-track", color: "bg-blue-600" },
];

const MONTHLY_MEET = {
  date: "May 28, 2025",
  facilitator: "Rajesh Kapoor",
  outcomes: [
    "Approved $4M budget reallocation to APAC GTM initiative",
    "Greenlit Project Meridian — new enterprise product tier launching Q4",
    "Resolved cross-team dependency: Eng & Sales now share weekly sync",
    "People team to present revised compensation bands by June 20",
  ],
  nextMeet: "June 25, 2025",
};

const ANNOUNCEMENTS = [
  {
    id: 2,
    type: "hr",
    tag: "Policy Update",
    urgent: true,
    author: "Anita Desai",
    role: "Chief People Officer",
    avatar: "AD",
    time: "5h ago",
    title: "New Hybrid Work Policy Effective July 1st",
    preview:
      "After extensive feedback across all 14 offices, we're rolling out our revised hybrid framework — 3 days in-office, 2 days remote, with flexible core hours.",
    full: "Each department will have autonomy over which days are 'anchor days'. Managers will receive a scheduling toolkit by June 15th. Travel and home-office stipend programs remain unchanged.",
    likes: 187,
    comments: 93,
  },
  {
    id: 3,
    type: "ops",
    tag: "IT & Security",
    urgent: false,
    author: "Dev Sharma",
    role: "VP Engineering",
    avatar: "DS",
    time: "8h ago",
    title: "Mandatory SSO Migration Deadline: June 30",
    preview:
      "All internal tools will require SSO authentication starting July 1st. Accounts not migrated will lose access automatically. Migration takes under 3 minutes.",
    full: "IT will hold office hours June 17–21 for assisted migration. Instructions have been sent to all work emails. Please prioritize this before the deadline.",
    likes: 94,
    comments: 41,
  },
];

const METRICS = [
  { label: "Total Employees", value: "3,847", change: "+124 this month", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Active Projects", value: "218", change: "14 launching soon", icon: Briefcase, color: "text-violet-600", bg: "bg-violet-50" },
  { label: "Dept Updates", value: "42", change: "8 new today", icon: Rss, color: "text-teal-600", bg: "bg-teal-50" },
  { label: "Recognitions", value: "1,204", change: "this quarter", icon: Award, color: "text-amber-600", bg: "bg-amber-50" },
];

const DEPARTMENTS = [
  { name: "Engineering", icon: Layers, color: "bg-blue-600", light: "bg-blue-50", textColor: "text-blue-700", headcount: 642, projects: 38, metric: "99.7%", metricLabel: "Platform Uptime", achievement: "Shipped 14 major features in Q2", highlight: "Deploy time cut 60% via new CI/CD pipeline" },
  { name: "Marketing", icon: Megaphone, color: "bg-violet-600", light: "bg-violet-50", textColor: "text-violet-700", headcount: 184, projects: 22, metric: "3.2M", metricLabel: "Impressions (Q2)", achievement: "Brand refresh launched across 6 markets", highlight: "Inbound MQL pipeline grew 47% QoQ" },
  { name: "Sales", icon: TrendingUp, color: "bg-emerald-600", light: "bg-emerald-50", textColor: "text-emerald-700", headcount: 298, projects: 19, metric: "134%", metricLabel: "Quota Attainment", achievement: "Closed largest enterprise deal in history", highlight: "$4.2M ARR added in Q2 alone" },
  { name: "Operations", icon: Activity, color: "bg-orange-600", light: "bg-orange-50", textColor: "text-orange-700", headcount: 211, projects: 15, metric: "98.2%", metricLabel: "SLA Achievement", achievement: "Automated 68% of manual reporting workflows", highlight: "Vendor consolidation saved $1.4M annually" },
  { name: "HR", icon: Heart, color: "bg-pink-600", light: "bg-pink-50", textColor: "text-pink-700", headcount: 89, projects: 11, metric: "87%", metricLabel: "eNPS Score", achievement: "Launched learning platform with 200+ courses", highlight: "Time-to-hire reduced from 42 to 28 days" },
];

const RECOGNITIONS = [
  { from: "Deepak Nair", fromRole: "Engineering Lead", fromAvatar: "DN", to: "Sara Okonkwo", toAvatar: "SO", toRole: "Backend Engineer", badge: "🚀 Innovator", message: "Sara single-handedly resolved the P0 issue that saved our APAC launch. Her calm under pressure was extraordinary.", likes: 84, team: "Platform Engineering", color: "bg-violet-50 border-violet-200", tagColor: "bg-violet-100 text-violet-700" },
  { from: "Leila Ahmadi", fromRole: "VP Marketing", fromAvatar: "LA", to: "James Whitfield", toAvatar: "JW", toRole: "Content Strategist", badge: "✨ Culture Champion", message: "James built our brand voice document from scratch and ran 6 workshops with zero resources. He raised the bar for the whole team.", likes: 61, team: "Brand & Content", color: "bg-amber-50 border-amber-200", tagColor: "bg-amber-100 text-amber-700" },
  { from: "Nadia Petrov", fromRole: "Product Director", fromAvatar: "NP", to: "Carlos Mendez", toAvatar: "CM", toRole: "UX Designer", badge: "💡 Problem Solver", message: "Carlos redesigned the onboarding flow in 3 days, cutting drop-off by 38%. That's the kind of impact that changes a company's trajectory.", likes: 95, team: "Product Design", color: "bg-teal-50 border-teal-200", tagColor: "bg-teal-100 text-teal-700" },
];

const LEADERBOARD = [
  { rank: 1, name: "Yuki Tanaka", dept: "Engineering", points: 9240, badge: "🥇", avatar: "YT" },
  { rank: 2, name: "Amara Diallo", dept: "Sales", points: 8810, badge: "🥈", avatar: "AD" },
  { rank: 3, name: "Felipe Santos", dept: "Operations", points: 8405, badge: "🥉", avatar: "FS" },
  { rank: 4, name: "Priya Sharma", dept: "Product", points: 4820, badge: "⭐", avatar: "PS", isMe: true },
];

const EVENTS = [
  { title: "All-Hands Q2 Retrospective", date: "Jun 5", time: "3:00 PM", daysLeft: 3, type: "Virtual", tag: "Company-wide", tagColor: "bg-blue-100 text-blue-700", host: "Executive Team", rsvp: "attending", attendees: 1847, icon: Video },
  { title: "Women in Tech Leadership Summit", date: "Jun 10", time: "10:00 AM", daysLeft: 8, type: "Hybrid", tag: "DEI Initiative", tagColor: "bg-pink-100 text-pink-700", host: "People & Culture", rsvp: "pending", attendees: 340, icon: Sparkles },
  { title: "Engineering Guild: System Design Workshop", date: "Jun 14", time: "2:00 PM", daysLeft: 12, type: "In-Person", tag: "Engineering", tagColor: "bg-violet-100 text-violet-700", host: "Deepak Nair", rsvp: "attending", attendees: 92, icon: Layers },
];

const NEW_JOINERS = [
  { name: "Aiko Yamamoto", role: "Staff Engineer", dept: "Platform", avatar: "AY", from: "Tokyo, JP", prev: "Google" },
  { name: "Kwame Asante", role: "Growth Analyst", dept: "Marketing", avatar: "KA", from: "Accra, GH", prev: "McKinsey" },
  { name: "Sofia Reyes", role: "Product Designer", dept: "Design", avatar: "SR", from: "Mexico City, MX", prev: "Figma" },
  { name: "Rahul Joshi", role: "Account Executive", dept: "Enterprise Sales", avatar: "RJ", from: "Pune, IN", prev: "Salesforce" },
  { name: "Elena Morozova", role: "Data Scientist", dept: "Analytics", avatar: "EM", from: "Berlin, DE", prev: "Zalando" },
];

const DISCUSSIONS = [
  { tag: "Culture", title: "What rituals help your team stay connected remotely?", replies: 84, likes: 203, hot: true, author: "Amara D.", avatar: "AD" },
  { tag: "Engineering", title: "RFC: Migrating our event streaming to Kafka — need your input", replies: 56, likes: 148, hot: true, author: "Yuki T.", avatar: "YT" },
  { tag: "Career", title: "How I went from IC to Director in 3 years — lessons learned", replies: 112, likes: 389, hot: false, author: "Marcus C.", avatar: "MC" },
];

const TAG_COLORS = {
  Culture: "bg-pink-100 text-pink-700",
  Engineering: "bg-blue-100 text-blue-700",
  Career: "bg-amber-100 text-amber-700",
  Product: "bg-violet-100 text-violet-700",
};

// ─── Primitives ───────────────────────────────────────────────────────────────

function Avatar({ initials, size = "md", color = "bg-slate-700" }) {
  const sz = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-11 h-11 text-base", xl: "w-14 h-14 text-lg" };
  return (
    <div className={`${sz[size]} ${color} text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0 select-none`}>
      {initials}
    </div>
  );
}

function Badge({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${className}`}>
      {children}
    </span>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">{children}</p>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}

function Card({ children, className = "", hover = true }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${hover ? "hover:shadow-md hover:-translate-y-px" : ""} transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}

function RsvpButton({ status }) {
  const map = {
    attending: { label: "Attending", cls: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
    pending: { label: "RSVP", cls: "bg-blue-600 text-white hover:bg-blue-700" },
    maybe: { label: "Interested", cls: "bg-slate-100 text-slate-600 hover:bg-slate-200" },
  };
  const s = map[status];
  return (
    <button className={`text-xs font-medium px-3 py-1 rounded-lg transition-all ${s.cls}`}>
      {s.label}
    </button>
  );
}

// ─── Feature Components ────────────────────────────────────────────────────────

function AnnouncementCard({ item }) {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className="bg-slate-100 text-slate-600">{item.tag}</Badge>
          {item.urgent && <Badge className="bg-rose-50 text-rose-600">Action Required</Badge>}
        </div>
        <span className="text-[11px] text-slate-400 flex-shrink-0">{item.time}</span>
      </div>
      <h3 className="font-semibold text-slate-800 text-sm leading-snug mb-1.5">{item.title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{item.preview}</p>

      {expanded && (
        <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
          <p className="text-xs text-slate-600 leading-relaxed">{item.full}</p>
        </div>
      )}

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2.5 text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
      >
        {expanded ? "Show less" : "Read more"}
        {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>

      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <Avatar initials={item.avatar} size="sm" color="bg-slate-700" />
          <div>
            <p className="text-xs font-medium text-slate-700">{item.author}</p>
            <p className="text-[11px] text-slate-400">{item.role}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setLiked(!liked)} className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-rose-500" : "text-slate-400 hover:text-rose-400"}`}>
            <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} /> {item.likes + (liked ? 1 : 0)}
          </button>
          <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors">
            <MessageSquare className="w-3.5 h-3.5" /> {item.comments}
          </button>
        </div>
      </div>
    </Card>
  );
}

function DeptCard({ dept, expanded, onToggle }) {
  const Icon = dept.icon;
  return (
    <Card className="overflow-hidden" hover={false}>
      <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-slate-50 transition-colors" onClick={onToggle}>
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${dept.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">{dept.name}</p>
            <p className="text-[11px] text-slate-400">{dept.headcount.toLocaleString()} employees · {dept.projects} active projects</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className={`text-sm font-bold ${dept.textColor}`}>{dept.metric}</p>
            <p className="text-[11px] text-slate-400">{dept.metricLabel}</p>
          </div>
          {expanded ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
        </div>
      </div>
      {expanded && (
        <div className={`px-4 pb-4 ${dept.light} border-t border-slate-100`}>
          <div className="pt-3 space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className={`w-4 h-4 ${dept.textColor} flex-shrink-0 mt-0.5`} />
              <p className="text-xs text-slate-700">{dept.achievement}</p>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className={`w-4 h-4 ${dept.textColor} flex-shrink-0 mt-0.5`} />
              <p className="text-xs text-slate-700">{dept.highlight}</p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

// ─── Main Dashboard ────────────────────────────────────────────────────────────

export default function PulseHub() {
  const [expandedDept, setExpandedDept] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [leaderTab, setLeaderTab] = useState("spotlight");
  const [activeLeader, setActiveLeader] = useState("ceo");
  const [meetExpanded, setMeetExpanded] = useState(false);
  const [strategicExpanded, setStrategicExpanded] = useState(false);

  const featuredMsg = LEADERSHIP_MESSAGES.find((m) => m.id === activeLeader) || LEADERSHIP_MESSAGES[0];

  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-slate-50 font-sans">

      {/* ── Topbar ── */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-13 flex items-center justify-between gap-4" style={{ height: "52px" }}>

          {/* Brand */}
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-tight">PulseHub</span>
          </div>

          {/* Nav links – desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {["Home", "Leadership", "Knowledge Hub", "People", "Events"].map((item) => (
              <button key={item} className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${item === "Home" ? "bg-slate-100 text-slate-800" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>
                {item}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* Search trigger */}
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-sm">
                <input
                  autoFocus
                  type="text"
                  placeholder="Search PulseHub…"
                  className="text-xs outline-none text-slate-700 placeholder-slate-400 w-52"
                />
                <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Open search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}

            <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-500 hover:text-slate-700">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full" />
            </button>

            <button className="flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
              <Avatar initials="PS" size="sm" color="bg-blue-600" />
              <span className="text-xs font-medium text-slate-700 hidden sm:block">Priya</span>
              <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-7 space-y-10">

        {/* ── Welcome Strip ── */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 mb-0.5">{today}</p>
            <h1 className="text-xl font-bold text-slate-900">Good afternoon, Priya.</h1>
            <p className="text-sm text-slate-500 mt-0.5">Here's what matters across the company today.</p>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all shadow-sm shadow-blue-200">
              <Plus className="w-3.5 h-3.5" /> New Post
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl transition-all border border-slate-200">
              <Send className="w-3.5 h-3.5" /> Recognize
            </button>
          </div>
        </div>

        {/* ── Org Metrics ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {METRICS.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                <div className={`w-7 h-7 ${m.bg} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                </div>
                <p className="text-lg font-bold text-slate-800 leading-none">{m.value}</p>
                <p className="text-[11px] font-medium text-slate-500 mt-1">{m.label}</p>
                <p className="text-[11px] text-slate-400 mt-0.5">{m.change}</p>
              </div>
            );
          })}
        </div>

        {/* ══════════════════════════════════════════
            SECTION 1: LEADERSHIP CORNER
            Highest priority. Prominent editorial treatment.
        ══════════════════════════════════════════ */}
        <section>
          <SectionLabel>Leadership Corner</SectionLabel>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* Featured message — takes up more visual weight */}
            <div className="lg:col-span-3">
              {/* Leader selector tabs */}
              <div className="flex gap-1 mb-3 flex-wrap">
                {LEADERSHIP_MESSAGES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveLeader(m.id)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${activeLeader === m.id ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-300"}`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>

              {/* Featured card — left-border accent distinguishes from standard cards */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm border-l-4 border-l-slate-900 p-6 h-full">
                <div className="flex items-start gap-3 mb-4">
                  <Avatar initials={featuredMsg.avatar} size="lg" color="bg-slate-800" />
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{featuredMsg.author}</p>
                    <p className="text-xs text-slate-400">{featuredMsg.role} · {featuredMsg.time}</p>
                  </div>
                </div>

                <Quote className="w-5 h-5 text-slate-200 mb-2" />
                <h2 className="text-base font-bold text-slate-900 leading-snug mb-3">{featuredMsg.title}</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{featuredMsg.preview}</p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" /> {featuredMsg.likes}
                    </button>
                    <button className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" /> {featuredMsg.comments}
                    </button>
                  </div>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors">
                    Full message <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right column: Strategic Priorities + Monthly Meet */}
            <div className="lg:col-span-2 flex flex-col gap-4">

              {/* Strategic Priorities */}
              <Card className="p-5" hover={false}>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-xs font-semibold text-slate-800">Strategic Priorities</p>
                  <Badge className="bg-emerald-50 text-emerald-700">H1 2025</Badge>
                </div>
                <div className="space-y-3.5">
                  {STRATEGIC_PRIORITIES.map((p) => {
                    const statusMap = {
                      exceeded: "text-emerald-600",
                      "on-track": "text-blue-600",
                      "at-risk": "text-amber-600",
                    };
                    return (
                      <div key={p.label}>
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-xs text-slate-700">{p.label}</p>
                          <div className="flex items-center gap-1.5">
                            <span className={`text-[11px] font-semibold ${statusMap[p.status]}`}>{p.progress}%</span>
                            <span className="text-[10px] text-slate-400">/ {p.target}</span>
                          </div>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${p.color} rounded-full transition-all duration-500`}
                            style={{ width: `${p.progress}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  className="mt-4 w-full text-center text-xs text-slate-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"
                  onClick={() => setStrategicExpanded(!strategicExpanded)}
                >
                  {strategicExpanded ? "Hide detail" : "View full OKR breakdown"}
                  {strategicExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
              </Card>

              {/* Monthly Leadership Meet */}
              <Card className="overflow-hidden" hover={false}>
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors text-left"
                  onClick={() => setMeetExpanded(!meetExpanded)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 bg-slate-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mic className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Monthly Leadership Meet</p>
                      <p className="text-[11px] text-slate-400">{MONTHLY_MEET.date} · {MONTHLY_MEET.outcomes.length} outcomes</p>
                    </div>
                  </div>
                  {meetExpanded ? <ChevronUp className="w-4 h-4 text-slate-300" /> : <ChevronDown className="w-4 h-4 text-slate-300" />}
                </button>

                {meetExpanded && (
                  <div className="px-4 pb-4 border-t border-slate-50">
                    <p className="text-[11px] text-slate-400 mt-3 mb-2.5">Key outcomes from {MONTHLY_MEET.date}</p>
                    <div className="space-y-2">
                      {MONTHLY_MEET.outcomes.map((o, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-600 leading-relaxed">{o}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5">
                      <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
                      <p className="text-[11px] text-slate-400">Next meet: <span className="text-slate-600 font-medium">{MONTHLY_MEET.nextMeet}</span></p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 2: CRITICAL ANNOUNCEMENTS
            Scoped to action-required comms only.
        ══════════════════════════════════════════ */}
        <section>
          <SectionLabel>Critical Announcements</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ANNOUNCEMENTS.map((item) => (
              <AnnouncementCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 3: DEPARTMENT IMPACT
            Full-width accordion. Scannable at a glance.
        ══════════════════════════════════════════ */}
        <section>
          <SectionLabel>Department Impact</SectionLabel>
          <div className="space-y-2">
            {DEPARTMENTS.map((dept) => (
              <DeptCard
                key={dept.name}
                dept={dept}
                expanded={expandedDept === dept.name}
                onToggle={() => setExpandedDept(expandedDept === dept.name ? null : dept.name)}
              />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 4: RECOGNITION + EVENTS
            Two-column layout. Peer culture and calendar.
        ══════════════════════════════════════════ */}
        <section>
          <SectionLabel>Recognition & Upcoming Events</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

            {/* Recognition + Leaderboard — tabbed to reduce height */}
            <div className="lg:col-span-3">
              <div className="flex gap-1 mb-3">
                {["spotlight", "leaderboard"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setLeaderTab(tab)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg capitalize transition-all ${leaderTab === tab ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-700"}`}
                  >
                    {tab === "spotlight" ? "Recognition Spotlight" : "Leaderboard"}
                  </button>
                ))}
              </div>

              {leaderTab === "spotlight" ? (
                <div className="space-y-3">
                  {RECOGNITIONS.map((r, i) => (
                    <Card key={i} className={`p-4 border ${r.color}`}>
                      <div className="flex items-center gap-2 mb-2.5">
                        <Badge className={r.tagColor}>{r.badge}</Badge>
                        <span className="text-[11px] text-slate-400">{r.team}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed mb-3 italic">"{r.message}"</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar initials={r.toAvatar} size="sm" color="bg-slate-700" />
                          <div>
                            <p className="text-xs font-semibold text-slate-800">{r.to}</p>
                            <p className="text-[10px] text-slate-400">from {r.from}</p>
                          </div>
                        </div>
                        <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-rose-500 transition-colors">
                          <Heart className="w-3.5 h-3.5" /> {r.likes}
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="overflow-hidden" hover={false}>
                  <div className="divide-y divide-slate-50">
                    {LEADERBOARD.map((p) => (
                      <div key={p.rank} className={`flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors ${p.isMe ? "bg-blue-50" : ""}`}>
                        <span className="text-base w-5 text-center">{p.badge}</span>
                        <Avatar initials={p.avatar} size="sm" color={p.isMe ? "bg-blue-600" : "bg-slate-700"} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-semibold truncate ${p.isMe ? "text-blue-700" : "text-slate-800"}`}>
                            {p.name} {p.isMe && <span className="text-[10px] font-normal text-blue-400">(you)</span>}
                          </p>
                          <p className="text-[11px] text-slate-400">{p.dept}</p>
                        </div>
                        <p className={`text-xs font-bold ${p.isMe ? "text-blue-600" : "text-slate-700"}`}>
                          {p.points.toLocaleString()} pts
                        </p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="lg:col-span-2 space-y-3">
              {EVENTS.map((ev, i) => {
                const Icon = ev.icon;
                return (
                  <Card key={i} className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <Badge className={ev.tagColor}>{ev.tag}</Badge>
                      <span className="flex items-center gap-1 text-[11px] text-slate-400 flex-shrink-0">
                        <Clock className="w-3 h-3" /> {ev.daysLeft}d away
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 leading-snug mb-1">{ev.title}</h3>
                    <p className="text-[11px] text-slate-400 mb-3">{ev.date} · {ev.time} · {ev.type}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Users className="w-3 h-3" /> {ev.attendees.toLocaleString()}
                      </span>
                      <RsvpButton status={ev.rsvp} />
                    </div>
                  </Card>
                );
              })}
              <button className="w-full text-center text-xs text-slate-400 hover:text-blue-600 transition-colors py-1 flex items-center justify-center gap-1">
                View full calendar <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 5: COMMUNITY DISCUSSIONS
            Compact list format. Social signal, not feature.
        ══════════════════════════════════════════ */}
        <section>
          <SectionLabel>Community Discussions</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {DISCUSSIONS.map((d, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={TAG_COLORS[d.tag] || "bg-slate-100 text-slate-600"}>
                    <Hash className="w-3 h-3" /> {d.tag}
                  </Badge>
                  {d.hot && <Flame className="w-3.5 h-3.5 text-rose-400" />}
                </div>
                <p className="text-xs font-medium text-slate-800 leading-snug mb-3">{d.title}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Avatar initials={d.avatar} size="sm" color="bg-slate-600" />
                    <p className="text-[11px] text-slate-400">{d.author}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Heart className="w-3 h-3" /> {d.likes}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] text-slate-400">
                      <MessageSquare className="w-3 h-3" /> {d.replies}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECTION 6: NEW JOINERS
            Compact horizontal chips. Social signal.
        ══════════════════════════════════════════ */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-3">
              <p className="text-[11px] font-semibold tracking-widest text-slate-400 uppercase">New This Week</p>
              <div className="flex-1 h-px bg-slate-100 w-16" />
            </div>
            <button className="text-xs text-slate-400 hover:text-blue-600 transition-colors flex items-center gap-1">
              Welcome all <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="flex flex-wrap gap-3">
            {NEW_JOINERS.map((j, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-slate-100 rounded-xl px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-px transition-all">
                <Avatar initials={j.avatar} size="md" color="bg-slate-800" />
                <div>
                  <p className="text-xs font-semibold text-slate-800">{j.name}</p>
                  <p className="text-[11px] text-slate-400">{j.role} · {j.dept}</p>
                </div>
                <button className="ml-1 px-2.5 py-1 text-[11px] font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  <Smile className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-4 pb-8 border-t border-slate-100">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-blue-600 rounded-md flex items-center justify-center">
                <Zap className="w-3 h-3 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-700">PulseHub</span>
              <span className="text-xs text-slate-300">·</span>
              <span className="text-xs text-slate-400">v2.5.0</span>
            </div>
            <p className="text-[11px] text-slate-400">© 2025 PulseHub. All rights reserved. · Privacy · Support</p>
          </div>
        </footer>
      </main>
    </div>
  );
}