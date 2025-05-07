import { getPage, getBlocks } from '@/lib/notion';
import { notFound } from 'next/navigation';
import { NotionPageWithCustomProperties, NotionBlock } from '@/types/notion';

export default async function PostPage({ params }: { params: { id: string } }) {
  const page = await getPage(params.id);
  const blocks = await getBlocks(params.id);

  if (!page) {
    return notFound();
  }

  const title = page.properties.Name.title[0]?.plain_text || 'Untitled';

  return (
    <article className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="prose">
        {blocks.map((block) => (
          <Block key={block.id} block={block} />
        ))}
      </div>
    </article>
  );
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case 'paragraph':
      return <p>{block.paragraph?.rich_text[0]?.plain_text}</p>;
    case 'heading_1':
      return <h2 className="text-2xl font-bold mt-6 mb-4">{block.heading_1?.rich_text[0]?.plain_text}</h2>;
    case 'heading_2':
      return <h3 className="text-xl font-bold mt-5 mb-3">{block.heading_2?.rich_text[0]?.plain_text}</h3>;
    case 'heading_3':
      return <h4 className="text-lg font-bold mt-4 mb-2">{block.heading_3?.rich_text[0]?.plain_text}</h4>;
    case 'bulleted_list_item':
      return <li className="list-disc ml-6">{block.bulleted_list_item?.rich_text[0]?.plain_text}</li>;
    case 'numbered_list_item':
      return <li className="list-decimal ml-6">{block.numbered_list_item?.rich_text[0]?.plain_text}</li>;
    case 'image':
      const src = block.image?.file?.url || block.image?.external?.url;
      const alt = block.image?.caption?.[0]?.plain_text || 'Image';
      return src ? <img src={src} alt={alt} className="my-4" /> : null;
    default:
      return null;
  }
}