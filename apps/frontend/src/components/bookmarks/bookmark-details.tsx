'use client'

import { API_URL } from '@/constants'
import { NextSeo } from 'next-seo'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Detail } from '../list-detail/detail'
import routes from '@/config/routes'
import { TitleBar } from '../list-detail/TitleBar'
import { Tags } from '../tag'
import Link from 'next/link'
import { MarkdownRenderer } from '../markdown-renderer'
import { LinkIcon } from 'lucide-react'
import { PrimaryButton } from '../button'
import { Icons } from '../icons'
import Image from 'next/image'

export function BookmarkDetail({ id }: { id: string }) {
  const [bookmark, setBookmarks] = useState<Bookmark>()
  const [imageBroken, setImageBroken] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(false)

  const scrollContainerRef: RefObject<HTMLDivElement> = useRef(null)
  const titleRef: RefObject<HTMLHeadingElement> = useRef(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${API_URL}/bookmark/${id}`)
        const data = await response.json()
        if (data.success) {
          setBookmarks(data.data)
        }
      } catch (error) {
        console.error('Error fetching bookmark:', error)
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <Detail.Loading />
  }

  if (!bookmark) {
    return <Detail.Loading />
  }

  return (
    <>
      <NextSeo
        title={bookmark.title}
        description={bookmark.description}
        openGraph={{
          title: bookmark.title,
          description: bookmark.description,
          images: [
            {
              url: routes.bookmarks.seo.image || '',
              alt: routes.bookmarks.seo.description,
            },
          ],
        }}
      />
      <Detail.Container data-cy="bookmark-detail" ref={scrollContainerRef}>
        <TitleBar
          backButton
          globalMenu={false}
          backButtonHref={'/bookmarks'}
          magicTitle
          title={bookmark.title}
          titleRef={titleRef}
          scrollContainerRef={scrollContainerRef}
        />
        <Detail.ContentContainer>
          <Detail.Header>
            <Tags tags={bookmark.tag} />
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noopener"
              className="block"
            >
              <Detail.Title ref={titleRef}>{bookmark.title}</Detail.Title>
            </Link>
            <Link
              href={bookmark.url}
              target="_blank"
              rel="noopener"
              className="flex items-center space-x-2 leading-snug text-tertiary"
            >
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
              <span>{new URL(bookmark.url).hostname}</span>
            </Link>
            {bookmark.description && (
              <MarkdownRenderer
                className="italic prose opacity-70"
                children={bookmark.description}
                variant="comment"
              />
            )}
          </Detail.Header>
          <div className="mt-6">
            <PrimaryButton
              size="large"
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkIcon size={14} />
              <span>Visit</span>
            </PrimaryButton>
          </div>
        </Detail.ContentContainer>
      </Detail.Container>
    </>
  )
}
