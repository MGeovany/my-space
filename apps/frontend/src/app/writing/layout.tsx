import { ReactNode } from 'react'
import { ListDetailView } from '@/components/layouts'
import { WritingList } from '@/components/writing'

export default function WritingLayout({ children }: { children: ReactNode }) {
  return (
    <ListDetailView
      list={<WritingList />}
      hasDetail
      shouldHideSidebar={false}
      detail={children}
    />
  )
}
