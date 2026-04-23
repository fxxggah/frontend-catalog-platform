"use client";

import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, Layout, Zap, ShoppingBag, Smartphone, Globe, ShieldCheck } from 'lucide-react';
import Link from "next/link";

// --- SUB-COMPONENTES INTERNOS ---

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
    {/* Elementos Decorativos de Fundo */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px]" />
    </div>

    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-xs font-black uppercase tracking-[0.2em] text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          Lançamento: Versão 2.0 disponível
        </div>

        <h1 className="text-5xl md:text-8xl font-playfair font-black text-slate-900 tracking-tight mb-8 leading-[0.95]">
          Sua vitrine com o <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600">toque premium.</span>
        </h1>

        <p className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed font-medium">
          O Katallo transforma a desordem do seu WhatsApp em um fluxo de vendas profissional. Organize produtos, encante clientes e receba pedidos prontos.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center">
          <button className="group px-10 py-5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-slate-200 flex items-center gap-2 hover:scale-[1.02]">
            Começar Gratuitamente
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-10 py-5 bg-white border border-slate-200 hover:border-indigo-200 hover:text-indigo-600 text-slate-700 rounded-2xl font-bold text-lg transition-all">
            Ver demonstração
          </button>
        </div>

        {/* Mockup Preview */}
        <div className="mt-24 relative w-full max-w-6xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-3xl"></div>
          <div className="relative bg-slate-900 rounded-[2.5rem] p-2 border border-slate-200/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] overflow-hidden transition-transform duration-700 hover:scale-[1.01]">
            <div className="aspect-[16/9] bg-slate-800 rounded-[2rem] flex flex-col items-center justify-center overflow-hidden border border-slate-700">
              <div className="w-full h-8 bg-slate-800/50 border-b border-slate-700 flex items-center px-4 gap-1.5">
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <div className="w-2 h-2 rounded-full bg-slate-600" />
                <div className="w-2 h-2 rounded-full bg-slate-600" />
              </div>
              <div className="flex-grow flex items-center justify-center">
                <p className="text-slate-500 font-playfair italic text-lg opacity-50 tracking-widest">Dashboard Experience Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Problem = () => (
  <section className="py-32 bg-white">
    <div className="container mx-auto px-6 text-center mb-24">
      <h2 className="text-4xl md:text-6xl font-playfair font-black text-slate-900 mb-6 tracking-tight">Vender online não <br />deve ser um trabalho braçal.</h2>
      <p className="text-slate-500 text-lg font-medium max-w-xl mx-auto">O amadorismo custa caro para o seu negócio. Profissionalize sua vitrine em minutos.</p>
    </div>
    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-12">
      {[
        { t: "Vendas Perdidas", d: "Clientes que desistem por não encontrarem preços ou tamanhos rápido.", icon: <Zap className="text-amber-500" /> },
        { t: "Trabalho Repetitivo", d: "Pare de enviar as mesmas fotos dezenas de vezes. Seu catálogo fala por você.", icon: <Layout className="text-indigo-600" /> },
        { t: "Falta de Credibilidade", d: "Uma loja sem vitrine digital passa menos segurança. Transmita confiança instantânea.", icon: <ShieldCheck className="text-emerald-600" /> }
      ].map((p, i) => (
        <div key={i} className="group p-12 bg-slate-50 rounded-[3rem] hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500 border border-transparent hover:border-slate-100">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            {p.icon}
          </div>
          <h3 className="text-2xl font-playfair font-black mb-4 text-slate-900 tracking-tight">{p.t}</h3>
          <p className="text-slate-500 leading-relaxed font-medium">{p.d}</p>
        </div>
      ))}
    </div>
  </section>
);

const Features = () => (
  <section className="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 my-8 overflow-hidden relative shadow-2xl">
    <div className="container mx-auto px-10">
      <div className="grid lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div>
            <h2 className="text-5xl md:text-7xl font-playfair font-black mb-8 leading-[1.1] tracking-tight">
              Feito para quem <span className="italic text-indigo-400">vende rápido.</span>
            </h2>
            <p className="text-slate-400 text-xl font-medium">A tecnologia que as grandes marcas usam, agora acessível para o seu negócio.</p>
          </div>
          <div className="space-y-10">
            {[
              { t: "Categorias Inteligentes", d: "Organize por cores, coleções ou promoções. O cliente acha o que quer em 2 cliques.", icon: <Globe size={20} /> },
              { t: "Checkout via WhatsApp", d: "Receba o pedido completo com foto, preço e variação direto no seu chat.", icon: <ShoppingBag size={20} /> },
              { t: "Gestão Mobile First", d: "Gerencie seu estoque enquanto toma um café. Interface otimizada para celular.", icon: <Smartphone size={20} /> }
            ].map((f, i) => (
              <div key={i} className="flex gap-8 group">
                <div className="flex-shrink-0 w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center text-indigo-400 border border-slate-700 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-2xl font-playfair font-bold mb-2 tracking-tight">{f.t}</h4>
                  <p className="text-slate-400 text-lg leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="relative aspect-[4/5] bg-gradient-to-b from-slate-800 to-slate-900 rounded-[4rem] border border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Simulação de um Card de Produto Minimal */}
            <div className="w-64 bg-white rounded-3xl p-4 transform rotate-6 shadow-2xl">
              <div className="aspect-square bg-slate-100 rounded-2xl mb-4" />
              <div className="h-4 w-3/4 bg-slate-200 rounded-full mb-2" />
              <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE PRINCIPAL ---

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 bg-slate-900 group-hover:bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold transition-all duration-500 group-hover:rotate-[360deg] shadow-lg shadow-slate-200">
              K
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900 uppercase">Katallo</span>
          </div>

          <nav className="hidden lg:flex items-center gap-12 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-indigo-600 transition-colors">Produtos</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Preços</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Cases</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Sobre</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-bold text-slate-900 hover:text-indigo-600 transition-colors mr-4">
              Entrar
            </Link>
            <Link href="/login">
              <button className="px-8 py-3.5 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold text-sm transition-all shadow-xl shadow-slate-200 active:scale-95">
                Criar Minha Loja
              </button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <Problem />
        <Features />

        {/* CTA FINAL PREMIUM */}
        <section className="py-40 bg-white text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-slate-50 rounded-[4rem] p-16 md:p-32 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-100/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

              <h2 className="text-5xl md:text-7xl font-playfair font-black text-slate-900 mb-10 leading-tight tracking-tight relative z-10">
                Pronta para elevar o <br />nível do seu negócio?
              </h2>
              <button className="relative z-10 group px-12 py-7 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black text-2xl transition-all hover:scale-105 shadow-[0_20px_50px_rgba(79,70,229,0.3)] active:scale-95">
                Começar agora grátis
              </button>
              <p className="mt-10 text-slate-400 font-bold tracking-[0.2em] uppercase text-[10px] relative z-10">
                Sem cartão de crédito • Setup em 2 minutos
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">K</div>
              <span className="text-xl font-black text-slate-900">KATALLO</span>
            </div>
            <p className="text-slate-500 max-w-sm font-medium text-lg leading-relaxed">
              Elevando o padrão do comércio local com tecnologia de ponta e design focado em conversão.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8">Navegação</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Preços</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Blog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 mb-8">Suporte</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Termos de Uso</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-24 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 text-sm font-medium">© 2026 Katallo Tecnologias Ltda. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <div className="w-5 h-5 bg-slate-100 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer" />
            <div className="w-5 h-5 bg-slate-100 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer" />
            <div className="w-5 h-5 bg-slate-100 rounded-full hover:bg-indigo-100 transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}