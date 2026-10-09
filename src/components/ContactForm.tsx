import { useState, useRef } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FormState {
  name: string;
  email: string;
  category: string;
  message: string;
  botcheck: boolean;
}

const INITIAL_FORM: FormState = {
  name: '',
  email: '',
  category: 'Oportunidad Laboral / Propuesta',
  message: '',
  botcheck: false,
};

const CATEGORIES = [
  'Oportunidad Laboral / Propuesta',
  'Proyecto de Machine Learning / Datos',
  'Desarrollo Frontend / Sistemas',
  'Consulta General / Networking',
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const formLoadTime = useRef<number>(Date.now());

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-Spam Layer 1: Honeypot check
    if (formData.botcheck) {
      // Silently pretend to submit to fool naive scraper bots
      setStatus('success');
      return;
    }

    // Anti-Spam Layer 2: Time-to-submit heuristic (less than 2s is virtually always a bot)
    const elapsedSeconds = (Date.now() - formLoadTime.current) / 1000;
    if (elapsedSeconds < 2) {
      setStatus('error');
      setErrorMessage('Envío bloqueado por protección anti-spam. Por favor, tómate un momento para redactar el mensaje.');
      return;
    }

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setStatus('error');
      setErrorMessage('Clave de formulario no configurada en las variables de entorno.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload = {
        access_key: accessKey,
        name: formData.name,
        email: formData.email,
        subject: `[Portfolio] ${formData.category} - de ${formData.name}`,
        category: formData.category,
        message: formData.message,
        botcheck: formData.botcheck ? 'true' : '',
        from_name: 'Portfolio Mario Luna López',
      };

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData(INITIAL_FORM);

        // Elegant celebratory confetti
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 },
          colors: ['#f97316', '#38bdf8', '#10b981', '#ffffff'],
          disableForReducedMotion: true,
        });
      } else {
        throw new Error(data.message || 'Error al enviar el formulario');
      }
    } catch (err: unknown) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Hubo un error de conexión al enviar el mensaje. Puedes usar el botón de copiar email directo.'
      );
    }
  };

  // Success view
  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-800/60 bg-emerald-950/20 p-8 sm:p-10 text-center space-y-5 animate-in fade-in duration-300">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-normal text-zinc-100 font-display uppercase tracking-tight">
            ¡Mensaje Recibido!
          </h3>
          <p className="text-sm text-zinc-400 font-body max-w-sm mx-auto leading-relaxed">
            Tu mensaje ha llegado a mi bandeja de entrada de forma segura. Te responderé lo antes posible (habitualmente en menos de 24h).
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={() => {
              setStatus('idle');
              formLoadTime.current = Date.now();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-zinc-100 text-xs font-mono transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Enviar otro mensaje</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot field (hidden from legitimate humans, triggers bot rejection) */}
      <input
        type="checkbox"
        name="botcheck"
        checked={formData.botcheck}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        style={{ display: 'none' }}
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name input */}
        <div className="space-y-1.5">
          <label htmlFor="form-name" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            Nombre / Remitente <span className="text-orange-400">*</span>
          </label>
          <input
            id="form-name"
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej. Ana García"
            className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-body transition-all"
          />
        </div>

        {/* Email input */}
        <div className="space-y-1.5">
          <label htmlFor="form-email" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
            Correo electrónico <span className="text-orange-400">*</span>
          </label>
          <input
            id="form-email"
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="tu.email@empresa.com"
            className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-body transition-all"
          />
        </div>
      </div>

      {/* Category selector */}
      <div className="space-y-1.5">
        <label htmlFor="form-category" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
          Motivo de contacto
        </label>
        <div className="relative">
          <select
            id="form-category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-zinc-200 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-body transition-all cursor-pointer appearance-none"
          >
            {CATEGORIES.map((cat, idx) => (
              <option key={idx} value={cat} className="bg-zinc-900 text-zinc-200">
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs font-mono">
            ▼
          </div>
        </div>
      </div>

      {/* Message textarea */}
      <div className="space-y-1.5">
        <label htmlFor="form-message" className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
          Mensaje <span className="text-orange-400">*</span>
        </label>
        <textarea
          id="form-message"
          name="message"
          required
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Cuéntame sobre la posición, proyecto o idea que tienes en mente..."
          className="w-full rounded-xl bg-zinc-950/80 border border-zinc-800 px-4 py-3 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-sm font-body transition-all resize-y min-h-[100px]"
        />
      </div>

      {/* Error alert if any */}
      {status === 'error' && (
        <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs font-mono flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Submit button & security badges */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 disabled:bg-orange-500/50 text-zinc-950 font-semibold text-sm transition-all duration-200 shadow-lg active:scale-98 flex items-center justify-center gap-2 cursor-pointer font-body"
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Enviando mensaje...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4 stroke-[2.5]" />
              <span>Enviar Mensaje</span>
            </>
          )}
        </button>


      </div>
    </form>
  );
}
