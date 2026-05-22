"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil } from "lucide-react";

export default function JobList({ jobs, onEdit, onDelete }: any) {
  return (
    <div className="space-y-3">
      {jobs.map((job: any) => (
        <Card key={job.id}>
          <CardContent className="flex justify-between items-center p-4">
            <div>
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-gray-500">{job.company}</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge>{job.status}</Badge>

              <Button size="sm" variant="outline" onClick={() => onEdit(job)}>
                <Pencil size={14} />
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(job.id)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
