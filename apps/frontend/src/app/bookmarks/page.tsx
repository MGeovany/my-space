'use client'
import routes from '@/config/routes'
import { NextSeo } from 'next-seo'

export default function Bookmarks() {
  return (
    <NextSeo
      title={routes.bookmarks.seo.title}
      description={routes.bookmarks.seo.description}
      openGraph={routes.bookmarks.seo.openGraph}
    />
  )
}
