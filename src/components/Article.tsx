'use client';

import React, { useState, useEffect } from "react";
import { ParsedPage } from "@/types/notion";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
    Facebook,
    Linkedin,
    Link as LinkIcon,
} from "lucide-react";
import { SiX } from "react-icons/si";

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
    const url = typeof window !== "undefined" ? window.location.href : "";

    const shareText = encodeURIComponent(title || "Untitled");
    const encodedUrl = encodeURIComponent(url);

    const [copied, setCopied] = useState(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
    };

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => setCopied(false), 2000);
            return () => clearTimeout(timeout);
        }
    }, [copied]);

    return (
        <div className="relative max-w-6xl mx-auto border-gray-400">
            {/* Cover Image */}
            <div className="relative">
                {cover && (
                    <img
                        src={cover}
                        alt={title}
                        className="w-full h-72 object-cover"
                    />
                )}

                {featured && (
                    <div className="absolute top-4 left-4 bg-blue-600 text-white text-sm px-4 py-1">
                        Featured
                    </div>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="text-sm text-gray-500">
                        {formattedDate || ""}
                    </div>
                    <div className="flex flex-col items-end gap-1 text-blue-700">
                        <div className="flex gap-3">
                            <a
                                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on Facebook"
                                className="hover:text-blue-800"
                            >
                                <Facebook size={18} />
                            </a>
                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${shareText}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on LinkedIn"
                                className="hover:text-blue-800"
                            >
                                <Linkedin size={18} />
                            </a>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Share on X"
                                className="hover:text-blue-800"
                            >
                                <SiX size={18} />
                            </a>
                            <button
                                onClick={handleCopyLink}
                                title="Copy Link"
                                className="hover:text-blue-800"
                            >
                                <LinkIcon size={18} />
                            </button>
                        </div>
                        {copied && (
                            <span className="text-xs text-gray-600">
                                Link copied!
                            </span>
                        )}
                    </div>

                </div>

                <h1 className="text-3xl font-semibold text-gray-800 mb-4">
                    {title || "Untitled"}
                </h1>

                {affiliation && (
                    <p className="italic text-lg text-gray-600 mb-2">
                        {affiliation}
                    </p>
                )}

                {authors && authors.length > 0 && (
                    <p className="text-lg text-gray-800 mb-2">
                        {authors.join(", ")}
                    </p>
                )}

                {publisher && (
                    <p className="text-sm text-gray-800 mb-2">{publisher}</p>
                )}

                {status && (
                    <p className="text-sm text-gray-600 mb-2">{status}</p>
                )}

                {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag, i) => (
                            <span
                                key={i}
                                className="bg-gray-300 text-gray-800 text-xs font-medium py-1 px-3"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="border-t-1 border-gray-400 text-justify leading-relaxed text-gray-900 mt-6 markdown-content">
                    <div className="pt-5"><Markdown remarkPlugins={[remarkGfm]}>{data}</Markdown></div>
                </div>
            </div>
        </div>
    );
};

export default Article;
