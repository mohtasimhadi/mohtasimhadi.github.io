"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Patents: FC = () => {
  return (
    <SubPage
      page="Research"
      subpage="Patents"
      dataType="patent"
      json="/data/research.json"
    />
  );
};

export default Patents;
