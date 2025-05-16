import Image from "next/image";
import { Person } from "@/types/people";

const PeopleCard: React.FC<{ person: Person }> = ({ person }) => {
  return (
    <div className="bg-white border-1 rounded p-6 flex flex-col sm:flex-row sm:items-start sm:gap-6 text-center sm:text-left border-l-4 border-gray-900">
      {/* Profile Picture with Fixed Size */}
      <div className="w-full sm:w-[120px] flex justify-center sm:justify-start">
        <div className="w-[120px] h-[120px] overflow-hidden rounded mb-4 sm:mb-0 flex items-center justify-center bg-gray-200">
          <Image
            src={person.photo}
            alt={person.name}
            width={120}
            height={120}
            className="rounded object-cover w-full h-auto"
          />
        </div>
      </div>

      {/* Person Info */}
      <div className="flex flex-col justify-center w-full">
        <a href={person.link}>
          <p className="text-lg font-bold text-gray-900">{person.name}</p>
        </a>
        <p className="text-sm text-gray-600">
          {person.designation || person.degree}
        </p>
        <p className="text-sm text-[#0C2340]">
          {person.affiliation || person.university}
        </p>
        <p className="text-sm text-gray-500">{person.duration}</p>

        {/* Current Position (if available) */}
        {person.current_affiliation && (
          <p className="text-sm text-gray-700 font-semibold">
            Current Position: {person.current_affiliation}
          </p>
        )}
      </div>
    </div>
  );
};

export default PeopleCard;
