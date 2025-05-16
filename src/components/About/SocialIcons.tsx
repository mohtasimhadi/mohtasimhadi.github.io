import Link from "next/link";

export default function SocialIcon({ href, Icon }: { href: string; Icon: React.ComponentType<React.SVGProps<SVGSVGElement>> }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="w-8 h-8 text-gray-900 hover:text-gray-700 transition" />
    </Link>
  );
}