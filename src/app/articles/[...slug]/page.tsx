import { ParsedPage } from '@/types/notion'
import axios from 'axios'
import Article from '@/components/Article'
import type { PageProps } from '../../../../.next/types/app/page'

type Props = PageProps & { params: { slug: string[] } }

export async function generateMetadata({ params }: Props) {
  const slug = params.slug ? params.slug[0] : '';
  const page_id = slug.replace(/[^a-zA-Z0-9]/g, '');

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/page`, { page_id });
    const meta: ParsedPage = res.data.meta;
    return {
      title: meta?.title || 'Default Title',
    };
  } catch {
    return { title: 'Default Title' };
  }
}

export default async function Page({ params }: Props) {
  const slug = params.slug ? params.slug[0] : '';
  const page_id = slug.replace(/[^a-zA-Z0-9]/g, '');

  const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL}/api/page`, { page_id });
  const { meta, data } = res.data;

  return (
    <div className="p-4">
      <Article page={meta} data={data} />
    </div>
  );
}
