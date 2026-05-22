"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Stats from "@/components/Stats";
import JobList from "@/components/JobList";
import AddJobModal from "@/components/AddJobModal";
import AIAnalyzer from "@/components/AIAnalyzer";

export default function DashboardClient({ jobs: initialJobs }: any) {
  const [jobs, setJobs] = useState(initialJobs);
  const [open, setOpen] = useState(false);
  const [editJob, setEditJob] = useState(null);

  const refreshJobs = async () => {
    const res = await fetch("/api/jobs");
    const data = await res.json();
    setJobs(data);
  };

  // 🗑️ DELETE
  const handleDelete = async (id: string) => {
    await fetch("/api/jobs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    refreshJobs();
  };

  // ✏️ EDIT (open modal with data)
  const handleEdit = (job: any) => {
    setEditJob(job);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />

      <main className="flex-1 p-6">
        <div className="flex justify-between mb-6">
          <h1 className="text-2xl font-semibold">Dashboard</h1>

          <button
            onClick={() => {
              setEditJob(null);
              setOpen(true);
            }}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Job
          </button>
        </div>
        <AIAnalyzer />
        <Stats jobs={jobs} />

        <JobList jobs={jobs} onDelete={handleDelete} onEdit={handleEdit} />

        {open && (
          <AddJobModal
            editJob={editJob}
            onClose={() => setOpen(false)}
            onSuccess={() => {
              setOpen(false);
              refreshJobs();
            }}
          />
        )}
      </main>
    </div>
  );
}
