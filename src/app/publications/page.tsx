"use client";

import { useState, useEffect } from "react";
import parse from "html-react-parser";
import Image from "next/image";

export default function ResearchPage() {
  const [researchData, setResearchData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [activeSubsection, setActiveSubsection] = useState("");

  useEffect(() => {
    fetch("/data/research.json")
      .then((res) => res.json())
      .then((data) => setResearchData(data))
      .catch((err) => console.error("Error fetching research data:", err));
  }, []);

  // Detect active section and subsection during scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".research-section");
      let currentSection = "";
      let currentSubsection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });

      const subsections = document.querySelectorAll(".research-subsection");
      subsections.forEach((subsection) => {
        const rect = subsection.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSubsection = subsection.id;
        }
      });

      setActiveSection(currentSection);
      setActiveSubsection(currentSubsection);
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
  const filteredPatents = filterResearch(researchData.patents);

  return (
    <div className="container mx-auto px-6 py-12 pt-0 flex">
      {/* Sidebar (Hidden in Mobile View) */}
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
          {/* Patents Section */}
          <li>
            <a
              href="#Patents"
              className={`block w-full text-left px-3 py-2 rounded-md text-xl font-bold ${activeSection === "Patents"
                  ? "bg-[#E87722] text-white"
                  : "hover:bg-gray-300"
                }`}
            >
              Patents
            </a>
            <ul className="pl-4 space-y-1">
              {Object.keys(researchData.patents).map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.replace(/\s+/g, "-")}`}
                    className={`block w-full text-left px-3 py-1 rounded-md ${activeSubsection === category.replace(/\s+/g, "-")
                        ? "bg-[#E87722] text-white"
                        : "hover:bg-gray-300"
                      }`}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </li>

          {/* Publications Section */}
          <li>
            <a
              href="#Publications"
              className={`block w-full text-left px-3 py-2 rounded-md text-xl font-bold ${activeSection === "Publications"
                  ? "bg-[#E87722] text-white"
                  : "hover:bg-gray-300"
                }`}
            >
              Publications
            </a>
            <ul className="pl-4 space-y-1">
              {Object.keys(researchData.publications).map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.replace(/\s+/g, "-")}`}
                    className={`block w-full text-left px-3 py-1 rounded-md ${activeSubsection === category.replace(/\s+/g, "-")
                        ? "bg-[#E87722] text-white"
                        : "hover:bg-gray-300"
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
              className={`block w-full text-left px-3 py-2 rounded-md text-xl font-bold ${activeSection === "Presentations"
                  ? "bg-[#E87722] text-white"
                  : "hover:bg-gray-300"
                }`}
            >
              Presentations
            </a>
            <ul className="pl-4 space-y-1">
              {Object.keys(researchData.presentations).map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.replace(/\s+/g, "-")}`}
                    className={`block w-full text-left px-3 py-1 rounded-md ${activeSubsection === category.replace(/\s+/g, "-")
                        ? "bg-[#E87722] text-white"
                        : "hover:bg-gray-300"
                      }`}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="w-full md:w-3/4 pl-6">
        {/* Publications Section */}
        <ResearchProfiles />

        {/* Patents Section */}
        <Section title="Patents" id="Patents">
          {Object.entries(filteredPatents).map(
            ([category, patents]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="mb-10 research-section research-subsection"
              >
                <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">
                  {category}
                </h3>
                {patents.length > 0 ? (
                  patents.map((pub: any, index: number) => (
                    <ResearchCard key={index} {...pub} />
                  ))
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </div>
            )
          )}
        </Section>

        {/* Publications Section */}
        <Section title="Publications" id="Publications">
          {Object.entries(filteredPublications).map(
            ([category, publications]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="mb-10 research-section research-subsection"
              >
                <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">
                  {category}
                </h3>
                {publications.length > 0 ? (
                  publications.map((pub: any, index: number) => (
                    <ResearchCard key={index} {...pub} />
                  ))
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </div>
            )
          )}
        </Section>

        {/* Presentations Section */}
        <Section title="Presentations" id="Presentations">
          {Object.entries(filteredPresentations).map(
            ([category, presentations]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="mb-10 research-section research-subsection"
              >
                <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">
                  {category}
                </h3>
                {presentations.length > 0 ? (
                  presentations.map((pres: any, index: number) => (
                    <ResearchCard key={index} {...pres} />
                  ))
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </div>
            )
          )}
        </Section>
      </div>
    </div>
  );
}

// Reusable Section Component
function Section({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-12 research-section pt-6" id={id}>
      <h2 className="text-3xl font-bold text-[#E87722] mb-6">{title}</h2>
      {children}
    </div>
  );
}

function ResearchCard({
  text,
  doi,
  bibTex,
  code,
  abstract,
  image,
}: {
  text: string;
  doi?: string;
  bibTex?: string;
  code?: string;
  abstract?: string;
  image?: string;
}) {
  const [showBibTex, setShowBibTex] = useState(false);
  const [showAbstract, setShowAbstract] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg mb-6 border-l-4 border-[#E87722] flex flex-col relative">
      {/* Main Content and Image Side-by-Side */}
      <div className="flex flex-col sm:flex-row">
        {/* Content Section */}
        <div className="p-6 flex-1">
          {doi ? (
            <a
              href={`https://doi.org/${doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-[#E87722] transition"
            >
              {parse(text)}
            </a>
          ) : (
            <p className="text-sm text-gray-700">{parse(text)}</p>
          )}

          {/* Buttons */}
          <div className="mt-4 flex space-x-3">
            {abstract && (
              <button
                onClick={() => setShowAbstract(!showAbstract)}
                className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700 transition"
              >
                Abstract
              </button>
            )}

            {bibTex && (
              <button
                onClick={() => setShowBibTex(!showBibTex)}
                className="px-3 py-1 text-sm font-semibold text-white bg-[#E87722] rounded-md hover:bg-[#d4661f] transition"
              >
                BibTex
              </button>
            )}

            {code && (
              <a
                href={code}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 text-sm font-semibold text-white bg-slate-500 rounded-md hover:bg-slate-400 transition"
              >
                Code
              </a>
            )}
          </div>
        </div>

        {/* Image Section (Hidden on Phone, Visible on sm and above) */}
        {image && (
          <div className="w-1/4 flex items-center justify-center hidden sm:flex">
            <Image
              src={image}
              alt="Research Image"
              width={200}
              height={200}
              className="h-full w-full object-cover rounded-r-lg"
            />
          </div>
        )}
      </div>

      {/* Expandable Sections - Full Width */}
      {(showAbstract || showBibTex) && (
        <div className="w-full bg-gray-100 p-4 rounded-b-lg">
          {showAbstract && abstract && (
            <div className="mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Abstract:</h3>
              <p className="text-sm text-gray-700 mt-1">{abstract}</p>
            </div>
          )}

          {showBibTex && bibTex && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900">BibTeX:</h3>
              <pre className="text-xs text-gray-700 mt-1 p-2 overflow-auto bg-white rounded-sm">
                {bibTex}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileCard({
  platform,
  url,
  logo,
}: {
  platform: string;
  url: string;
  logo: string;
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center p-4 bg-white shadow-md rounded-lg border-l-4 border-[#E87722] transition hover:shadow-lg hover:bg-gray-50"
    >
      <Image
        src={logo}
        alt={`${platform} Logo`}
        width={48}
        height={48}
        className="mr-4"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{platform}</h3>
        <p className="text-sm text-gray-600">View Profile</p>
      </div>
    </a>
  );
}

function ResearchProfiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
      <ProfileCard
        platform="Google Scholar"
        url="https://scholar.google.com/citations?user=ih7NQy8AAAAJ&hl=en"
        logo="https://upload.wikimedia.org/wikipedia/commons/c/c7/Google_Scholar_logo.svg"
      />
      <ProfileCard
        platform="ResearchGate"
        url="https://www.researchgate.net/profile/Mohtasim-Rafi"
        logo="https://upload.wikimedia.org/wikipedia/commons/5/5e/ResearchGate_icon_SVG.svg"
      />
    </div>
  );
}
