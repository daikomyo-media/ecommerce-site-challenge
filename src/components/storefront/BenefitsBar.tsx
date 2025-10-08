export function BenefitsBar() {
  const items = [
    { title: 'Free shipping', desc: 'On orders over $50', icon: TruckIcon },
    { title: 'Easy returns', desc: '30-day hassle-free', icon: RefreshIcon },
    { title: '24/7 support', desc: 'We’re here to help', icon: HeadphonesIcon },
  ]
  return (
    <section className="py-6">
      <div className="container mx-auto">
        <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
          {items.map((it, i) => (
            <div key={i} className="flex items-center gap-3">
              <it.icon className="h-8 w-8 text-slate-700" />
              <div>
                <div className="text-sm font-semibold text-slate-900">{it.title}</div>
                <div className="text-xs text-slate-600">{it.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TruckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 7h11v10H3z" />
      <path d="M14 10h4l3 3v4h-7" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="17.5" cy="18" r="1.5" />
    </svg>
  )
}

function RefreshIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 12a9 9 0 0 1 15.5-6.364M21 12a9 9 0 0 1-15.5 6.364" />
      <path d="M17 5v4h-4M7 19v-4h4" />
    </svg>
  )
}

function HeadphonesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
      <path d="M3 12a9 9 0 0 1 18 0" />
      <path d="M5 12v6a2 2 0 0 0 2 2h2v-8H7a2 2 0 0 0-2 2zm14 0v6a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 2z" />
    </svg>
  )
}
