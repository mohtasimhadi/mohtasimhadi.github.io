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
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 flex flex-col md:flex-row w-full h-[300px] gap-6 relative">
      
      {/* Affiliation Sticker (Top Right Corner) */}
      <div className="absolute top-4 right-4 bg-[#E87722] text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
        {affiliation}
      </div>

      {/* Media Section (Left Side) */}
      <div className="w-full md:w-[45%] h-full flex items-center justify-center">
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

      {/* Text Content (Right Side) */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
          <p className="text-gray-700 dark:text-gray-300 text-sm mt-2">{description}</p>
        </div>

        {/* Links (Only Show if Present) */}
        {links && links.length > 0 && (
          <div className="mt-4">
            <ul className="list-none flex space-x-3">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline dark:text-blue-400 text-sm font-semibold"
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
