import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Shield, Zap, Activity } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { premiumContent } from './premium-data'

/**
 * 顶级英雄幻灯片
 * 采用不对称设计和动态深度感
 */
export function PremiumHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <div ref={containerRef} className='relative h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-[#050505]'>
      <motion.div style={{ y: y1, opacity, scale }} className='relative z-10 w-full max-w-[1800px] px-6 md:px-12 lg:px-20'>
        <div className='max-w-[1200px]'>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className='mb-8 flex items-center gap-4'
          >
            <div className='px-3 py-1 bg-black text-white dark:bg-white dark:text-black text-[10px] font-bold tracking-[0.2em] uppercase rounded'>
              New
            </div>
            <span className='text-[12px] font-bold tracking-[0.3em] uppercase text-black/40 dark:text-white/40'>
              {premiumContent.hero.eyebrow}
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className='text-[clamp(3rem,10vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.04em] text-balance'
            dangerouslySetInnerHTML={{ __html: premiumContent.hero.title }}
          />
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className='mt-12 flex flex-col md:flex-row md:items-center justify-between gap-12'
          >
            <p className='max-w-[600px] text-xl md:text-2xl leading-relaxed text-black/60 dark:text-white/60 font-medium'>
              {premiumContent.hero.description}
            </p>
            
            <button className='group relative flex items-center gap-6 px-10 py-6 bg-black text-white dark:bg-white dark:text-black rounded-2xl transition-transform hover:scale-[1.02] active:scale-[0.98]'>
              <span className='text-xl font-bold'>{premiumContent.hero.cta}</span>
              <ArrowRight className='size-6 transition-transform group-hover:translate-x-1' />
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* 极简背景：网格系统 */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]' />
      </div>
    </div>
  )
}

/**
 * 沉浸式功能展示
 * VPN 核心：加密隧道与全球节点
 */
export function ScrollShowcase() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15])

  return (
    <section ref={containerRef} className='relative h-[180vh] w-full bg-black py-32 dark:bg-black'>
      <div className='sticky top-0 h-screen flex items-center justify-center overflow-hidden'>
        <motion.div 
          style={{ scale, opacity, rotateX, perspective: 1200 }}
          className='relative aspect-[16/10] w-full max-w-[1440px] rounded-[3.5rem] border border-white/10 bg-[#080808] shadow-[0_80px_160px_rgba(0,0,0,0.8)] overflow-hidden'
        >
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_70%)]' />
          
          <div className='relative h-full w-full p-16 flex flex-col justify-between'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-2.5'>
                <div className='size-3 rounded-full bg-red-500/80' />
                <div className='size-3 rounded-full bg-yellow-500/80' />
                <div className='size-3 rounded-full bg-green-500/80' />
              </div>
              <div className='text-[10px] font-bold tracking-[0.4em] uppercase text-white/30'>{premiumContent.showcase.version}</div>
            </div>
            
            <div className='grid grid-cols-12 gap-10 flex-1 mt-16'>
              <div className='col-span-7 rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-12 flex flex-col justify-end relative overflow-hidden group'>
                <div className='absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity'>
                   <Activity className='size-32 text-white animate-pulse' strokeWidth={0.5} />
                </div>
                <div className='text-7xl font-bold tracking-tighter text-white mb-6'>{premiumContent.showcase.title}</div>
                <p className='text-xl text-white/40 max-w-[440px] leading-relaxed'>{premiumContent.showcase.subtitle}</p>
              </div>
              
              <div className='col-span-5 grid grid-rows-2 gap-10'>
                <div className='rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-10 flex flex-col justify-center items-center text-center'>
                  <Zap className='size-14 text-white/30 mb-6' strokeWidth={1} />
                  <div className='text-[12px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2'>{premiumContent.showcase.metrics[0].label}</div>
                  <div className='text-4xl font-bold text-white tracking-tight'>{premiumContent.showcase.metrics[0].value}</div>
                </div>
                <div className='rounded-[2.5rem] bg-white/[0.03] border border-white/5 p-10 flex flex-col justify-center items-center text-center'>
                  <Shield className='size-14 text-white/30 mb-6' strokeWidth={1} />
                  <div className='text-[12px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2'>{premiumContent.showcase.metrics[1].label}</div>
                  <div className='text-4xl font-bold text-white tracking-tight'>{premiumContent.showcase.metrics[1].value}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * 极简叙事分块
 */
export function NarrativeBlock({ eyebrow, title, description, side = 'left', icon: Icon }: {
  eyebrow: string
  title: string
  description: string
  side?: 'left' | 'right'
  icon?: LucideIcon
}) {
  return (
    <div className={cn(
      'flex flex-col md:flex-row items-center gap-24 py-56',
      side === 'right' && 'md:flex-row-reverse'
    )}>
      <div className='flex-1'>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20%' }}
          className='max-w-[560px]'
        >
          <span className='text-[13px] font-bold tracking-[0.4em] uppercase text-black/30 dark:text-white/30 mb-10 block'>
            {eyebrow}
          </span>
          <h2 className='text-6xl md:text-8xl font-bold tracking-tighter leading-[0.88] mb-10 text-balance'>
            {title}
          </h2>
          <p className='text-2xl text-black/50 dark:text-white/50 leading-relaxed font-medium'>
            {description}
          </p>
        </motion.div>
      </div>
      <div className='flex-1 w-full'>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className='aspect-square rounded-[4rem] bg-black/[0.02] dark:bg-white/[0.02] flex items-center justify-center relative overflow-hidden'
        >
          {/* 抽象 VPN 可视化：隧道感 */}
          <div className='absolute inset-0 flex items-center justify-center opacity-10'>
             {[...Array(6)].map((_, i) => (
               <div 
                key={i}
                className='absolute rounded-full border border-black dark:border-white'
                style={{ 
                  width: `${(i + 1) * 20}%`, 
                  height: `${(i + 1) * 20}%`,
                  opacity: 1 - i * 0.15
                }}
               />
             ))}
          </div>
          <div className='relative z-10 size-40 rounded-full border border-black/5 dark:border-white/5 bg-white dark:bg-black shadow-2xl flex items-center justify-center'>
             {Icon ? <Icon className='size-16 opacity-20' strokeWidth={1} /> : <div className='size-20 rounded-full bg-black dark:bg-white' />}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
