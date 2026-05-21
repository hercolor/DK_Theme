import { motion } from 'framer-motion'
import { Server, Shield, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock Data for Nodes
const activeNodes = [
  { region: '日本, 东京', hash: 'tk-edge-01', latency: 12, load: 45, status: 'optimal' },
  { region: '美国, 洛杉矶', hash: 'la-core-04', latency: 135, load: 68, status: 'active' },
  { region: '德国, 法兰克福', hash: 'fr-edge-02', latency: 110, load: 32, status: 'optimal' },
  { region: '新加坡', hash: 'sg-core-01', latency: 45, load: 82, status: 'warning' },
]

const sparklineOffsets = [
  [18, 11, 16, 9, 14],
  [8, 14, 7, 12, 10],
  [15, 10, 18, 13, 16],
  [11, 17, 12, 19, 9],
] as const

function getSparklinePath(node: (typeof activeNodes)[number], index: number) {
  const offsets = sparklineOffsets[index] ?? sparklineOffsets[0]

  return `M0,32 Q20,${32 - offsets[0]} 40,${32 - offsets[1]} T80,${32 - offsets[2]} T120,${32 - offsets[3]} T160,${32 - offsets[4]} T200,${32 - node.latency / 5}`
}

export function NodeStatusSection() {
  return (
    <section id="network" className="relative py-32 overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div>
            <div className="text-accent font-mono text-sm tracking-wider mb-4 flex items-center gap-2">
              <Server className="size-4" /> 全球拓扑
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">实时节点遥测</h2>
          </div>
          <p className="text-white/50 max-w-sm">
            实时监控我们的基础设施。采用零信任架构，确保所有边缘节点的透明动态路由。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeNodes.map((node, i) => (
            <motion.div 
              key={node.hash}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-colors backdrop-blur-md overflow-hidden"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white font-medium">{node.region}</h3>
                  <div className="text-xs font-mono text-white/40 mt-1">{node.hash}</div>
                </div>
                <div className="flex h-2 w-2">
                  <span className={cn(
                    "animate-ping absolute inline-flex h-2 w-2 rounded-full opacity-75",
                    node.status === 'optimal' ? 'bg-green-400' : node.status === 'warning' ? 'bg-yellow-400' : 'bg-primary'
                  )} />
                  <span className={cn(
                    "relative inline-flex rounded-full h-2 w-2",
                    node.status === 'optimal' ? 'bg-green-500' : node.status === 'warning' ? 'bg-yellow-500' : 'bg-primary'
                  )} />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50">延迟</span>
                    <span className="text-white font-mono">{node.latency}ms</span>
                  </div>
                  {/* Mock sparkline */}
                  <svg className="w-full h-8 overflow-visible" preserveAspectRatio="none">
                    <motion.path 
                      d={getSparklinePath(node, i)}
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                      className="text-primary/50 group-hover:text-primary transition-colors"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </svg>
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-white/50">负载</span>
                    <span className="text-white font-mono">{node.load}%</span>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${node.load}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={cn(
                        "h-full rounded-full",
                        node.load > 80 ? 'bg-yellow-500' : 'bg-accent'
                      )}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GlobalMapSection() {
  return (
    <section className="relative py-32 overflow-hidden border-t border-white/5 bg-black/40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">无限制的全球访问</h2>
        <p className="text-white/50 max-w-2xl mx-auto text-lg">
          通过我们独有的路由算法突破地理限制。一键连接，触达全球任何大洲。
        </p>
      </div>

      <div className="relative w-full max-w-[1200px] mx-auto aspect-[2/1] mt-10">
        {/* Simplified abstract map background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15),transparent_70%)] pointer-events-none" />
        
        {/* This would ideally be an SVG map. Using CSS/HTML layout for abstract representation here */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwMCwyMDBoMjB2MjBoLTIwek0zMDAsMTUwaDIwdjIwaC0yMHpNNTAwLDMwMGgyMHYyMGgtMjB6TTgwMCwyMDBoMjB2MjBoLTIwek0xMDAwLDQwMGgyMHYyMGgtMjB6Ii8+PC9zdmc+')] bg-no-repeat bg-center bg-contain" />

        {/* Animated connection arcs */}
        <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 0 8px rgba(6,182,212,0.5))' }}>
          <motion.path 
            d="M300,200 Q600,50 900,250" 
            fill="none" 
            stroke="url(#grad1)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path 
            d="M900,250 Q600,400 200,350" 
            fill="none" 
            stroke="url(#grad2)" 
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
          />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#06B6D4" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
          </defs>
        </svg>

        {/* Pulsing Nodes */}
        <div className="absolute top-[33%] left-[25%] size-3 rounded-full bg-primary shadow-[0_0_15px_rgba(124,58,237,1)] animate-ping" />
        <div className="absolute top-[41%] left-[75%] size-3 rounded-full bg-accent shadow-[0_0_15px_rgba(6,182,212,1)] animate-ping" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-[58%] left-[16%] size-3 rounded-full bg-primary shadow-[0_0_15px_rgba(124,58,237,1)] animate-ping" style={{ animationDelay: '1s' }} />
      </div>
    </section>
  )
}

const protocols = [
  { name: 'WireGuard', port: 'UDP', encryption: 'ChaCha20', status: '原生' },
  { name: 'VLESS', port: 'TCP/XTLS', encryption: 'AEAD', status: '深度优化' },
  { name: 'Trojan', port: 'TCP/443', encryption: 'TLS 1.3', status: '隐蔽' },
]

export function ProtocolSection() {
  return (
    <section className="py-32 relative border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
           <div className="text-primary font-mono text-sm tracking-wider mb-4 flex items-center gap-2">
              <Shield className="size-4" /> 密码学与协议
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-6">军用级加密标准</h2>
            <p className="text-white/50 text-lg mb-10 leading-relaxed">
              我们摒弃了臃肿的传统协议。整个基础设施基于现代、轻量且数学上绝对安全的密码学原语构建，专为绕过深度包检测（DPI）而设计。
            </p>
            <ul className="space-y-4">
              {['严格执行无日志策略', '支持前向保密（PFS）', '全流量混淆，无视防火墙阻断'].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70">
                  <CheckCircle2 className="size-5 text-accent" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
        </div>

        {/* Terminal/Protocol Table */}
        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl overflow-hidden font-mono text-sm shadow-2xl">
          <div className="flex bg-white/5 px-4 py-3 border-b border-white/10">
            <div className="w-1/3 text-white/40">协议</div>
            <div className="w-1/3 text-white/40">传输层</div>
            <div className="w-1/3 text-white/40 text-right">安全/状态</div>
          </div>
          <div className="divide-y divide-white/5">
            {protocols.map((p, i) => (
              <motion.div 
                key={p.name}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex px-4 py-4 hover:bg-white/5 transition-colors cursor-default"
              >
                <div className="w-1/3 text-white font-medium flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" /> {p.name}
                </div>
                <div className="w-1/3 text-white/60">{p.port}</div>
                <div className="w-1/3 text-white/80 text-right flex justify-end gap-3 items-center">
                   {p.encryption}
                   <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/20 uppercase">
                     {p.status}
                   </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const pricingTiers = [
  {
    name: '基础版',
    price: '¥29',
    period: '/月',
    description: '适合日常安全浏览与流媒体解锁。',
    features: ['包含 50+ 全球节点', '最高 500 Mbps 带宽', 'AES-256 加密支持', '支持 3 台设备同时在线'],
    highlighted: false,
  },
  {
    name: '专业版',
    price: '¥49',
    period: '/月',
    description: '专为重度用户与游戏玩家设计。',
    features: ['解锁所有全球边缘节点', '高达 1.2 Gbps 吞吐量', '支持 VLESS / Trojan / WireGuard', '支持 10 台设备同时在线', '可选原生独立 IP'],
    highlighted: true,
  }
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 relative border-t border-white/5 bg-black/40">
      <div className="max-w-[1000px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-4">透明的订阅方案</h2>
          <p className="text-white/50 text-lg">没有隐藏费用。以合理的价格享受优质的网络基础设施。</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pricingTiers.map((tier) => (
            <div 
              key={tier.name}
              className={cn(
                "relative rounded-3xl p-8 backdrop-blur-xl transition-transform hover:-translate-y-1",
                tier.highlighted 
                  ? "bg-white/10 border border-primary/50 shadow-[0_0_40px_rgba(124,58,237,0.1)]" 
                  : "bg-white/5 border border-white/10"
              )}
            >
              {tier.highlighted && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  推荐
                </div>
              )}
              <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
              <p className="text-white/50 text-sm mb-6 h-10">{tier.description}</p>
              
              <div className="mb-8 font-mono">
                <span className="text-5xl font-bold text-white tracking-tighter">{tier.price}</span>
                <span className="text-white/40">{tier.period}</span>
              </div>

              <button className={cn(
                "w-full py-4 rounded-xl font-bold text-sm tracking-wide transition-colors mb-8",
                tier.highlighted 
                  ? "bg-primary text-white hover:bg-primary/90" 
                  : "bg-white/10 text-white hover:bg-white/20"
              )}>
                立即订阅
              </button>

              <ul className="space-y-4">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <CheckCircle2 className="size-4 text-accent/80" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { appConfig } from '@/lib/config'

export function FooterSection() {
  return (
    <footer className="border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-6 bg-primary rounded shadow-[0_0_10px_rgba(124,58,237,0.5)]" />
            <span className="text-xl font-bold tracking-tighter text-white">{appConfig.appName}</span>
          </div>
          <p className="text-white/40 max-w-sm text-sm leading-relaxed">
            下一代私有路由基础设施。为极致性能而生，为绝对隐私而设计。
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-mono text-sm tracking-wider mb-6">平台</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">全球矩阵</a></li>
            <li><a href="#" className="hover:text-white transition-colors">协议支持</a></li>
            <li><a href="#" className="hover:text-white transition-colors">客户端下载</a></li>
            <li><a href="#" className="hover:text-white transition-colors">订阅方案</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-mono text-sm tracking-wider mb-6">公司</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li><a href="#" className="hover:text-white transition-colors">关于我们</a></li>
            <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
            <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
            <li><a href="#" className="hover:text-white transition-colors">联系支持</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 text-xs text-white/30 font-mono">
        <p>© {new Date().getFullYear()} {appConfig.appName}. 保留所有权利。</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <span className="flex items-center gap-2"><div className="size-1.5 rounded-full bg-green-500 animate-pulse" /> 系统运行正常</span>
        </div>
      </div>
    </footer>
  )
}
