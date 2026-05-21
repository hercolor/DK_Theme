import type { PropsWithChildren } from 'react'
import { cn } from '@/lib/utils'

export function HomeSection({
  children,
  className,
  contentClassName,
  id,
}: PropsWithChildren<{
  className?: string
  contentClassName?: string
  id?: string
}>) {
  return (
    <section id={id} className={cn('px-6 sm:px-10 lg:px-16', className)}>
      <div className={cn('mx-auto w-full max-w-[1440px]', contentClassName)}>{children}</div>
    </section>
  )
}

export function Eyebrow({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'text-[11px] font-medium tracking-[0.2em] text-black/40 uppercase dark:text-white/40',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CinematicHeadline({
  children,
  className,
  size = 'lg',
}: PropsWithChildren<{
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}>) {
  const sizes = {
    sm: 'text-3xl sm:text-4xl lg:text-5xl',
    md: 'text-4xl sm:text-5xl lg:text-6xl',
    lg: 'text-5xl sm:text-7xl lg:text-8xl',
    xl: 'text-6xl sm:text-8xl lg:text-9xl',
  }

  return (
    <h2
      className={cn(
        'font-semibold tracking-tighter text-black dark:text-white',
        sizes[size],
        className,
      )}
    >
      {children}
    </h2>
  )
}
