import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Facebook,
  Instagram,
} from "lucide-react";
import Image from "next/image"
import ContactItem from "./ContactItem"
import SocialIcon from "./SocialIcons"
import { useEffect, useState } from "react";
import { UserData } from "@/types/about";
import Loading from "../Loading";
import ResearchProfiles from "./ResearchProfileCard";

export default function AboutDesctiption() {
    const [data, setData] = useState<UserData | null>(null);

    useEffect(() => {
        fetch("/data/contact.json")
            .then((res) => res.json())
            .then((data) => setData(data))
            .catch((err) => console.error("Error fetching home data:", err));
    }, []);
    if (!data) return <Loading />;

    return (
        <div className="relative w-full bg-slate-200 overflow-hidden pt-0 mt-0">
            <div className="hidden md:flex absolute inset-0 z-0 justify-center items-center pointer-events-none  pt-0 mt-0">
                <Image
                    src={data.profile.profile_image}
                    alt={data.profile.name}
                    layout="intrinsic"
                    width={700}
                    height={700}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            <div className="block md:hidden w-full flex justify-center pt-8">
                <Image
                    src={data.profile.profile_image}
                    alt={data.profile.name}
                    layout="intrinsic"
                    width={500}
                    height={500}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-36 items-start">
                <div className="space-y-6 md:mr-10 order-2 md:order-none">
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-5xl md:text-8xl font-bold">
                            {data.profile.name}
                        </h1>
                        <h2 className="text-xl md:text-3xl text-[#0C2340] font-semibold">
                            {data.profile.title}
                        </h2>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <ContactItem Icon={Mail} text={data.contact.email1} />
                        <ContactItem Icon={Mail} text={data.contact.email2} />
                        <ContactItem Icon={Phone} text={data.contact.phone} />
                        <ContactItem Icon={MapPin} text={data.contact.address} />
                    </div>
                    <div className="flex space-x-4">
                        <SocialIcon href={data.contact.linkedin} Icon={Linkedin} />
                        <SocialIcon href={data.contact.github} Icon={Github} />
                        <SocialIcon href={data.contact.facebook} Icon={Facebook} />
                        <SocialIcon href={data.contact.instagram} Icon={Instagram} />
                    </div>
                </div>

                <div className="order-3 md:order-none">
                    <p className="text-base md:text-xl leading-relaxed whitespace-pre-line md:pl-16 md:pt-10">
                        {data.profile.bio}
                    </p>
                    <ResearchProfiles />
                </div>
            </div>
        </div>
    )
}