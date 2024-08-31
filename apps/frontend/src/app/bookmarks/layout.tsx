import { BookmarksList } from '@/components/bookmarks/bookmarks-list'
import { ListDetailView } from '@/components/layouts'
import * as React from 'react'

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ListDetailView
      list={<BookmarksList />}
      hasDetail
      shouldHideSidebar={false}
      detail={children}
    />
  )
}
