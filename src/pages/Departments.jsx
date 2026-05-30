import React, { useMemo, useState } from "react";
import {
  Bell,
  Search,
  User,
  Plus,
  ChevronRight,
  Users,
  BarChart2,
  MessageCircle,
  Briefcase,
  Filter,
} from "lucide-react";

const mockDepartments = [
  {
    id: "eng",
    name: "Engineering",
    type: "Core",
    size: "Large",
    description: "Builds and maintains PulseHub platform and services.",
    head: { name: "Aisha Khan", initials: "AK" },
    members: [
      { name: "Aisha Khan", initials: "AK" },
      { name: "Ravi Patel", initials: "RP" },
      { name: "Maya Chen", initials: "MC" },
      { name: "Liam O'Connor", initials: "LO" },
    ],
    employees: 78,
    performance: 0.86,
    gradient: "from-sky-400 to-indigo-500",
  },
  {
    id: "hr",
    name: "Human Resources",
    type: "Support",
    size: "Medium",
    description: "People operations, hiring, and employee experience.",
    head: { name: "Priya Desai", initials: "PD" },
    members: [
      { name: "Priya Desai", initials: "PD" },
      { name: "Samir Rao", initials: "SR" },
      { name: "Nora Lee", initials: "NL" },
    ],
    employees: 24,
    performance: 0.72,
    gradient: "from-emerald-300 to-teal-500",
  },
  {
    id: "mkt",
    name: "Marketing",
    type: "Business",
    size: "Medium",
    description: "Brand, demand generation, and communications.",
    head: { name: "Diego Alvarez", initials: "DA" },
    members: [
      { name: "Diego Alvarez", initials: "DA" },
      { name: "Hannah Kim", initials: "HK" },
      { name: "Omar Farouk", initials: "OF" },
    ],
    employees: 32,
    performance: 0.79,
    gradient: "from-pink-300 to-rose-500",
  },
  {
    id: "sales",
    name: "Sales",
    type: "Business",
    size: "Large",
    description: "Customer acquisition and revenue growth.",
    head: { name: "Ethan Brooks", initials: "EB" },
    members: [
      { name: "Ethan Brooks", initials: "EB" },
      { name: "Zara Khan", initials: "ZK" },
      { name: "Noah Singh", initials: "NS" },
    ],
    employees: 54,
    performance: 0.81,
    gradient: "from-yellow-300 to-orange-500",
  },
  {
    id: "it",
    name: "IT & Security",
    type: "Support",
    size: "Small",
    description: "Infrastructure, security, and internal tooling.",
    head: { name: "Olivia Park", initials: "OP" },
    members: [
      { name: "Olivia Park", initials: "OP" },
      { name: "Ben Turner", initials: "BT" },
    ],
    employees: 12,
    performance: 0.9,
    gradient: "from-violet-300 to-indigo-400",
  },
  {
    id: "finance",
    name: "Finance",
    type: "Core",
    size: "Small",
    description: "Financial planning, payroll, and compliance.",
    head: { name: "Sanjay Mehta", initials: "SM" },
    members: [
      { name: "Sanjay Mehta", initials: "SM" },
      { name: "Lina Gomez", initials: "LG" },
    ],
    employees: 10,
    performance: 0.75,
    gradient: "from-slate-300 to-slate-500",
  },
];

function IconButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg p-2 hover:bg-slate-100 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function Badge({ children, color = "bg-slate-100 text-slate-800" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}
    >
      {children}
    </span>
  );
}

