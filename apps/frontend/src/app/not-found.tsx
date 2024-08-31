import { ListDetailView } from '@/components/layouts'
import { Detail } from '@/components/list-detail/detail'

function MissingPage() {
  return <Detail.Null />
}

export default function Home() {
  return <ListDetailView list={null} hasDetail detail={<MissingPage />} />
}
