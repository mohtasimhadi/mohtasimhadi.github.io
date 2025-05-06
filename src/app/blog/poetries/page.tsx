"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Poetries: FC = () => {
  return (
    <SubPage
      page="Blogs"
      subpage="Poetries"
      dataType="poetry"
      json="/data/blogs.json"
    />
  );
};

export default Poetries;