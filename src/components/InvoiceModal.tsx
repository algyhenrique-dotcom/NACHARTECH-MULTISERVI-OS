import React from 'react';
import { X, Printer, Download, CheckCircle, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const InvoiceModal: React.FC = () => {
  const { activeInvoice, closeInvoiceModal, formatMZN } = useApp();

  if (!activeInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity no-print"
        onClick={closeInvoiceModal}
      />

      <div className="relative w-full max-w-3xl bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 my-8">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="no-print p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm tracking-tight">NCAR Tec Documento Comercial</span>
            <span className="text-xs bg-blue-600/60 text-blue-200 px-2 py-0.5 rounded font-mono">
              {activeInvoice.type} {activeInvoice.invoiceNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={closeInvoiceModal}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Invoice Body */}
        <div className="p-8 sm:p-12 space-y-8 bg-white print:p-0">
          {/* Header Lockup */}
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6 border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md">
                  N
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-950">
                    NCAR <span className="text-blue-600">Tec</span>
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">Sociedade Unipessoal, Lda.</p>
                </div>
              </div>

              <div className="mt-4 text-xs text-slate-600 space-y-1">
                <p>Av. 24 de Julho, nº 1845, Sommerschield</p>
                <p>Maputo - Moçambique</p>
                <p>Telefone: +258 84 123 4567 / +258 87 123 4567</p>
                <p>Email: facturacao@ncartec.co.mz</p>
                <p className="font-semibold text-slate-800">NUIT: 400987654</p>
              </div>
            </div>

            <div className="text-left sm:text-right space-y-2">
              <div className="inline-block px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                {activeInvoice.type === 'Factura' ? 'FACTURA COMERCIAL' : 'FACTURA PROFORMA'}
              </div>
              <p className="text-lg font-black font-mono text-slate-900">{activeInvoice.invoiceNumber}</p>
              <div className="text-xs text-slate-600 space-y-0.5 font-mono">
                <p>Data de Emissão: <span className="text-slate-900 font-semibold">{activeInvoice.date}</span></p>
                <p>Vencimento / Validade: <span className="text-slate-900 font-semibold">{activeInvoice.dueDate}</span></p>
                <p className="flex items-center gap-1 sm:justify-end">
                  Estado: 
                  <span className={`font-semibold ${activeInvoice.status === 'Paga' ? 'text-emerald-600' : 'text-amber-600'}`}>
                    {activeInvoice.status}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Client Details Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Faturado a (Cliente):</p>
              <p className="font-bold text-slate-900 text-sm">{activeInvoice.clientName}</p>
              <p className="text-slate-600 mt-0.5">{activeInvoice.clientAddress}</p>
              {activeInvoice.clientNuit && (
                <p className="text-slate-700 font-mono mt-1">
                  <strong>NUIT Cliente:</strong> {activeInvoice.clientNuit}
                </p>
              )}
            </div>
            <div className="sm:text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Contactos:</p>
              <p className="text-slate-700">{activeInvoice.clientEmail}</p>
              <p className="text-slate-700 font-mono">{activeInvoice.clientPhone}</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="py-3 px-4">Item / Descrição do Equipamento ou Serviço</th>
                  <th className="py-3 px-4 text-center">Qtd</th>
                  <th className="py-3 px-4 text-right">Preço Unit. (MZN)</th>
                  <th className="py-3 px-4 text-right">Total (MZN)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {activeInvoice.items.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-medium">{item.description}</td>
                    <td className="py-3 px-4 text-center font-mono">{item.quantity}</td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums">{item.unitPrice.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold tabular-nums">{item.total.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals & Taxes Breakdown */}
          <div className="flex flex-col sm:flex-row justify-between gap-6 pt-2">
            {/* Bank details & Terms */}
            <div className="text-xs text-slate-600 max-w-sm space-y-2">
              <p className="font-bold text-slate-900 uppercase text-[10px]">Coordenadas Bancárias para Liquidação:</p>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono text-[11px] space-y-1">
                <p><strong>Millennium BIM:</strong> {activeInvoice.bankDetails.bankBIM}</p>
                <p><strong>BCI Moçambique:</strong> {activeInvoice.bankDetails.bankBCI}</p>
                <p><strong>M-Pesa Conta Comercial:</strong> {activeInvoice.bankDetails.mpesaNumber}</p>
              </div>
              {activeInvoice.notes && (
                <p className="text-[11px] italic text-slate-500">{activeInvoice.notes}</p>
              )}
            </div>

            {/* Subtotal, IVA, Total */}
            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between py-1 text-slate-600 border-b border-slate-100">
                <span>Subtotal (sem IVA):</span>
                <span className="font-mono tabular-nums">{activeInvoice.subtotal.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MT</span>
              </div>
              <div className="flex justify-between py-1 text-slate-600 border-b border-slate-100">
                <span>IVA Moçambique (16%):</span>
                <span className="font-mono tabular-nums">{activeInvoice.vatAmount.toLocaleString('pt-MZ', { minimumFractionDigits: 2 })} MT</span>
              </div>
              <div className="flex justify-between py-2 text-base font-black text-blue-900 border-t-2 border-slate-900">
                <span>TOTAL A PAGAR:</span>
                <span className="font-mono tabular-nums">{formatMZN(activeInvoice.total)}</span>
              </div>
            </div>
          </div>

          {/* Legal Signatures footer */}
          <div className="border-t border-slate-200 pt-8 grid grid-cols-2 gap-8 text-center text-xs text-slate-500">
            <div>
              <div className="h-12 border-b border-dashed border-slate-300 w-48 mx-auto"></div>
              <p className="mt-2 font-semibold text-slate-700">NCAR Tec - Departamento Comercial</p>
            </div>
            <div>
              <div className="h-12 border-b border-dashed border-slate-300 w-48 mx-auto"></div>
              <p className="mt-2 font-semibold text-slate-700">O Cliente / Entidade Adquirente</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
