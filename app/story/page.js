'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { RiFireFill, RiTimeLine, RiLeafLine, RiAwardLine } from 'react-icons/ri'

const fermentationSteps = [
  {
    hour: 'Hour 00',
    title: 'Rinfresco del Lievito Madre & Impasto',
    description:
      'We blend finely milled Mulino Caputo Tipo 00 flour from Naples with 68% cold spring water and our 18-year-old natural sourdough starter.',
  },
  {
    hour: 'Hour 24',
    title: 'Bulk Cold Maturation at 4°C',
    description:
      'Enzymes slowly break down complex starches into simple sugars while lactic acid bacteria develop subtle, nutty aromatics.',
  },
  {
    hour: 'Hour 48',
    title: 'Staglio a Mano (Hand-Balling into Panetti)',
    description:
      'Our pizzaioli gently divide and hand-shape individual 260g dough balls (panetti), resting them in beechwood proofing boxes.',
  },
  {
    hour: 'Hour 72',
    title: '90-Second Firing at 485°C over Oak Embers',
    description:
      'Stretched strictly by hand—never with a rolling pin—preserving the delicate air pockets that blister into our signature leopard-spotted cornicione.',
  },
]

export default function StoryPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 space-y-20">
      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C83E2B] mb-3">
          La Nostra Filosofia • Napoli Tradition
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#F6F1E7] leading-tight mb-6">
          Flour, Water, Sea Salt, Time & <span className="italic font-normal text-[#D4A359]">Living Fire</span>.
        </h1>
        <p className="text-base sm:text-lg text-[#C2B6A7] leading-relaxed">
          At Forno Rosso, we honor the centuries-old discipline of the Neapolitan pizzaiolo. No shortcuts, no commercial dough conditioners, and no electric conveyors—only patience and oak flame.
        </p>
      </div>

      {/* Hero Split with Brick Oven Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 rounded-3xl overflow-hidden border-2 border-[#D4A359]/30 shadow-2xl">
          <img
            src="/images/oven-interior.jpg"
            alt="Forno Rosso Copper Wood-Fired Oven"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D4A359]">
            Hand-Built in Naples, Shipped by Sea
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F1E7]">
            Our 5,000-Pound Stefano Ferrara Brick Oven
          </h2>
          <p className="text-sm sm:text-base text-[#C2B6A7] leading-relaxed">
            Built from volcanic tuff stone and lined with handmade *Biscotto di Sorrento* clay floor tiles, our copper-clad dome retains intense radiant heat without burning the base of the dough.
          </p>
          <p className="text-sm sm:text-base text-[#C2B6A7] leading-relaxed">
            Fed exclusively with kiln-dried oak and olive wood, the dome reaches 485°C (905°F), caramelizing San Marzano tomatoes and melting Fior di Latte mozzarella in just 90 seconds.
          </p>
        </div>
      </div>

      {/* 72-Hour Fermentation Timeline */}
      <div className="card-editorial rounded-3xl p-8 sm:p-12">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C83E2B]">
            Il Metodo delle 72 Ore
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F6F1E7] mt-1">
            The 72-Hour Cold Fermentation Timeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fermentationSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="p-6 rounded-2xl bg-[#120E0C] border border-[#D4A359]/25 space-y-3"
            >
              <span className="inline-block px-3 py-1 rounded-full bg-[#C83E2B]/20 text-[#D4A359] font-mono text-xs font-bold">
                {step.hour}
              </span>
              <h3 className="font-serif text-xl font-bold text-[#F6F1E7]">
                {step.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#A89A8E] leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
