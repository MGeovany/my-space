import { LoadingSpinner } from '../loading-spinner'

export function ListLoadMore({ setIsVisible }: any) {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <LoadingSpinner />
    </div>
  )
}
