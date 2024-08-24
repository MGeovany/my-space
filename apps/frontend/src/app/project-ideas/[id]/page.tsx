"use client";
import { Icons } from "@/components/icons";
import { API_URL } from "@/constants";
import React, { useEffect, useState } from "react";

import { format } from "date-fns";

export default function Page({ params }: { params: { id: string } }) {
  const [projectIdeas, setProjectIdeas] = useState<Bookmark>();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/project_ideas/${params.id}`);
        const data = await response.json();
        if (data.success) {
          setProjectIdeas(data.data);
        }
      } catch (error) {
        console.error("Error fetching projectIdeas:", error);
      }
    }

    fetchData();
  }, [params.id]);

  if (!projectIdeas) {
    return (
      <div className="flex items-center justify-center w-full">
        <Icons.loading />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 pb-10 md:px-8 flex max-h-screen flex-col overflow-y-auto">
      <h1 className="text-3xl font-bold">{projectIdeas.title}</h1>
      <p className="text-zinc-400 my-4">
        {format(projectIdeas.updatedAt, "MMMM dd, yyyy")}
      </p>
      <p className="my-10 leading-7 text-zinc-400">
        {projectIdeas.description}
      </p>
    </div>
  );
}
