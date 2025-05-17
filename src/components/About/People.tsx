'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Person {
  name: string
  designation?: string
  affiliation?: string
  duration: string
  photo: string
  link: string
  degree?: string
  university?: string
  current_affiliation?: string
}

interface PeopleData {
  advisors: Person[]
  collaborators: Person[]
  students: Person[]
  past_collaborators_mentors: Person[]
}

export default function PeopleSection() {
  const [data, setData] = useState<PeopleData | null>(null)

  useEffect(() => {
    fetch('/data/people.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error('Failed to fetch people.json', err))
  }, [])

  if (!data) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="space-y-16 py-10 px-6 max-w-6xl mx-auto">
      <PeopleGroup title="Advisors" people={data.advisors} />
      <PeopleGroup title="Current Lab" people={data.collaborators} />
      <PeopleGroup title="Students" people={data.students} isStudent />
      <PeopleGroup title="Past Collaborators & Mentors" people={data.past_collaborators_mentors} />
    </div>
  )
}

function PeopleGroup({ title, people, isStudent = false }: {
  title: string
  people: Person[]
  isStudent?: boolean
}) {
  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-300 pb-1">{title}</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {people.map((person, index) => (
          <Link
            key={index}
            href={person.link}
            target="_blank"
            className="flex items-start gap-4 border border-gray-300 p-4 hover:bg-gray-50 transition"
          >
            <Image
              src={person.photo}
              alt={person.name}
              width={60}
              height={60}
              className="object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{person.name}</h3>
              {isStudent ? (
                <>
                  <p className="text-sm text-gray-700">{person.degree}, {person.university}</p>
                  <p className="text-sm text-gray-600">{person.current_affiliation}</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-gray-700">{person.designation}</p>
                  <p className="text-sm text-gray-600">{person.affiliation}</p>
                </>
              )}
              <span className="text-xs text-gray-500">{person.duration}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
