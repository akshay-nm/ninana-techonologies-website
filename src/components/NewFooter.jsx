'use client'

export default function NewFooter() {
  return (
    <footer className="relative border-t border-slate-900/10 dark:border-white/5">
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-base font-medium text-slate-800 dark:text-slate-200">
              Ninana Technologies
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Software for industries that still run on paper.
            </p>
          </div>

          <div className="space-y-1 text-center">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-500">
              Products
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm">
              <a href="https://vivid.ninana.in" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400">
                Vivid
              </a>
              <a href="https://pragati.ninana.in/" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400">
                Pragati
              </a>
              <a href="https://wasp.ninana.in/" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400">
                Wasp
              </a>
              <a href="https://optimus.ninana.in" target="_blank" rel="noopener noreferrer" className="text-slate-500 transition hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400">
                Optimus
              </a>
            </div>
          </div>

          <div className="space-y-1 text-center lg:text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Plot No. 660/1, Sector No 30,
              <br />
              Gandhinagar 382030, Gujarat
            </p>
            <p className="pt-1 text-sm">
              <a
                href="mailto:contact@ninana.in"
                className="text-slate-500 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                contact@ninana.in
              </a>
            </p>
            <p className="pt-1 text-xs text-slate-600 dark:text-slate-500">
              CIN: U72900GJ2019PTC107365
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-900/10 pt-6 dark:border-white/5 text-center">
          <p className="text-xs text-slate-600 dark:text-slate-500">
            © 2026 Ninana Technologies Private Limited. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
