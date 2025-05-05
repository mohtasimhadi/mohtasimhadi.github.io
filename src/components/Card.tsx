import { FC, useState, useEffect, useRef } from "react";

interface CardProps {
  title: string;
  description: string;
  authors?: string[];
  media: string;
  type: string;
  notion: string;
  links?: { title: string; url: string }[];
}

const Card: FC<CardProps> = ({
  title,
  authors,
  media,
  type,
  notion,
  links,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="max-w-sm overflow-hidden flex flex-col"
      ref={cardRef}
    >
      <div className="p-4 flex flex-col flex-grow justify-between">
        <img className="w-full h-48 object-cover" src={media} alt={title} />
        <h2 className="text-xl font-semibold mt-2">
          <a
            href={notion}
            className="text-black hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {title}
          </a>
        </h2>
        {authors && authors.length > 0 && (
          <p className="text-gray-500 text-sm mt-1">{authors.join("; ")}</p>
        )}
        {type !== "blog" && links && links.length > 0 && (
          <div className="mt-3">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.url}
                className="text-blue-600 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                | {link.title} |
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
