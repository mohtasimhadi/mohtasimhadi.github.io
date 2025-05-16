"use client";
import SkillBadge from "@/components/About/SkillBadge";
import SocialIcon from "@/components/About/SocialIcons";
import ContactItem from "@/components/About/ContactItem";
import AchievementCard from "@/components/About/AchievementCard";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FileText } from "lucide-react";
import ResearchProfiles from "@/components/About/ResearchProfileCard";
import Card from "@/components/About/Card";
import PeopleSection from "@/components/About/People";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";
import { AchievementCategory, AchievementItem, Certification, Data, Education, ProfessionalAssociation, SkillCategory, UserData, WorkExperience } from "@/types/about";
import { ResearchTeamData } from "@/types/people";

export default function AboutPage() {
  const [aboutData, setAboutData] = useState<Data | null>(null);
  const [data, setData] = useState<UserData | null>(null);
  const [peopleData, setPeopleData] = useState<ResearchTeamData | null>(null);

  useEffect(() => {
    fetch("/data/people.json")
      .then((res) => res.json())
      .then((data) => setPeopleData(data))
      .catch((err) => console.error("Error fetching people data:", err));
  }, []);

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
  if (!peopleData) return <p className="mt-10 text-lg">Loading...</p>;

  return (
    <>
      <div className="relative w-full bg-slate-200 overflow-hidden pt-0 mt-0">
        {/* Background Image - Desktop only */}
        <div className="hidden md:flex absolute inset-0 z-0 justify-center items-center pointer-events-none  pt-0 mt-0">
          <Image
            src={data.profile.profile_image}
            alt={data.profile.name}
            layout="intrinsic"  // or use "responsive" depending on your requirements
            width={700}         // Specify width
            height={700}        // Specify height
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Visible Image - Mobile only */}
        <div className="block md:hidden w-full flex justify-center pt-8">
          <Image
            src={data.profile.profile_image}
            alt={data.profile.name}
            layout="intrinsic"  // or use "responsive" depending on your requirements
            width={500}         // Specify width
            height={500}        // Specify height
            className="max-w-full max-h-full object-contain"
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
            <ResearchProfiles />
          </div>
        </div>
      </div>

      <div className="container mx-auto pt-5 px-6 py-12">
        {/* CV Section */}
        {aboutData.cv && (
          <Section title="">
            <div className="bg-gray-100 p-6 rounded border-1 flex justify-between items-center">
              <p className="text-lg">
                Last updated: {aboutData.cv.last_updated}
              </p>
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
              {aboutData.work_experience.map((job: WorkExperience, index: number) => (
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
              {aboutData.education.map((edu: Education, index: number) => (
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
              (achievementCategory: AchievementCategory, categoryIndex: number) => (
                <div key={categoryIndex} className="mb-8">
                  <h3 className="text-2xl font-bold text-[#0C2340] mb-4">
                    {achievementCategory.category}
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {achievementCategory.items.map(
                      (item: AchievementItem, itemIndex: number) => (
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
                (assoc: ProfessionalAssociation, index: number) => (
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
              {aboutData.certifications.map((cert: Certification, index: number) => (
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
                ([category, skills]: [string, SkillCategory[]]) => (
                  <div
                    key={category}
                    className="bg-white border-1 p-4 rounded border-l-4 border-gray-900"
                  >
                    <h3 className="text-lg font-semibold">{category}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {skills.map((skill: SkillCategory, index: number) => (
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

      <div className="container mx-auto pt-1 px-6 py-12">
        {/* Students Section */}
        <PeopleSection title="Students" data={peopleData.students} />

        {/* Advisors Section */}
        <PeopleSection title="Advisors" data={peopleData.advisors} />

        {/* Collaborators Section */}
        <PeopleSection title="Current Lab" data={peopleData.collaborators} />

        {/* Past Collaborators & Mentors Section */}
        <PeopleSection
          title="Past Collaborators & Mentors"
          data={peopleData.past_collaborators_mentors}
        />
      </div>
    </>
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