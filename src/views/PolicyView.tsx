import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Wrench, 
  FileText, 
  Lock,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PolicyView: React.FC = () => {
  const { policyTab, setPolicyTab, t } = useApp();

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
          Políticas, Garantias & Suporte NCAR Tec
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Transparência total nos termos de fornecimento de equipamentos e assistência técnica em Moçambique.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Tabs (3 cols) */}
        <aside className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 space-y-1 shadow-sm">
          <button
            onClick={() => setPolicyTab('warranty')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              policyTab === 'warranty'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Garantias de Equipamentos</span>
          </button>

          <button
            onClick={() => setPolicyTab('shipping')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              policyTab === 'shipping'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Truck className="w-4 h-4" />
            <span>Entregas & Prazos</span>
          </button>

          <button
            onClick={() => setPolicyTab('returns')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              policyTab === 'returns'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Devoluções & Trocas</span>
          </button>

          <button
            onClick={() => setPolicyTab('aftersales')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              policyTab === 'aftersales'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Wrench className="w-4 h-4" />
            <span>Assistência Pós-Venda</span>
          </button>

          <button
            onClick={() => setPolicyTab('terms')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              policyTab === 'terms'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Termos e Condições</span>
          </button>

          <button
            onClick={() => setPolicyTab('privacy')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              policyTab === 'privacy'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>Política de Privacidade</span>
          </button>
        </aside>

        {/* Content Box (9 cols) */}
        <main className="lg:col-span-9 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-6 leading-relaxed">
          {policyTab === 'warranty' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Garantia de Equipamentos Novos
              </h2>
              <p>
                Todos os produtos comercializados pela NCAR Tec beneficiam de garantia legal e contratual contra defeitos de fabrico:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Portáteis e Desktops:</strong> 12 a 24 meses de garantia oficial com substituição de peças genuínas.</li>
                <li><strong>Smartphones e Tablets:</strong> 12 meses de garantia para placas principais e componentes internos.</li>
                <li><strong>Kits Starlink e Equipamentos de Rede:</strong> 12 meses de assistência e suporte de conectividade.</li>
                <li><strong>Sistemas Hikvision CCTV:</strong> 24 meses de garantia de hardware com suporte de configuração remota.</li>
              </ul>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-300">
                Nota: A garantia não cobre danos decorrentes de picos de tensão sem estabilizador/UPS, quedas acidentais ou derramamento de líquidos.
              </div>
            </div>
          )}

          {policyTab === 'shipping' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Prazos e Métodos de Entrega em Moçambique
              </h2>
              <p>
                Para assegurar que o seu equipamento chega com máxima segurança, a NCAR Tec opera com transporte dedicado e parceiros logísticos certificados:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Maputo & Matola (Express)</h4>
                  <p className="text-xs text-slate-500">Entrega gratuita no próprio dia para encomendas confirmadas até às 12:00.</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100">Resto de Moçambique</h4>
                  <p className="text-xs text-slate-500">Beira, Nampula, Tete, Pemba, etc.: 24 a 72 horas úteis via transporte aéreo ou terrestre segurado.</p>
                </div>
              </div>
            </div>
          )}

          {policyTab === 'returns' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Política de Devoluções e Reembolsos
              </h2>
              <p>
                O cliente dispõe de 7 dias úteis após a receção da encomenda para solicitar a troca ou devolução de artigos selados e sem marcas de uso indevido, acompanhados da respetiva fatura ou proforma de compra.
              </p>
            </div>
          )}

          {policyTab === 'aftersales' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Assistência Pós-Venda Permanente
              </h2>
              <p>
                A nossa relação não termina no ato da compra. Clientes NCAR Tec têm direito a verificação semestral gratuita de saúde do disco/bateria, suporte para reinstalação de drivers e desconto de 20% em mão-de-obra laboratorial após o término do período de garantia.
              </p>
            </div>
          )}

          {policyTab === 'terms' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Termos e Condições Gerais
              </h2>
              <p>
                A NCAR Tec é uma entidade registada na República de Moçambique sob o NUIT 400987654. Todos os preços indicados no website incluem imposto sobre o valor acrescentado (IVA 16%). Os pagamentos simulados nesta plataforma de demonstração servem exclusivamente para teste de usabilidade.
              </p>
            </div>
          )}

          {policyTab === 'privacy' && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                Privacidade e Proteção de Dados
              </h2>
              <p>
                Os seus dados de navegação, nome e telefone não são partilhados com entidades terceiras para fins de publicidade. Em intervenções laboratoriais em computadores ou telemóveis, os nossos técnicos operam sob termo de sigilo profissional para resguardo dos ficheiros do cliente.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
