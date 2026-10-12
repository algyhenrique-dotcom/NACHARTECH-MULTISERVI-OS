import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Wrench, 
  PhoneCall, 
  Send,
  MessageCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServiceDetailView: React.FC = () => {
  const { selectedServiceId, services, navigate, submitQuote, formatMZN, showToast } = useApp();

  const service = services.find(s => s.id === selectedServiceId) || services[0];

  const [clientName, setClientName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');

  const handleQuickQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !phone) return;

    submitQuote({
      serviceId: service.id,
      serviceName: service.title,
      clientName,
      email: '',
      phone,
      location: 'Maputo',
      urgency: 'normal',
      description: description || `Interesse no serviço: ${service.title}`
    });

    setClientName('');
    setPhone('');
    setDescription('');
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(
      `Olá NCAR Tec! Gostaria de obter assistência para o serviço: ${service.title}.`
    );
    window.open(`https://wa.me/258841234567?text=${text}`, '_blank');
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <div>
        <button
          onClick={() => navigate('services')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar a Todos os Serviços</span>
        </button>
      </div>

      {/* Hero Service Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold">
            <Wrench className="w-3.5 h-3.5" />
            <span>Assistência Laboratorial Certificada</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            {service.title}
          </h1>

          {/* Service Photo Showcase */}
          <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md group">
            <img 
              src={service.image || '/src/assets/images/service_hardware_repair_1791729009749.jpg'}
              alt={service.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
              <span className="px-3 py-1 rounded-lg bg-blue-600/90 text-xs font-bold backdrop-blur">
                NCAR Tec • Laboratório Técnico
              </span>
              <span className="px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-mono font-semibold text-orange-400 backdrop-blur">
                Garantia Oficial {service.warranty}
              </span>
            </div>
          </div>

          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Key Deliverables Checkbox list */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              O que está incluído no serviço:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Workflow Steps */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Como funciona o nosso processo:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono">1</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Diagnóstico Gratuito</h4>
                <p className="text-[11px] text-slate-500">Avaliação do equipamento em bancada com relatório técnico claro.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono">2</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Aprovação de Orçamento</h4>
                <p className="text-[11px] text-slate-500">Sem surpresas: apenas avançamos após a confirmação prévia do valor.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono">3</span>
                <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">Entrega com Garantia</h4>
                <p className="text-[11px] text-slate-500">Testes de controlo de qualidade e termo de garantia formal.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sticky Request Box (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Diagnóstico & Orçamento</span>
              <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-display mt-0.5">
                Sob Avaliação dos Administradores
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                O orçamento oficial é calculado e emitido pelos administradores e técnicos autorizados após diagnóstico em bancada.
              </p>
            </div>

            <div className="space-y-2 text-xs border-y border-slate-100 dark:border-slate-800 py-3 text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-blue-500" /> Prazo de execução:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{service.turnaroundTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Garantia técnica:</span>
                <span className="font-semibold text-emerald-600">{service.warranty}</span>
              </div>
            </div>

            {/* Quick Request Form */}
            <form onSubmit={handleQuickQuote} className="space-y-3 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-slate-100">Pedir Orçamento Rápido</h4>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="O seu nome *"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefone (+258...) *"
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none font-mono"
              />
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva resumidamente o que necessita..."
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Send className="w-4 h-4" />
                <span>Solicitar Orçamento</span>
              </button>
            </form>

            <button
              onClick={handleWhatsAppContact}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Falar pelo WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
