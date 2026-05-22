import DashboardClient from "./DashboardClient";

async function getJobs() {
  const res = await fetch("http://localhost:3000/api/jobs", {
    cache: "no-store",
  });

  return res.json();
}

export default async function DashboardPage() {
  const jobs = await getJobs();

  return <DashboardClient jobs={jobs} />;
}
