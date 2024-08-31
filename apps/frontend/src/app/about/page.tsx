import { Intro } from '@/components/home/intro'
import { ListDetailView } from '@/components/layouts'

export default function About() {
  return <ListDetailView list={null} hasDetail detail={<Intro />} />
}
