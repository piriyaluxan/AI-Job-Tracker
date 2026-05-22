import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  const { resume, job } = await req.json();

  const res = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `
Compare resume and job:

Resume:
${resume}

Job:
${job}

Return:
- match percentage
- missing skills
- improvement tips
        `,
      },
    ],
  });

  return Response.json({
    result: res.choices[0].message.content,
  });
}
