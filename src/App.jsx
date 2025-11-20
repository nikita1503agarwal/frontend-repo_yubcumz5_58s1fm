import { useState } from 'react'

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Zúrich',
    service_type: 'Limpieza de hogar',
    date: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)

  const services = [
    {
      title: 'Limpieza de hogar',
      desc: 'Mantenimiento semanal, quincenal o mensual con estándares suizos.'
    },
    {
      title: 'Limpieza de mudanza',
      desc: 'Entrega impecable con garantía para inspección (Wohnungsabgabe).'
    },
    {
      title: 'Limpieza de oficina',
      desc: 'Espacios de trabajo limpios y saludables para tu equipo.'
    },
    {
      title: 'Limpieza profunda',
      desc: 'Desinfección y limpieza a fondo de cocinas y baños.'
    },
    {
      title: 'Fin de obra',
      desc: 'Eliminación de polvo y residuos tras reformas o construcción.'
    },
    {
      title: 'Servicios extra',
      desc: 'Lavado de ventanas, planchado y más, a pedido.'
    },
  ]

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setResult(null)
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Error enviando el formulario')
      }
      const data = await res.json()
      setResult({ ok: true, message: data.message || 'Solicitud enviada' })
      setForm({
        name: '', email: '', phone: '', address: '', city: 'Zúrich',
        service_type: 'Limpieza de hogar', date: '', message: ''
      })
    } catch (err) {
      setResult({ ok: false, message: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/flame-icon.svg" alt="Logo" className="w-8 h-8" />
            <span className="font-semibold text-slate-900">Limpieza Zúrich</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#servicios" className="hover:text-sky-700">Servicios</a>
            <a href="#por-que" className="hover:text-sky-700">Por qué nosotros</a>
            <a href="#contacto" className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition">Solicitar presupuesto</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(14,165,233,0.15),transparent_40%),radial-gradient(circle_at_20%_80%,rgba(2,132,199,0.12),transparent_40%)]" />
        <div className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
              Empresa de limpieza de confianza en Zúrich
            </h1>
            <p className="text-lg text-slate-600 mb-6">
              Limpieza profesional para hogares y oficinas. Equipo confiable, puntuales y con estándares suizos. Presupuesto gratuito en menos de 5 minutos.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#contacto" className="inline-flex justify-center items-center px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition shadow">Solicitar presupuesto</a>
              <a href="#servicios" className="inline-flex justify-center items-center px-6 py-3 border border-slate-300 rounded-lg hover:border-slate-400">Ver servicios</a>
            </div>
            <div className="mt-6 text-sm text-slate-500">
              ✓ Garantía de satisfacción • ✓ Materiales incluidos • ✓ Factura oficial
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-white shadow-lg border border-slate-200 overflow-hidden p-6">
              <div className="grid grid-cols-3 gap-4 h-full">
                <div className="rounded-xl bg-sky-50 border border-sky-100" />
                <div className="rounded-xl bg-sky-100 border border-sky-200" />
                <div className="rounded-xl bg-sky-50 border border-sky-100" />
                <div className="col-span-3 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-500 h-24" />
                <div className="col-span-3 text-slate-600 text-sm">
                  Imagina aquí tus espacios brillando. Nosotros nos encargamos del resto.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Servicios</h2>
        <p className="text-slate-600 mb-8">Flexibles y adaptados a tus necesidades</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
              <div className="text-sky-600 font-semibold mb-2">{s.title}</div>
              <p className="text-slate-600 text-sm">{s.desc}</p>
              <div className="mt-4 text-sm text-sky-700 opacity-0 group-hover:opacity-100 transition">Desde CHF 39/h</div>
            </div>
          ))}
        </div>
      </section>

      {/* Por qué nosotros */}
      <section id="por-que" className="bg-white/80 border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">¿Por qué elegirnos?</h3>
            <p className="text-slate-600">Somos un equipo local en Zúrich, asegurado y con referencias verificadas. Hablamos español, alemán e inglés.</p>
          </div>
          <ul className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            <li className="flex gap-3">
              <span className="text-sky-600">✓</span>
              <span>Garantía de calidad y puntualidad</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600">✓</span>
              <span>Productos ecológicos y seguros</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600">✓</span>
              <span>Precios transparentes y factura oficial</span>
            </li>
            <li className="flex gap-3">
              <span className="text-sky-600">✓</span>
              <span>Equipo confiable con verificación</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Contacto / Presupuesto */}
      <section id="contacto" className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">Solicita tu presupuesto</h3>
            <p className="text-slate-600 mb-6">Cuéntanos qué necesitas y te contactaremos hoy mismo.</p>
            <ul className="space-y-3 text-slate-700">
              <li>• Tiempo de respuesta: 1-2 horas</li>
              <li>• Cobertura: Ciudad de Zúrich y alrededores</li>
              <li>• Horario: Lun–Sáb, 8:00–19:00</li>
            </ul>
          </div>

          <form onSubmit={submit} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nombre</label>
                <input name="name" value={form.name} onChange={onChange} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Correo</label>
                <input type="email" name="email" value={form.email} onChange={onChange} required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Teléfono</label>
                <input name="phone" value={form.phone} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Dirección (opcional)</label>
                <input name="address" value={form.address} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Ciudad</label>
                <input name="city" value={form.city} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Tipo de servicio</label>
                <select name="service_type" value={form.service_type} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500">
                  <option>Limpieza de hogar</option>
                  <option>Limpieza de fin de obra</option>
                  <option>Limpieza de mudanza</option>
                  <option>Limpieza de oficina</option>
                  <option>Limpieza profunda</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Fecha preferida</label>
                <input type="date" name="date" value={form.date} onChange={onChange} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Mensaje</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={4} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Detalles, metros cuadrados, frecuencia, etc." />
              </div>
            </div>

            {result && (
              <div className={`mt-4 text-sm rounded-lg p-3 ${result.ok ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {result.message}
              </div>
            )}

            <button type="submit" disabled={submitting} className="mt-4 w-full bg-sky-600 hover:bg-sky-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition">
              {submitting ? 'Enviando…' : 'Enviar solicitud'}
            </button>

            <p className="mt-3 text-xs text-slate-500">Al enviar, aceptas ser contactado por nuestro equipo. Protegemos tus datos y no los compartimos.</p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-6xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/flame-icon.svg" alt="Logo" className="w-6 h-6" />
              <span className="font-semibold text-white">Limpieza Zúrich</span>
            </div>
            <p className="text-sm text-slate-400">Hacemos que tu hogar u oficina brillen. Servicio profesional en toda el área de Zúrich.</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Contacto</div>
            <p className="text-sm text-slate-400">Email: contacto@limpiezazurich.ch</p>
            <p className="text-sm text-slate-400">Tel: +41 76 000 00 00</p>
          </div>
          <div>
            <div className="font-semibold text-white mb-2">Horario</div>
            <p className="text-sm text-slate-400">Lun–Sáb: 8:00–19:00</p>
            <p className="text-sm text-slate-400">Domingo: Cerrado</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Limpieza Zúrich. Todos los derechos reservados.</div>
      </footer>
    </div>
  )
}

export default App
