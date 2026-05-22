"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);

    // 1. Upload PDF
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/resume/upload", {
      method: "POST",
      body: formData,
    });

    const { text } = await res.json();

    // 2. Send to AI
    const aiRes = await fetch("/api/ai/resume-analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const result = await aiRes.json();

    setData(result);
    setLoading(false);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-5 space-y-3">
        <h2 className="text-lg font-semibold">Resume AI Analyzer</h2>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <Button onClick={handleUpload}>
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </Button>

        {data && (
          <div className="mt-4 space-y-2">
            <p>
              <b>Name:</b> {data.name}
            </p>

            <p>
              <b>Experience:</b> {data.experience_level}
            </p>

            <p>
              <b>Summary:</b> {data.summary}
            </p>

            <div>
              <b>Skills:</b>
              <div className="flex flex-wrap gap-2 mt-2">
                {data.skills?.map((s: string, i: number) => (
                  <span key={i} className="px-2 py-1 bg-gray-200 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <b>Suggested Roles:</b>
              <ul className="list-disc ml-5">
                {data.suggested_roles?.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
