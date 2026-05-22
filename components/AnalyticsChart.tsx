"use client";

import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

import { Card, CardContent } from "@/components/ui/card";

export default function AnalyticsChart({ jobs }: { jobs: any[] }) {
  const data = [
    {
      name: "Applied",
      value: jobs.filter((j) => j.status === "applied").length,
    },

    {
      name: "Interview",
      value: jobs.filter((j) => j.status === "interview").length,
    },

    {
      name: "Offer",
      value: jobs.filter((j) => j.status === "offer").length,
    },

    {
      name: "Rejected",
      value: jobs.filter((j) => j.status === "rejected").length,
    },
  ];

  return (
    <Card className="mt-6">
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-4">Application Funnel</h2>

        <div className="h-75">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />

              <Tooltip />

              <Bar dataKey="value" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
