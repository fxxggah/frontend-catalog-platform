"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { 
  UserPlus, 
  Copy, 
  Check, 
  Trash2, 
  Mail, 
  Clock, 
  Loader2, 
  ExternalLink,
  ShieldCheck
} from "lucide-react";

import { inviteService } from "@/services/inviteService";
import type { StoreInviteResponse } from "@/types";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function InvitesPage() {
  const params = useParams();
  const storeSlug = params.storeSlug as string;

  const [invites, setInvites] = useState<StoreInviteResponse[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastInviteLink, setLastInviteLink] = useState("");
  const [copiedId, setCopiedId] = useState<number | string | null>(null);

  async function load() {
    const data = await inviteService.getStoreInvites(storeSlug);
    setInvites(data);
  }

  async function handleCreate() {
    if (!email.trim()) return;

    try {
      setIsLoading(true);
      const invite = await inviteService.createInvite(storeSlug, {
        email: email.trim(),
      });

      const link = `${window.location.origin}/invite/accept?token=${invite.token}`;
      setLastInviteLink(link);
      setEmail("");
      await load();
      toast.success("Convite gerado com sucesso!");
    } catch (error) {
      toast.error("Erro ao gerar convite.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleCopyLink(link: string, id: number | string) {
    await navigator.clipboard.writeText(link);
    setCopiedId(id);
    toast.success("Link copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  }

  async function handleDelete(id: number) {
    // Substituir por um modal de confirmação do shadcn no futuro
    if (!confirm("Deseja realmente revogar este acesso?")) return;

    try {
      await inviteService.cancelInvite(storeSlug, id);
      toast.success("Convite cancelado.");
      load();
    } catch (error) {
      toast.error("Erro ao cancelar convite.");
    }
  }

  useEffect(() => {
    if (storeSlug) load();
  }, [storeSlug]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 px-4 py-6 md:px-6">
      
      {/* Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <UserPlus size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-playfair font-black text-slate-900 tracking-tight">Equipe</h1>
            <p className="text-sm text-slate-500 italic font-medium">Convide colaboradores para gerenciar sua loja.</p>
          </div>
        </div>
      </div>

      {/* Seção de Novo Convite */}
      <Card className="border-none shadow-[0_20px_50px_rgba(0,0,0,0.04)] rounded-[2rem] overflow-hidden bg-white">
        <CardContent className="p-8 md:p-10">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <Input
                  placeholder="E-mail do colaborador"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 pl-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all text-base"
                />
              </div>
              <Button 
                onClick={handleCreate} 
                disabled={isLoading || !email}
                className="h-14 px-8 rounded-2xl bg-slate-900 hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-50"
              >
                {isLoading ? <Loader2 className="animate-spin mr-2" /> : <UserPlus className="mr-2" size={18} />}
                Gerar Convite
              </Button>
            </div>

            {lastInviteLink && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                <div className="rounded-3xl border border-indigo-100 bg-indigo-50/30 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2">
                      <ExternalLink size={12} /> Link Gerado Recentemente
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleCopyLink(lastInviteLink, 'last')}
                      className="h-8 text-indigo-600 hover:bg-indigo-100 rounded-lg font-bold text-xs"
                    >
                      {copiedId === 'last' ? <Check size={14} className="mr-1" /> : <Copy size={14} className="mr-1" />}
                      COPIAR
                    </Button>
                  </div>
                  <p className="break-all font-mono text-sm text-slate-600 bg-white/80 p-4 rounded-xl border border-white">
                    {lastInviteLink}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lista de Convites Ativos */}
      <div className="space-y-4">
        <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Convites Pendentes</h2>
        
        {invites.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {invites.map((invite) => {
              const inviteLink = invite.token ? `${window.location.origin}/invite/accept?token=${invite.token}` : "";

              return (
                <Card key={invite.id} className="group border-none bg-white shadow-sm hover:shadow-md transition-all rounded-[1.5rem] overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{invite.email}</h3>
                        <div className="flex items-center gap-2 text-slate-400">
                          <Clock size={12} />
                          <span className="text-[11px] font-medium tracking-tight">
                            Expira em {new Date(invite.expiresAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg text-[10px] font-black">
                         PENDENTE
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {inviteLink && (
                        <Button
                          variant="secondary"
                          className="flex-1 h-10 rounded-xl bg-slate-50 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 border-none font-bold text-xs"
                          onClick={() => handleCopyLink(inviteLink, invite.id)}
                        >
                          {copiedId === invite.id ? <Check size={14} /> : <Copy size={14} className="mr-2" />}
                          {copiedId === invite.id ? "Copiado" : "Copiar Link"}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        className="h-10 w-10 rounded-xl text-slate-300 hover:text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(invite.id)}
                      >
                        <Trash2 size={18} />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-[3rem] border border-dashed border-slate-100">
            <ShieldCheck size={48} className="text-slate-200 mb-4" />
            <p className="text-slate-400 font-medium text-sm italic">Sua equipe ainda está vazia.</p>
          </div>
        )}
      </div>
    </div>
  );
}