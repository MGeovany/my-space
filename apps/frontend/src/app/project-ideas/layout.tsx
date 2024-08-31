import { ReactNode } from 'react'
import { ListDetailView } from '@/components/layouts'
import { ProjectIdeasList } from '@/components/project-ideas'

export default function ProjectIdeasLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ListDetailView
      list={<ProjectIdeasList />}
      hasDetail
      shouldHideSidebar={false}
      detail={children}
    />
  )
}
