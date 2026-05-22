"use client";

import { useState, useEffect } from "react";

export default function AddJobModal({ onClose, onSuccess, editJob }: any) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    status: "applied",
    location: "",
    url: "",
    notes: "",
  });

  // 🧠 Load edit data
  useEffect(() => {
    if (editJob) {
      setForm(editJob);
    }
  }, [editJob]);

  const handleSubmit = async () => {
    if (editJob) {
      // ✏️ UPDATE
      await fetch(`/api/jobs/${editJob.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } else {
      // ➕ CREATE
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    onSuccess();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white w-[500px] p-6 rounded-xl">
        <h2 className="text-xl font-semibold mb-4">
          {editJob ? "Edit Job" : "Add Job"}
        </h2>

        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border p-2 mb-2"
        />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full border p-2 mb-2"
        />

        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-2 w-full"
        >
          {editJob ? "Update Job" : "Save Job"}
        </button>
      </div>
    </div>
  );
}
