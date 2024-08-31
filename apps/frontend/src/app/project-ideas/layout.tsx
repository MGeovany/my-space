'use client'
import { SidebarContent } from '@/components/sidebar-content'
import { API_URL } from '@/constants'
import { ReactNode, useEffect, useState } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const [projectIdeas, setProjectIdeas] = useState<ProjectIdeas[]>([])

  useEffect(() => {
    fetch(`${API_URL}/project_ideas`).then((res) => {
      res.json().then((data) => {
        setProjectIdeas(data.data)
      })
    })
  }, [])
  return (
    <div className="flex flex-row min-h-screen w-full">
      <SidebarContent
        title="🧑‍💻 Project ideas"
        data={projectIdeas}
        redirect="project-ideas"
      />
      {children}
    </div>
  )
}
