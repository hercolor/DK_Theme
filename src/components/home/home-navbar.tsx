import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BrandLogo } from '@/components/brand-logo'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth/auth-context'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Network', href: '#experience' },
  { label: 'Performance', href: '#performance' },
  { label: 'Ecosystem', href: '#ecosystem' },
] as const

export function HomeNavbar() {
  const { token } = useAuth()
  const { scrollY } = useScroll()
  const [isScrolled, setIsScrolled] = useState(false)

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.7)']
  )
  const backdropBlur = useTransform(scrollY, [0, 50], ['blur(0px)', 'blur(16px)'])

  useEffect(() => {
    return scrollY.onChange((latest) => setIsScrolled(latest > 50))
  }, [scrollY])

  return (
    <motion.header
      style={{
        backgroundColor: isScrolled ? backgroundColor : undefined,
        backdropFilter: backdropBlur,
      }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-16 items-center border-b transition-colors duration-500',
        isScrolled
          ? 'border-black/5 dark:border-white/5'
          : 'border-transparent'
      )}
    >
      <div className='mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 sm:px-10 lg:px-16'>
        <div className='flex items-center gap-10'>
          <Link to='/' className='flex items-center gap-2'>
            <BrandLogo className='size-8' />
            <span className='text-lg font-semibold tracking-tight'>DK</span>
          </Link>

          <nav className='hidden items-center gap-8 md:flex'>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='text-[13px] font-medium text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white'
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className='flex items-center gap-4'>
          <ThemeToggle />
          <div className='hidden h-4 w-px bg-black/10 sm:block dark:bg-white/10' />
          <Button
            asChild
            variant='ghost'
            className='h-9 rounded-full px-5 text-[13px] font-medium text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white'
          >
            <Link to={token ? '/dashboard' : '/login'}>{token ? 'Dashboard' : 'Sign in'}</Link>
          </Button>
          <Button
            asChild
            className='h-9 rounded-full bg-black px-6 text-[13px] font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98] dark:bg-white dark:text-black'
          >
            <Link to={token ? '/dashboard' : '/register'}>{token ? 'Console' : 'Get Started'}</Link>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}