function Avatar({ initials, size = 10, className = "" }) {
  const sizeClass = {
    8: "w-8 h-8 text-sm",
    10: "w-10 h-10 text-sm",
    12: "w-12 h-12 text-base",
  }[size];
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-slate-100 text-slate-700 font-semibold ${sizeClass} ${className}`}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function ProgressBar({ value = 0, className = "" }) {
  const pct = Math.round(value * 100);
  return (
    <div className={`w-full ${className}`}>
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-emerald-400 to-blue-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-1 text-xs text-slate-500">{pct}%</div>
    </div>
  );
}

function DepartmentCard({ dept, onSelect }) {
  return (
    <article
      onClick={() => onSelect(dept)}
      className="group cursor-pointer rounded-xl bg-white shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition p-5 flex flex-col justify-between border border-slate-50"
    >
      <div className="flex items-start gap-4">
        <div
          className={`rounded-2xl p-3 bg-gradient-to-br ${dept.gradient} text-white flex items-center justify-center shadow-md`}
        >
          <Briefcase className="w-6 h-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-slate-900 truncate">
            {dept.name}
          </h3>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">
            {dept.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Avatar initials={dept.head.initials} size={8} />
          <div>
            <div className="text-sm font-medium text-slate-800">
              {dept.head.name}
            </div>
            <div className="text-xs text-slate-500">{dept.employees} people</div>
          </div>
        </div>

        <div className="w-36">
          <ProgressBar value={dept.performance} />
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Badge color="bg-slate-100 text-slate-800">{dept.type}</Badge>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(dept);
            }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-slate-100 text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            View Department
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function DepartmentsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(mockDepartments[0]);
  const [filters, setFilters] = useState({
    type: "All",
    size: "All",
    sort: "performance",
  });

  const types = ["All", "Core", "Support", "Business"];
  const sizes = ["All", "Small", "Medium", "Large"];
  const sorts = [
    { key: "performance", label: "Performance" },
    { key: "size", label: "Size" },
    { key: "alphabet", label: "Alphabet" },
  ];

  const filtered = useMemo(() => {
    let list = mockDepartments.slice();

    if (filters.type !== "All") {
      list = list.filter((d) => d.type === filters.type);
    }
    if (filters.size !== "All") {
      list = list.filter((d) => d.size === filters.size);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.head.name.toLowerCase().includes(q) ||
          d.members.some((m) => m.name.toLowerCase().includes(q))
      );
    }

    if (filters.sort === "performance") {
      list.sort((a, b) => b.performance - a.performance);
    } else if (filters.sort === "size") {
      const order = { Small: 0, Medium: 1, Large: 2 };
      list.sort((a, b) => order[b.size] - order[a.size]);
    } else if (filters.sort === "alphabet") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [filters, query]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <header className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="text-2xl font-bold text-slate-900">PulseHub</div>
              <h2 className="text-lg font-medium text-slate-700">Departments</h2>
            </div>

            <div className="flex-1 px-4">
              <div className="max-w-md mx-auto">
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <Search className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="placeholder:text-slate-400 block w-full bg-slate-100 border border-transparent rounded-lg py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
                    placeholder="Search departments or employees"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <IconButton aria-label="Notifications">
                <Bell className="w-5 h-5 text-slate-600" />
              </IconButton>
              <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-2">
                  <div className="text-sm text-slate-600">SANKET</div>
                  <Avatar initials="S" size={8} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Explore Departments</h1>
            <p className="mt-1 text-sm text-slate-500">
              Understand teams, roles, and contributions across PulseHub
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-sky-600 text-white text-sm font-medium hover:bg-sky-700 transition"
              onClick={() => alert("Create Department flow (admin only)")}
            >
              <Plus className="w-4 h-4" />
              Create Department
            </button>
            <button
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white border border-slate-100 text-sm text-slate-700 hover:bg-slate-50 transition"
              onClick={() =>
                setFilters((f) => ({ ...f, type: "All", size: "All", sort: "performance" }))
              }
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters / Left Column */}
          <aside className="lg:col-span-3">
            <div className="sticky top-6 space-y-4">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-50">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-slate-800">Filters</h3>
                  <Filter className="w-4 h-4 text-slate-500" />
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <div className="text-xs text-slate-500 mb-2">Department type</div>
                    <div className="flex flex-wrap gap-2">
                      {types.map((t) => (
                        <button
                          key={t}
                          onClick={() => setFilters((s) => ({ ...s, type: t }))}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.type === t
                              ? "bg-sky-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Size</div>
                    <div className="flex flex-wrap gap-2">
                      {sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setFilters((p) => ({ ...p, size: s }))}
                          className={`px-3 py-1 rounded-full text-sm ${
                            filters.size === s
                              ? "bg-sky-600 text-white"
                              : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-500 mb-2">Sort by</div>
                    <div className="flex flex-col gap-2">
                      {sorts.map((s) => (
                        <label
                          key={s.key}
                          className="inline-flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="sort"
                            checked={filters.sort === s.key}
                            onChange={() => setFilters((p) => ({ ...p, sort: s.key }))}
                            className="form-radio h-4 w-4 text-sky-600"
                          />
                          <span className="text-slate-700">{s.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-50">
                <h4 className="text-sm font-medium text-slate-800">Quick Stats</h4>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs text-slate-500">Departments</div>
                    <div className="text-lg font-semibold text-slate-900">{mockDepartments.length}</div>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <div className="text-xs text-slate-500">Total Employees</div>
                    <div className="text-lg font-semibold text-slate-900">
                      {mockDepartments.reduce((s, d) => s + d.employees, 0)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Department Grid */}
          <section className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {filtered.map((dept) => (
                <DepartmentCard key={dept.id} dept={dept} onSelect={setSelected} />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="mt-6 bg-white p-6 rounded-xl border border-slate-50 text-center">
                <div className="text-slate-700">No departments match your filters.</div>
              </div>
            )}
          </section>

          {/* Detail Preview Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-6">
              <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {selected.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">{selected.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge color="bg-slate-100 text-slate-800">{selected.type}</Badge>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-500">Head of Department</div>
                  <div className="mt-2 flex items-center gap-3">
                    <Avatar initials={selected.head.initials} size={12} />
                    <div>
                      <div className="text-sm font-medium text-slate-800">{selected.head.name}</div>
                      <div className="text-xs text-slate-500">{selected.employees} employees</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-xs text-slate-500">Key Members</div>
                  <div className="mt-2 flex -space-x-2">
                    {selected.members.map((m, i) => (
                      <div
                        key={m.name}
                        className="bg-white border border-slate-100 rounded-full p-0.5"
                        title={m.name}
                      >
                        <Avatar initials={m.initials} size={8} className="ring-2 ring-white" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">KPIs</div>
                    <div className="text-xs text-slate-500">{selected.performance * 100}% avg</div>
                  </div>
                  <div className="mt-3 space-y-3">
                    <div className="flex items-center gap-3">
                      <BarChart2 className="w-5 h-5 text-sky-500" />
                      <div className="flex-1">
                        <div className="text-sm text-slate-800">Productivity</div>
                        <div className="text-xs text-slate-500">Relative to company average</div>
                        <div className="mt-2">
                          <ProgressBar value={selected.performance} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-emerald-500" />
                      <div className="flex-1">
                        <div className="text-sm text-slate-800">Satisfaction</div>
                        <div className="text-xs text-slate-500">Employee survey score</div>
                        <div className="mt-2">
                          <ProgressBar value={Math.max(0.5, selected.performance - 0.05)} />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-amber-500" />
                      <div className="flex-1">
                        <div className="text-sm text-slate-800">Projects Completed</div>
                        <div className="text-xs text-slate-500">Last quarter</div>
                        <div className="mt-2">
                          <div className="text-sm font-semibold text-slate-900">{
                            Math.round(selected.employees * selected.performance / 2)
                          }</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-col gap-2">
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white border border-slate-100 text-sm text-slate-700 hover:bg-slate-50 transition">
                    <ChevronRight className="w-4 h-4" />
                    View Projects
                  </button>
                  <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white border border-slate-100 text-sm text-slate-700 hover:bg-slate-50 transition">
                    <Users className="w-4 h-4" />
                    View Members
                  </button>
                  <button
                    onClick={() => alert(`Message sent to ${selected.name} team (mock)`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-sky-600 text-white text-sm hover:bg-sky-700 transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Message Team
                  </button>
                </div>
              </div>

              <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-800">Department Insights</h4>
                    <p className="text-xs text-slate-500 mt-1">Recent activity and highlights</p>
                  </div>
                </div>

                <ul className="mt-3 space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="text-sm text-slate-700">Engineering deployed v2.3</div>
                      <div className="text-xs text-slate-500">Deployed 3 days ago • 12 commits</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="text-sm text-slate-700">Marketing launched Q2 campaign</div>
                      <div className="text-xs text-slate-500">Launched 1 week ago • 4 assets</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
