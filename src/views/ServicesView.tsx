import React, { useState } from 'react';
import { 
  Cpu, 
  Smartphone, 
  Tv, 
  Wifi, 
  ShieldCheck, 
  Code, 
  Laptop,
  Wrench, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Send,
  AlertCircle,
  MessageCircle,
  Check,
  ChevronRight,
  Shield,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ServicesView: React.FC = () => {
  const { services, navigate, submitQuote, formatMZN, t, showToast } = useApp();

  // Selected Service for the Master-Detail panel (Left: Vertical List, Right: Details + Photo)
  const [selectedServiceId, setSelectedServiceId] = useState<string>(services[0]?.id || 'serv-computadores');

  const selectedService = services.find(s => s.id === selectedServiceId) || services[0];

  const [quoteForm, setQuoteForm] = useState({
    serviceId: services[0]?.id || '',
    serviceName: services[0]?.title || '',
    clientName: '',
    email: '',
    phone: '',
    location: 'Maputo',
    urgency: 'normal' as 'baixa' | 'normal' | 'alta' | 'urgente',
    description: ''
  });

  const getServiceIcon = (iconName: string, className = "w-5 h-5") => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className={className} />;
      case 'Tv': return <Tv className={className} />;
      case 'Wifi': return <Wifi className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Code': return <Code className={className} />;
      case 'Laptop': return <Laptop className={className} />;
      default: return <Cpu className={className} />;
    }
  };

  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const serv = services.find(s => s.id === serviceId);
    if (serv) {
      setQuoteForm(prev => ({
        ...prev,
        serviceId: serv.id,
        serviceName: serv.title
      }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.clientName || !quoteForm.phone || !quoteForm.description) {
      showToast('Por favor preencha todos os campos obrigatórios.', 'warning');
      return;
    }

    const currentServ = services.find(s => s.id === quoteForm.serviceId) || selectedService;
    submitQuote({
      serviceId: currentServ.id,
      serviceName: currentServ.title,
      clientName: quoteForm.clientName,
      email: quoteForm.email,
      phone: quoteForm.phone,
      location: quoteForm.location,
      urgency: quoteForm.urgency,
      description: quoteForm.description
    });

    setQuoteForm({
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      clientName: '',
      email: '',
      phone: '',
      location: 'Maputo',
      urgency: 'normal',
      description: ''
    });
  };

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header Hero Banner with Official NacharTech Multisserviços Presentation */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-900 relative overflow-hidden shadow-2xl">
        <div className="max-w-4xl space-y-4 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-blue-400 font-bold uppercase tracking-wide">NacharTech Multisserviços</span>
            <span className="text-slate-500">|</span>
            <span className="text-orange-400 font-medium">Nampula — Moçambique</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight font-display text-white">
            SERVIÇOS • VENDAS • INSTALAÇÃO • MANUTENÇÃO • REPARAÇÃO
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
            Tecnologia • Informática • CCTV • Redes • Eletricidade • Ar-Condicionado • Papelaria • Assistência Técnica
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5 sm:gap-3 text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-blue-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Serviços Especializados em Loja e ao Domicílio
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Venda de Produtos, Equipamentos e Materiais
            </span>
            <span className="flex items-center gap-1.5 text-orange-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5" /> Garantia Técnica & Faturação Legal com NUIT
            </span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE MASTER-DETAIL SERVICES (Vertical na Esquerda + Detalhes e Fotos na Direita) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-orange-500 font-mono">
              Navegação Vertical Interativa
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-display">
              {t.ourServices}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Clique em qualquer serviço à esquerda para carregar os detalhes, escopo e imagem técnica à direita.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg self-start sm:self-auto">
            {services.length} Serviços Disponíveis
          </span>
        </div>

        {/* 2-Column Split: Left Vertical List, Right Detail Card with Image (Equalized Height) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT: Vertical List of Services */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((service) => {
              const isSelected = service.id === selectedServiceId;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelectService(service.id)}
                  className={`w-full text-left p-3 sm:p-3.5 rounded-xl border transition-all duration-300 ease-in-out flex items-center justify-between gap-3 cursor-pointer group ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-500/20 translate-x-1'
                      : 'bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 border-slate-200/90 dark:border-slate-800/90 hover:border-blue-400 dark:hover:border-blue-500/50 hover:bg-slate-50 dark:hover:bg-slate-850 hover:translate-x-0.5'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-slate-200/90 dark:border-slate-700/80 bg-slate-950 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                      <img
                        src={service.image || '/src/assets/images/service_hardware_repair_1791729009749.jpg'}
                        alt={service.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className={`text-xs font-bold font-display truncate transition-colors ${
                        isSelected ? 'text-white' : 'text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                      }`}>
                        {service.title}
                      </h4>
                      <p className={`text-[10px] font-mono mt-0.5 truncate ${
                        isSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}>
                        Laboratório Especializado • {service.turnaroundTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <ChevronRight className={`w-4 h-4 transition-transform duration-300 ${
                      isSelected ? 'text-white translate-x-1' : 'text-slate-400 group-hover:translate-x-1'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Detailed Card with Compact Image, Features & Quick Actions (Sem preços estipulados) */}
          <div 
            key={selectedService.id}
            className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-lg flex flex-col justify-between h-full animate-in fade-in-50 duration-300 ease-out"
          >
            {/* Service Photograph (Compact) */}
            <div className="relative h-36 sm:h-40 w-full bg-slate-950 overflow-hidden group shrink-0">
              <img
                src={selectedService.image || '/src/assets/images/service_hardware_repair_1791729009749.jpg'}
                alt={selectedService.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

              {/* Floating badges on photo */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur text-white text-[10px] font-semibold flex items-center gap-1 border border-slate-700">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  Garantia: {selectedService.warranty}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur text-white text-[10px] font-semibold flex items-center gap-1 border border-slate-700">
                  <Clock className="w-3 h-3 text-orange-400" />
                  Prazo: {selectedService.turnaroundTime}
                </span>
              </div>

              {/* Bottom photo strip */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                <div>
                  <span className="text-[10px] text-slate-300 font-medium">Diagnóstico & Análise</span>
                  <div className="text-sm sm:text-base font-black font-display text-orange-400 drop-shadow">
                    Orçamento Sob Avaliação Técnica
                  </div>
                </div>
                <div className="px-3 py-1 rounded-lg bg-blue-600/90 backdrop-blur text-white text-[11px] font-bold">
                  Bancada Especializada
                </div>
              </div>
            </div>

            {/* Service Details Content */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 font-display">
                  {selectedService.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {selectedService.fullDesc}
                </p>
              </div>

              {/* Scope Checklist */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 font-mono mb-2.5">
                  Escopo e Procedimentos Técnicos Incluídos:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                  {selectedService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="text-[11px] leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
                <a
                  href="#quote-section"
                  onClick={() => {
                    setQuoteForm(prev => ({
                      ...prev,
                      serviceId: selectedService.id,
                      serviceName: selectedService.title
                    }));
                  }}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Pedir Orçamento Deste Serviço</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://wa.me/258847610803?text=${encodeURIComponent(`Olá NCAR Tec! Gostaria de pedir assistência técnica para: ${selectedService.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>WhatsApp Direto (+258 847 610 803)</span>
                </a>

                <button
                  onClick={() => navigate('service-detail', { serviceId: selectedService.id })}
                  className="ml-auto text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline cursor-pointer"
                >
                  Ver Ficha Completa
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Quote Request Form Section */}
      <div id="quote-section" className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-orange-500 text-white flex items-center justify-center font-bold shadow-md">
            <Send className="w-5 h-5" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-display">
            {t.quoteFormTitle}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Preencha os detalhes do seu equipamento ou projeto. A nossa equipa técnica analisa a solicitação e fornece um diagnóstico claro com prazo e valor discriminado.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <p className="font-bold text-slate-800 dark:text-slate-200">Precisa de assistência imediata?</p>
            <p className="text-slate-500 dark:text-slate-400">
              Fale diretamente com os nossos engenheiros de plantão através do canal oficial:
            </p>
            <a 
              href="https://wa.me/258847610803" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              WhatsApp: +258 847 610 803
            </a>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.selectService} *
                </label>
                <select
                  required
                  value={quoteForm.serviceId}
                  onChange={(e) => {
                    const sel = services.find(s => s.id === e.target.value);
                    setQuoteForm(p => ({
                      ...p,
                      serviceId: e.target.value,
                      serviceName: sel ? sel.title : ''
                    }));
                  }}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-medium"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.id}>{s.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  {t.urgencyLevel}
                </label>
                <select
                  value={quoteForm.urgency}
                  onChange={(e) => setQuoteForm(p => ({ ...p, urgency: e.target.value as any }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="normal">{t.urgencyNormal}</option>
                  <option value="alta">{t.urgencyHigh}</option>
                  <option value="urgente">{t.urgencyCritical}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={quoteForm.clientName}
                  onChange={(e) => setQuoteForm(p => ({ ...p, clientName: e.target.value }))}
                  placeholder="Seu nome ou empresa"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={quoteForm.email}
                  onChange={(e) => setQuoteForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="exemplo@email.co.mz"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Telefone Moçambique *
                </label>
                <input
                  type="tel"
                  required
                  value={quoteForm.phone}
                  onChange={(e) => setQuoteForm(p => ({ ...p, phone: e.target.value }))}
                  placeholder="+258 84 000 0000"
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Localização / Província
              </label>
              <input
                type="text"
                value={quoteForm.location}
                onChange={(e) => setQuoteForm(p => ({ ...p, location: e.target.value }))}
                placeholder="Ex: Sommerschield, Maputo ou Matola"
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                {t.describeProblem} *
              </label>
              <textarea
                required
                rows={4}
                value={quoteForm.description}
                onChange={(e) => setQuoteForm(p => ({ ...p, description: e.target.value }))}
                placeholder="Ex: O portátil Lenovo aquece e desliga-se; ou pretendo instalar 6 câmaras de vigilância CCTV com gravação contínua..."
                className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer w-full sm:w-auto"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido de Orçamento</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
