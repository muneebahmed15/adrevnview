import { useState } from "react";
import { Link } from "react-router";
import { ExternalLink, Save } from "lucide-react";
import { CLIENTS, getClientPath } from "@/lib/content/clients";
import { getClientNote, saveClientNote } from "@/lib/admin/storage";
import type { ClientNote } from "@/lib/admin/types";

export default function AdminClients() {
  const [selectedSlug, setSelectedSlug] = useState(CLIENTS[0]?.slug ?? "");
  const client = CLIENTS.find((c) => c.slug === selectedSlug);
  const existing = selectedSlug ? getClientNote(selectedSlug) : undefined;

  const [form, setForm] = useState({
    contactEmail: existing?.contactEmail ?? "",
    contactPhone: existing?.contactPhone ?? "",
    notes: existing?.notes ?? "",
  });

  function selectClient(slug: string) {
    setSelectedSlug(slug);
    const note = getClientNote(slug);
    setForm({
      contactEmail: note?.contactEmail ?? "",
      contactPhone: note?.contactPhone ?? "",
      notes: note?.notes ?? "",
    });
  }

  function handleSave() {
    if (!selectedSlug) return;
    const note: ClientNote = {
      clientSlug: selectedSlug,
      contactEmail: form.contactEmail,
      contactPhone: form.contactPhone,
      notes: form.notes,
      updatedAt: new Date().toISOString(),
    };
    saveClientNote(note);
  }

  return (
    <div className="p-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
          Clients
        </h1>
        <p className="text-muted-foreground text-sm mt-1">Manage portfolio clients and contact notes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="rounded-xl border border-sky-900/20 bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-sky-900/20 text-sm font-semibold text-foreground/80">
            All Clients ({CLIENTS.length})
          </div>
          <ul className="max-h-[32rem] overflow-y-auto">
            {CLIENTS.map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => selectClient(c.slug)}
                  className={`w-full text-left px-4 py-3 border-b border-sky-900/10 transition-colors ${
                    selectedSlug === c.slug ? "bg-sky-600/15 text-foreground" : "text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  <p className="font-medium text-sm">{c.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{c.tag} · {c.category}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {client && (
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl border border-sky-900/20 bg-card p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "Manrope, sans-serif" }}>
                    {client.name}
                  </h2>
                  <p className="text-muted-foreground text-sm mt-1">{client.shortDescription}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Link
                    to={getClientPath(client.slug)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-500/30 text-sky-300 text-xs hover:bg-sky-900/20"
                  >
                    Case Study
                  </Link>
                  <a
                    href={client.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-sky-500/30 text-sky-300 text-xs hover:bg-sky-900/20"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Site
                  </a>
                </div>
              </div>

              <dl className="grid grid-cols-2 gap-4 text-sm mb-6">
                <div>
                  <dt className="text-muted-foreground">Category</dt>
                  <dd className="text-foreground">{client.category}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Website</dt>
                  <dd className="text-sky-300 truncate">{client.url}</dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Services</dt>
                  <dd className="text-foreground">{client.services.join(", ")}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-xl border border-sky-900/20 bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground mb-4">Contact & Notes</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Contact Email</label>
                    <input
                      value={form.contactEmail}
                      onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-sky-900/30 text-foreground text-sm focus:outline-none focus:border-sky-500/50"
                      placeholder="client@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-muted-foreground mb-1">Contact Phone</label>
                    <input
                      value={form.contactPhone}
                      onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-background border border-sky-900/30 text-foreground text-sm focus:outline-none focus:border-sky-500/50"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-muted-foreground mb-1">Internal Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 rounded-lg bg-background border border-sky-900/30 text-foreground text-sm focus:outline-none focus:border-sky-500/50 resize-none"
                    placeholder="Project notes, billing preferences, etc."
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-600 text-white text-sm font-semibold hover:bg-sky-500 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
