import { BlogDetail } from '@/components/writing/blog-detail'

export default function Page({ params }: { params: { id: string } }) {
  return <BlogDetail id={params.id} />
}
