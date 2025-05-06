"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Publications: FC = () => {
  return (
    <SubPage
      link="/research/publications"
      parentLink="research"
      page="Research"
      subpage="Publications"
      dataType="publication"
      json="/data/research.json"
    />
  );
};

export default Publications;