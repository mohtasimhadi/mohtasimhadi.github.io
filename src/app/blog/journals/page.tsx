"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Publications: FC = () => {
  return (
    <SubPage
      page="Blogs"
      subpage="Journals"
      dataType="journal"
      json="/data/blogs.json"
    />
  );
};

export default Publications;