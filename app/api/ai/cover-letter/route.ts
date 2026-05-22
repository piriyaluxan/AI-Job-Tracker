import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { name, job } = await req.json();

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Write a professional cover letter.

Name: ${name}
Job: ${job}

Make it:
- concise
- professional
- ATS friendly
        `,
      },
    ],
  });

  return Response.json({
    letter: res.choices[0].message.content,
  });
}
