import { memo, useState } from 'react'
import Image from 'next/image'
import { ListItem } from '@/components/list-detail/ListItem'
import { Icons } from '@/components/icons'

interface BlogListItemProps {
  blog: Blog
  active: boolean
}

export const BlogListItem = memo<BlogListItemProps>(({ blog, active }) => {
  const [imageBroken, setImageBroken] = useState<boolean>(false)

  function handleClick(e: any, blog: Blog) {
    if (e.metaKey) {
      e.preventDefault()
      e.stopPropagation()
      if (blog && blog.url) {
        const url = blog.url
        window.open(url, '_blank')?.focus()
      }
    }
  }

  return (
    <ListItem
      key={blog.id}
      title={blog.title}
      byline={
        <div className="flex items-center space-x-2">
          {
            imageBroken ? <Icons.url /> : null
            /*  <Image
                src={`https://www.google.com/s2/favicons?domain=${blog.url}`}
                alt="favicon"
                width={16}
                height={16}
                onError={() => setImageBroken(true)}
              /> */
          }
          <span> {blog.url ? new URL(blog.url).hostname : ''}</span>
        </div>
      }
      active={active}
      href="/writing/[id]"
      as={`/writing/${blog.id}`}
      onClick={(e) => handleClick(e, blog)}
    />
  )
})
