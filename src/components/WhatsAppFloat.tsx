import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppFloat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '258847610803';

  const defaultPrompts = [
    'Olá NacharTech! Gostaria de saber mais sobre a disponibilidade de equipamentos.',
    'Olá! Preciso de assistência técnica para o meu computador/telemóvel.',
    'Olá! Gostaria de solicitar um orçamento para Starlink, Redes ou CCTV.',
    'Olá! Gostaria de falar com o departamento comercial da NacharTech.'
  ];

  const handleSendPrompt = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end no-print">
      {isOpen && (
        <div className="mb-3 w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-4 text-slate-800 dark:text-slate-100 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Apoio NCAR Tec</p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Disponível em Maputo</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 my-3 leading-relaxed">
            Selecione uma mensagem rápida ou inicie conversa direta no WhatsApp com a nossa equipa:
          </p>

          <div className="space-y-1.5">
            {defaultPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendPrompt(prompt)}
                className="w-full text-left p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300 text-[11px] text-slate-700 dark:text-slate-300 transition-colors flex items-center justify-between group cursor-pointer"
              >
                <span className="line-clamp-1">{prompt}</span>
                <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-500 shrink-0 ml-1" />
              </button>
            ))}
          </div>

          <button
            onClick={() => handleSendPrompt('Olá NCAR Tec! Gostaria de falar com o suporte.')}
            className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            Abrir WhatsApp Direto
          </button>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-13 h-13 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-xl shadow-emerald-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer relative group"
        title="Falar no WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="sr-only">WhatsApp</span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900"></span>
        </span>
      </button>
    </div>
  );
};
