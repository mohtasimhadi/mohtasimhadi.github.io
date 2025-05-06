"use client";

import SubPage from "@/components/SubPage";
import { FC } from "react";

const Notes: FC = () => {
  return (
    <SubPage
      page="Blogs"
      subpage="Notes"
      dataType="note"
      json="/data/blogs.json"
    />
  );
};

export default Notes;