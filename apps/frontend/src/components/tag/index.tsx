import { BookmarkTag } from '@/types/bookmark'
import { XCircle } from 'react-feather'

interface Tag {
  name: BookmarkTag | string
}

export function Tags({ tags }: any) {
  console.log(tags)
  return (
    <div className="flex flex-wrap space-x-2">
      <Tag key={tags} name={tags} />
    </div>
  )
}

interface TagComponentProps {
  name: BookmarkTag | string
}

export function Tag({ name }: TagComponentProps) {
  const baseClasses =
    'flex-none justify-center flex items-center space-x-2 cursor-pointer self-start border uppercase rounded-full hover:bg-opacity-10 px-3 py-0.5 text-xs font-semibold leading-5 tracking-wide'

  const tagStyles: Record<BookmarkTag, string> = {
    [BookmarkTag.PORFOLIO]:
      'border-purple-200 text-purple-600 bg-purple-500 bg-opacity-5',
    [BookmarkTag.READING]:
      'border-green-200 text-green-600 bg-green-500 bg-opacity-5',
    [BookmarkTag.RESOURCES]:
      'border-blue-200 text-blue-600 bg-blue-500 bg-opacity-5',
    [BookmarkTag.TOOLS]: 'border-red-200 text-red-600 bg-red-500 bg-opacity-5',
    [BookmarkTag.WEB]:
      'border-gray-200 text-gray-600 dark:text-gray-300 bg-gray-200 bg-opacity-30 dark:bg-opacity-10 hover:bg-opacity-40',
    [BookmarkTag.ClearTagPicker]:
      'border-red-200 text-red-600 bg-red-500 bg-opacity-5',
  }

  const specificClasses = tagStyles[name as BookmarkTag] || ''

  return (
    <span className={`${baseClasses} ${specificClasses}`}>
      {name === BookmarkTag.ClearTagPicker ? (
        <>
          <XCircle size={16} />
          <span>Clear tag</span>
        </>
      ) : (
        name
      )}
    </span>
  )
}
