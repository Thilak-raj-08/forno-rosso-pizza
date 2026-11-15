import Link from 'next/link'
import { RiFireFill, RiMapPin2Line, RiTimeLine, RiPhoneLine } from 'react-icons/ri'

export default function Footer() {
  return (
    <footer className="border-t border-[#D4A359]/20 bg-[#0D0A08] text-[#C2B6A7] mt-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#C83E2B] flex items-center justify-center text-[#F6F1E7]">
                <RiFireFill className="text-lg" />
              </div>
              <span className="font-serif text-2xl font-bold text-[#F6F1E7]">
                FORNO <span className="italic font-normal text-[#D4A359]">Rosso</span>
              </span>
            </Link>
            <p className="text-sm text-[#9E9183] leading-relaxed">
              Authentic Vera Pizza Napoletana. 72-hour cold-fermented sourdough blistered at 485°C over seasoned oak and olive wood.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A359] mb-4">
              Explore La Casa
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-[#F6F1E7]">Home & Heritage</Link></li>
              <li><Link href="/menu" className="hover:text-[#F6F1E7]">La Carta (Full Menu)</Link></li>
              <li><Link href="/craft-your-own" className="hover:text-[#F6F1E7]">Il Laboratorio (Custom Pizza)</Link></li>
              <li><Link href="/story" className="hover:text-[#F6F1E7]">72-Hour Sourdough Story</Link></li>
              <li><Link href="/reservations" className="hover:text-[#F6F1E7]">Table Reservations</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A359] mb-4">
              Firing Hours
            </h3>
            <ul className="space-y-2 text-sm text-[#9E9183]">
              <li className="flex items-center gap-2">
                <RiTimeLine className="text-[#C83E2B]" /> Tue – Thu: 12:00 PM – 10:30 PM
              </li>
              <li className="flex items-center gap-2">
                <RiTimeLine className="text-[#C83E2B]" /> Fri – Sun: 12:00 PM – 11:30 PM
              </li>
              <li className="text-xs font-mono text-[#D4A359] pt-1">
                Mondays: Resting Dough (72h Fermentation)
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A359] mb-4">
              Trattoria & Oven
            </h3>
            <p className="text-sm text-[#9E9183] flex items-start gap-2 mb-2">
              <RiMapPin2Line className="text-[#C83E2B] mt-1 flex-shrink-0" />
              <span>Via dei Tribunali 48 / Hospital Road, Jaffna</span>
            </p>
            <p className="text-sm text-[#9E9183] flex items-center gap-2">
              <RiPhoneLine className="text-[#C83E2B]" /> +94 70 185 6212
            </p>
          </div>
        </div>

        <div className="border-t border-[#D4A359]/15 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A6F63]">
          <p>© {new Date().getFullYear()} Forno Rosso Pizzeria Napoletana. Handcrafted by Jeyarajan Thilakraj.</p>
          <p className="font-mono uppercase tracking-wider mt-2 sm:mt-0">
            Associazione Verace Pizza Napoletana • Tradition Since 1734
          </p>
        </div>
      </div>
    </footer>
  )
}
