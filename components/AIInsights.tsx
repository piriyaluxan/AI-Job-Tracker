import { Card, CardContent } from "@/components/ui/card";

export default function AIInsights({ jobs }: { jobs: any[] }) {
  const total = jobs.length;

  const interviews = jobs.filter((j) => j.status === "interview").length;

  const offers = jobs.filter((j) => j.status === "offer").length;

  const successRate = total > 0 ? Math.round((offers / total) * 100) : 0;

  const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;

  const insights = [
    {
      label: "Applications",
      value: total,
    },

    {
      label: "Interview Rate",
      value: `${interviewRate}%`,
    },

    {
      label: "Offer Success",
      value: `${successRate}%`,
    },

    {
      label: "AI Match Avg",
      value: "78%",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {insights.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">{item.label}</p>

            <h3 className="text-2xl font-bold">{item.value}</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
