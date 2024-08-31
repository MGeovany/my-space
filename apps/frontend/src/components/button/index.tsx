import Link from 'next/link'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  forwardRef,
  Ref,
} from 'react'

interface BaseButtonProps {
  size: Size
  disabled?: boolean
  href?: string | null
  as?: string | null
  forwardedRef?: Ref<HTMLAnchorElement | HTMLButtonElement> | null
  [key: string]: unknown
}

type ButtonAsButton = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>
type ButtonAsLink = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>

type ButtonProps = ButtonAsButton | ButtonAsLink

function BaseButton({
  href = null,
  as = null,
  forwardedRef = null,
  ...rest
}: BaseButtonProps) {
  if (href && href.startsWith('/')) {
    return <Link href={href} as={as ?? ''} {...rest} />
  }

  if (href) {
    return (
      <a ref={forwardedRef as Ref<HTMLAnchorElement>} href={href} {...rest} />
    )
  }

  return <button ref={forwardedRef as Ref<HTMLButtonElement>} {...rest} />
}

const baseClasses =
  'flex space-x-2 flex-none items-center justify-center cursor-pointer leading-none transition-all font-semibold'

enum Size {
  large = 'large',
  small = 'small',
  smallSquare = 'small-square',
}

const sizeClasses: Record<Size, string> = {
  [Size.large]: 'px-4 py-3 text-sm',
  [Size.small]: 'px-2.5 py-1.5 text-xs',
  [Size.smallSquare]: 'p-2 text-sm',
}

type RadiusSize = 'large' | 'small'

const radiusClasses: Record<RadiusSize, string> & { default: string } = {
  large: 'rounded-lg',
  small: 'rounded',
  default: 'rounded-md',
}

function getSize(size: Size): string {
  return sizeClasses[size]
}

function getOpacity(disabled = false): string {
  return disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
}

function getRadius(size: Size | RadiusSize): string {
  if (size in radiusClasses) {
    return radiusClasses[size as RadiusSize]
  }
  return radiusClasses.default
}

const composer = {
  getSize,
  getOpacity,
  getRadius,
}

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const classes = `text-gray-700 hover:text-gray-1000 shadow-xs bg-white border border-gray-400 border-opacity-30 dark:border-gray-700 dark:hover:border-gray-600 dark:bg-white dark:bg-opacity-10 dark:text-gray-200 dark:hover:text-white hover:border-opacity-50 hover:shadow-sm`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})

export default Button

export const PrimaryButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const classes = `text-white hover:text-white shadow-xs bg-blue-500 border border-blue-600 dark:border-blue-400 dark:border-opacity-50 hover:shadow-sm`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})

export const DeleteButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const classes = `bg-white border border-gray-200 dark:border-red-500 dark:hover:border-red-500 dark:bg-red-500 dark:border-opacity-20 dark:bg-opacity-10 text-red-500 hover:border-red-500 hover:text-white hover:bg-red-600 focus:bg-red-600 dark:focus:text-white`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})

export const GhostButton = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const classes = `text-gray-700 hover:text-gray-1000 bg-gray-200 bg-opacity-0 hover:bg-opacity-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white`
  const size = composer.getSize(props.size)
  const opacity = composer.getOpacity(props.disabled)
  const radius = composer.getRadius(props.size)
  const composed = `${baseClasses} ${size} ${opacity} ${radius} ${classes}`
  return <BaseButton forwardedRef={ref} className={composed} {...props} />
})
