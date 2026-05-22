import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description || typeof description !== "string") {
      return Response.json(
        { error: "Missing or invalid job description." },
        { status: 400 },
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a job analysis AI. Always return ONLY valid JSON. No text.",
        },
        {
          role: "user",
          content: `
Analyze this job description:

${description}

Return JSON in this format:
{
  "required_skills": ["skill1", "skill2"],
  "difficulty_level": "junior" | "mid" | "senior",
  "missing_skills": ["skillA", "skillB"],
  "match_score": 0
}
`,
        },
      ],
    });

    const raw = completion.choices?.[0]?.message?.content ?? "";
    const trimmed = raw.trim();
    const jsonText = trimmed.match(/\{[\s\S]*\}$/)?.[0] ?? trimmed;
    const parsed = JSON.parse(jsonText);

    return Response.json(parsed);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected AI server error.";

    return Response.json({ error: message }, { status: 500 });
  }
}
