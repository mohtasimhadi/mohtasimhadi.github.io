// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm";

// export const dynamic = "force-dynamic";

// export default async function Page({
//     params,
// }: {
//     params: Promise<{ slug: string }>;
// }) {
//     const cleanSlug = (await params).slug.replace(/[^a-zA-Z0-9]/g, "");
//     const page = await fetchPage(cleanSlug);

//     return (
//         <div className="p-4">
//             <div className="flex flex-col md:flex-row">
//                 <div className="w-full md:w-3/4 p-2">
//                     <div className="text-justify markdown-content">
//                         <Markdown remarkPlugins={[remarkGfm]}>{page.data.parent}</Markdown>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }