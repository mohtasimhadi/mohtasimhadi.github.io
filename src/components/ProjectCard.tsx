import { useState } from "react";
import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  affiliation: string;
  date: string;
  mediaType: "image" | "video";
  media: string;
  links?: { title: string; url: string }[];
}

const ProjectCard: React.FC<ProjectProps> = ({
  title,
  description,
  affiliation,
  date,
  mediaType,
  media,
  links,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="bg-white shadow-lg rounded-lg p-2 md:p-3 flex flex-col w-full gap-1 relative border-l-4 border-[#E87722]">
        {/* Media Section (Fixed Size) */}
        <div className="w-full h-[300px] md:h-[200px] flex items-center justify-center mb-4">
          {mediaType === "video" ? (
            <iframe
              className="w-full h-full rounded-lg"
              src={media.replace("youtu.be/", "www.youtube.com/embed/")}
              title={title}
              allowFullScreen
            ></iframe>
          ) : (
            <Image
              src={media}
              alt={title}
              width={600}
              height={400}
              className="rounded-lg w-full h-full object-cover"
            />
          )}
        </div>

        {/* Title that acts as a button */}
        <p className="text-xs md:text-sm text-gray-500">{date}</p>
        <h2
          onClick={openModal}
          className="text-lg md:text-xl font-bold text-gray-900 cursor-pointer hover:underline"
        >
          {title}
        </h2>
      </div>

      {/* Modal (Full Content) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 bg-orange-50 bg-opacity-10"
          onClick={closeModal}
        >
          <div
            className="border-5 bg-gray-50 rounded-lg w-full md:w-[600px] p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            {/* Modal Header with Close Button */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <button
                onClick={closeModal}
                className="text-gray-600 hover:text-gray-900 bg-transparent border-0 rounded-full p-2 focus:outline-none"
              >
                {/* Close Button using SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Media (Image/Video) */}
            <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center mb-4">
              {mediaType === "video" ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={media.replace("youtu.be/", "www.youtube.com/embed/")}
                  title={title}
                  allowFullScreen
                ></iframe>
              ) : (
                <Image
                  src={media}
                  alt={title}
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-full object-cover"
                />
              )}
            </div>

            {/* Affiliation */}
            <p className="text-sm md:text-base text-gray-600 font-semibold mb-2">
              {affiliation}
            </p>

            {/* Timeline (Date) */}
            <p className="text-xs md:text-sm text-gray-500">{date}</p>

            {/* Description */}
            <p className="text-gray-700 text-sm md:text-base mt-2">{description}</p>

            {/* Links (Only Show if Present) */}
            {links && links.length > 0 && (
              <div className="mt-4">
                <ul className="list-none flex flex-wrap gap-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm md:text-base font-semibold"
                      >
                        {link.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
