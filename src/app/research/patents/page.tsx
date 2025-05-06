"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Patents: FC = () => {
  return (
    <SubPage
      link="/research/patents"
      parentLink="research"
      page="Research"
      subpage="Patents"
      dataType="patent"
      json="/data/research.json"
    />
  );
};

export default Patents;
