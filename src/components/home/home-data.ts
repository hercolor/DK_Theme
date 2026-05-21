export const heroMetrics = [
  { value: '60ms', label: 'Average Latency' },
  { value: '99.99%', label: 'Uptime Reliability' },
  { value: '150+', label: 'Global Edge Nodes' },
] as const

export const narrativeSections = [
  {
    id: 'experience',
    eyebrow: 'Precision Engineering',
    title: 'The sound of silence in a noisy world.',
    body:
      'We believe the best technology is invisible. Our network doesn’t just move data; it choreographs it. No lag, no friction, just a seamless flow of information that feels as natural as breathing.',
    detail: 'Every node is hand-picked. Every route is optimized in real-time. We don’t just connect you; we elevate your entire digital presence.',
    points: ['Global Anycast', 'Zero-Knowledge Privacy', 'Multi-Protocol Harmony'],
    variant: 'flow',
  },
  {
    id: 'control',
    eyebrow: 'Radical Simplicity',
    title: 'Order, not clutter. Clarity, not noise.',
    body:
      'Most platforms drown you in dashboards. We offer a single, unified point of truth. Manage your entire infrastructure with the same level of ease as sending a text message.',
    detail: 'Our interface is designed to get out of your way. When you need it, it’s powerful. When you don’t, it’s invisible.',
    points: ['Unified Dashboard', 'Instant Provisioning', 'Intelligent Automation'],
    variant: 'control',
  },
] as const

export const platformNames = [
  'macOS',
  'iOS',
  'Android',
  'Windows',
  'Linux',
  'Clash',
  'Stash',
  'Surge',
  'Shadowrocket',
] as const

export const footerLinks = [
  { label: 'Network Status', href: '#', external: true },
  { label: 'Privacy Policy', href: '#', external: true },
  { label: 'Terms of Service', href: '#', external: true },
  { label: 'Contact Support', href: '#', external: true },
] as const
