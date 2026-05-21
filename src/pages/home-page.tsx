import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useAuth } from '@/features/auth/auth-context'
import { HeroSection } from '@/components/home-v2/hero-section'
import { NodeStatusSection, GlobalMapSection, ProtocolSection, PricingSection, FooterSection } from '@/components/home-v2/sections'
import { appConfig } from '@/lib/config'

function Navbar() {
  const { token } = useAuth()
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 50], [0, 0.4])
  const blur = useTransform(scrollY, [0, 50], [0, 12])
  
  const backgroundColor = useMotionTemplate`rgba(5, 5, 5, ${bgOpacity})`
  const backdropFilter = useMotionTemplate`blur(${blur}px)`

  return (
    <header className='fixed top-0 inset-x-0 z-[100] h-20 px-6 lg:px-12 flex items-center justify-between'>
      <motion.div 
        className='absolute inset-0 border-b border-white/5'
        style={{ backgroundColor, backdropFilter }}
      />
      
      <div className='relative z-10 flex items-center gap-3'>
        <div className='size-8 bg-primary rounded shadow-[0_0_15px_rgba(124,58,237,0.6)]' />
        <span className='text-xl font-bold tracking-tighter text-white'>{appConfig.appName}</span>
      </div>

      <nav className='relative z-10 hidden md:flex items-center gap-8'>
        {[
          { label: '网络状态', href: '#network' },
          { label: '全球节点', href: '#map' },
          { label: '安全协议', href: '#protocols' },
          { label: '订阅方案', href: '#pricing' }
        ].map(item => (
          <a key={item.label} href={item.href} className='text-sm font-mono text-white/60 hover:text-white transition-colors tracking-wide'>
            {item.label}
          </a>
        ))}
      </nav>

      <div className='relative z-10 flex items-center gap-4'>
        <Link 
          to={token ? '/dashboard' : '/login'}
          className='text-sm font-mono text-white/60 hover:text-white transition-colors'
        >
          {token ? '控制台' : '登录'}
        </Link>
        <Link 
          to={token ? '/dashboard' : '/register'}
          className='text-sm font-bold bg-white text-black px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)]'
        >
          {token ? '进入控制台' : '立即开始'}
        </Link>
      </div>
    </header>
  )
}


export function HomePage() {
  return (
    <div className='min-h-screen bg-[#050505] text-white selection:bg-primary selection:text-white overflow-x-hidden'>
      <Navbar />
      <main>
        <HeroSection />
        <NodeStatusSection />
        <GlobalMapSection />
        <ProtocolSection />
        <PricingSection />
      </main>
      <FooterSection />
    </div>
  )
}
