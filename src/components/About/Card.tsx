import Image from "next/image";

// Define the interface for the Card props
interface CardProps {
  title: string;
  subtitle: string;
  duration: string;
  logo?: string; // Optional logo
  children?: React.ReactNode; // Optional children, since it can be anything renderable
}

export default function Card({ title, subtitle, duration, logo, children }: CardProps) {
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
