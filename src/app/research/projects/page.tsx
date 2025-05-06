"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Projects: FC = () => {
  return (
    <SubPage
      link="/research/projects"
      parentLink="research"
      page="Research"
      subpage="Projects"
      dataType="project"
      json="/data/research.json"
    />
  );
};

export default Projects;