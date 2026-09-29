import { NavLink, useNavigate } from "react-router-dom";

const items = [
  ["/dashboard", "Dashboard"],
  ["/competitors", "Competitors"],
  ["/market-insights", "Market Insights"],
  ["/ai-analysis", "AI Analysis"],
  ["/reports", "Reports"],
  ["/alerts", "Alerts"],
  ["/settings", "Settings"],
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("ci_logged_in");
    localStorage.removeItem("ci_user");
    navigate("/login");
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-slate-200 p-5">

      {/* Logo */}
      <div className="text-xl font-black mb-8">
        CI<span className="text-cyan-500">Agent</span>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">

        {items.map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-cyan-50 text-cyan-700"
                  : "text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            {label}
          </NavLink>
        ))}

      </nav>

      {/* AI Agent Card */}
      <div className="mt-auto">

        <div className="rounded-2xl bg-slate-900 text-white p-4 mb-4">
          <b>AI Agent</b>

          <p className="text-xs text-slate-300 mt-1">
            Ask about competitors and market signals.
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full rounded-xl px-4 py-3 text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition"
        >
          Logout
        </button>

      </div>

    </aside>
  );
}