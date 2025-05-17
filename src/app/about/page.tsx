"use client";

import AboutDetails from "@/components/About/AboutDetails";
import AboutDesctiption from "@/components/About/Description";
import PeopleSection from "@/components/About/People";

export default function AboutPage() {
  return (
    <>
      <AboutDesctiption />
      <AboutDetails />
      <PeopleSection/>
    </>
  );
}