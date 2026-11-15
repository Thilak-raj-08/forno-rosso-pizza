'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useCart } from './CartContext'
import {
  RiFireFill,
  RiShoppingBag3Line,
  RiMenu4Line,
  RiCloseLine,
} from 'react-icons/ri'

const navLinks = [
  { name: 'La Casa', href: '/' },
  { name: 'Wood-Fired Menu', href: '/menu' },
  { name: 'Craft Your Pizza', href: '/craft-your-own' },
  { name: '72h Dough Story', href: '/story' },
  { name: 'Reserve a Table', href: '/reservations' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { totals, setIsDrawerOpen } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-[#D4A359]/20 bg-[#120E0C]/90 backdrop-blur-xl">
      {/* Top thin announcement strip */}
      <div className="bg-[#1B1512] border-b border-[#D4A359]/15 py-1.5 px-4 text-center text-[11px] font-mono tracking-widest uppercase text-[#D4A359]">
        <span>🔥 Brick Oven Live at 485°C (905°F) • 72-Hour Cold-Fermented Caputo 00 Sourdough • Free Delivery over $35</span>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Crest */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-[#C83E2B] border border-[#D4A359]/50 flex items-center justify-center text-[#F6F1E7] shadow-lg group-hover:scale-105 transition-transform">
            <RiFireFill className="text-xl" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#F6F1E7] block leading-none">
              FORNO <span className="italic font-normal text-[#D4A359]">Rosso</span>
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#A89A8E] block mt-1">
              Antica Pizzeria • Est. Napoli
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#1B1512] border border-[#D4A359]/20">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-colors ${
                  isActive
                    ? 'text-[#F6F1E7]'
                    : 'text-[#C2B6A7] hover:text-[#D4A359]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="fornoNavPill"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-[#C83E2B] z-0 shadow-md"
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            )
          })}
        </nav>

        {/* Order Ticket Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#F6F1E7] hover:bg-[#EDE5D5] text-[#120E0C] text-xs font-bold uppercase tracking-wider transition-all shadow-lg"
          >
            <RiShoppingBag3Line className="text-base text-[#C83E2B]" />
            <span className="hidden sm:inline">Order Ticket</span>
            <span className="px-2 py-0.5 rounded-full bg-[#C83E2B] text-[#F6F1E7] font-mono text-[11px]">
              {totals.count} • ${totals.subtotal.toFixed(0)}
            </span>
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2.5 rounded-full bg-[#1B1512] border border-[#D4A359]/30 text-[#F6F1E7]"
          >
            {mobileOpen ? <RiCloseLine className="text-xl" /> : <RiMenu4Line className="text-xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[#D4A359]/20 bg-[#120E0C] px-4 py-4 space-y-1.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#C83E2B] text-[#F6F1E7]'
                    : 'text-[#C2B6A7] hover:bg-[#1B1512]'
                }`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      )}
    </header>
  )
}
