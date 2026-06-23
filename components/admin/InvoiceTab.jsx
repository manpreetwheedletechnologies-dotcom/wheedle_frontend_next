import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, Printer, History, FileText, ArrowLeft, Download } from 'lucide-react';
import axios from 'axios';
import API_BASE_URL from '../../lib/api';
const authHeader = () => ({
  Authorization: `Bearer ${typeof window !== "undefined" ? localStorage.getItem("adminToken") || "" : ""}`,
});

export default function InvoiceTab() {
  const [billTo, setBillTo] = useState('');
  const [subject, setSubject] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [items, setItems] = useState([{ description: '', qty: 1, rate: 0 }]);
  const [gstPercentage, setGstPercentage] = useState(18);

  const [currentInvoiceId, setCurrentInvoiceId] = useState(null);
  const [viewMode, setViewMode] = useState('create'); // 'create' | 'history'
  const [pastInvoices, setPastInvoices] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (viewMode === 'history') {
      fetchPastInvoices();
    }
  }, [viewMode]);

  const fetchPastInvoices = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/invoices`, { headers: authHeader() });
      setPastInvoices(res.data);
    } catch (e) {
      console.error('Failed to fetch invoices', e);
    }
  };

  const handleDeleteInvoice = async (e, id) => {
    e.stopPropagation(); // prevent loading the invoice
    if (!window.confirm('Are you sure you want to delete this invoice?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/invoices/${id}`, { headers: authHeader() });
      setPastInvoices(pastInvoices.filter(inv => inv._id !== id));
    } catch (error) {
      console.error('Failed to delete invoice', error);
    }
  };

  const printRef = useRef(null);

  const addItem = () => {
    setItems([...items, { description: '', qty: 1, rate: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const subTotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const gstAmount = (subTotal * gstPercentage) / 100;
  const totalAmount = subTotal + gstAmount;

  const handleSaveAndPrint = async () => {
    setIsSaving(true);
    try {
      const payload = {
        invoiceNumber,
        date: invoiceDate,
        billTo,
        subject,
        items,
        gstPercentage,
        subTotal,
        gstAmount,
        totalAmount
      };

      if (currentInvoiceId) {
        await axios.put(`${API_BASE_URL}/invoices/${currentInvoiceId}`, payload, { headers: authHeader() });
      } else {
        const res = await axios.post(`${API_BASE_URL}/invoices`, payload, { headers: authHeader() });
        setCurrentInvoiceId(res.data._id); // Update ID so further saves update the new document
      }
    } catch (e) {
      console.error('Failed to save invoice', e);
    } finally {
      setIsSaving(false);
      window.print();
    }
  };

  const loadPastInvoice = (inv) => {
    setCurrentInvoiceId(inv._id);
    setInvoiceNumber(inv.invoiceNumber);
    setInvoiceDate(inv.date);
    setBillTo(inv.billTo);
    setSubject(inv.subject);
    setItems(inv.items);
    setGstPercentage(inv.gstPercentage);
    setViewMode('create');
  };

  return (
    <div className="flex h-full w-full bg-gray-50 p-6 gap-6 overflow-hidden print-container">
      {/* LEFT: FORM (Hidden during print) */}
      <div className="w-1/3 bg-white rounded-2xl shadow-sm border p-6 flex flex-col gap-5 overflow-y-auto hide-on-print">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-[#2E1A6D]">
              {viewMode === 'create' ? 'Generate Tax Invoice' : 'Past Invoices'}
            </h2>
            <p className="text-sm text-gray-500">
              {viewMode === 'create' ? (currentInvoiceId ? 'Edit the loaded invoice details.' : 'Fill in the details to generate an invoice.') : 'View or reprint previously generated invoices.'}
            </p>
          </div>
          <button
            onClick={() => {
              if (viewMode === 'create') {
                setViewMode('history');
              } else {
                // Clear state for 'New'
                setCurrentInvoiceId(null);
                setInvoiceNumber('');
                setBillTo('');
                setSubject('');
                setInvoiceDate(new Date().toISOString().split('T')[0]);
                setItems([{ description: '', qty: 1, rate: 0 }]);
                setViewMode('create');
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#2E1A6D]/10 text-[#2E1A6D] rounded-lg hover:bg-[#2E1A6D]/20 transition text-sm font-bold"
          >
            {viewMode === 'create' ? <History size={16} /> : <Plus size={16} />}
            {viewMode === 'create' ? 'History' : 'New'}
          </button>
        </div>

        {viewMode === 'history' ? (
          <div className="space-y-3 mt-4">
            {pastInvoices.length === 0 ? (
              <div className="text-center p-6 bg-gray-50 rounded-xl border border-dashed">
                <p className="text-sm text-gray-500">No past invoices found.</p>
              </div>
            ) : (
              pastInvoices.map((inv) => (
                <div key={inv._id} className="p-4 border rounded-xl hover:border-[#0B2CC3] hover:shadow-md transition cursor-pointer bg-white" onClick={() => loadPastInvoice(inv)}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-[#2E1A6D] text-sm">{inv.invoiceNumber}</span>
                    <span className="text-xs text-gray-500 font-semibold bg-gray-100 px-2 py-0.5 rounded">{inv.date.split('-').reverse().join('-')}</span>
                  </div>
                  <h4 className="text-sm font-semibold truncate text-gray-800">{inv.subject || 'No Subject'}</h4>
                  <p className="text-xs text-gray-500 truncate mt-1">{inv.billTo.split('\\n')[0]}</p>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t">
                    <span className="text-sm font-bold text-[#0B2CC3]">₹ {inv.totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    <div className="flex items-center gap-3">
                      <button onClick={(e) => handleDeleteInvoice(e, inv._id)} className="text-red-500 hover:text-red-700 transition" title="Delete Invoice">
                        <Trash2 size={14} />
                      </button>
                      <span className="text-xs text-[#0B2CC3] flex items-center gap-1 font-semibold hover:underline">
                        <FileText size={14} /> View
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <>
            <div className="space-y-4 text-black mt-2">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Invoice Number</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3]"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3]"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Bill To (Company Name / Address)</label>
                <textarea
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3] h-20"
                  value={billTo}
                  onChange={(e) => setBillTo(e.target.value)}
                  placeholder="Client Name&#10;Company Address"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Subject</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3]"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Website Development Services"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Items</label>
                  <button onClick={addItem} title="Add Item" className="text-[#0B2CC3] hover:bg-blue-50 p-1.5 rounded-full border border-transparent hover:border-[#0B2CC3] transition">
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
                <div className="space-y-3">
                  {items.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2 p-3 bg-gray-50 border rounded-xl relative">
                      {items.length > 1 && (
                        <button onClick={() => removeItem(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                          <Trash2 size={14} />
                        </button>
                      )}
                      <textarea
                        placeholder="Description (multi-line supported)"
                        className="w-full px-3 py-1.5 text-sm border rounded outline-none resize-y min-h-[40px]"
                        value={item.description}
                        onChange={(e) => updateItem(index, 'description', e.target.value)}
                      />
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          min="1"
                          className="w-1/3 px-3 py-1.5 text-sm border rounded outline-none"
                          value={item.qty}
                          onChange={(e) => updateItem(index, 'qty', Number(e.target.value))}
                        />
                        <input
                          type="number"
                          placeholder="Rate (₹)"
                          min="0"
                          className="w-2/3 px-3 py-1.5 text-sm border rounded outline-none"
                          value={item.rate}
                          onChange={(e) => updateItem(index, 'rate', Number(e.target.value))}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t pt-4">
                <label className="text-xs font-bold text-gray-500 uppercase">GST (%)</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 border rounded-xl outline-none focus:border-[#0B2CC3]"
                  value={gstPercentage}
                  onChange={(e) => setGstPercentage(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="mt-auto pt-6 border-t">
              <button
                onClick={handleSaveAndPrint}
                disabled={isSaving}
                className="w-full py-3 bg-[#0B2CC3] hover:bg-blue-700 text-white rounded-xl font-bold transition flex items-center justify-center gap-2 disabled:opacity-70"
              >
                <Printer size={18} /> {isSaving ? 'Saving...' : 'Save & Print'}
              </button>
            </div>
          </>
        )}
      </div>

      {/* RIGHT: INVOICE PREVIEW (This is what gets printed) */}
      <div className="w-2/3 bg-gray-200 p-8 overflow-y-auto rounded-2xl hide-on-print-bg relative flex justify-center">
        <div ref={printRef} className="bg-white p-10 shadow-md w-full max-w-[800px] min-h-[1050px] relative printable-invoice text-black">
          <img src="/logowheedle.png" alt="Wheedle Logo" className="h-10 object-contain mb-4" />

          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-[#2E1A6D] pb-6 mb-8">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-black text-[#2E1A6D]">Wheedle Technologies Pvt Ltd</h1>
                <p className="text-sm text-gray-600 mt-1">4th Floor, Plot No. A-40, Unit No. 10, Tower-C, I-Thum</p>
                <p className="text-sm text-gray-600">Sector-62, Noida, Gautam Buddha Nagar, Uttar Pradesh – 201309</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-black text-gray-200 tracking-wider">TAX INVOICE</h2>
              <div className="mt-4">
                <p className="text-sm"><span className="font-bold">Invoice No:</span> {invoiceNumber}</p>
                <p className="text-sm"><span className="font-bold">Date:</span> {invoiceDate.split('-').reverse().join('-')}</p>
                <p className="text-sm font-bold mt-1 text-gray-800">GSTIN: 09AACCW0847L2ZX</p>

              </div>
            </div>
          </div>

          {/* Bill To & Subject */}
          <div className="flex justify-between mb-8">
            <div className="w-1/2">
              <h3 className="text-sm font-bold text-[#2E1A6D] mb-2 uppercase border-b pb-1 inline-block">Bill To</h3>
              <p className="text-sm whitespace-pre-wrap">{billTo || 'Client Name\nClient Address'}</p>
            </div>
            <div className="w-1/2 pl-8">
              <h3 className="text-sm font-bold text-[#2E1A6D] mb-2 uppercase border-b pb-1 inline-block">Subject</h3>
              <p className="text-sm font-medium">{subject || 'Project Name / Service Description'}</p>
            </div>
          </div>

          {/* Items Table */}
          <table className="w-full mb-8 border-collapse">
            <thead>
              <tr className="bg-[#2E1A6D] text-white">
                <th className="py-3 px-4 text-left text-sm font-bold w-12 border border-[#2E1A6D]">S.No.</th>
                <th className="py-3 px-4 text-left text-sm font-bold border border-[#2E1A6D]">Description</th>
                <th className="py-3 px-4 text-right text-sm font-bold w-20 border border-[#2E1A6D]">Qty</th>
                <th className="py-3 px-4 text-right text-sm font-bold w-32 border border-[#2E1A6D]">Rate (₹)</th>
                <th className="py-3 px-4 text-right text-sm font-bold w-36 border border-[#2E1A6D]">Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm border-l border-r border-gray-200 align-top">{index + 1}</td>
                  <td className="py-3 px-4 text-sm border-r border-gray-200 align-top whitespace-pre-wrap">{item.description || '-'}</td>
                  <td className="py-3 px-4 text-right text-sm border-r border-gray-200 align-top">{item.qty}</td>
                  <td className="py-3 px-4 text-right text-sm border-r border-gray-200 align-top">{item.rate.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="py-3 px-4 text-right text-sm border-r border-gray-200 font-medium align-top">{(item.qty * item.rate).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end mb-12">
            <div className="w-1/2">
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm font-semibold text-gray-600">Sub Total</span>
                <span className="text-sm font-bold">₹ {subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-sm font-semibold text-gray-600">GST ({gstPercentage}%)</span>
                <span className="text-sm font-bold">₹ {gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-3 border-b-2 border-[#2E1A6D] bg-gray-50 px-2 rounded mt-1">
                <span className="text-base font-black text-[#2E1A6D]">TOTAL AMOUNT</span>
                <span className="text-base font-black text-[#0B2CC3]">₹ {totalAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="flex justify-between items-end mt-auto pt-10" style={{ pageBreakInside: 'avoid', breakInside: 'avoid' }}>
            {/* Bank Details */}
            <div className="w-2/3">
              <h3 className="text-sm font-bold text-[#2E1A6D] mb-2 uppercase">Company Bank Details</h3>
              <div className="text-sm space-y-1 p-4 bg-gray-50 border rounded-lg">
                <p><span className="font-semibold text-gray-600 w-32 inline-block">Account Name:</span> Wheedle Technologies Pvt Ltd</p>
                <p><span className="font-semibold text-gray-600 w-32 inline-block">Bank Name:</span> ICICI Bank</p>
                <p><span className="font-semibold text-gray-600 w-32 inline-block">Account Number:</span> 197205000163</p>
                <p><span className="font-semibold text-gray-600 w-32 inline-block">IFSC Code:</span> ICIC0001972</p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm font-bold text-[#2E1A6D] mb-1 uppercase">Payment Terms</h3>
                <p className="text-xs text-gray-600">Please make the payment within 15 days of the invoice date. All payments should be made to the account details mentioned above.</p>
              </div>
            </div>

            {/* Signature */}
            <div className="w-1/3 text-center flex flex-col items-center justify-end pb-2">
              <div className="h-20 border-b-2 border-gray-300 w-48 mb-2"></div>
              <p className="text-sm font-bold text-gray-800">Authorized Signatory</p>
              <p className="text-xs text-gray-500">Wheedle Technologies Pvt. Ltd.</p>
            </div>
          </div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media print {
          @page {
            margin: 0; /* This removes the browser headers and footers (localhost link, date, etc) */
          }
          body {
            background-color: white !important;
          }
          body * {
            visibility: hidden;
          }
          * {
            overflow: visible !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          html, body {
            height: auto !important;
            background: white !important;
          }
          .hide-on-print {
            display: none !important;
          }
          .hide-on-print-bg {
            background: white !important;
            padding: 0 !important;
            margin: 0 !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .printable-invoice, .printable-invoice * {
            visibility: visible;
          }
          .printable-invoice {
            position: relative;
            width: 100%;
            max-width: 100%;
            margin: 0;
            padding: 20mm !important;
            box-sizing: border-box;
            box-shadow: none;
            min-height: auto !important;
          }
        }
      `}} />
    </div>
  );
}
