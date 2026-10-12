import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  CreditCard, 
  Phone, 
  Building2, 
  Store, 
  CheckCircle2, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

export const CheckoutView: React.FC = () => {
  const { 
    cart, 
    cartSubtotal, 
    createOrder, 
    navigate, 
    formatMZN, 
    t, 
    openInvoiceModal,
    invoices 
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [formData, setFormData] = useState({
    name: 'João Silva',
    email: 'joao.silva@email.co.mz',
    phone: '+258 84 987 6543',
    address: 'Av. Julius Nyerere, nº 1420, Apt 3B',
    city: 'Maputo',
    province: 'Maputo Cidade',
    notes: 'Entregar preferencialmente na parte da manhã.',
    paymentMethod: 'mpesa' as Order['paymentMethod']
  });

  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  const shippingCost = formData.city.toLowerCase().includes('maputo') ? 0 : 500;
  const grandTotal = cartSubtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = () => {
    const newOrd = createOrder({
      customer: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        province: formData.province,
        notes: formData.notes
      },
      items: cart,
      subtotal: cartSubtotal,
      shipping: shippingCost,
      discount: 0,
      total: grandTotal,
      paymentMethod: formData.paymentMethod,
      status: 'Confirmada'
    });

    setCreatedOrder(newOrd);
    setStep(4);
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold">O seu carrinho está vazio</h2>
        <p className="text-xs text-slate-500">Adicione itens para prosseguir para o checkout.</p>
        <button
          onClick={() => navigate('store')}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-semibold"
        >
          Ir para a Loja
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Step Indicator Header */}
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 w-full bg-slate-200 dark:bg-slate-800 -z-0"></div>
          
          {[1, 2, 3, 4].map((s) => {
            const isCompleted = step > s || step === 4;
            const isCurrent = step === s;
            const labels = ['1. Dados', '2. Entrega', '3. Pagamento', '4. Confirmação'];
            return (
              <div key={s} className="relative z-10 flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  isCompleted
                    ? 'bg-emerald-600 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white ring-4 ring-blue-100 dark:ring-blue-900/40'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}>
                  {isCompleted && step !== s ? <Check className="w-4 h-4" /> : s}
                </div>
                <span className="text-[10px] font-semibold mt-1 text-slate-600 dark:text-slate-400">
                  {labels[s - 1]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 4: SUCCESS CONFIRMATION SCREEN */}
      {step === 4 && createdOrder ? (
        <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6 animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono">
              Encomenda Registada com Sucesso
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
              Obrigado pela sua compra, {createdOrder.customer.name}!
            </h1>
            <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
              A sua encomenda foi registada e os dados foram guardados com sucesso no armazenamento local.
            </p>
          </div>

          {/* Reference Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-left">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Número de Encomenda:</span>
              <p className="text-base font-black text-blue-600 dark:text-blue-400 font-mono">
                {createdOrder.orderNumber}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Total Liquidado (Simulado):</span>
              <p className="text-base font-bold text-slate-900 dark:text-slate-100 font-mono">
                {formatMZN(createdOrder.total)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                const inv = invoices.find(i => i.orderId === createdOrder.id) || invoices[0];
                if (inv) openInvoiceModal(inv);
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-slate-800 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-blue-400" />
              <span>Ver Factura Comercial</span>
            </button>

            <button
              onClick={() => navigate('account')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <span>Acompanhar Estado da Encomenda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Steps 1, 2, 3: Form Grid */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Area (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            {/* Step 1: Contact Details */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  1. Dados Pessoais e de Contacto
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t.fullName}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {t.email}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {t.phone}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuar para Entrega</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping Address */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  2. Endereço de Entrega em Moçambique
                </h2>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t.address}
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ex: Av. 24 de Julho, nº 123, Prédio Tropical, 2º Andar"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {t.city}
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                        {t.province}
                      </label>
                      <select
                        name="province"
                        value={formData.province}
                        onChange={handleChange}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      >
                        <option value="Maputo Cidade">Maputo Cidade</option>
                        <option value="Maputo Província">Maputo Província (Matola / Boane)</option>
                        <option value="Gaza">Gaza (Xai-Xai)</option>
                        <option value="Inhambane">Inhambane</option>
                        <option value="Sofala">Sofala (Beira)</option>
                        <option value="Manica">Manica (Chimoio)</option>
                        <option value="Tete">Tete</option>
                        <option value="Zambézia">Zambézia (Quelimane)</option>
                        <option value="Nampula">Nampula</option>
                        <option value="Cabo Delgado">Cabo Delgado (Pemba)</option>
                        <option value="Niassa">Niassa (Lichinga)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t.orderNotes}
                    </label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Pontos de referência, horário preferencial..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continuar para Pagamento</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Payment Method (Simulation) */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    3. Método de Pagamento (Ambiente de Demonstração)
                  </h2>
                  <div className="mt-1 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-[11px] text-amber-800 dark:text-amber-300 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                    <span>
                      <strong>Modo de Teste:</strong> Sem transações financeiras reais. Ao submeter, a encomenda é gerada e gravada no seu navegador.
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* M-Pesa */}
                  <label 
                    onClick={() => setFormData(p => ({ ...p, paymentMethod: 'mpesa' }))}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.paymentMethod === 'mpesa'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                        MP
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">M-Pesa (Vodacom Moçambique)</p>
                        <p className="text-[11px] text-slate-500">Notificação rápida na carteira móvel 84/85</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === 'mpesa' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {formData.paymentMethod === 'mpesa' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>

                  {/* E-Mola */}
                  <label 
                    onClick={() => setFormData(p => ({ ...p, paymentMethod: 'emola' }))}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.paymentMethod === 'emola'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                        EM
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">E-Mola (Movitel)</p>
                        <p className="text-[11px] text-slate-500">Pagamento direto via número 86/87</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === 'emola' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {formData.paymentMethod === 'emola' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>

                  {/* Transferência Bancária */}
                  <label 
                    onClick={() => setFormData(p => ({ ...p, paymentMethod: 'transfer' }))}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.paymentMethod === 'transfer'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-800 text-white flex items-center justify-center font-bold text-xs">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Transferência Bancária Oficial</p>
                        <p className="text-[11px] text-slate-500">Contas Millennium BIM, BCI ou Standard Bank</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === 'transfer' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {formData.paymentMethod === 'transfer' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>

                  {/* Levantamento na Loja */}
                  <label 
                    onClick={() => setFormData(p => ({ ...p, paymentMethod: 'pickup' }))}
                    className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                      formData.paymentMethod === 'pickup'
                        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                        <Store className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-slate-100">Pagamento no Levantamento na Loja</p>
                        <p className="text-[11px] text-slate-500">Pague no balcão da NCAR Tec em Maputo</p>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      formData.paymentMethod === 'pickup' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'
                    }`}>
                      {formData.paymentMethod === 'pickup' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold cursor-pointer"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.placeOrder}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Area (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.orderSummary} ({cart.length} produtos)
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100 dark:divide-slate-800">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedStorage}`} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 p-1 flex items-center justify-center shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">{item.product.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Qtd: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 tabular-nums">
                    {formatMZN(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>{t.subtotal}</span>
                <span className="font-medium tabular-nums">{formatMZN(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>{t.shipping} ({formData.city})</span>
                <span className="font-medium text-emerald-600">
                  {shippingCost === 0 ? 'Grátis' : formatMZN(shippingCost)}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span>Total Final</span>
                <span className="text-blue-600 dark:text-blue-400 tabular-nums">{formatMZN(grandTotal)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
