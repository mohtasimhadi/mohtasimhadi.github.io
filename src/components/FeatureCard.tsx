import { FC } from "react";

interface CardProps {
  title: string;
  description: string;
  authors?: string[];
  media: string;
  type: string;
  notion: string;
  links?: { title: string; url: string }[];
}

const FeatureCard: FC<CardProps> = ({
  title,
  description,
  authors,
  media,
  type,
  notion,
  links,
}) => {
  return (
    <div className="w-full p-6 flex flex-col md:flex-row space-x-6">
      {/* Left Column (Image) */}
      <div className="w-full md:w-1/2">
        <img
          className="w-full h-80 object-cover"
          src={media}
          alt={title}
        />
      </div>

      {/* Right Column (Text content) */}
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-semibold mb-2">
          <a
            href={`/notion/${notion}`}
            className="text-black hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h2>
        {authors && authors.length > 0 && (
          <p className="text-gray-500 text-sm mb-4">{authors.join("; ")}</p>
        )}
        <p className="text-gray-700 mb-4">{description}</p>

        {/* Links at the bottom, separated by | */}
        <div className="flex flex-wrap gap-2 mb-4">
          {links && links.length > 0 &&
            links.map((link, index) => (
              <span key={index}>
                <a
                  href={link.url}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.title}
                </a>
                {index < links.length - 1 && " | "}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
