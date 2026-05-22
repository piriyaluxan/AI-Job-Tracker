"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AIResult from "./AIResult";

export default function AIAnalyzer() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!text.trim()) {
      setError("Please paste a job description first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "AI analysis failed.");
      } else if (data?.error) {
        setError(data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error("AI analyze error", err);
      setError("Failed to contact the AI server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-4 space-y-3">
        <h2 className="text-lg font-semibold">AI Job Analyzer</h2>

        <Textarea
          placeholder="Paste job description..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Button onClick={analyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Job"}
        </Button>

        {error ? <p className="text-sm text-red-600 mt-2">{error}</p> : null}

        {/* 👇 CLEAN AI UI */}
        <AIResult data={result} />
      </CardContent>
    </Card>
  );
}
