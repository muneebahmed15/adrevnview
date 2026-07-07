import { Link, useParams } from "react-router";
import { ArrowLeft, Pencil, Printer } from "lucide-react";
import { getCompanySettings, getInvoice } from "@/lib/admin/storage";
import { InvoiceDocument, printInvoice } from "./components/InvoiceDocument";

export default function AdminInvoiceView() {
  const { id } = useParams<{ id: string }>();
  const invoice = id ? getInvoice(id) : undefined;
  const company = getCompanySettings();

  if (!invoice) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Invoice not found.</p>
        <Link to="/admin/invoices" className="text-sky-400 text-sm mt-2 inline-block">
          Back to invoices
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link to="/admin/invoices" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
              {invoice.number}
            </h1>
            <p className="text-muted-foreground text-sm capitalize">{invoice.status} · {invoice.clientName}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={printInvoice}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>
          <Link
            to={`/admin/invoices/${invoice.id}/edit`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-sky-500/30 text-foreground/80 text-sm hover:bg-sky-900/20 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Edit
          </Link>
        </div>
      </div>

      <InvoiceDocument invoice={invoice} company={company} />
    </div>
  );
}
