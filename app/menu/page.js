'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pizzas } from '@/data/menuData'
import { useCart } from '@/components/CartContext'
import {
  RiSearchLine,
  RiAddLine,
  RiFireFill,
  RiLeafLine,
} from 'react-icons/ri'

const categories = [
  'All',
  'Rosse (Red)',
  'Bianche (White)',
  'Antipasti & Sides',
  'Dolci & Drinks',
]

export default function MenuPage() {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [dietFilter, setDietFilter] = useState('all') // 'all' | 'veg' | 'spicy' | 'chef'
  const [search, setSearch] = useState('')
  const [selectedSizes, setSelectedSizes] = useState({}) // id -> '12"' | '14"'

  const filteredItems = useMemo(() => {
    return pizzas.filter((item) => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory
      const matchDiet =
        dietFilter === 'all' ||
        (dietFilter === 'veg' && item.vegetarian) ||
        (dietFilter === 'spicy' && item.spicy) ||
        (dietFilter === 'chef' && item.chefSpecial)
      const matchSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.italianSub.toLowerCase().includes(search.toLowerCase())
      return matchCat && matchDiet && matchSearch
    })
  }, [activeCategory, dietFilter, search])

  const getSize = (id) => selectedSizes[id] || '12"'
  const toggleSize = (id, size) =>
    setSelectedSizes((prev) => ({ ...prev, [id]: size }))

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C83E2B] mb-2">
          La Nostra Carta • Fired to Order
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#F6F1E7] mb-4">
          The Wood-Fired <span className="italic font-normal text-[#D4A359]">Menu</span>
        </h1>
        <p className="text-sm sm:text-base text-[#C2B6A7]">
          Every pizza is hand-stretched from 72-hour cold-fermented sourdough and blistered in our oak-fired brick oven.
        </p>
      </div>

      {/* Category Pills & Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === cat
                  ? 'bg-[#C83E2B] text-[#F6F1E7] shadow-lg'
                  : 'bg-[#1B1512] text-[#C2B6A7] border border-[#D4A359]/20 hover:border-[#D4A359]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Dietary & Search Controls */}
        <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto justify-center">
          {[
            { id: 'all', label: 'All Items' },
            { id: 'chef', label: '★ Chef’s Special' },
            { id: 'veg', label: '🌿 Vegetarian' },
            { id: 'spicy', label: '🌶 Piccante' },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDietFilter(d.id)}
              className={`px-3 py-2 rounded-xl text-xs font-mono transition-all ${
                dietFilter === d.id
                  ? 'bg-[#D4A359] text-[#120E0C] font-bold'
                  : 'bg-[#1B1512] text-[#C2B6A7] border border-[#D4A359]/20'
              }`}
            >
              {d.label}
            </button>
          ))}

          <div className="relative">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9E9183]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search ingredients..."
              className="pl-9 pr-4 py-2 rounded-xl bg-[#1B1512] border border-[#D4A359]/25 text-xs text-[#F6F1E7] placeholder-[#7A6F63] focus:outline-none focus:border-[#D4A359]"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => {
            const isPizza =
              item.category === 'Rosse (Red)' || item.category === 'Bianche (White)'
            const size = getSize(item.id)
            const finalPrice = isPizza && size === '14"' ? item.price + 4 : item.price

            return (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                className="card-editorial rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#D4A359]/60 transition-all"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#120E0C]/85 backdrop-blur-md text-[10px] font-mono uppercase tracking-wider text-[#D4A359] border border-[#D4A359]/30">
                        {item.prepTime}
                      </span>
                      {item.vegetarian && (
                        <span className="px-2.5 py-1 rounded-full bg-[#4A6B53] text-white text-[10px] font-mono uppercase flex items-center gap-1">
                          <RiLeafLine /> Veg
                        </span>
                      )}
                      {item.spicy && (
                        <span className="px-2.5 py-1 rounded-full bg-[#C83E2B] text-white text-[10px] font-mono uppercase flex items-center gap-1">
                          <RiFireFill /> Spicy
                        </span>
                      )}
                    </div>
                    <div className="absolute bottom-3 right-3 px-3.5 py-1 rounded-full bg-[#120E0C]/90 text-[#F6F1E7] font-mono text-sm font-bold border border-[#D4A359]/40">
                      ${finalPrice}
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-1">
                      {item.name}
                    </h2>
                    <p className="text-xs font-mono text-[#D4A359] mb-3 leading-relaxed">
                      {item.italianSub}
                    </p>
                    <p className="text-sm text-[#A89A8E] leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {isPizza && (
                      <div className="flex items-center justify-between pt-3 border-t border-[#D4A359]/15">
                        <span className="text-xs font-mono uppercase text-[#9E9183]">
                          Select Size:
                        </span>
                        <div className="flex gap-2">
                          {['12"', '14"'].map((sz) => (
                            <button
                              key={sz}
                              type="button"
                              onClick={() => toggleSize(item.id, sz)}
                              className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                                size === sz
                                  ? 'bg-[#D4A359] text-[#120E0C]'
                                  : 'bg-[#120E0C] text-[#C2B6A7] border border-[#D4A359]/25'
                              }`}
                            >
                              {sz} {sz === '14"' ? '(+$4)' : 'Classica'}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <button
                    onClick={() =>
                      addItem({
                        id: `${item.id}-${size}`,
                        name: item.name,
                        subtitle: isPizza
                          ? `${size} Wood-Fired Napoletana`
                          : item.category,
                        price: finalPrice,
                      })
                    }
                    className="w-full py-3.5 rounded-xl bg-[#C83E2B] hover:bg-[#AE3220] text-[#F6F1E7] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg"
                  >
                    <RiAddLine className="text-base" /> Add to Order Ticket • ${finalPrice}
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
