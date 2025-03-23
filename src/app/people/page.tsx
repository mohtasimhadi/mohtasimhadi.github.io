"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MentorshipPage() {
  const [mentorshipData, setMentorshipData] = useState<any>(null);

  useEffect(() => {
    fetch("/mentorship.json")
      .then((res) => res.json())
      .then((data) => setMentorshipData(data))
      .catch((err) => console.error("Error fetching mentorship data:", err));
  }, []);

  if (!mentorshipData) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#E87722] mb-8 text-center">Mentorship</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentorshipData.students.map((student: any, index: number) => (
          <MentorshipCard key={index} student={student} />
        ))}
      </div>
    </div>
  );
}

// Reusable Card Component for Mentorship
function MentorshipCard({ student }: { student: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center border-l-4 border-[#E87722]">
      {/* Profile Picture */}
      <Image 
        src={student.photo} 
        alt={student.name} 
        width={120} 
        height={120} 
        className="rounded-full object-cover mb-4" 
      />

      {/* Student Info */}
      <h3 className="text-lg font-semibold">{student.name}</h3>
      <p className="text-sm text-gray-600">{student.degree}</p>
      <p className="text-sm text-[#0C2340]">{student.university}</p>
      <p className="text-sm text-gray-500 mt-2">{student.duration}</p>

      {/* Current Position */}
      <p className="text-sm text-gray-700 mt-2 font-semibold">Current Position: {student.current_affiliation}</p>

      {/* LinkedIn Link */}
      {student.link && (
        <Link
          href={student.link}
          target="_blank"
          className="mt-3 text-[#0C2340] font-semibold hover:underline flex items-center gap-2"
        >
          LinkedIn
        </Link>
      )}
    </div>
  );
}
