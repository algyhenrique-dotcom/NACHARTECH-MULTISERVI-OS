import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  Truck, 
  Wrench, 
  Database,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NacharTechLogo } from './NacharTechLogo';

export const Footer: React.FC = () => {
  const { currentView, navigate, t, resetAllDemoData } = useApp();

  // O utilizador determinou explicitamente que estes dados (descrição institucional,
  // contactos, catálogo de produtos e links de assistência) só devem estar no início ('home').
  // Na loja e nas outras telas, não devem aparecer, mantendo apenas a barra minimalista de copyright.
  if (currentView !== 'home') {
    return (
      <footer className="bg-slate-950 text-slate-500 border-t border-slate-900 py-4 px-4 sm:px-6 transition-colors">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => navigate('policy', { policyTab: 'terms' })} className="hover:text-slate-300 transition-colors cursor-pointer">Termos</button>
            <button onClick={() => navigate('policy', { policyTab: 'privacy' })} className="hover:text-slate-300 transition-colors cursor-pointer">Privacidade</button>
            <button onClick={() => navigate('admin')} className="text-blue-400 hover:text-blue-300 font-medium transition-colors cursor-pointer">Painel Admin</button>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 transition-colors">
      {/* Top Banner Statement */}
      <div className="border-b border-slate-900/80 bg-slate-900/50 py-4 px-4 sm:px-6">
        <div className="max-w-[1600px] w-full mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <NacharTechLogo size="sm" showSubtitle={false} />
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="text-xs text-slate-300">
              Mais que uma loja, a sua parceira definitiva em tecnologia e assistência em Moçambique.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <a href="mailto:nachartechmultiservicoe@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-orange-400" />
              nachartechmultiservicoe@gmail.com
            </a>
            <a href="https://wa.me/258847610803" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              WhatsApp: +258 847 610 803
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Col 1: About & Lab */}
          <div className="lg:col-span-2 space-y-4">
            <NacharTechLogo size="md" />
            <p className="text-xs leading-relaxed text-slate-400 max-w-sm">
              Empresa moçambicana de vanguarda especializada em venda de equipamentos informáticos, componentes eletrónicos, redes de alta velocidade, Starlink e assistência técnica laboratorial especializada.
            </p>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>Nampula — Moçambique (com envios para todo o país)</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+258 847 610 803</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>nachartechmultiservicoe@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Col 2: Loja & Catálogo */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Venda & Catálogo
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('store', { category: 'cat-informatica' })} className="hover:text-white transition-colors cursor-pointer">
                  Informática & Computadores
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store', { category: 'cat-celulares' })} className="hover:text-white transition-colors cursor-pointer">
                  Celulares & Acessórios
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store', { category: 'cat-redes' })} className="hover:text-white transition-colors cursor-pointer">
                  Redes & Starlink
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store', { category: 'cat-cctv' })} className="hover:text-white transition-colors cursor-pointer">
                  CCTV & Segurança
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store', { category: 'cat-eletricidade' })} className="hover:text-white transition-colors cursor-pointer">
                  Material Elétrico
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store', { category: 'cat-arcondicionado' })} className="hover:text-white transition-colors cursor-pointer">
                  Ar-Condicionado
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store', { category: 'cat-papelaria' })} className="hover:text-white transition-colors cursor-pointer">
                  Papelaria & Escritório
                </button>
              </li>
              <li>
                <button onClick={() => navigate('store')} className="hover:text-white transition-colors cursor-pointer text-blue-400 font-medium">
                  Ver Todas as Categorias →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Serviços Técnicos */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Serviços de Assistência
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Manutenção & Reparação
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Informática & Programação
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  CCTV & Videovigilância
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Redes, Wi-Fi & Starlink
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Instalações Elétricas
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Ar-Condicionado & Climatização
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer">
                  Papelaria & Encadernação
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-white transition-colors cursor-pointer text-blue-400 font-medium">
                  Pedir Orçamento Gratuito →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Suporte & Políticas */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Garantias & Suporte
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigate('policy', { policyTab: 'warranty' })} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                  Garantias de Equipamentos
                </button>
              </li>
              <li>
                <button onClick={() => navigate('policy', { policyTab: 'shipping' })} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sky-400" />
                  Prazos e Métodos de Entrega
                </button>
              </li>
              <li>
                <button onClick={() => navigate('policy', { policyTab: 'returns' })} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  Devoluções e Trocas
                </button>
              </li>
              <li>
                <button onClick={() => navigate('policy', { policyTab: 'aftersales' })} className="hover:text-white transition-colors cursor-pointer flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  Assistência Pós-Venda
                </button>
              </li>
              <li>
                <button onClick={() => navigate('policy', { policyTab: 'terms' })} className="hover:text-white transition-colors cursor-pointer">
                  Termos & Condições
                </button>
              </li>
              <li>
                <button onClick={() => navigate('invoices')} className="hover:text-white transition-colors cursor-pointer text-indigo-400">
                  Emitir Factura / Proforma
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Local Storage Demo Banner */}
        <div className="mt-12 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Database className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Armazenamento Local Ativo:</strong> Esta aplicação persiste todas as alterações (produtos, encomendas, faturas e orçamentos) no navegador (<code className="text-blue-300 font-mono">localStorage</code>). Os dados não sincronizam entre dispositivos.
            </span>
          </div>
          <button
            onClick={resetAllDemoData}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs whitespace-nowrap transition-colors cursor-pointer"
          >
            {t.resetDemoData}
          </button>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>{t.copyright}</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('policy', { policyTab: 'terms' })} className="hover:text-slate-300">Termos</button>
            <button onClick={() => navigate('policy', { policyTab: 'privacy' })} className="hover:text-slate-300">Privacidade</button>
            <button onClick={() => navigate('admin')} className="text-amber-400 hover:text-amber-300 font-medium">Painel Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
