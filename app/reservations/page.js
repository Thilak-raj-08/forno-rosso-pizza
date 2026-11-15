'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  RiCalendarLine,
  RiTimeLine,
  RiUser3Line,
  RiCheckboxCircleFill,
  RiFireFill,
} from 'react-icons/ri'

const diningZones = [
  {
    id: 'oven-hall',
    name: 'Main Brick-Oven Hall',
    vibe: 'Warm candlelit tables overlooking the glowing copper pizza oven',
    seats: '2–8 Guests',
  },
  {
    id: 'chef-counter',
    name: 'Pizzaiolo Marble Counter',
    vibe: 'Front-row bar seating right beside the dough-stretching marble slab',
    seats: '1–4 Guests',
  },
  {
    id: 'olive-courtyard',
    name: 'Olive Tree Courtyard Terrace',
    vibe: 'Open-air string-lit garden beneath century-old Mediterranean olive trees',
    seats: '2–10 Guests',
  },
]

export default function ReservationsPage() {
  const [zone, setZone] = useState(diningZones[0])
  const [guests, setGuests] = useState('2 Guests')
  const [date, setDate] = useState('2026-11-20')
  const [time, setTime] = useState('7:30 PM')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) return
    setConfirmed(true)
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs font-mono uppercase tracking-[0.25em] text-[#C83E2B] mb-2">
          Prenota un Tavolo
        </p>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-[#F6F1E7] mb-4">
          Reserve Your <span className="italic font-normal text-[#D4A359]">Table</span>
        </h1>
        <p className="text-sm sm:text-base text-[#C2B6A7]">
          Join us by the warmth of the brick oven or under the olive trees. Select your preferred dining room zone below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Interactive Dining Room Zone Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#F6F1E7] mb-3">
            1. Choose Your Dining Atmosphere
          </h2>
          {diningZones.map((z) => {
            const active = zone.id === z.id
            return (
              <button
                key={z.id}
                type="button"
                onClick={() => setZone(z)}
                className={`w-full p-5 rounded-2xl border text-left transition-all ${
                  active
                    ? 'border-[#C83E2B] bg-[#C83E2B]/15'
                    : 'card-editorial hover:border-[#D4A359]/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl font-bold text-[#F6F1E7]">
                    {z.name}
                  </h3>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#120E0C] text-[#D4A359]">
                    {z.seats}
                  </span>
                </div>
                <p className="text-xs text-[#A89A8E] leading-relaxed">{z.vibe}</p>
              </button>
            )
          })}
        </div>

        {/* Right: Reservation Form / Confirmed Ticket (7 cols) */}
        <div className="lg:col-span-7">
          {confirmed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="card-parchment rounded-3xl p-8 sm:p-10 space-y-6"
            >
              <div className="flex items-center gap-3 text-[#4A6B53]">
                <RiCheckboxCircleFill className="text-3xl" />
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest font-bold">
                    RESERVATION CONFIRMED • #FR-882
                  </p>
                  <h2 className="font-serif text-3xl font-bold text-[#181310]">
                    Ci Vediamo Presto, {name}!
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#DED4C3] font-mono text-xs">
                <div>
                  <span className="text-[#6E6256] block">DATE</span>
                  <strong className="text-[#181310]">{date}</strong>
                </div>
                <div>
                  <span className="text-[#6E6256] block">TIME</span>
                  <strong className="text-[#181310]">{time}</strong>
                </div>
                <div>
                  <span className="text-[#6E6256] block">PARTY</span>
                  <strong className="text-[#181310]">{guests}</strong>
                </div>
                <div>
                  <span className="text-[#6E6256] block">SEATING ZONE</span>
                  <strong className="text-[#C83E2B]">{zone.name}</strong>
                </div>
              </div>

              <button
                onClick={() => setConfirmed(false)}
                className="px-6 py-3 rounded-xl bg-[#181310] text-[#F6F1E7] text-xs font-bold uppercase tracking-wider"
              >
                Modify Reservation
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="card-editorial rounded-3xl p-6 sm:p-8 space-y-5"
            >
              <h2 className="font-serif text-2xl font-bold text-[#F6F1E7]">
                2. Complete Your Table Booking ({zone.name})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#D4A359] mb-1.5">
                    Party Size
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#120E0C] border border-[#D4A359]/30 text-sm text-[#F6F1E7]"
                  >
                    <option>2 Guests</option>
                    <option>4 Guests</option>
                    <option>6 Guests</option>
                    <option>8 Guests</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#D4A359] mb-1.5">
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#120E0C] border border-[#D4A359]/30 text-sm text-[#F6F1E7]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#D4A359] mb-1.5">
                    Evening Seating
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-[#120E0C] border border-[#D4A359]/30 text-sm text-[#F6F1E7]"
                  >
                    <option>6:00 PM</option>
                    <option>7:30 PM</option>
                    <option>8:30 PM</option>
                    <option>9:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#D4A359] mb-1.5">
                    Guest Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Marco Rossi"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#120E0C] border border-[#D4A359]/30 text-sm text-[#F6F1E7] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-[#D4A359] mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 70 185 6212"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#120E0C] border border-[#D4A359]/30 text-sm text-[#F6F1E7] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#D4A359] mb-1.5">
                  Dietary Notes or Celebration
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anniversary table / Gluten-free dough request..."
                  className="w-full px-3.5 py-3 rounded-xl bg-[#120E0C] border border-[#D4A359]/30 text-sm text-[#F6F1E7] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-[#C83E2B] hover:bg-[#AE3220] text-[#F6F1E7] font-bold text-xs uppercase tracking-widest shadow-xl transition-all"
              >
                Confirm Table in {zone.name}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
