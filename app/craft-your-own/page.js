'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { customBuilderOptions } from '@/data/menuData'
import { useCart } from '@/components/CartContext'
import { RiFireFill, RiCheckLine, RiAddLine } from 'react-icons/ri'

export default function CraftYourOwnPage() {
  const { addItem } = useCart()
  const [selectedDough, setSelectedDough] = useState(customBuilderOptions.doughs[0])
  const [selectedSauce, setSelectedSauce] = useState(customBuilderOptions.sauces[0])
  const [selectedCheese, setSelectedCheese] = useState(customBuilderOptions.cheeses[0])
  const [selectedToppings, setSelectedToppings] = useState([
    customBuilderOptions.toppings[0],
    customBuilderOptions.toppings[4],
  ])
  const [customName, setCustomName] = useState('')

  const toggleTopping = (topping) => {
    setSelectedToppings((prev) =>
      prev.some((t) => t.id === topping.id)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    )
  }

  const totalPrice = useMemo(() => {
    const toppingsSum = selectedToppings.reduce((acc, t) => acc + t.price, 0)
    return (
      selectedDough.price +
      selectedSauce.price +
      selectedCheese.price +
      toppingsSum
    )
  }, [selectedDough, selectedSauce, selectedCheese, selectedToppings])

  const handleAddCustomPie = () => {
    const toppingsList =
      selectedToppings.map((t) => t.name).join(', ') || 'No extra toppings'
    addItem({
      id: `custom-${Date.now()}`,
      name: customName.trim() || 'Pizza Personalizzata (Chef’s Custom)',
      subtitle: `${selectedDough.name} • ${selectedSauce.name} • ${selectedCheese.name} (${toppingsList})`,
      price: totalPrice,
    })
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C83E2B] mb-2">
          Il Laboratorio del Pizzaiolo
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#F6F1E7] mb-4">
          Craft Your <span className="italic font-normal text-[#D4A359]">Custom Pie</span>
        </h1>
        <p className="text-sm sm:text-base text-[#C2B6A7]">
          Select your long-fermented dough, DOP volcanic tomato or truffle base, artisanal Campanian cheese, and wood-roasted toppings.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: 4-Step Builder Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Dough */}
          <div className="card-editorial rounded-2xl p-6">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-4">
              1. Choose Your Sourdough Fermentation
            </h2>
            <div className="space-y-3">
              {customBuilderOptions.doughs.map((dough) => {
                const active = selectedDough.id === dough.id
                return (
                  <button
                    key={dough.id}
                    type="button"
                    onClick={() => setSelectedDough(dough)}
                    className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${
                      active
                        ? 'border-[#C83E2B] bg-[#C83E2B]/15'
                        : 'border-[#D4A359]/20 bg-[#120E0C] hover:border-[#D4A359]/50'
                    }`}
                  >
                    <div>
                      <p className="font-serif font-bold text-lg text-[#F6F1E7]">
                        {dough.name}
                      </p>
                      <p className="text-xs text-[#A89A8E] mt-0.5">{dough.detail}</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#D4A359]">
                      ${dough.price}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Sauce */}
          <div className="card-editorial rounded-2xl p-6">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-4">
              2. Select Artisanal Base Sauce
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customBuilderOptions.sauces.map((sauce) => {
                const active = selectedSauce.id === sauce.id
                return (
                  <button
                    key={sauce.id}
                    type="button"
                    onClick={() => setSelectedSauce(sauce)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      active
                        ? 'border-[#C83E2B] bg-[#C83E2B]/15'
                        : 'border-[#D4A359]/20 bg-[#120E0C] hover:border-[#D4A359]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="w-4 h-4 rounded-full border border-white/30"
                        style={{ backgroundColor: sauce.color }}
                      />
                      <span className="font-mono text-xs font-bold text-[#D4A359]">
                        {sauce.price === 0 ? 'Included' : `+$${sauce.price}`}
                      </span>
                    </div>
                    <p className="font-serif font-bold text-base text-[#F6F1E7]">
                      {sauce.name}
                    </p>
                    <p className="text-xs text-[#A89A8E] mt-1">{sauce.detail}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 3: Cheese */}
          <div className="card-editorial rounded-2xl p-6">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-4">
              3. Select Campanian Cheese
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customBuilderOptions.cheeses.map((cheese) => {
                const active = selectedCheese.id === cheese.id
                return (
                  <button
                    key={cheese.id}
                    type="button"
                    onClick={() => setSelectedCheese(cheese)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      active
                        ? 'border-[#C83E2B] bg-[#C83E2B]/15'
                        : 'border-[#D4A359]/20 bg-[#120E0C] hover:border-[#D4A359]/50'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-serif font-bold text-base text-[#F6F1E7]">
                        {cheese.name}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#D4A359]">
                        +${cheese.price}
                      </span>
                    </div>
                    <p className="text-xs text-[#A89A8E]">{cheese.detail}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 4: Toppings */}
          <div className="card-editorial rounded-2xl p-6">
            <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-4">
              4. Crown with Salumi, Woods & Finishes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {customBuilderOptions.toppings.map((topping) => {
                const active = selectedToppings.some((t) => t.id === topping.id)
                return (
                  <button
                    key={topping.id}
                    type="button"
                    onClick={() => toggleTopping(topping)}
                    className={`p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      active
                        ? 'border-[#D4A359] bg-[#D4A359]/15'
                        : 'border-[#D4A359]/20 bg-[#120E0C] hover:border-[#D4A359]/40'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#D4A359] block">
                        {topping.category}
                      </span>
                      <span className="text-sm font-semibold text-[#F6F1E7]">
                        {topping.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-[#C2B6A7]">
                        +${topping.price.toFixed(2)}
                      </span>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          active ? 'bg-[#D4A359] text-[#120E0C]' : 'border border-white/20'
                        }`}
                      >
                        {active && <RiCheckLine className="text-xs" />}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right: Sticky Live Pizza Ticket & Interactive Disk Preview (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-28">
          <div className="card-parchment rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DED4C3] pb-4">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-widest text-[#C83E2B] font-bold">
                  SCHEDA PIZZAIOLO • LIVE BUILD
                </p>
                <h3 className="font-serif text-2xl font-bold text-[#181310]">
                  Your Custom Neapolitan
                </h3>
              </div>
              <span className="font-mono text-2xl font-bold text-[#C83E2B]">
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            {/* Tactile Visual Pizza Disk Preview */}
            <div className="flex justify-center py-4">
              <motion.div
                key={`${selectedDough.id}-${selectedSauce.id}-${selectedCheese.id}`}
                initial={{ scale: 0.94, rotate: -4 }}
                animate={{ scale: 1, rotate: 0 }}
                className="w-56 h-56 rounded-full shadow-2xl flex items-center justify-center relative border-8"
                style={{
                  borderColor:
                    selectedDough.id === 'charcoal-nero' ? '#252220' : '#D9A76A',
                  backgroundColor: selectedSauce.color,
                }}
              >
                {/* Melted Cheese Spots */}
                <div className="w-40 h-40 rounded-full border-4 border-dashed border-[#FBF7F0]/70 flex flex-wrap items-center justify-center gap-3 p-4">
                  <span className="w-8 h-8 rounded-full bg-[#FBF7F0]/90 shadow" />
                  <span className="w-10 h-10 rounded-full bg-[#FBF7F0]/95 shadow" />
                  <span className="w-7 h-7 rounded-full bg-[#FBF7F0]/85 shadow" />
                  <span className="w-9 h-9 rounded-full bg-[#FBF7F0]/90 shadow" />
                </div>
                <span className="absolute -bottom-3 px-3 py-1 rounded-full bg-[#181310] text-[#F6F1E7] font-mono text-[10px] uppercase tracking-wider">
                  485°C • {selectedToppings.length} Toppings
                </span>
              </motion.div>
            </div>

            {/* Specification Breakdown */}
            <div className="space-y-2.5 text-xs border-t border-b border-[#DED4C3] py-4">
              <div className="flex justify-between">
                <span className="text-[#6E6256] font-mono uppercase">Dough:</span>
                <span className="font-bold text-[#181310]">{selectedDough.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6256] font-mono uppercase">Base:</span>
                <span className="font-bold text-[#181310]">{selectedSauce.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6E6256] font-mono uppercase">Cheese:</span>
                <span className="font-bold text-[#181310]">{selectedCheese.name}</span>
              </div>
              <div>
                <span className="text-[#6E6256] font-mono uppercase block mb-1">
                  Selected Toppings ({selectedToppings.length}):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedToppings.map((t) => (
                    <span
                      key={t.id}
                      className="px-2.5 py-1 rounded-full bg-[#EDE5D5] text-[#181310] font-semibold"
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Name your creation (optional)..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED4C3] text-xs text-[#181310] focus:outline-none"
            />

            <button
              onClick={handleAddCustomPie}
              className="w-full py-4 rounded-xl bg-[#C83E2B] hover:bg-[#AE3220] text-[#F6F1E7] font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <RiFireFill className="text-base" /> Add Custom Pizza to Order • ${totalPrice.toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
