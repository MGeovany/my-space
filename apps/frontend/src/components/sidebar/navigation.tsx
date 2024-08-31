'use client'
import { usePathname } from 'next/navigation'

import {
  BookmarksIcon,
  ExternalLinkIcon,
  FigmaIcon,
  GitHubIcon,
  HomeIcon,
  WritingIcon,
} from '../icon'
import { NavigationLink } from './navigation-link'
import { Linkedin, Plus } from 'lucide-react'

import { GhostButton } from '../button'
import { ProjectIcon } from '../icons/shared'

function ThisAddBookmarkDialog() {
  return (
    <GhostButton aria-label="Add bookmark" size="small-square">
      <Plus size={16} />
    </GhostButton>
  )
}

export function SidebarNavigation() {
  const pathname = usePathname()

  const data = {
    viewer: {
      isAdmin: true,
    },
  }

  const sections = [
    {
      label: null,
      items: [
        {
          href: '/',
          label: 'Home',
          icon: HomeIcon,
          trailingAccessory: null,
          isActive: pathname === '/',
          trailingAction: null,
          isExternal: false,
        },

        {
          href: '/writing',
          label: 'Writing',
          icon: WritingIcon,
          trailingAccessory: null,
          isActive: pathname === '/writing',
          trailingAction: null,
          isExternal: false,
        },
      ],
    },
    {
      label: 'Me',
      items: [
        {
          href: '/bookmarks',
          label: 'Bookmarks',
          icon: BookmarksIcon,
          trailingAccessory: null,
          isActive: pathname === '/bookmarks',
          trailingAction: data?.viewer?.isAdmin ? ThisAddBookmarkDialog : null,
          isExternal: false,
        },
        {
          href: '/project-ideas',
          label: 'Project Ideas',
          icon: ProjectIcon,
          trailingAccessory: null,
          isActive: pathname === '/project-ideas',
          trailingAction: data?.viewer?.isAdmin ? ThisAddBookmarkDialog : null,
          isExternal: false,
        },
      ],
    },

    {
      label: 'Online',
      items: [
        {
          href: 'https://github.com/mgeovany',
          label: 'GitHub',
          icon: GitHubIcon,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },

        {
          href: 'https://www.linkedin.com/in/m-geovany/',
          label: 'LinkedIn',
          icon: Linkedin,
          trailingAccessory: ExternalLinkIcon,
          isActive: false,
          trailingAction: null,
          isExternal: true,
        },
      ],
    },
  ]

  return (
    <div className="flex-1 px-3 py-3 space-y-1">
      {sections.map((section, i) => {
        return (
          <ul key={i} className="space-y-1">
            {section.label && (
              <h4
                key={i}
                className="px-2 pt-5 pb-2 text-xs font-semibold text-gray-1000 text-opacity-40 dark:text-white"
              >
                {section.label}
              </h4>
            )}
            {section.items.map((item, j) => (
              <NavigationLink key={j} link={item} />
            ))}
          </ul>
        )
      })}
    </div>
  )
}
