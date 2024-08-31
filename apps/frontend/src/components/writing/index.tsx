'use client'
import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import axios from 'axios'

import { ListContainer } from '@/components/list-detail/ListContainer'
import { LoadingSpinner } from '@/components/loading-spinner'
import { API_URL } from '@/constants'
import { TitleBar } from '@/components/list-detail/TitleBar'
import toast from 'react-hot-toast'
import { BlogListItem } from './blog-list-item'

export const WritingList = () => {
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Blog[]>([])
  const [scrollContainerRef, setScrollContainerRef] = useState<
    React.MutableRefObject<HTMLElement | null> | undefined
  >(undefined)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/blog`)
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        toast.error(`Error fetching data: ${error}`)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading && data.length === 0) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        <TitleBar scrollContainerRef={scrollContainerRef} title="📑 Blogs" />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer onRef={setScrollContainerRef}>
      <TitleBar scrollContainerRef={scrollContainerRef} title="📑 Blogs" />
      <LayoutGroup>
        <div className="lg:space-y-1 lg:p-3">
          {data.map((content) => {
            const isActive = pathname === `/writing/${content.id}`

            return (
              <motion.div layout key={content.id}>
                <BlogListItem active={isActive} blog={content} />
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>
    </ListContainer>
  )
}
