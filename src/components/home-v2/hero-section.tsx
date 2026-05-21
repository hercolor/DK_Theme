import { motion } from 'framer-motion'
import { ArrowRight, Activity, Shield, Cpu, Lock } from 'lucide-react'
import { premiumContent } from '../home/premium-data'

const latencyBars = [40, 35, 45, 20, 25, 60, 30, 22, 18, 24, 30, 35, 20] as const
const latencyBarPeaks = [52, 47, 59, 34, 41, 74, 44, 37, 29, 39, 46, 53, 32] as const
const latencyBarDurations = [1.7, 2.1, 1.8, 2.3, 1.9, 2.2, 1.6, 2.0, 1.75, 2.15, 1.85, 2.05, 1.95] as const

export function HeroSection() {
  return (
    <section className='relative min-h-screen w-full flex items-center pt-24 pb-12 overflow-hidden'>
      {/* Background Elements */}
      <div className='absolute inset-0 bg-grid-white bg-[size:3rem_3rem] opacity-20 bg-grid-white-fade' />
      <div className='absolute right-0 top-1/4 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none mix-blend-screen' />
      <div className='absolute left-1/4 bottom-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] pointer-events-none mix-blend-screen' />
      <div className='absolute inset-0 noise-bg' />

      <div className='w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center z-10'>
        
        {/* Left: Typography & CTA */}
        <div className='flex flex-col items-start'>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8'
          >
            <span className='flex size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(124,58,237,0.8)] animate-pulse' />
            <span className='text-xs font-mono text-white/80 tracking-wider'>{premiumContent.hero.eyebrow}</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className='text-5xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 mb-8'
            dangerouslySetInnerHTML={{ __html: premiumContent.hero.title }}
          />

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='text-lg lg:text-xl text-white/50 max-w-[500px] leading-relaxed mb-10'
          >
            {premiumContent.hero.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className='flex items-center gap-6'
          >
            <button className='group relative flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)]'>
              <div className='absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out' />
              <span className='relative z-10'>{premiumContent.hero.cta}</span>
              <ArrowRight className='relative z-10 size-5 transition-transform group-hover:translate-x-1' />
            </button>
          </motion.div>
        </div>

        {/* Right: Asymmetric Floating UI */}
        <div className='relative h-[600px] hidden lg:block'>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ perspective: 1000 }}
            className='absolute inset-0'
          >
            {/* Main Terminal/HUD */}
            <div className='absolute top-10 right-0 w-[480px] rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl p-6 overflow-hidden'>
              <div className='flex items-center justify-between mb-6 border-b border-white/5 pb-4'>
                <div className='flex items-center gap-2'>
                  <div className='size-2.5 rounded-full bg-red-500' />
                  <div className='size-2.5 rounded-full bg-yellow-500' />
                  <div className='size-2.5 rounded-full bg-green-500' />
                </div>
                <div className='text-xs font-mono text-white/30'>系统路由_v4.2</div>
              </div>

              <div className='space-y-4 font-mono text-sm'>
                <div className='flex items-center justify-between text-white/60'>
                  <div className='flex items-center gap-2'><Activity className='size-4 text-accent' /> <span>活跃节点</span></div>
                  <span className='text-white font-medium'>1,284</span>
                </div>
                <div className='flex items-center justify-between text-white/60'>
                  <div className='flex items-center gap-2'><Cpu className='size-4 text-primary' /> <span>网络负载</span></div>
                  <span className='text-white font-medium'>24.8%</span>
                </div>
                <div className='flex items-center justify-between text-white/60'>
                  <div className='flex items-center gap-2'><Lock className='size-4 text-green-400' /> <span>加密协议</span></div>
                  <span className='text-white font-medium'>AES-256-GCM</span>
                </div>
                
                <div className='mt-6 pt-4 border-t border-white/5'>
                  <div className='text-xs text-white/40 mb-2'>实时延迟矩阵</div>
                  <div className='flex items-end gap-1 h-12'>
                    {latencyBars.map((h, i) => (
                      <motion.div 
                        key={i}
                        animate={{ height: [`${h}%`, `${latencyBarPeaks[i]}%`, `${h}%`] }}
                        transition={{ duration: latencyBarDurations[i], repeat: Infinity, ease: 'easeInOut' }}
                        className='w-full bg-primary/40 rounded-t-sm'
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Glass Element 1 */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className='absolute bottom-20 -left-10 w-64 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4 flex items-center gap-4 shadow-xl'
            >
              <div className='flex size-10 items-center justify-center rounded-full bg-accent/20'>
                <Shield className='size-5 text-accent' />
              </div>
              <div>
                <div className='text-xs font-mono text-white/40'>系统状态</div>
                <div className='text-sm font-semibold text-white'>安全隧道已激活</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
