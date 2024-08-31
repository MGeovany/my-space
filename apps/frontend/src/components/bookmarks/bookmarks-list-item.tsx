import React, { memo, useState } from 'react'
import { ListItem } from '../list-detail/ListItem'
import { Icons } from '../icons'
import Image from 'next/image'

interface BookmarksListItemProps {
  bookmark: Bookmark
  active: boolean
}

export const BookmarksListItem = memo<BookmarksListItemProps>(
  ({ bookmark, active }) => {
    const [imageBroken, setImageBroken] = useState<boolean>(false)

    function handleClick(e: any, bookmark: Bookmark) {
      if (e.metaKey) {
        e.preventDefault()
        e.stopPropagation()
        if (bookmark && bookmark.url) {
          const url = bookmark.url
          window.open(url, '_blank')?.focus()
        }
      }
    }

    return (
      <ListItem
        key={bookmark.id}
        title={bookmark.title}
        byline={
          <div className="flex items-center space-x-2">
            {imageBroken ? (
              <Icons.url />
            ) : (
              <Image
                src={`https://www.google.com/s2/favicons?domain=${bookmark.url}`}
                alt="favicon"
                width={16}
                height={16}
                onError={() => setImageBroken(true)}
              />
            )}
            <span> {new URL(bookmark.url).hostname}</span>
          </div>
        }
        active={active}
        href="/bookmarks/[id]"
        as={`/bookmarks/${bookmark.id}`}
        onClick={(e) => handleClick(e, bookmark)}
      />
    )
  }
)
