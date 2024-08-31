'use client'
import { NextSeo } from 'next-seo'
import routes from '@/config/routes'

export default function ProjectIdeas() {
  return (
    <NextSeo
      title={routes.writing.seo.title}
      description={routes.writing.seo.description}
      openGraph={routes.writing.seo.openGraph}
    />
  )
}
