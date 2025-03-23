"use client";

import { useState, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  if (projects.length === 0) return <p className="text-center mt-10 text-lg">Loading projects...</p>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="flex flex-col gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
}
