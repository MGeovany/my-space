interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Bookmark {
  id: number;
  title: string;
  url: string;
  tag: BookmarkTag;
  createdAt: string;
  updatedAt: string;
}

export enum BookmarkTag {
  TOOLS = "tools",
  RESOURCES = "resources",
  WEB = "web",
  READING = "reading",
  PORFOLIO = "porfolio",
}
