"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import ResearchProfiles from "@/components/ResearchProfileCard";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  // Fetch profile and contact data
  useEffect(() => {
    fetch("/data/home.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error fetching home data:", err));
  }, []);


  useEffect(() => {
    fetch("/data/about.json")
      .then((res) => res.json())
      .then((data) => setAboutData(data))
      .catch((err) => console.error("Error fetching about data:", err));
  }, []);

  if (!aboutData)
    return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <>
    <div className="relative w-full bg-[#F2F0EF] overflow-hidden">
        {/* Background Image - Desktop only */}
        <div className="hidden md:flex absolute inset-0 z-0 justify-center items-center pointer-events-none">
          <img
            src={data.profile.profile_image}
            alt={data.profile.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Visible Image - Mobile only */}
        <div className="block md:hidden w-full flex justify-center pt-8">
          <img
            src={data.profile.profile_image}
            alt={data.profile.name}
            className="w-[80%] object-contain"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-36 items-start">
          {/* Left Column */}
          <div className="space-y-6 md:mr-10 order-2 md:order-none">
            <div className="flex flex-col space-y-2">
              <h1 className="text-5xl md:text-8xl font-bold">
                {data.profile.name}
              </h1>
              <h2 className="text-xl md:text-3xl text-[#0C2340] font-semibold">
                {data.profile.title}
              </h2>
            </div>
            <div className="flex flex-col space-y-2">
              <ContactItem Icon={Mail} text={data.contact.email1} />
              <ContactItem Icon={Mail} text={data.contact.email2} />
              <ContactItem Icon={Phone} text={data.contact.phone} />
              <ContactItem Icon={MapPin} text={data.contact.address} />
            </div>
            <div className="flex space-x-4">
              <SocialIcon href={data.contact.linkedin} Icon={Linkedin} />
              <SocialIcon href={data.contact.github} Icon={Github} />
              <SocialIcon href={data.contact.facebook} Icon={Facebook} />
              <SocialIcon href={data.contact.instagram} Icon={Instagram} />
            </div>
          </div>

          {/* Right Column */}
          <div className="order-3 md:order-none">
            <p className="text-base md:text-xl leading-relaxed whitespace-pre-line md:pl-16 md:pt-10">
              {data.profile.bio}
            </p>
            <ResearchProfiles/>
          </div>
        </div>
      </div>
    


    <div className="container mx-auto pt-5 px-6 py-12">
      {/* CV Section */}
      {aboutData.cv && (
        <Section title="">
          <div className="bg-gray-100 p-6 rounded border-1 flex justify-between items-center">
            <p className="text-lg">Last updated: {aboutData.cv.last_updated}</p>
            <Link
              href={aboutData.cv.link}
              target="_blank"
              className="flex items-center bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-500 transition"
            >
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
              <Card
                key={index}
                title={job.position}
                subtitle={job.company}
                duration={job.duration}
                logo={job.logo}
              >
                <p>{job.description}</p>
              </Card>
            ))}
          </Section>

          <Section title="Education">
            {aboutData.education.map((edu: any, index: number) => (
              <Card
                key={index}
                title={edu.degree}
                subtitle={edu.institution}
                duration={edu.year}
                logo={edu.logo}
              />
            ))}
          </Section>
        </div>
      ) : (
        <p className="text-center text-gray-600">No data available.</p>
      )}
      {/* Achievements Section (NEW) */}
      {aboutData.achievements && (
        <Section title="Achievements">
          {aboutData.achievements.map(
            (achievementCategory: any, categoryIndex: number) => (
              <div key={categoryIndex} className="mb-8">
                <h3 className="text-2xl font-bold text-[#0C2340] mb-4">
                  {achievementCategory.category}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {achievementCategory.items.map(
                    (item: any, itemIndex: number) => (
                      <AchievementCard key={itemIndex} data={item} />
                    )
                  )}
                </div>
              </div>
            )
          )}
        </Section>
      )}

      {/* Professional Associations */}
      {aboutData.professional_associations && (
        <Section title="Professional Associations">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutData.professional_associations.map(
              (assoc: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border-1 p-4 rounded flex flex-col items-center gap-3 border-l-4 border-gray-900"
                >
                  <div className="w-full flex justify-center">
                    <Image
                      src={assoc.logo}
                      alt={assoc.name}
                      width={150}
                      height={50}
                      className="h-auto object-contain max-w-[120px] md:max-w-[140px] lg:max-w-[160px]"
                    />
                  </div>
                  <h3 className="text-md text-center font-semibold">
                    {assoc.name}
                  </h3>
                </div>
              )
            )}
          </div>
        </Section>
      )}

      {/* Certifications */}
      {aboutData.certifications && (
        <Section title="Certifications">
          <div className="grid md:grid-cols-2 gap-4">
            {aboutData.certifications.map((cert: any, index: number) => (
              <Card
                key={index}
                title={cert.title}
                subtitle={cert.issuer}
                duration={cert.year}
                logo={cert.logo}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {aboutData.skills && (
        <Section title="Skills">
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(aboutData.skills).map(
              ([category, skills]: [string, any]) => (
                <div
                  key={category}
                  className="bg-white border-1 p-4 rounded border-l-4 border-gray-900"
                >
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {skills.map((skill: any, index: number) => (
                      <SkillBadge key={index} name={skill.name} />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </Section>
      )}
    </div>
    </>
  );
}
// Achievement Card Component
function AchievementCard({ data }: { data: any }) {
  return (
    <div className="bg-white border-1 rounded p-6 flex gap-4 border-l-4 border-gray-900">
      <Image
        src={data.image}
        alt={data.title}
        width={80}
        height={80}
        className="rounded object-contain"
      />
      <div>
        <h3 className="text-lg font-semibold">{data.title}</h3>
        <p className="text-sm text-gray-600">{data.details}</p>
        <p className="text-sm text-gray-500 mt-1">{data.date}</p>
        {data.link && (
          <Link
            href={data.link}
            target="_blank"
            className="text-[#0C2340] font-semibold hover:underline mt-2 inline-block"
          >
            View Details
          </Link>
        )}
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </div>
  );
}

// Reusable Card Component
function Card({ title, subtitle, duration, logo, children }: any) {
  return (
    <div className="bg-white border-1 rounded p-6 m-2 flex gap-4 border-l-4 border-gray-900">
      {logo && (
        <Image
          src={logo}
          alt={title}
          width={60}
          height={60}
          className="rounded object-contain"
        />
      )}
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-[#0C2340]">{subtitle}</p>
        <p className="text-sm text-gray-600">{duration}</p>
        {children && <div className="mt-2 text-sm">{children}</div>}
      </div>
    </div>
  );
}

// Skill Badge Component
function SkillBadge({ name }: { name: string }) {
  return (
    <div className="bg-gray-200 px-3 py-2 rounded text-sm font-semibold">
      {name}
    </div>
  );
}

// Contact Information Component
function ContactItem({ Icon, text }: { Icon: any; text: string }) {
  return (
    <div className="flex items-center space-x-2 text-xl">
      <Icon className="w-5 h-5 text-gray-900" />
      <p>{text}</p>
    </div>
  );
}

// Social Media Icon Component
function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="w-8 h-8 text-gray-900 hover:text-gray-700 transition" />
    </Link>
  );
}
