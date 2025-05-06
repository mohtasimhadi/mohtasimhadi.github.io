"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Presentations: FC = () => {
  return (
    <SubPage
      page="Research"
      subpage="Presentations"
      dataType="presentation"
      json="/data/research.json"
    />
  );
};

export default Presentations;