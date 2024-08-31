import { ProjectDetail } from '@/components/project-ideas/project-detail'

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectDetail id={params.id} />
}
