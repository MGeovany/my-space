interface Blog {
  id: number
  title: string
  content: string
  url?: string
  description?: string
  createdAt: string
  updatedAt: string
}

interface Bookmark {
  id: number
  title: string
  description: string
  url: string
  tag: BookmarkTag
  createdAt: string
  updatedAt: string
}

interface ProjectIdeas {
  id: number
  title: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
}

enum BookmarkTag {
  TOOLS = 'tools',
  RESOURCES = 'resources',
  WEB = 'web',
  READING = 'reading',
  PORFOLIO = 'porfolio',
  ClearTagPicker = 'clear tag picker',
}
