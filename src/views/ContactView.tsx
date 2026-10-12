import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactView: React.FC = () => {
  const { t, showToast } = useApp();

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    showToast(t.messageSent, 'success');
    setContactForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
          {t.contactUs}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          {t.contactSubtitle} Venha visitar-nos em Maputo ou contacte-nos através dos nossos canais rápidos.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Address */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">{t.addressTitle}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{t.addressValue}</p>
              <p className="text-[11px] text-blue-600 dark:text-blue-400 mt-1 font-medium">Bairro Sommerschield / Central</p>
            </div>
          </div>

          {/* Telephones */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">{t.phoneTitle}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1 font-mono">{t.phoneValue}</p>
              <a
                href="https://wa.me/258841234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-bold mt-2 hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                Conversar pelo WhatsApp
              </a>
            </div>
          </div>

          {/* Email */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 flex items-center justify-center shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">{t.emailTitle}</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">{t.emailValue}</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">Resposta em menos de 2 horas úteis</p>
            </div>
          </div>

          {/* Horário */}
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-start gap-3.5 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <h3 className="font-bold text-slate-900 dark:text-slate-100">Horário de Funcionamento</h3>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Segunda a Sexta: 08:00 - 18:00</p>
              <p className="text-slate-600 dark:text-slate-400">Sábado: 08:30 - 13:30 (Domingo encerrado)</p>
            </div>
          </div>
        </div>

        {/* Right Contact Form (7 cols) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              {t.sendMessage}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Envie a sua mensagem direta para a nossa receção e departamento comercial.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.messageName} *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="Seu nome"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.messageEmail}
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="exemplo@email.co.mz"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.messagePhone} *
              </label>
              <input
                type="tel"
                required
                value={contactForm.phone}
                onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                placeholder="+258 84 123 4567"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.messageContent} *
              </label>
              <textarea
                required
                rows={5}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Como podemos ajudar a sua empresa ou resolver a sua questão técnica?"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20 transition-all w-full sm:w-auto"
            >
              <Send className="w-4 h-4" />
              <span>{t.sendBtn}</span>
            </button>
          </form>
        </div>
      </div>

      {/* Interactive Maputo Stylized Map Mockup */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm bg-slate-100 dark:bg-slate-900">
        <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
              Localização NCAR Tec - Maputo, Moçambique
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Av. 24 de Julho nº 1845</span>
        </div>

        <div className="relative h-64 sm:h-80 w-full bg-slate-200 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Stylized vector map grid background */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 text-center space-y-2 p-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl border border-slate-300 dark:border-slate-700 shadow-xl max-w-sm">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30 animate-bounce">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">
              NCAR Tec Loja & Laboratório Central
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Av. 24 de Julho, nº 1845 (Próximo à Sommerschield), Maputo
            </p>
            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=Maputo,+Mozambique"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 inline-block transition-colors"
              >
                Abrir no Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
