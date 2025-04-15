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

const ProjectCard: React.FC<ProjectProps> = ({ title, description, affiliation, date, mediaType, media, links }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 md:p-6 flex flex-col md:flex-row w-full gap-6 relative border-l-4 border-[#E87722]">
      
      {/* Affiliation Sticker (Top Right Corner) */}
      <div className="absolute top-0 right-0 md:top-0 md:right-0 bg-[#E87722] text-white text-xs font-semibold px-2 py-2">
        {affiliation}
      </div>

      {/* Media Section */}
      <div className="w-full md:w-[45%] flex items-center justify-center">
        {mediaType === "video" ? (
          <iframe
            className="w-full aspect-video rounded-lg"
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
            className="rounded-lg w-full h-auto max-h-[250px] object-cover"
          />
        )}
      </div>

      {/* Text Content */}
      <div className="flex-1 flex flex-col justify-between p-2 md:p-6">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{date}</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base mt-2">{description}</p>
        </div>

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
                    className="text-blue-600 hover:underline dark:text-blue-400 text-sm md:text-base font-semibold"
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
  );
};

export default ProjectCard;
