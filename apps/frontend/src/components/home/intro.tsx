'use client'
import Image from 'next/image'
import Link from 'next/link'

import { MapPin } from 'react-feather'
import { Detail } from '../list-detail/detail'
import { TitleBar } from '../list-detail/TitleBar'
import { useRef } from 'react'

function SectionTitle(props: any) {
  return (
    <h4
      className="col-span-2 pt-8 text-lg font-extrabold text-black dark:text-white md:pt-0 md:text-right md:text-base md:font-normal md:text-opacity-40"
      {...props}
    />
  )
}

function SectionContent(props: any) {
  return <div className="col-span-10" {...props} />
}

interface TableRowProps {
  href: string
  title: string
  date: string
  subtitle?: string
}

function TableRow({ href, title, subtitle, date }: TableRowProps) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      className="flex sm:items-center flex-col sm:flex-row gap-0.5 sm:gap-4 group"
    >
      <strong className="line-clamp-2 font-medium text-gray-1000 group-hover:text-blue-600 group-hover:underline dark:text-gray-100 dark:group-hover:text-blue-500">
        {title}
      </strong>
      <span className="hidden sm:flex flex-1 border-t border-gray-300 border-dashed shrink dark:border-gray-800" />
      {subtitle && <span className="flex-none text-tertiary">{subtitle}</span>}
      {date && (
        <span className="flex-none font-mono text-quaternary">{date}</span>
      )}
    </a>
  )
}

function SectionContainer(props: any) {
  return (
    <div
      className="grid items-start grid-cols-1 gap-6 md:grid-cols-12"
      {...props}
    />
  )
}

const workHistory = [
  {
    href: 'https://savvly.com',
    title: 'Savvly',
    subtitle: 'Frontend Engineer',
    date: 'Jun 22 — Present',
  },
  {
    title: 'OneTouch',
    subtitle: 'Software Engineer',
    date: 'Aug 23 — Jun 24',
  },
]

export function Intro() {
  const scrollContainerRef = useRef(null)
  const titleRef = useRef<HTMLParagraphElement>(document.createElement('p'))

  return (
    <Detail.Container data-cy="home-intro" ref={scrollContainerRef}>
      <TitleBar
        magicTitle
        titleRef={titleRef}
        scrollContainerRef={scrollContainerRef}
        title="Home"
      />

      {/* Keep this div to trigger the magic scroll */}
      <div className="p-4" ref={titleRef} />

      <Detail.ContentContainer>
        <div className="pb-24 space-y-8 md:space-y-16">
          <SectionContainer>
            <SectionTitle />
            <SectionContent>
              <div className="prose text-primary">
                <p className="text-zinc-400 leading-8 mt-12 mb-4">
                  Hi, I’m Marlon Geovany Castro Mejia. I’m a{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/mgeovany"
                    className="text-blue-600 hover:underline"
                  >
                    software engineer
                  </a>{' '}
                  who loves diving into the intricacies of how websites
                  function.
                </p>
                <p className="my-4">
                  Currently, I’m focused on developing applications and writing{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://medium.com/@mgeovany"
                    className="text-blue-600 hover:underline"
                  >
                    technical blogs
                  </a>{' '}
                  to share my knowledge and experiences in the field.
                </p>
                <p>
                  In my career, I’ve worked on various projects that allow me to
                  explore and enhance web technologies. I also enjoy documenting
                  my journey and insights through{' '}
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://dev.to/mgeovany"
                    className="text-orange-600 hover:underline"
                  >
                    blogging,
                  </a>{' '}
                  aiming to help others in their software development path.
                </p>
              </div>
              <Image
                src="/me.webp"
                alt="Marlon Geovany Castro Mejia"
                width={200}
                height={200}
                className="rounded-lg my-4"
              />
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Online</SectionTitle>
            <SectionContent>
              <div className="flex flex-col gap-5 lg:gap-3">
                <TableRow
                  href={'/github'}
                  title={'GitHub'}
                  subtitle={'Follow'}
                  date={''}
                />
                <TableRow
                  href={'/linkedIn'}
                  title={'LinkedIn'}
                  subtitle={'Follow'}
                  date={''}
                />
              </div>
            </SectionContent>
          </SectionContainer>

          <SectionContainer>
            <SectionTitle>Work</SectionTitle>
            <SectionContent>
              <div className="flex flex-col space-y-3">
                {workHistory.map((job) => (
                  <TableRow
                    href={job.href}
                    title={job.title}
                    subtitle={job.subtitle}
                    date={job.date}
                    key={job.href}
                  />
                ))}
              </div>
            </SectionContent>
          </SectionContainer>
        </div>
      </Detail.ContentContainer>
    </Detail.Container>
  )
}
