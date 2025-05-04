"use client";

import { useState, useEffect } from "react";
import PeopleCard from "@/components/PeopleCard";

export default function PeoplePage() {
  const [peopleData, setPeopleData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/people.json")
      .then((res) => res.json())
      .then((data) => setPeopleData(data))
      .catch((err) => console.error("Error fetching people data:", err));
  }, []);

  if (!peopleData) return <p className="mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Students Section */}
      <Section title="Students" data={peopleData.students} />
      
      {/* Advisors Section */}
      <Section title="Advisors" data={peopleData.advisors} />

      {/* Collaborators Section */}
      <Section title="Current Lab" data={peopleData.collaborators} />

      {/* Past Collaborators & Mentors Section */}
      <Section title="Past Collaborators & Mentors" data={peopleData.past_collaborators_mentors} />
    </div>
  );
}

// Reusable Section Component
function Section({ title, data }: { title: string; data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-[#E87722] mb-6">{title}</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {data.map((person, index) => (
          <PeopleCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
}
