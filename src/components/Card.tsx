import { FC, useRef } from "react";
import { Blogs } from "@/types";

const Card: FC<Blogs> = ({
  title,
  authors,
  date,
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
      <div className="pb-4 pr-4 flex flex-col flex-grow">
        <img className="w-full h-48" src={media} alt={title} />
        <h2 className="text-xl font-semibold mt-2">
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
          <p className="text-gray-500 text-sm mt-1">{authors.join("; ")}</p>
        )}
        {date && (
          <p className="text-gray-500 text-sm mt-1">{date}</p>
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
