"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const TheTypist: FC = () => {
  return (
    <SubPage
      page="Blogs"
      subpage="TheTypist"
      dataType="theTypist"
      json="/data/blogs.json"
    />
  );
};

export default TheTypist;