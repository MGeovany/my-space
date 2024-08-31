'use client'
import { useEffect, useState } from 'react'
import { ListContainer } from '../list-detail/ListContainer'
import { BookmarksTitleBar } from './bookmarks-title-bar'
import { LoadingSpinner } from '../loading-spinner'
import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { API_URL } from '@/constants'
import { BookmarksListItem } from './bookmarks-list-item'

export const BookmarksList = () => {
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [scrollContainerRef, setScrollContainerRef] = useState(null)

  useEffect(() => {
    fetch(`${API_URL}/bookmark`).then((res) => {
      res.json().then((data) => {
        setBookmarks(data.data)
      })
    })
  }, [])

  if (loading && bookmarks.length === 0) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        <BookmarksTitleBar scrollContainerRef={scrollContainerRef} />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer data-cy="bookmarks-list" onRef={setScrollContainerRef}>
      <BookmarksTitleBar scrollContainerRef={scrollContainerRef} />
      <LayoutGroup>
        <div className="lg:space-y-1 lg:p-3">
          {bookmarks.map((content) => {
            const isActive = pathname === `/bookmarks/${content.id}`

            return (
              <motion.div layout key={content.id}>
                <BookmarksListItem active={isActive} bookmark={content} />
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>
    </ListContainer>
  )
}
