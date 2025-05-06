import { FC, useRef } from "react";

interface Poetry {
  title: string;
  date?: string;
  notion: string;
}

const PoetryCard: FC<Poetry> = ({ title, date, notion }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-sm overflow-hidden flex flex-col" ref={cardRef}>
      <div className="pb-4 pr-4 flex flex-col flex-grow">
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
        {date && <p className="text-gray-500 text-sm mt-1">{date}</p>}
      </div>
    </div>
  );
};

export default PoetryCard;
