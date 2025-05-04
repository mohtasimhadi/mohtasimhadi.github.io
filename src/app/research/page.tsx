"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ResearchProfiles from "@/components/ResearchProfileCard";
import PublicationCard from "@/components/PublicationCard";

export default function ResearchPage() {
  const [researchData, setResearchData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState("");
  const [activeSubsection, setActiveSubsection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/data/publications.json")
      .then((res) => res.json())
      .then((data) => setResearchData(data))
      .catch((err) => console.error("Error fetching publications data:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".publications-section");
      let currentSection = "";
      let currentSubsection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          currentSection = section.id;
        }
      });

      const subsections = document.querySelectorAll(".publications-subsection");
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

  const getAllKeywords = () => {
    const keywords = new Set<string>();
    ["patents", "publications", "presentations"].forEach((type) => {
      Object.values(researchData?.[type] || {}).flat().forEach((item: any) => {
        (item.keywords || []).forEach((kw: string) => keywords.add(kw));
      });
    });
    return Array.from(keywords);
  };

  const filterResearch = (data: any) =>
    Object.fromEntries(
      Object.entries(data).map(([category, items]: [string, any]) => [
        category,
        items.filter((item: any) => {
          const textMatch = item.text?.toLowerCase().includes(searchQuery.toLowerCase());
          const abstractMatch = item.abstract?.toLowerCase().includes(searchQuery.toLowerCase());
          const keywordMatch =
            selectedKeywords.length === 0 ||
            item.keywords?.some((kw: string) => selectedKeywords.includes(kw));
          return (textMatch || abstractMatch) && keywordMatch;
        }),
      ])
    );

  if (!researchData) return <p className="text-center mt-10">Loading...</p>;

  const filteredPublications = filterResearch(researchData.publications);
  const filteredPresentations = filterResearch(researchData.presentations);
  const filteredPatents = filterResearch(researchData.patents);

  const toggleKeyword = (kw: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
  };

  return (
    <div className="max-w-7xl mx-auto pt-5 px-4 md:px-6">
      <div className="md:hidden text-right">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="px-4 py-2 rounded bg-gray-900 text-white font-medium"
        >
          Open Navigation
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <aside className="hidden md:block w-72 bg-white border border-gray-200 rounded p-5 border-1 sticky top-6 h-fit">
          <SidebarContent
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            researchData={researchData}
            activeSection={activeSection}
            activeSubsection={activeSubsection}
            allKeywords={getAllKeywords()}
            selectedKeywords={selectedKeywords}
            toggleKeyword={toggleKeyword}
          />
        </aside>

        <Transition show={isMobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 md:hidden" onClose={setIsMobileMenuOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-30" />
            </Transition.Child>

            <div className="fixed inset-0 flex justify-center items-start p-4">
              <Transition.Child
                as={Fragment}
                enter="transition-transform ease-out duration-300"
                enterFrom="translate-y-10 opacity-0"
                enterTo="translate-y-0 opacity-100"
                leave="transition-transform ease-in duration-200"
                leaveFrom="translate-y-0 opacity-100"
                leaveTo="translate-y-10 opacity-0"
              >
                <Dialog.Panel className="w-full max-w-sm bg-white p-6 rounded border-1">
                  <div className="flex justify-between items-center mb-4">
                    <Dialog.Title className="text-lg font-bold">Jump to Section</Dialog.Title>
                    <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-500 text-xl">×</button>
                  </div>
                  <SidebarContent
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    researchData={researchData}
                    activeSection={activeSection}
                    activeSubsection={activeSubsection}
                    allKeywords={getAllKeywords()}
                    selectedKeywords={selectedKeywords}
                    toggleKeyword={toggleKeyword}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>

        <div className="w-full md:w-3/4 pt-0 mt-0">
          <ResearchProfiles />

          <Section title="Patents" id="Patents">
            {Object.entries(filteredPatents).map(([category, patents]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="mb-10 research-section research-subsection"
              >
                <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
                {patents.length > 0 ? (
                  patents.map((pub: any, index: number) => (
                    <PublicationCard key={index} {...pub} />
                  ))
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </div>
            ))}
          </Section>

          <Section title="Publications" id="Publications">
            {Object.entries(filteredPublications).map(([category, publications]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="mb-10 research-section research-subsection"
              >
                <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
                {publications.length > 0 ? (
                  publications.map((pub: any, index: number) => (
                    <PublicationCard key={index} {...pub} />
                  ))
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </div>
            ))}
          </Section>

          <Section title="Presentations" id="Presentations">
            {Object.entries(filteredPresentations).map(([category, presentations]: [string, any]) => (
              <div
                key={category}
                id={category.replace(/\s+/g, "-")}
                className="mb-10 research-section research-subsection"
              >
                <h3 className="text-2xl font-semibold text-[#0C2340] mb-4">{category}</h3>
                {presentations.length > 0 ? (
                  presentations.map((pres: any, index: number) => (
                    <PublicationCard key={index} {...pres} />
                  ))
                ) : (
                  <p className="text-center">No results found.</p>
                )}
              </div>
            ))}
          </Section>
        </div>
      </div>
    </div>
  );
}

function SidebarContent({
  searchQuery,
  setSearchQuery,
  researchData,
  activeSection,
  activeSubsection,
  allKeywords,
  selectedKeywords,
  toggleKeyword,
}: {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  researchData: any;
  activeSection: string;
  activeSubsection: string;
  allKeywords: string[];
  selectedKeywords: string[];
  toggleKeyword: (kw: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Search research (text, abstract)..."
        className="w-full p-3 pl-4 border rounded focus:ring-2 focus:ring-gray-900 focus:outline-none mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="mb-6">
        <h4 className="font-semibold text-sm mb-2">Filter by Keywords</h4>
        <div className="flex flex-wrap gap-2">
          {allKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => toggleKeyword(kw)}
              className={`px-3 py-1 rounded text-xs border ${
                selectedKeywords.includes(kw)
                  ? "bg-gray-900 text-white border-gray-900"
                  : "text-gray-700 border-gray-300"
              }`}
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {["Patents", "Publications", "Presentations"].map((type) => (
          <li key={type}>
            <a
              href={`#${type}`}
              className={`block px-3 py-2 rounded text-base font-bold ${
                activeSection === type ? "bg-gray-900 text-white" : "hover:bg-gray-300"
              }`}
            >
              {type}
            </a>
            <ul className="pl-4 mt-1 space-y-1">
              {Object.keys(researchData?.[type.toLowerCase()] || {}).map((category) => (
                <li key={category}>
                  <a
                    href={`#${category.replace(/\s+/g, "-")}`}
                    className={`block px-3 py-1 rounded ${
                      activeSubsection === category.replace(/\s+/g, "-")
                        ? "bg-gray-900 text-white"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}


function Section({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <div className="mb-12 research-section pt-6" id={id}>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
      {children}
    </div>
  );
}