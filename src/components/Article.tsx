import React from "react";
import { ParsedPage } from "@/types/notion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ArticleProps {
    page: ParsedPage;
    data: string;
}

const Article: React.FC<ArticleProps> = ({ page, data }) => {
    const {
        title,
        cover,
        affiliation,
        authors,
        date,
        publisher,
        status,
        tags,
        featured,
    } = page;

    const formattedDate = date ? new Date(date).toLocaleDateString() : null;

    return (
        <div className="max-w-6xl mx-auto my-0 overflow-hidden border-l-1 border-r-1 border-gray-400 p-4 pt-0">
            {cover && (
                <img
                    src={cover}
                    alt={title}
                    className="w-full h-72 object-cover"
                />
            )}

            <div className="p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-4">{title || "Untitled"}</h1>

                {affiliation && (
                    <p className="italic text-lg text-gray-600 mb-2">{affiliation}</p>
                )}

                {authors && authors.length > 0 && (
                    <p className="text-lg text-gray-800 mb-2">{authors.join(", ")}</p>
                )}

                {formattedDate && (
                    <p className="text-sm text-gray-500 mb-2">{formattedDate}</p>
                )}

                {publisher && (
                    <p className="text-sm text-gray-800 mb-2">{publisher}</p>
                )}

                {status && (
                    <p className="text-sm text-gray-600 mb-2">{status}</p>
                )}

                {featured && (
                    <div className="bg-blue-500 text-white text-sm rounded-full px-4 py-1 mb-4 inline-block">
                        Featured
                    </div>
                )}

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="bg-gray-200 text-gray-800 text-xs font-medium rounded-full py-1 px-3"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="text-justify markdown-content">
                    <Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown>
                </div>
            </div>
        </div>
    );
};

export default Article;
