import { cn } from '@/lib/utils';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <div className={cn('flex shrink-0 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black', className)}>
      <div className='size-[45%] border-2 border-current rounded-sm' />
    </div>
  )
}
