import { prisma } from "@/lib/prisma";

export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json(jobs);
}

export async function POST(req: Request) {
  const body = await req.json();

  const job = await prisma.job.create({
    data: body,
  });

  return Response.json(job);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.job.delete({
    where: { id },
  });

  return Response.json({ message: "Deleted" });
}
