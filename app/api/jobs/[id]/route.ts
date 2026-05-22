import { prisma } from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  const body = await req.json();

  const updatedJob = await prisma.job.update({
    where: { id: params.id },
    data: body,
  });

  return Response.json(updatedJob);
}
