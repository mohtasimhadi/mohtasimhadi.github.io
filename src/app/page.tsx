"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Instagram } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-6">
      {/* Profile Image from Public Folder */}
      <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-[#E87722] shadow-lg">
        <Image
          src="/dp.jpg"
          alt="Mohtasim Hadi Rafi"
          width={192}
          height={192}
          className="object-cover"
          priority
        />
      </div>

      {/* Name & Title */}
      <h1 className="text-3xl font-bold mt-4">Mohtasim Hadi Rafi</h1>
      <h2 className="text-lg text-[#0C2340] font-semibold">Graduate Research Assistant</h2>
      <p className="text-center text-lg mt-2 max-w-2xl">
        I am a graduate research assistant at the Precision Agriculture Lab in the Biosystems Engineering Department at Auburn University. My research focuses on advanced agricultural technologies to optimize crop management and sustainability.
      </p>

      {/* Contact Information */}
      <div className="flex flex-col items-center mt-6 space-y-2">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5 text-[#E87722]" />
          <p>mohtasim@example.com</p>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5 text-[#E87722]" />
          <p>+1 (XXX) XXX-XXXX</p>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-[#E87722]" />
          <p>Auburn University, AL, USA</p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="flex space-x-4 mt-6">
        <SocialIcon href="https://linkedin.com/in/your-profile" Icon={Linkedin} />
        <SocialIcon href="https://github.com/your-github" Icon={Github} />
        <SocialIcon href="https://www.facebook.com/mohtasimhadi" Icon={Facebook} />
        <SocialIcon href="https://instagram.com/your-profile" Icon={Instagram} />
      </div>
    </div>
  );
}

// Social Media Icon Component
function SocialIcon({ href, Icon }: { href: string; Icon: any }) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer">
      <Icon className="w-8 h-8 text-[#0C2340] hover:text-[#E87722] transition" />
    </Link>
  );
}
