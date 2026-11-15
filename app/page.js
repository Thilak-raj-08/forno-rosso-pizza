'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { pizzas } from '@/data/menuData'
import { useCart } from '@/components/CartContext'
import {
  RiFireFill,
  RiAddLine,
  RiArrowRightUpLine,
  RiTimeLine,
  RiAwardLine,
  RiLeafLine,
} from 'react-icons/ri'

export default function HomePage() {
  const { addItem } = useCart()
  const signaturePizzas = pizzas.slice(0, 4)

  return (
    <div className="space-y-28">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 overflow-hidden border-b border-[#D4A359]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Editorial Copy (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1B1512] border border-[#D4A359]/35 text-[#D4A359] text-xs font-mono uppercase tracking-widest">
                <span>AVPN Certified Craft • 72-Hour Natural Levain</span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight text-[#F6F1E7]">
                Blistered by <span className="italic font-normal text-[#D4A359]">Oak Fire</span>, Born in Napoli.
              </h1>

              <p className="text-[#C2B6A7] text-base sm:text-lg max-w-xl leading-relaxed">
                Every pie begins with stone-milled Caputo Tipo 00 flour fermented cold for 72 hours, hand-stretched to order, crowned with volcanic San Marzano DOP tomatoes, and fired for 90 seconds at 485°C.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#C83E2B] hover:bg-[#AE3220] text-[#F6F1E7] text-xs font-bold uppercase tracking-widest shadow-xl transition-all hover:-translate-y-0.5"
                >
                  <span>Order Wood-Fired Pizza</span>
                  <RiArrowRightUpLine className="text-lg" />
                </Link>
                <Link
                  href="/craft-your-own"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#1B1512] hover:bg-[#261E1A] text-[#F6F1E7] border border-[#D4A359]/40 text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-0.5"
                >
                  <span>Craft Your Own Pie</span>
                </Link>
              </div>

              {/* Artisanal Credentials Row */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#D4A359]/20 max-w-xl">
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A359]">
                    485°C
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#9E9183] mt-0.5">
                    Stefano Ferrara Oven
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A359]">
                    72 Hrs
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#9E9183] mt-0.5">
                    Cold Sourdough Rise
                  </p>
                </div>
                <div>
                  <p className="font-serif text-2xl sm:text-3xl font-bold text-[#D4A359]">
                    90 Sec
                  </p>
                  <p className="text-xs font-mono uppercase tracking-wider text-[#9E9183] mt-0.5">
                    Leopard-Spotted Bake
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Hero Editorial Photograph (5 cols) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#D4A359]/35 shadow-2xl aspect-[4/5]">
                <img
                  src="/images/hero-margherita.jpg"
                  alt="Wood-Fired Margherita Verace DOP"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120E0C] via-transparent to-transparent" />

                {/* Floating Tasting Card */}
                <div className="absolute bottom-5 left-5 right-5 p-5 rounded-2xl bg-[#120E0C]/90 backdrop-blur-md border border-[#D4A359]/30 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4A359]">
                      Chef&apos;s Benchmark Pie
                    </span>
                    <h2 className="font-serif text-lg font-bold text-[#F6F1E7]">
                      Margherita Verace DOP — $18
                    </h2>
                  </div>
                  <button
                    onClick={() =>
                      addItem({
                        id: 'margherita-dop',
                        name: 'Margherita Verace DOP',
                        subtitle: 'San Marzano DOP • Fior di Latte',
                        price: 18,
                      })
                    }
                    className="px-4 py-2.5 rounded-full bg-[#C83E2B] hover:bg-[#AE3220] text-[#F6F1E7] text-xs font-bold uppercase tracking-wider whitespace-nowrap"
                  >
                    + Add to Ticket
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Wood-Fired Selection */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C83E2B] mb-2">
              Le Nostre Pizze D&apos;Autore
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#F6F1E7]">
              Signature <span className="italic font-normal text-[#D4A359]">Wood-Fired</span> Pies
            </h2>
          </div>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4A359] hover:text-[#F6F1E7]"
          >
            View Complete 12-Item Menu →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signaturePizzas.map((pizza, index) => (
            <motion.div
              key={pizza.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="card-editorial rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4A359]/60 transition-all duration-300"
            >
              <div>
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-[#120E0C]/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#D4A359] border border-[#D4A359]/30">
                      {pizza.category}
                    </span>
                    {pizza.spicy && (
                      <span className="px-2.5 py-1 rounded-full bg-[#C83E2B] text-[10px] font-mono uppercase text-white">
                        Piccante
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#120E0C]/90 text-[#F6F1E7] font-mono text-sm font-bold border border-[#D4A359]/40">
                    ${pizza.price}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-serif text-xl font-bold text-[#F6F1E7] mb-1.5">
                    {pizza.name}
                  </h3>
                  <p className="text-xs font-mono text-[#D4A359] mb-3 leading-relaxed">
                    {pizza.italianSub}
                  </p>
                  <p className="text-xs text-[#A89A8E] leading-relaxed">
                    {pizza.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() =>
                    addItem({
                      id: pizza.id,
                      name: pizza.name,
                      subtitle: pizza.category,
                      price: pizza.price,
                    })
                  }
                  className="w-full py-3 rounded-xl bg-[#F6F1E7] hover:bg-[#C83E2B] text-[#120E0C] hover:text-[#F6F1E7] font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5"
                >
                  <RiAddLine className="text-base" /> Add to Order Ticket
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Brick Oven & Parchment Editorial Feature */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-parchment rounded-3xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C83E2B] font-bold">
              Il Segreto dell&apos;Impasto
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#181310] leading-tight">
              Why We Wait <span className="italic text-[#C83E2B]">72 Hours</span> Before Lighting the Fire.
            </h2>
            <p className="text-sm sm:text-base text-[#4A4036] leading-relaxed">
              Commercial pizzerias rush dough in four hours with heavy yeast. At Forno Rosso, our mother starter (*lievito madre*) ferments slowly for three full days at 4°C. The result is an airy, cloud-like crust with complex sourdough aroma that is naturally light and effortless to digest.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#EDE5D5] border border-[#DED4C3]">
                <RiLeafLine className="text-2xl text-[#4A6B53] mb-2" />
                <h3 className="font-serif font-bold text-base text-[#181310]">
                  San Marzano DOP
                </h3>
                <p className="text-xs text-[#5C5248] mt-1">
                  Grown in volcanic soil at the foot of Mount Vesuvius, hand-crushed raw with sea salt.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#EDE5D5] border border-[#DED4C3]">
                <RiAwardLine className="text-2xl text-[#C83E2B] mb-2" />
                <h3 className="font-serif font-bold text-base text-[#181310]">
                  Copper Dome Brick Oven
                </h3>
                <p className="text-xs text-[#5C5248] mt-1">
                  Hand-built brick by brick with Biscotto di Sorrento clay floorstones.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/story"
                className="px-7 py-3.5 rounded-full bg-[#181310] text-[#F6F1E7] text-xs font-bold uppercase tracking-widest hover:bg-[#C83E2B] transition-colors"
              >
                Read Our 72h Dough Story →
              </Link>
              <Link
                href="/reservations"
                className="px-7 py-3.5 rounded-full border-2 border-[#181310] text-[#181310] text-xs font-bold uppercase tracking-widest hover:bg-[#181310] hover:text-[#F6F1E7] transition-colors"
              >
                Book a Table Tonight
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border-2 border-[#181310]/15 shadow-xl aspect-[4/3]">
              <img
                src="/images/oven-interior.jpg"
                alt="Forno Rosso Copper Wood-Fired Brick Oven"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
