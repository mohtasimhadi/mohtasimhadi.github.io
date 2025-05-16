import { Person } from "@/types/people";
import PeopleCard from "./PeopleCard";

export default function PeopleSection({
  title,
  data,
}: {
  title: string;
  data: Person[];  // Use the Person type here
}) {
  if (!data || data.length === 0) return null;

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">{title}</h2>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
        {data.map((person, index) => (
          <PeopleCard key={index} person={person} />
        ))}
      </div>
    </div>
  );
}