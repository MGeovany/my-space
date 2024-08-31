'use client'
import { NextSeo } from 'next-seo'
import routes from '@/config/routes'

export default function ProjectIdeas() {
  return (
    <NextSeo
      title={routes.projectIdeas.seo.title}
      description={routes.projectIdeas.seo.description}
      openGraph={routes.projectIdeas.seo.openGraph}
    />
  )
}
