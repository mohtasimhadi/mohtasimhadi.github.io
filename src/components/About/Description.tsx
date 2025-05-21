'use client'; // Make sure this is at the top for client-side rendering

import { useRouter } from 'next/navigation'; // Corrected import for App Router
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Github, Facebook, Instagram } from 'lucide-react';

import ContactItem from './ContactItem';
import SocialIcon from './SocialIcons';
import SkeletonCard from '@/components/ui/SkeletonCard';
import type { UserData } from '@/types/about';

export default function AboutSection() {
    const [data, setData] = useState<UserData | null>(null);
    const router = useRouter();

    const handleNavigation = useCallback((path: string) => {
        router.push(path); // Navigating to the given path
    }, [router]);

    useEffect(() => {
        fetch('/data/contact.json')
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error('Error fetching home data:', err));
    }, []);

    if (!data) return <SkeletonCard />; // Show skeleton while data is loading

    return (
        <div className="w-full bg-white">
            <div className="max-w-5xl mx-auto px-4 py-16 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
                    {/* Left column - Image and contact info */}
                    <div className="md:col-span-5 space-y-10">
                        {/* Profile Image */}
                        <div className="flex justify-center md:justify-start">
                            <div className="relative w-48 h-48 md:w-64 md:h-64 overflow-hidden">
                                <Image
                                    src={data.profile.profile_image || '/placeholder.svg'}
                                    alt={data.profile.name}
                                    fill
                                    className="object-cover hover:grayscale-0 transition-all duration-500"
                                    priority
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-1">
                            <div className="w-12 h-0.5 bg-black mx-auto md:mx-0" />
                            <div className="flex justify-center md:justify-start space-x-4">
                                <SocialIcon href={data.contact.linkedin} Icon={Linkedin} />
                                <SocialIcon href={data.contact.github} Icon={Github} />
                                <SocialIcon href={data.contact.facebook} Icon={Facebook} />
                                <SocialIcon href={data.contact.instagram} Icon={Instagram} />
                            </div>
                            <div className="space-y-1 text-sm">
                                <ContactItem Icon={Mail} text={data.contact.email1} />
                                {data.contact.email2 && <ContactItem Icon={Mail} text={data.contact.email2} />}
                                <ContactItem Icon={Phone} text={data.contact.phone} />
                                <ContactItem Icon={MapPin} text={data.contact.address} />
                            </div>
                        </div>
                    </div>

                    {/* Right column - Name, title, and bio */}
                    <div className="md:col-span-7 space-y-5">
                        <div className="space-y-1 text-center md:text-left">
                            <h1 className="text-4xl md:text-5xl font-light tracking-tight">{data.profile.name}</h1>
                            <h2 className="text-lg md:text-xl text-neutral-600 font-light">{data.profile.title}</h2>
                        </div>

                        <div className="w-12 h-0.5 bg-black hidden md:block" />

                        {/* Bio Section */}
                        <div>
                            <p className="text-base md:text-lg leading-relaxed text-neutral-800 whitespace-pre-line font-light">
                                {data.profile.bio}
                            </p>

                            <div className="flex gap-4 mt-2">
                                <button
                                    onClick={() => handleNavigation('/blogs')}
                                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-400 transition"
                                >
                                    Blogs →
                                </button>
                                <button
                                    onClick={() => handleNavigation('/research')}
                                    className="px-4 py-2 border border-gray-600 text-gray-900 rounded hover:bg-gray-200 transition"
                                >
                                    My Research →
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
