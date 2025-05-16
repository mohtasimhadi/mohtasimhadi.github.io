import Image from "next/image";
import { AchievementItem } from "@/types/about";
import Link from "next/link";

export default function AchievementCard({ data }: { data: AchievementItem }) {
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