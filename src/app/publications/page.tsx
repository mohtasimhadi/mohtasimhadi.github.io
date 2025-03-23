"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ResearchPage() {
  const [researchData, setResearchData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search input
  const [activeSection, setActiveSection] = useState(""); // Tracks active section

  useEffect(() => {
    fetch("/data/research.json")
      .then((res) => res.json())
      .then((data) => setResearchData(data))
      .catch((err) => console.error("Error fetching research data:", err));
  }, []);

  // Detect which section is currently visible
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".research-section");
      let currentSection = "";
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!researchData) return <p className="text-center mt-10">Loading...</p>;

  // Filtering items based on search query
  const filterResearch = (data: any) =>
    Object.fromEntries(
      Object.entries(data).map(([category, items]: [string, any]) => [
        category,
        items.filter((item: any) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ])
    );

  const filteredPublications = filterResearch(researchData.publications);
  const filteredPresentations = filterResearch(researchData.presentations);

  return (
    <div className="container mx-auto px-6 py-12 flex">
      {/* Sidebar for Navigation (Hidden on Mobile) */}
      <aside className="hidden md:flex md:w-1/4 h-screen sticky top-0 left-0 flex-col pr-8 space-y-6 bg-gray-100 p-6">
        {/* Search Bar in Sidebar */}
        <div>
          <input
            type="text"
            placeholder="Search research..."
            className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Navigation Links */}
        <div>
          <ul className="space-y-2">
            {/* Publications Section */}
            <li>
              <a
                href="#Publications"
                className={`block w-full text-left px-3 py-2 rounded-md text-xl font-bold text-[#E87722] mb-3 ${
                  activeSection === "Publications" ? "bg-[#E87722] text-white" : "hover:bg-gray-300"
                }`}
              >
                Publications
              </a>
              <ul className="pl-4 space-y-1">
                {Object.keys(researchData.publications).map((category) => (
                  <li key={category}>
                    <a
                      href={`#${category.replace(/\s+/g, "-")}`}
                      className={`block w-full text-left px-3 py-1 rounded-md ${
                        activeSection === category.replace(/\s+/g, "-") ? "bg-[#E87722] text-white" : "hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </li>

            {/* Presentations Section */}
            <li>
              <a
                href="#Presentations"
                className={`block w-full text-left px-3 py-2 rounded-md text-xl font-bold text-[#E87722] mb-3 ${
                  activeSection === "Presentations" ? "bg-[#E87722] text-white" : "hover:bg-gray-300"
                }`}
              >
                Presentations
              </a>
              <ul className="pl-4 space-y-1">
                {Object.keys(researchData.presentations).map((category) => (
                  <li key={category}>
                    <a
                      href={`#${category.replace(/\s+/g, "-")}`}
                      className={`block w-full text-left px-3 py-1 rounded-md ${
                        activeSection === category.replace(/\s+/g, "-") ? "bg-[#E87722] text-white" : "hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-full md:w-3/4 pl-6">
        {/* Publications */}
        <Section title="Publications" id="Publications">
          {Object.entries(filteredPublications).map(([category, publications]: [string, any]) => (
            <div key={category} id={category.replace(/\s+/g, "-")} className="mb-10 research-section">
              <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
              {publications.length > 0 ? (
                publications.map((pub: any, index: number) => (
                  <ResearchCard key={index} title={pub.title} description={pub.description} image={pub.image} link={pub.link} />
                ))
              ) : (
                <p className="text-center">No results found.</p>
              )}
            </div>
          ))}
        </Section>

        {/* Presentations */}
        <Section title="Presentations" id="Presentations">
          {Object.entries(filteredPresentations).map(([category, presentations]: [string, any]) => (
            <div key={category} id={category.replace(/\s+/g, "-")} className="mb-10 research-section">
              <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
              {presentations.length > 0 ? (
                presentations.map((pres: any, index: number) => (
                  <ResearchCard key={index} title={pres.title} description={pres.description} image={pres.image} link={pres.link} />
                ))
              ) : (
                <p className="text-center">No results found.</p>
              )}
            </div>
          ))}
        </Section>
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({ title, children, id }: { title: string; children: React.ReactNode; id: string }) {
  return (
    <div className="mb-12 research-section" id={id}>
      <h2 className="text-3xl font-bold text-[#E87722] mb-6">{title}</h2>
      {children}
    </div>
  );
}

// Research Card Component (Two-Column Layout)
function ResearchCard({ title, description, image, link }: any) {
  return (
    <div className="bg-white shadow-md rounded-lg flex overflow-hidden mb-6">
      <div className="w-1/3">
        <Image src={image} alt={title} width={300} height={200} className="w-full h-full object-cover" />
      </div>
      <div className="w-2/3 p-6">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        {link && (
          <Link href={link} target="_blank" className="text-[#E87722] font-semibold hover:underline mt-3 inline-block">
            View Publication
          </Link>
        )}
      </div>
    </div>
  );
}
