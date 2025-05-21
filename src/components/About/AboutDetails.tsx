'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FileText } from 'lucide-react'

interface Experience {
  position: string
  company: string
  duration: string
  description?: string
  logo: string
}

interface Education {
  degree: string
  institution: string
  year: string
  logo: string
}

interface Certification {
  title: string
  issuer: string
  year: string
  logo: string
}

interface Association {
  name: string
  logo: string
}

interface AchievementItem {
  title: string
  details: string
  date: string
  image: string
  link?: string
}

interface AchievementCategory {
  category: string
  items: AchievementItem[]
}

interface CV {
  link: string
  last_updated: string
}

interface AboutData {
  work_experience: Experience[]
  education: Education[]
  certifications: Certification[]
  professional_associations: Association[]
  achievements: AchievementCategory[]
  cv: CV
}

export default function AboutDetails() {
  const [data, setData] = useState<AboutData | null>(null)

  useEffect(() => {
    fetch('/data/about.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to fetch about.json', err))
  }, [])

  if (!data) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="space-y-8 pb-10 mx-auto">
      {/* CV */}
      <section className="border border-gray-300 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-medium text-gray-900">Curriculum Vitae</h2>
          <p className="text-gray-600">Last updated: {data.cv.last_updated}</p>
        </div>
        <Link
          href={data.cv.link}
          target="_blank"
          className="flex items-center text-sm border border-gray-800 text-gray-900 px-4 py-2 hover:bg-gray-100 transition"
        >
          <FileText className="w-4 h-4 mr-2" />
          Download CV
        </Link>
      </section>

      <Section title="Work Experience">
        {data.work_experience.map((item, i) => (
          <Card key={i} title={item.position} subtitle={item.company} duration={item.duration} logo={item.logo} />
        ))}
      </Section>

      <Section title="Education">
        {data.education.map((edu, i) => (
          <Card key={i} title={edu.degree} subtitle={edu.institution} duration={edu.year} logo={edu.logo} />
        ))}
      </Section>

      <Section title="Certifications">
        <div className="grid md:grid-cols-2 gap-6">
          {data.certifications.map((cert, i) => (
            <Card key={i} title={cert.title} subtitle={cert.issuer} duration={cert.year} logo={cert.logo} />
          ))}
        </div>
      </Section>

      <Section title="Professional Associations">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {data.professional_associations.map((assoc, i) => (
            <div
              key={i}
              className="border border-gray-300 p-4 flex flex-col items-center"
            >
              <Image src={assoc.logo} alt={assoc.name} width={100} height={50} className="object-contain" />
              <p className="text-sm mt-2 text-center text-gray-800">{assoc.name}</p>
            </div>
          ))}
        </div>
      </Section>

      {data.achievements.map((cat, i) => (
        <Section key={i} title={cat.category}>
          <div className="grid md:grid-cols-2 gap-6">
            {cat.items.map((item, j) => (
              <a
                key={j}
                href={item.link || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 border border-gray-300 p-4 hover:bg-gray-50 transition"
              >
                <Image src={item.image} alt={item.title} width={50} height={50} className="object-contain" />
                <div>
                  <h4 className="font-medium text-gray-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">{item.details}</p>
                  <span className="text-xs text-gray-500">{item.date}</span>
                </div>
              </a>
            ))}
          </div>
        </Section>
      ))}
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-1">{title}</h2>
      {children}
    </section>
  )
}

function Card({
  title,
  subtitle,
  duration,
  logo,
}: {
  title: string
  subtitle: string
  duration: string
  logo: string
}) {
  return (
    <div className="flex gap-4 items-start border-b border-gray-200 py-4">
      <Image src={logo} alt={subtitle} width={40} height={40} className="object-contain" />
      <div>
        <h3 className="text-md font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <span className="text-xs text-gray-500">{duration}</span>
      </div>
    </div>
  )
}