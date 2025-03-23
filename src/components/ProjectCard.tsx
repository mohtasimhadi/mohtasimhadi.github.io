import Image from "next/image";

interface ProjectProps {
  title: string;
  description: string;
  affiliation: string;
  mediaType: "image" | "video";
  media: string;
  links?: { title: string; url: string }[];
}

const ProjectCard: React.FC<ProjectProps> = ({ title, description, affiliation, mediaType, media, links }) => {
  return (
    <div className="bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400 italic">Affiliation: {affiliation}</p>

      {mediaType === "video" ? (
        <div className="relative w-full aspect-video">
          <iframe
            src={media}
            className="w-full h-full rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <Image
          src={media}
          alt={title}
          width={700}
          height={400}
          className="rounded-lg w-full object-cover"
        />
      )}

      {links && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Project Links:</h3>
          <ul className="list-disc pl-5">
            {links.map((link, index) => (
              <li key={index}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline dark:text-blue-400">
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
