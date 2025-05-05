import { FC } from 'react';

interface CardProps {
    title: string;
    description: string;
    authors?: string[];
    media: string;
    type: string;
    notion: string;
    links?: { title: string; url: string }[];
}

const Card: FC<CardProps> = ({ title, description, authors, media, type, notion, links }) => {
    return (
        <div className="max-w-sm overflow-hidden border-b-1 border-gray-500">
            <div className="p-4">
                <img className="w-full h-48 object-cover" src={media} alt={title} />
                <h2 className="text-xl font-semibold">{title}</h2>
                {authors && authors.length > 0 && (
                    <p className="text-gray-500 text-sm mt-1">
                        {authors.join('; ')}
                    </p>
                )}
                <p className="text-gray-700 mt-2">{description}</p>
                <div className="mt-3">
                    <a
                        href={notion}
                        className="text-blue-600 hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read More
                    </a>
                </div>
                {type !== 'blog' && links && links.length > 0 && (
                    <div className="mt-3">
                        {links.map((link, index) => (
                            <a
                                key={index}
                                href={link.url}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {link.title}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
