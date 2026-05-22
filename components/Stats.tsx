import { Card, CardContent } from "@/components/ui/card";

export default function Stats({ jobs }: { jobs: any[] }) {
  const applied = jobs.filter((j) => j.status === "applied").length;
  const interview = jobs.filter((j) => j.status === "interview").length;
  const offer = jobs.filter((j) => j.status === "offer").length;
  const rejected = jobs.filter((j) => j.status === "rejected").length;

  const data = [
    { label: "Applied", value: applied },
    { label: "Interview", value: interview },
    { label: "Offers", value: offer },
    { label: "Rejected", value: rejected },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {data.map((item) => (
        <Card key={item.label}>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
