import { BookmarkDetail } from '@/components/bookmarks/bookmark-details'

export default function Page({ params }: { params: { id: string } }) {
  return <BookmarkDetail id={params.id} />
}
