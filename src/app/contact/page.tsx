"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Instagram } from "lucide-react";

export default function ContactPage() {
  const [contact, setContact] = useState<any>(null);

  useEffect(() => {
    fetch("/data/contact.json")
      .then((res) => res.json())
      .then((data) => setContact(data))
      .catch((err) => console.error("Error fetching contact data:", err));
  }, []);

  if (!contact) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-[#E87722] mb-6 text-center">Contact Me</h1>

      {/* Contact Details */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div>
          <ContactDetail icon={<Mail className="w-5 h-5 text-[#E87722]" />} label="Email" value={contact.email} />
          <ContactDetail icon={<Phone className="w-5 h-5 text-[#E87722]" />} label="Phone" value={contact.phone} />
          <ContactDetail icon={<MapPin className="w-5 h-5 text-[#E87722]" />} label="Address" value={contact.address} />
          
          {/* Social Media Links */}
          <h2 className="text-2xl font-bold text-[#0C2340] mt-6 mb-3">Connect with me</h2>
          <div className="flex space-x-4">
            <SocialIcon href={contact.linkedin} Icon={Linkedin} />
            <SocialIcon href={contact.github} Icon={Github} />
            <SocialIcon href={contact.facebook} Icon={Facebook} />
            <SocialIcon href={contact.instagram} Icon={Instagram} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Contact Detail Component
function ContactDetail({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center space-x-3 mb-4">
      {icon}
      <p className="text-lg">
        <span className="font-semibold">{label}: </span>{value}
      </p>
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
