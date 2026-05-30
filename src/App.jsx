import {
  LayoutDashboard,
  Trophy,
  Building2,
  CalendarDays,
  BookOpen,
  Users,
  Image,
  Bell,
  Search,
} from "lucide-react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Recognition from "./pages/Recognition";
import Departments from "./pages/Departments";
import Events from "./pages/Events";
import KnowledgeHub from "./pages/KnowledgeHub";
import Gallery from "./pages/Gallery";

export default function App() {
  const sidebarItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: Trophy,
      label: "Recognition",
      path: "/recognition",
    },
    {
      icon: Building2,
      label: "Departments",
      path: "/departments",
    },
    {
      icon: CalendarDays,
      label: "Events",
      path: "/events",
    },
    {
      icon: BookOpen,
      label: "Knowledge Hub",
      path: "/knowledge",
    },
    
    {
      icon: Image,
      label: "Gallery",
      path: "/gallery",
    },
  ];

  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        <aside className="w-64 bg-black text-white flex flex-col p-5">
          <h1 className="text-3xl font-bold mb-10 text-blue-500">
            PulseHub
          </h1>

          <nav className="flex flex-col gap-3">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={index}
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col">

          {/* Navbar */}
          <header className="h-20 bg-white border-b flex items-center justify-between px-8">

            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-xl w-96">
              <Search className="text-gray-500" size={18} />

              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none ml-3 w-full"
              />
            </div>

            <div className="flex items-center gap-5">
              <Bell className="text-gray-700 cursor-pointer" />

              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-10 h-10 rounded-full"
                />

                <div>
                  <h3 className="font-semibold">Sanket</h3>

                  <p className="text-sm text-gray-500">
                    Product Intern
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Pages */}
          <section className="flex-1 p-8 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recognition" element={<Recognition />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/events" element={<Events />} />
              <Route path="/knowledge" element={<KnowledgeHub />} />
              <Route path="/gallery" element={<Gallery />} />
            </Routes>
          </section>
        </main>
      </div>
    </BrowserRouter>
  );
}