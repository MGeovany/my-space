'use client'
import { useEffect, useState } from 'react'
import { LayoutGroup, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import axios from 'axios'

import { ListContainer } from '@/components/list-detail/ListContainer'
import { LoadingSpinner } from '@/components/loading-spinner'
import { API_URL } from '@/constants'
import { TitleBar } from '@/components/list-detail/TitleBar'
import { ProjectIdeaListItem } from '@/components/project-ideas/project-list-item'

export const ProjectIdeasList = () => {
  const pathname = usePathname()

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<ProjectIdeas[]>([])
  const [scrollContainerRef, setScrollContainerRef] = useState<
    React.MutableRefObject<HTMLElement | null> | undefined
  >(undefined)

  useEffect(() => {
    setLoading(true)
    axios
      .get(`${API_URL}/project_ideas`)
      .then((response) => {
        setData(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading && data.length === 0) {
    return (
      <ListContainer onRef={setScrollContainerRef}>
        <TitleBar
          scrollContainerRef={scrollContainerRef}
          title="📡 Project Ideas"
        />
        <div className="flex flex-1 items-center justify-center">
          <LoadingSpinner />
        </div>
      </ListContainer>
    )
  }

  return (
    <ListContainer onRef={setScrollContainerRef}>
      <TitleBar
        scrollContainerRef={scrollContainerRef}
        title="📡 Project Ideas"
      />
      <LayoutGroup>
        <div className="lg:space-y-1 lg:p-3">
          {data.map((content) => {
            const isActive = pathname === `/project-ideas/${content.id}`

            return (
              <motion.div layout key={content.id}>
                <ProjectIdeaListItem active={isActive} projectIdeas={content} />
              </motion.div>
            )
          })}
        </div>
      </LayoutGroup>
    </ListContainer>
  )
}
