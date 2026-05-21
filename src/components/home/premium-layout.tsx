import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * 全新叙事节组件
 * 彻底抛弃旧的 HomeSection 逻辑，采用全屏视口驱动
 */
export function PremiumSection({ 
  children, 
  className,
  sticky = false 
}: { 
  children: ReactNode
  className?: string
  sticky?: boolean
}) {
  return (
    <section className={cn(
      'relative w-full',
      sticky ? 'h-[200vh]' : 'min-h-screen',
      className
    )}>
      <div className={cn(
        'mx-auto w-full max-w-[1800px] px-6 md:px-12 lg:px-20',
        sticky && 'sticky top-0 h-screen overflow-hidden flex items-center'
      )}>
        {children}
      </div>
    </section>
  )
}

/**
 * 极简高级导航
 */
export function PremiumNavbar() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0, 1])
  const y = useTransform(scrollY, [0, 100], [-20, 0])

  return (
    <motion.nav 
      style={{ opacity, y }}
      className='fixed top-6 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 px-6 py-3 rounded-full border border-black/5 bg-white/40 backdrop-blur-2xl dark:border-white/5 dark:bg-black/40'
    >
      <div className='size-5 bg-black dark:bg-white rounded-sm' />
      <div className='h-4 w-px bg-black/10 dark:bg-white/10 mx-2' />
      <div className='flex items-center gap-6'>
        {['Network', 'Security', 'Edge', 'Pricing'].map(item => (
          <a key={item} href={`#${item.toLowerCase()}`} className='text-[11px] font-medium tracking-widest uppercase text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors'>
            {item}
          </a>
        ))}
      </div>
      <div className='h-4 w-px bg-black/10 dark:bg-white/10 mx-2' />
      <button className='text-[11px] font-bold tracking-widest uppercase'>Access</button>
    </motion.nav>
  )
}

/**
 * 文本揭示效果
 */
export function TextReveal({ text, className }: { text: string, className?: string }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start']
  })

  return (
    <div ref={targetRef} className={cn('relative', className)}>
      <motion.p 
        style={{ opacity: scrollYProgress }}
        className='leading-none'
      >
        {text}
      </motion.p>
    </div>
  )
}
