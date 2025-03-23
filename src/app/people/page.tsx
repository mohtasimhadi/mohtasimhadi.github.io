"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MentorshipPage() {
  const [mentorshipData, setMentorshipData] = useState<any>(null);

  useEffect(() => {
    fetch("/data/people.json")
      .then((res) => res.json())
      .then((data) => setMentorshipData(data))
      .catch((err) => console.error("Error fetching mentorship data:", err));
  }, []);

  if (!mentorshipData) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Students Section */}
      <Section title="Students" data={mentorshipData.students} />
      
      {/* Advisors Section */}
      <Section title="Advisors" data={mentorshipData.advisors} />

      {/* Collaborators Section */}
      <Section title="Collaborators" data={mentorshipData.collaborators} />

      {/* Past Collaborators & Mentors Section */}
      <Section title="Past Collaborators & Mentors" data={mentorshipData.past_collaborators_mentors} />
    </div>
  );
}

// Reusable Section Component
function Section({ title, data }: { title: string; data: any[] }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-[#0C2340] mb-6 text-center">{title}</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((person, index) => (
          <MentorshipCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
}

// Reusable Card Component for Mentorship
function MentorshipCard({ person }: { person: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center border-l-4 border-[#E87722]">
      {/* Profile Picture with Fixed Size */}
      <div className="w-[120px] h-[120px] overflow-hidden rounded-full mb-4 flex items-center justify-center bg-gray-200">
        <Image 
          src={person.photo} 
          alt={person.name} 
          width={120} 
          height={120} 
          className="object-cover w-full h-full"
        />
      </div>

      {/* Person Info */}
      <h3 className="text-lg font-semibold">{person.name}</h3>
      <p className="text-sm text-gray-600">{person.designation || person.degree}</p>
      <p className="text-sm text-[#0C2340]">{person.affiliation || person.university}</p>
      <p className="text-sm text-gray-500 mt-2">{person.duration}</p>

      {/* Current Position (if available) */}
      {person.current_affiliation && (
        <p className="text-sm text-gray-700 mt-2 font-semibold">Current Position: {person.current_affiliation}</p>
      )}

      {/* LinkedIn / Profile Link */}
      {person.link && (
        <Link
          href={person.link}
          target="_blank"
          className="mt-3 text-[#0C2340] font-semibold hover:underline flex items-center gap-2"
        >
          LinkedIn / Profile
        </Link>
      )}
    </div>
  );
}
