'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from './CartContext'
import {
  RiCloseLine,
  RiDeleteBin6Line,
  RiFireFill,
  RiCheckboxCircleFill,
  RiTruckLine,
  RiStore2Line,
} from 'react-icons/ri'

export default function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    setIsDrawerOpen,
    updateQty,
    totals,
    orderStage,
    startLiveBake,
    resetOrderStage,
  } = useCart()

  const [mode, setMode] = useState('delivery') // 'delivery' | 'pickup'
  const [promo, setPromo] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [address, setAddress] = useState('')

  const discount = discountApplied ? totals.subtotal * 0.15 : 0
  const deliveryFee = mode === 'delivery' && totals.subtotal > 0 && totals.subtotal < 35 ? 4 : 0
  const finalTotal = Math.max(0, totals.subtotal - discount + deliveryFee)

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promo.trim().toUpperCase() === 'NAPOLI15') {
      setDiscountApplied(true)
    }
  }

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="relative w-full max-w-md bg-[#F6F1E7] text-[#181310] h-full flex flex-col justify-between z-10 shadow-2xl border-l-4 border-[#C83E2B]"
          >
            {/* Top Ticket Header */}
            <div className="p-6 border-b border-[#DED4C3] bg-[#EDE5D5] flex items-center justify-between">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-[#C83E2B] font-bold">
                  COMANDA CUCINA • TICKET #FR-408
                </p>
                <h2 className="font-serif text-2xl font-bold text-[#181310]">
                  Your Wood-Fired Order
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-[#181310] text-[#F6F1E7] flex items-center justify-center hover:bg-[#C83E2B] transition-colors"
              >
                <RiCloseLine className="text-lg" />
              </button>
            </div>

            {/* Body: either Live Oven Tracker OR Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {orderStage ? (
                <div className="p-6 rounded-2xl bg-[#181310] text-[#F6F1E7] space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#C83E2B] flex items-center justify-center text-white animate-pulse">
                      <RiFireFill className="text-2xl" />
                    </div>
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-[#D4A359]">
                        Live Stefano Ferrara Brick Oven
                      </p>
                      <h3 className="font-serif text-xl font-bold">
                        Order Sent to Pizzaiolo!
                      </h3>
                    </div>
                  </div>

                  <div className="space-y-4 font-mono text-xs">
                    {[
                      {
                        key: 'stretching',
                        label: '1. Hand-stretching 72h fermented Caputo 00 dough',
                      },
                      {
                        key: 'firing',
                        label: '2. Blistering in oak-fired brick oven at 485°C (90s)',
                      },
                      {
                        key: 'garnishing',
                        label: '3. Finishing with fresh organic basil & DOP olive oil',
                      },
                      {
                        key: 'dispatched',
                        label:
                          mode === 'delivery'
                            ? '4. Packed in perforated thermal box — Out for Delivery!'
                            : '4. Ready at the Marble Counter for Pickup!',
                      },
                    ].map((step, idx) => {
                      const stages = ['stretching', 'firing', 'garnishing', 'dispatched']
                      const currentIdx = stages.indexOf(orderStage)
                      const done = idx <= currentIdx
                      return (
                        <div
                          key={step.key}
                          className={`p-3 rounded-xl border flex items-center gap-3 ${
                            done
                              ? 'border-[#D4A359] bg-[#D4A359]/15 text-[#F6F1E7]'
                              : 'border-white/10 text-gray-500'
                          }`}
                        >
                          <RiCheckboxCircleFill
                            className={done ? 'text-[#D4A359] text-lg' : 'text-gray-600 text-lg'}
                          />
                          <span>{step.label}</span>
                        </div>
                      )
                    })}
                  </div>

                  {orderStage === 'dispatched' && (
                    <button
                      onClick={resetOrderStage}
                      className="w-full py-3 rounded-xl bg-[#C83E2B] text-white font-bold text-xs uppercase tracking-wider"
                    >
                      Start New Order
                    </button>
                  )}
                </div>
              ) : items.length === 0 ? (
                <div className="text-center py-16">
                  <p className="font-serif text-xl text-[#5C5248] mb-2">
                    Your kitchen ticket is empty.
                  </p>
                  <p className="text-xs text-[#7A6F63]">
                    Add a wood-fired Neapolitan pizza or craft your own custom pie.
                  </p>
                </div>
              ) : (
                <>
                  {/* Delivery vs Pickup Switch */}
                  <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-[#EDE5D5] border border-[#DED4C3]">
                    <button
                      type="button"
                      onClick={() => setMode('delivery')}
                      className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                        mode === 'delivery'
                          ? 'bg-[#C83E2B] text-white shadow'
                          : 'text-[#5C5248]'
                      }`}
                    >
                      <RiTruckLine /> Hot Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode('pickup')}
                      className={`py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
                        mode === 'pickup'
                          ? 'bg-[#C83E2B] text-white shadow'
                          : 'text-[#5C5248]'
                      }`}
                    >
                      <RiStore2Line /> Oven Pickup
                    </button>
                  </div>

                  {/* Line Items */}
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white border border-[#DED4C3] flex items-center justify-between gap-3 shadow-sm"
                      >
                        <div className="min-w-0 flex-1">
                          <h4 className="font-serif font-bold text-base text-[#181310] truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-[#6E6256] truncate">
                            {item.subtitle || '12" Wood-Fired Napoletana'}
                          </p>
                          <p className="text-xs font-mono font-bold text-[#C83E2B] mt-1">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-7 h-7 rounded-full bg-[#EDE5D5] hover:bg-[#DED4C3] font-bold text-sm"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold w-5 text-center">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-full bg-[#181310] text-white font-bold text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={promo}
                      onChange={(e) => setPromo(e.target.value)}
                      placeholder="Promo code (try NAPOLI15)"
                      className="flex-1 px-3 py-2 rounded-xl bg-white border border-[#DED4C3] text-xs font-mono uppercase focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-[#181310] text-[#F6F1E7] text-xs font-mono uppercase font-bold"
                    >
                      Apply
                    </button>
                  </form>

                  {mode === 'delivery' && (
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Delivery street address & apartment..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DED4C3] text-xs focus:outline-none"
                    />
                  )}
                </>
              )}
            </div>

            {/* Footer Totals & Checkout */}
            {!orderStage && items.length > 0 && (
              <div className="p-6 border-t border-[#DED4C3] bg-[#EDE5D5] space-y-3">
                <div className="space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-[#5C5248]">
                    <span>Subtotal</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  {discountApplied && (
                    <div className="flex justify-between text-[#4A6B53] font-bold">
                      <span>Promo (NAPOLI15 - 15% Off)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-[#5C5248]">
                    <span>{mode === 'delivery' ? 'Thermal Delivery' : 'Oven Pickup'}</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#181310] pt-2 border-t border-[#DED4C3]">
                    <span>Total Due</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  onClick={startLiveBake}
                  className="w-full py-4 rounded-xl bg-[#C83E2B] hover:bg-[#AE3220] text-[#F6F1E7] font-bold text-xs uppercase tracking-widest shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <RiFireFill className="text-base" /> Send Ticket to Wood Oven • ${finalTotal.toFixed(2)}
                </button>
              </div>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}
