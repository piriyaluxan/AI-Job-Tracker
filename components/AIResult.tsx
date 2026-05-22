import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AIResult({ data }: any) {
  if (!data) return null;

  if (data.error) {
    return (
      <Card className="mt-4 border-red-300">
        <CardContent className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-red-600">AI Error</h3>
            <p className="text-sm text-red-600 mt-2">{data.error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const score = Number(data.match_score) || 0;

  return (
    <Card className="mt-4">
      <CardContent className="p-5 space-y-4">
        {/* Match Score */}
        <div>
          <h3 className="text-lg font-semibold">Match Score</h3>

          <div className="w-full bg-gray-200 h-3 rounded-full mt-2">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{ width: `${score}%` }}
            />
          </div>

          <p className="text-sm mt-1">{score}% match</p>
        </div>

        {/* Difficulty */}
        <div>
          <Badge>Difficulty: {data.difficulty_level}</Badge>
        </div>

        {/* Required Skills */}
        <div>
          <h4 className="font-semibold mb-2">Required Skills</h4>

          <div className="flex flex-wrap gap-2">
            {data.required_skills?.map((skill: string) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Missing Skills */}
        <div>
          <h4 className="font-semibold mb-2 text-red-500">Missing Skills</h4>

          <div className="flex flex-wrap gap-2">
            {data.missing_skills?.map((skill: string) => (
              <Badge key={skill} variant="destructive">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
