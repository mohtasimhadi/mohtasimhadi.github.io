"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Presentations: FC = () => {
  return (
    <SubPage
      link="/research/presentations"
      parentLink="research"
      page="Research"
      subpage="Presentations"
      dataType="presentation"
      json="/data/research.json"
    />
  );
};

export default Presentations;