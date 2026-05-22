import { Card, CardContent } from "@/components/ui/card";

export default function AISuggestions() {
  const suggestions = [
    "Improve TypeScript knowledge for better match scores.",

    "Applications with Tailwind CSS skills have higher interview rates.",

    "Consider adding testing experience to your resume.",

    "Your profile matches frontend-focused SaaS companies.",
  ];

  return (
    <Card className="mt-6">
      <CardContent className="p-5">
        <h2 className="text-lg font-semibold mb-4">AI Career Insights</h2>

        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <div key={index} className="p-3 rounded-lg border bg-gray-50">
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
