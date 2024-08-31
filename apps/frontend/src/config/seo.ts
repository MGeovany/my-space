export const baseUrl = process.env.NODE_ENV === 'production' ? 'TODO' : ''
export const baseEmail = 'marlongeo199@gmail.com'

export const defaultSEO = {
  title: 'M Geovany',
  description:
    'Software Engineer with a passion for building products, learning, and teaching.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    site_name: 'mgeovany space',
    images: [
      {
        url: `${baseUrl}/static/og/default.png`,
        alt: 'M Geovany',
      },
    ],
  },
  twitter: {
    handle: '@mgeovany',
    site: '@mgeovany',
    cardType: 'summary_large_image',
  },
}

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export function extendSEO(options: SEOProps) {
  const images = options.image
    ? [{ url: `${baseUrl}/static/${options.image}` }]
    : defaultSEO.openGraph.images

  return {
    ...defaultSEO,
    ...options,
    url: `${baseUrl}/${options.url}`,
    openGraph: {
      ...defaultSEO.openGraph,
      images,
      url: `${baseUrl}/${options.url}`,
    },
  }
}
