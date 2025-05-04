"use client";

import { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAffiliations, setSelectedAffiliations] = useState<string[]>(
    []
  );
  const [selectedKeywords, setSelectedKeywords] = useState<string[]>([]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const allAffiliations = [...new Set(projects.map((p) => p.affiliation))];
  const allKeywords = [...new Set(projects.flatMap((p) => p.keywords || []))];

  const toggleAffiliation = (aff: string) => {
    setSelectedAffiliations((prev) =>
      prev.includes(aff) ? prev.filter((a) => a !== aff) : [...prev, aff]
    );
  };

  const toggleKeyword = (kw: string) => {
    setSelectedKeywords((prev) =>
      prev.includes(kw) ? prev.filter((k) => k !== kw) : [...prev, kw]
    );
  };

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesAffiliation =
      selectedAffiliations.length === 0 ||
      selectedAffiliations.includes(p.affiliation);
    const matchesKeywords =
      selectedKeywords.length === 0 ||
      (p.keywords || []).some((kw: string) => selectedKeywords.includes(kw));
    return matchesSearch && matchesAffiliation && matchesKeywords;
  });

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6">
      {/* Mobile Filter Button */}
      <div className="mb-4 md:hidden flex justify-end">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="px-4 py-2 text-sm rounded-md bg-orange-500 text-white"
        >
          Filter Projects
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-72 bg-white border border-gray-200 rounded-2xl p-5 shadow-md h-fit sticky top-6">
          <FiltersUI
            affiliations={allAffiliations}
            selected={selectedAffiliations}
            onToggle={toggleAffiliation}
            searchTerm={searchTerm}
            onSearch={setSearchTerm}
            keywords={allKeywords}
            selectedKeywords={selectedKeywords}
            toggleKeyword={toggleKeyword}
          />
        </aside>

        {/* Project Grid */}
        <div className="flex-1">
          {filteredProjects.length === 0 ? (
            <p className="text-center text-lg mt-10 text-gray-500">
              No matching projects found.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <Transition show={isMobileFilterOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 md:hidden"
          onClose={setIsMobileFilterOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 flex justify-center items-start p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="translate-y-10 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="ease-in duration-100"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-10 opacity-0"
            >
              <Dialog.Panel className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-xl">
                <div className="flex justify-between items-center mb-4">
                  <Dialog.Title className="text-lg font-bold">
                    Filter Projects
                  </Dialog.Title>
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="text-gray-500"
                  >
                    ✕
                  </button>
                </div>

                <FiltersUI
                  affiliations={allAffiliations}
                  selected={selectedAffiliations}
                  onToggle={toggleAffiliation}
                  searchTerm={searchTerm}
                  onSearch={setSearchTerm}
                  keywords={allKeywords}
                  selectedKeywords={selectedKeywords}
                  toggleKeyword={toggleKeyword}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

function FiltersUI({
  affiliations,
  selected,
  onToggle,
  searchTerm,
  onSearch,
  keywords,
  selectedKeywords,
  toggleKeyword,
}: {
  affiliations: string[];
  selected: string[];
  onToggle: (aff: string) => void;
  searchTerm: string;
  onSearch: (val: string) => void;
  keywords: string[];
  selectedKeywords: string[];
  toggleKeyword: (kw: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full mb-6 px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300"
      />

      {/* Affiliation Filter */}
      <div className="space-y-2 mb-6">
        <h3 className="font-medium text-gray-700">🎓 Affiliation</h3>
        {affiliations.map((aff, idx) => (
          <label
            key={idx}
            className="flex items-center gap-2 px-2 py-1 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            <input
              type="checkbox"
              checked={selected.includes(aff)}
              onChange={() => onToggle(aff)}
              className="accent-orange-500"
            />
            <span className="text-sm text-gray-800">{aff}</span>
          </label>
        ))}
      </div>

      {/* Keyword Filter */}
      {/* Keyword Filter */}
      <div className="space-y-2">
        <h3 className="font-medium text-gray-700">🏷️ Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw, idx) => (
            <label
              key={idx}
              className={`flex items-center gap-2 px-3 py-1 border rounded-full cursor-pointer text-sm transition 
          ${
            selectedKeywords.includes(kw)
              ? "bg-orange-100 border-orange-400 text-orange-700"
              : "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
          }`}
            >
              <input
                type="checkbox"
                checked={selectedKeywords.includes(kw)}
                onChange={() => toggleKeyword(kw)}
                className="hidden"
              />
              {kw}
            </label>
          ))}
        </div>
      </div>
    </>
  );
}
