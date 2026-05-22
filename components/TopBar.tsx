export default function TopBar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      <button className="bg-black text-white px-4 py-2 rounded-lg">
        + Add Job
      </button>
    </div>
  );
}
