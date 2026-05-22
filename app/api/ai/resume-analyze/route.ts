import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { text } = await req.json();

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: "Return ONLY valid JSON. No explanation.",
      },

      {
        role: "user",
        content: `
Extract structured data from this resume:

${text}

Return JSON:
{
  "name": "",
  "skills": [],
  "experience_level": "junior | mid | senior",
  "summary": "",
  "suggested_roles": []
}
          `,
      },
    ],
  });

  const raw = completion.choices[0].message.content;

  try {
    return Response.json(JSON.parse(raw || "{}"));
  } catch {
    return Response.json({
      error: "Invalid AI response",
    });
  }
}
