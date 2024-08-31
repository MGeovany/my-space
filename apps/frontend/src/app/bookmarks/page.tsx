'use client'
import { NextSeo } from 'next-seo'
import routes from '@/config/routes'

export default function Bookmarks() {
  return (
    <NextSeo
      title={routes.bookmarks.seo.title}
      description={routes.bookmarks.seo.description}
      openGraph={routes.bookmarks.seo.openGraph}
    />
  )
}
