import { ReactNode } from 'react'
import { BookmarksList } from '@/components/bookmarks/bookmarks-list'
import { ListDetailView } from '@/components/layouts'

export default function BookmarksLayout({ children }: { children: ReactNode }) {
  return (
    <ListDetailView
      list={<BookmarksList />}
      hasDetail
      shouldHideSidebar={false}
      detail={children}
    />
  )
}
