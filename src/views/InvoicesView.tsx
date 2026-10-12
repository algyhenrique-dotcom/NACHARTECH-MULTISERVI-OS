import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Plus, 
  Trash2, 
  Search, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storageService } from '../services/storageService';
import { Invoice } from '../types';

export const InvoicesView: React.FC = () => {
  const { invoices, refreshData, openInvoiceModal, formatMZN, t, showToast } = useApp();

  const [activeFilter, setActiveFilter] = useState<'all' | 'Factura' | 'Proforma'>('all');
  const [searchDoc, setSearchDoc] = useState('');
  const [isCreatingProforma, setIsCreatingProforma] = useState(false);

  // New Proforma Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientNuit, setNewClientNuit] = useState('');
  const [newClientEmail, setNewClientEmail] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientAddress, setNewClientAddress] = useState('Maputo, Moçambique');
  const [proformaItems, setProformaItems] = useState<{ description: string; quantity: number; unitPrice: number }[]>([
    { description: 'Portátil Lenovo IdeaPad 3 15.6" i5/8GB/512GB SSD', quantity: 1, unitPrice: 39646.55 }
  ]);

  const handleAddItemRow = () => {
    setProformaItems(prev => [...prev, { description: '', quantity: 1, unitPrice: 0 }]);
  };

  const handleRemoveItemRow = (idx: number) => {
    setProformaItems(prev => prev.filter((_, i) => i !== idx));
  };

  const handleItemChange = (idx: number, field: 'description' | 'quantity' | 'unitPrice', value: any) => {
    setProformaItems(prev => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
  };

  const handleCreateProformaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName || proformaItems.length === 0) return;

    const subtotal = proformaItems.reduce((acc, it) => acc + (it.unitPrice * it.quantity), 0);
    const vat = Math.round(subtotal * 0.16);
    const total = subtotal + vat;
    const today = new Date().toLocaleDateString('pt-PT');
    
    // 15 days validity
    const due = new Date();
    due.setDate(due.getDate() + 15);
    const dueDateStr = due.toLocaleDateString('pt-PT');

    const created = storageService.createInvoice({
      invoiceNumber: `PF-2026/${Math.floor(200 + Math.random() * 799)}`,
      type: 'Proforma',
      clientName: newClientName,
      clientNuit: newClientNuit || undefined,
      clientEmail: newClientEmail || 'cliente@email.co.mz',
      clientPhone: newClientPhone || '+258 84 000 0000',
      clientAddress: newClientAddress,
      date: today,
      dueDate: dueDateStr,
      items: proformaItems.map(it => ({
        description: it.description,
        quantity: it.quantity,
        unitPrice: it.unitPrice,
        total: it.unitPrice * it.quantity
      })),
      subtotal,
      vatRate: 0.16,
      vatAmount: vat,
      total,
      status: 'Pendente',
      bankDetails: {
        bankBIM: '0001 0000 0012 3456 7890 1 (NCAR TEC LDA)',
        bankBCI: '0008 0000 0098 7654 3210 2 (NCAR TEC LDA)',
        mpesaNumber: '84 123 4567'
      },
      notes: 'Proforma comercial válida por 15 dias. Cotação oficial NCAR Tec Maputo.'
    });

    refreshData();
    setIsCreatingProforma(false);
    showToast(`Proforma ${created.invoiceNumber} gerada com sucesso!`, 'success');
    openInvoiceModal(created);
  };

  const filteredInvoices = invoices.filter(inv => {
    if (activeFilter !== 'all' && inv.type !== activeFilter) return false;
    if (searchDoc.trim()) {
      const q = searchDoc.toLowerCase();
      return (
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">
            <Building2 className="w-4 h-4" />
            <span>Departamento Comercial & Facturação Oficial</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
            {t.invoiceTitle}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {t.invoiceSubtitle} Inclui cálculo automático de IVA moçambicano (16%) e coordenadas bancárias.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingProforma(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-md shadow-blue-600/20 cursor-pointer self-start sm:self-auto transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{t.generateProforma}</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Todos ({invoices.length})
          </button>
          <button
            onClick={() => setActiveFilter('Factura')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'Factura'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Facturas ({invoices.filter(i => i.type === 'Factura').length})
          </button>
          <button
            onClick={() => setActiveFilter('Proforma')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              activeFilter === 'Proforma'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            Proformas ({invoices.filter(i => i.type === 'Proforma').length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            placeholder="Pesquisar por nº ou cliente..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none"
          />
        </div>
      </div>

      {/* INVOICES LIST TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                <th className="py-3.5 px-4">Tipo & Número</th>
                <th className="py-3.5 px-4">Cliente / Entidade</th>
                <th className="py-3.5 px-4">Data Emissão</th>
                <th className="py-3.5 px-4">Estado</th>
                <th className="py-3.5 px-4 text-right">Total com IVA (16%)</th>
                <th className="py-3.5 px-4 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                        inv.type === 'Factura' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {inv.type}
                      </span>
                      <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                        {inv.invoiceNumber}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-900 dark:text-slate-100">{inv.clientName}</p>
                    {inv.clientNuit && <p className="text-[10px] text-slate-400 font-mono">NUIT: {inv.clientNuit}</p>}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-500">{inv.date}</td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                      inv.status === 'Paga'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono font-black text-blue-600 dark:text-blue-400 tabular-nums">
                    {formatMZN(inv.total)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => openInvoiceModal(inv)}
                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-blue-300 rounded-lg text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Visualizar / Imprimir</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: GENERATE NEW PROFORMA */}
      {isCreatingProforma && (
        <div className="fixed inset-0 z-50 overflow-y-auto p-4 flex items-center justify-center">
          <div 
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            onClick={() => setIsCreatingProforma(false)}
          />

          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 z-10 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                Emitir Nova Factura Proforma
              </h3>
              <button
                onClick={() => setIsCreatingProforma(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProformaSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Nome do Cliente / Empresa *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="Ex: Empresa Moçambique Lda"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">NUIT Cliente (opcional)</label>
                  <input
                    type="text"
                    value={newClientNuit}
                    onChange={(e) => setNewClientNuit(e.target.value)}
                    placeholder="Ex: 400123456"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">Email</label>
                  <input
                    type="email"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    placeholder="compras@empresa.co.mz"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="font-bold block mb-1">Telefone</label>
                  <input
                    type="tel"
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    placeholder="+258 84 000 0000"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <label className="font-bold block">Linhas de Equipamentos / Serviços</label>
                  <button
                    type="button"
                    onClick={handleAddItemRow}
                    className="text-blue-600 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Plus className="w-3.5 h-3.5" /> Adicionar Linha
                  </button>
                </div>

                {proformaItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      required
                      placeholder="Descrição do item"
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                    />
                    <input
                      type="number"
                      min={1}
                      placeholder="Qtd"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, 'quantity', Number(e.target.value))}
                      className="w-16 px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center font-mono"
                    />
                    <input
                      type="number"
                      min={0}
                      step={100}
                      placeholder="Preço MZN (sem IVA)"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(idx, 'unitPrice', Number(e.target.value))}
                      className="w-28 px-2 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right font-mono"
                    />
                    {proformaItems.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveItemRow(idx)}
                        className="p-2 text-slate-400 hover:text-rose-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreatingProforma(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 cursor-pointer"
                >
                  Gerar e Abrir Proforma
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
