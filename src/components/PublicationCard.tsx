import parse from "html-react-parser";
import { useState } from "react";
import Image from "next/image";

interface ResearchProps {
    text: string;
    doi?: string;
    bibTex?: string;
    code?: string;
    abstract?: string;
    image?: string;
}

const PublicationCard: React.FC<ResearchProps> = ({
    text,
    doi,
    bibTex,
    code,
    abstract,
    image,
  }) => {
    const [showBibTex, setShowBibTex] = useState(false);
    const [showAbstract, setShowAbstract] = useState(false);
  
    return (
      <div className="bg-white border-1 rounded mb-6 border-l-4 border-gray-900 flex flex-col relative">
        {/* Main Content and Image Side-by-Side */}
        <div className="flex flex-col sm:flex-row">
          {/* Content Section */}
          <div className="p-6 flex-1">
            {doi ? (
              <a
                href={`https://doi.org/${doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-gray-900 transition"
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
                  className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded hover:bg-gray-700 transition"
                >
                  Abstract
                </button>
              )}
  
              {bibTex && (
                <button
                  onClick={() => setShowBibTex(!showBibTex)}
                  className="px-3 py-1 text-sm font-semibold text-white bg-gray-900 rounded hover:bg-[#d4661f] transition"
                >
                  BibTex
                </button>
              )}
  
              {code && (
                <a
                  href={code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm font-semibold text-white bg-slate-500 rounded hover:bg-slate-400 transition"
                >
                  Code
                </a>
              )}
            </div>
          </div>
  
          {/* Image Section (Hidden on Phone, Visible on sm and above) */}
          {image && (
            <div className="w-1/4 p-1 flex items-center justify-center hidden sm:flex">
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

export default PublicationCard;