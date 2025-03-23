"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import parse from "html-react-parser";

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

  // Detect active section during scrolling
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

  // Filter function for search
  const filterResearch = (data: any) =>
    Object.fromEntries(
      Object.entries(data).map(([category, items]: [string, any]) => [
        category,
        items.filter((item: any) =>
          item.text.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      ])
    );

  const filteredPublications = filterResearch(researchData.publications);
  const filteredPresentations = filterResearch(researchData.presentations);

  return (
    <div className="container mx-auto px-6 py-12 flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-1/4 h-screen sticky top-0 left-0 flex-col pr-8 space-y-6 bg-gray-100 p-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search research..."
          className="w-full p-3 pl-4 border rounded-lg focus:ring-2 focus:ring-[#E87722] focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Sidebar Navigation */}
        <ul className="space-y-2">
          <li>
            <a href="#Publications" className={`nav-link ${activeSection === "Publications" ? "active" : ""}`}>
              Publications
            </a>
          </li>
          {Object.keys(researchData.publications).map((category) => (
            <li key={category}>
              <a href={`#${category.replace(/\s+/g, "-")}`} className={`nav-link ${activeSection === category.replace(/\s+/g, "-") ? "active" : ""}`}>
                {category}
              </a>
            </li>
          ))}

          <li>
            <a href="#Presentations" className={`nav-link ${activeSection === "Presentations" ? "active" : ""}`}>
              Presentations
            </a>
          </li>
          {Object.keys(researchData.presentations).map((category) => (
            <li key={category}>
              <a href={`#${category.replace(/\s+/g, "-")}`} className={`nav-link ${activeSection === category.replace(/\s+/g, "-") ? "active" : ""}`}>
                {category}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-full md:w-3/4 pl-6">
        {/* Publications Section */}
        <Section title="Publications" id="Publications">
          {Object.entries(filteredPublications).map(([category, publications]: [string, any]) => (
            <div key={category} id={category.replace(/\s+/g, "-")} className="mb-10 research-section">
              <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
              {publications.length > 0 ? (
                publications.map((pub: any, index: number) => (
                  <ResearchCard key={index} {...pub} />
                ))
              ) : (
                <p className="text-center">No results found.</p>
              )}
            </div>
          ))}
        </Section>

        {/* Presentations Section */}
        <Section title="Presentations" id="Presentations">
          {Object.entries(filteredPresentations).map(([category, presentations]: [string, any]) => (
            <div key={category} id={category.replace(/\s+/g, "-")} className="mb-10 research-section">
              <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
              {presentations.length > 0 ? (
                presentations.map((pres: any, index: number) => (
                  <ResearchCard key={index} {...pres} />
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

// Reusable Research Card
function ResearchCard({ text, doi }: { text: string; doi?: string }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      {doi ? (
        <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" className="block hover:text-[#E87722] transition">
          {parse(text)}
        </a>
      ) : (
        <p className="text-sm text-gray-700">{parse(text)}</p>
      )}
    </div>
  );
}
// Reusable Section Component
function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 research-section" id={id}>
      <h2 className="text-3xl font-bold text-[#E87722] mb-6">{title}</h2>
      {children}
    </div>
  );
}
