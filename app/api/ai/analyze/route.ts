import OpenAI from "openai";

const useMock = process.env.USE_MOCK_AI === "true";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { description } = await req.json();

  // ✅ MOCK MODE
  if (useMock) {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return Response.json({
      required_skills: ["React", "Next.js", "TypeScript", "REST APIs"],

      difficulty_level: "junior",

      missing_skills: ["Testing", "Docker"],

      match_score: 82,
    });
  }

  // ✅ REAL OPENAI MODE
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "user",
        content: description,
      },
    ],
  });

  return Response.json({
    result: completion.choices[0].message.content,
  });
}
