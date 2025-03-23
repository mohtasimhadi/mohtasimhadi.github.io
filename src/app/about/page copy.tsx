"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null);

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  if (!aboutData) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* CV Section */}
      {aboutData.cv && (
        <Section title="">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md flex justify-between items-center">
            <p className="text-lg">Last updated: {aboutData.cv.last_updated}</p>
            <Link href={aboutData.cv.link} target="_blank" className="flex items-center bg-[#E87722] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#d76c1a] transition">
              <FileText className="w-5 h-5 mr-2" /> Download CV
            </Link>
          </div>
        </Section>
      )}

      {/* Work & Education Section */}
      {aboutData.work_experience && aboutData.education ? (
        <div className="grid md:grid-cols-2 gap-12">
          <Section title="Work Experience">
            {aboutData.work_experience.map((job: any, index: number) => (
              <Card key={index} title={job.position} subtitle={job.company} duration={job.duration} logo={job.logo} />
            ))}
          </Section>

          <Section title="Education">
            {aboutData.education.map((edu: any, index: number) => (
              <Card key={index} title={edu.degree} subtitle={edu.institution} duration={edu.year} logo={edu.logo} />
            ))}
          </Section>
        </div>
      ) : (
        <p className="text-center text-gray-600">No data available.</p>
      )}

      {/* Achievements Section (NEW) */}
      {aboutData.achievements && (
        <Section title="Achievements">
          {aboutData.achievements.map((achievementCategory: any, categoryIndex: number) => (
            <div key={categoryIndex} className="mb-8">
              <h3 className="text-2xl font-bold text-[#0C2340] mb-4">{achievementCategory.category}</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {achievementCategory.items.map((item: any, itemIndex: number) => (
                  <AchievementCard key={itemIndex} data={item} />
                ))}
              </div>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

// Achievement Card Component
function AchievementCard({ data }: { data: any }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-4 border-l-4 border-[#E87722]">
      <Image src={data.image} alt={data.title} width={80} height={80} className="rounded-md object-contain" />
      <div>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="text-sm text-gray-600">{data.details}</p>
        <p className="text-sm text-gray-500 mt-1">{data.date}</p>
        {data.link && (
          <Link href={data.link} target="_blank" className="text-[#0C2340] font-semibold hover:underline mt-2 inline-block">
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#E87722] mb-4">{title}</h2>
      {children}
    </div>
  );
}

// Reusable Card Component
function Card({ title, subtitle, duration, logo, children }: any) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex gap-4 border-l-4 border-[#E87722]">
      {logo && <Image src={logo} alt={title} width={60} height={60} className="rounded-md object-contain" />}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[#0C2340]">{subtitle}</p>
        <p className="text-sm text-gray-600">{duration}</p>
        {children && <div className="mt-2 text-sm">{children}</div>}
      </div>
    </div>
  );
}