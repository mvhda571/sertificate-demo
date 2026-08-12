import { useMemo, useState } from 'react'
import { Download, FileText, Lock, Paperclip, PlayCircle } from 'lucide-react'

const activeSubjects = [
  { id: 'ona', title: 'Ona tili va adabiyot', progress: 75, key: 'ona' },
  { id: 'matematika', title: 'Matematika', progress: 60, key: 'matematika' },
  { id: 'tarix', title: "O'zbekiston tarixi", progress: 40, key: 'tarix' },
]

const upcomingSubjects = [
  'Fizika',
  'Kimyo',
  'Biologiya',
  'Ingliz tili',
]

const pdfMaterials = {
  ona: [
    { title: 'Nafis adabiyot PDF', url: '#' },
    { title: 'Ona tili grammar kitobi', url: '#' },
  ],
  matematika: [
    { title: 'Matematika darsligi', url: '#' },
    { title: 'Amaliy muammolar PDF', url: '#' },
  ],
  tarix: [
    { title: 'O‘zbekiston tarixi darsligi', url: '#' },
    { title: 'Fikrlar va sinovlar', url: '#' },
  ],
}

export function SubjectsPage() {
  const [selected, setSelected] = useState(activeSubjects[0])
  const [showModal, setShowModal] = useState(false)

  const activeSubject = useMemo(() => selected, [selected])

  return (
    <div className="space-y-8">
      <section className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="text-xs uppercase tracking-[0.35em] text-emerald-600">Fanlar bo'limi</span>
            <h1 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white">Maktab darsliklari bilan o'qish</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
              Har bir mavzu uchun maqsadli testlar, progress va qo'llanmalar.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            <Paperclip className="h-4 w-4" /> Materiallarni ko'rish
          </button>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-5 md:grid-cols-3">
            {activeSubjects.map((subject) => (
              <button
                key={subject.id}
                type="button"
                onClick={() => {
                  setSelected(subject)
                  setShowModal(true)
                }}
                className="group rounded-[28px] border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-emerald-500"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-emerald-600">To'liq Kirish</p>
                    <h2 className="mt-3 text-lg font-semibold text-slate-950 dark:text-white">{subject.title}</h2>
                  </div>
                  <PlayCircle className="h-8 w-8 text-emerald-600" />
                </div>
                <div className="mt-5 rounded-full bg-slate-200 h-3 overflow-hidden dark:bg-slate-800">
                  <div className="h-full rounded-full bg-emerald-500 transition" style={{ width: `${subject.progress}%` }} />
                </div>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Progress: {subject.progress}%</p>
              </button>
            ))}
          </div>

          <div className="rounded-[32px] border border-white/10 bg-white/80 p-6 shadow-glow backdrop-blur-2xl dark:bg-slate-950/80 dark:border-white/10">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Yaqin orada qo'shiladi</h3>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {upcomingSubjects.map((subject) => (
                <div key={subject} className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100/80 p-5 text-slate-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-400">
                  <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-md" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{subject}</p>
                      <p className="mt-2 text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Tez orada qo'shiladi</p>
                    </div>
                    <Lock className="h-5 w-5 text-slate-500 dark:text-slate-300" />
                  </div>
                  <span className="relative mt-5 inline-flex rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                    Koming Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[32px] border border-white/10 bg-slate-50/90 p-6 shadow-glow backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/80">
          <div className="rounded-[28px] bg-slate-900/95 p-6 text-white shadow-lg dark:bg-slate-950/90">
            <h3 className="text-lg font-semibold">Faol mavzu</h3>
            <p className="mt-3 text-sm text-slate-300">{activeSubject.title} uchun erta fan va amaliy materiallar.</p>
            <div className="mt-5 rounded-3xl bg-slate-800 p-4 text-sm">
              <p className="text-slate-300">Mathodika va testlar bilan sinovdan o'ting.</p>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
            <h4 className="font-semibold text-slate-900 dark:text-white">Tayyorlanadigan materiallar</h4>
            <div className="mt-4 space-y-4 text-sm text-slate-600 dark:text-slate-300">
              {pdfMaterials[activeSubject.key].map((pdf) => (
                <a key={pdf.title} href={pdf.url} className="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 transition hover:border-emerald-300 dark:border-slate-800 dark:bg-slate-900">
                  <span>{pdf.title}</span>
                  <Paperclip className="h-4 w-4 text-emerald-600" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-6 shadow-2xl dark:bg-slate-950">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">{activeSubject.title}</p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">PDF Textbooks & Practice</h2>
              </div>
              <button type="button" onClick={() => setShowModal(false)} className="rounded-full bg-slate-200 p-2 text-slate-700 transition hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-100">
                ✕
              </button>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="space-y-4 rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Maktab darsliklari</p>
                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                  {pdfMaterials[activeSubject.key].map((pdf) => (
                    <li key={pdf.title}>
                      <a href={pdf.url} className="font-medium text-emerald-600 hover:underline">
                        {pdf.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Amaliy test</p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Mavzu bo'yicha tayyorlanish va natijani baholash uchun "Practice Test" tugmasini bosing.</p>
                <button type="button" onClick={() => setShowModal(false)} className="mt-5 inline-flex items-center gap-2 rounded-3xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                  <PlayCircle className="h-4 w-4" /> Practice Test
                </button>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-[28px] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3 dark:border-slate-800 dark:bg-slate-950"><div className="flex items-center gap-2 text-sm font-semibold"><FileText className="h-4 w-4 text-red-500"/>{pdfMaterials[activeSubject.key][0].title}</div><button onClick={() => window.print()} className="btn-primary"><Download/> Yuklab olish</button></div>
              <div className="grid min-h-56 place-items-center p-6"><div className="w-full max-w-sm rounded-sm bg-white p-7 text-slate-800 shadow-xl"><p className="text-center text-xs font-bold uppercase tracking-[.25em] text-emerald-600">Certificate Academy</p><h3 className="mt-5 text-center text-2xl font-bold">{activeSubject.title}</h3><div className="mt-7 space-y-3">{[82,65,90,72,86].map((width, i) => <div key={i} className="h-2 rounded bg-slate-200" style={{width: `${width}%`}}/>)}</div><p className="mt-8 text-center text-xs text-slate-400">1 / 124 sahifa</p></div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
