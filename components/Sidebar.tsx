import { LayoutDashboard, Briefcase } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen p-6">
      <h1 className="text-xl font-bold mb-8">AI Job Tracker</h1>

      <nav className="space-y-3">
        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
          <Briefcase size={18} />
          Jobs
        </div>
      </nav>
    </aside>
  );
}
