"use client";

import React from 'react';
import { Check, ArrowRight, MessageCircle, Layout, Zap, ShoppingBag } from 'lucide-react';
import Link from "next/link";

// --- SUB-COMPONENTES INTERNOS ---

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50 via-white to-white">
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
          </span>
          Lançamento: Versão 2.0 disponível
        </div>

        <h1 className="text-5xl md:text-7xl font-playfair font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
          Sua vitrine digital com o <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">toque premium que sua loja merece.</span>
        </h1>

        <p className="text-xl text-slate-600 mb-12 max-w-2xl leading-relaxed">
          O Katallo transforma o caos do seu WhatsApp em um fluxo de vendas profissional. Organize produtos, encante clientes e receba pedidos prontos.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full justify-center items-center">
          <button className="group px-8 py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-2xl shadow-slate-200 flex items-center gap-2">
            Começar Gratuitamente
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-2xl font-bold text-lg transition-all">
            Ver demonstração
          </button>
        </div>

        <div className="mt-20 relative w-full max-w-6xl mx-auto">
          <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 rounded-[3rem] blur-3xl"></div>
          <div className="relative bg-white rounded-[2.5rem] border border-slate-200/50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] overflow-hidden">
            <div className="aspect-video bg-slate-50 flex items-center justify-center group cursor-pointer">
              <div className="text-slate-400 font-playfair italic group-hover:scale-105 transition-transform">
                [Mockup High-End da Dashboard Katallo]
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
    <div className="container mx-auto px-6 text-center mb-20">
      <h2 className="text-4xl md:text-5xl font-playfair font-bold text-slate-900 mb-6">Chega de perder vendas por desorganização</h2>
      <p className="text-slate-500 text-lg">O amadorismo custa caro para o seu negócio.</p>
    </div>
    <div className="container mx-auto px-6 grid md:grid-cols-3 gap-10">
      {[
        { t: "Vendas Perdidas", d: "Clientes que desistem por não encontrarem preços ou tamanhos rápido.", icon: <Zap className="text-red-500" /> },
        { t: "Trabalho Repetitivo", d: "Horas gastas enviando as mesmas fotos e respondendo as mesmas dúvidas.", icon: <Layout className="text-indigo-600" /> },
        { t: "Falta de Crédito", d: "Uma loja sem vitrine digital passa menos segurança para novos compradores.", icon: <ShoppingBag className="text-violet-600" /> }
      ].map((p, i) => (
        <div key={i} className="group p-10 bg-slate-50 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-500 border border-transparent hover:border-slate-100">
          <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            {p.icon}
          </div>
          <h3 className="text-2xl font-playfair font-bold mb-4 text-slate-900">{p.t}</h3>
          <p className="text-slate-600 leading-relaxed font-medium">{p.d}</p>
        </div>
      ))}
    </div>
  </section>
);

const Features = () => (
  <section className="py-32 bg-slate-900 text-white rounded-[4rem] mx-4 my-8 overflow-hidden relative">
    <div className="container mx-auto px-10">
      <div className="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl md:text-6xl font-playfair font-bold mb-10 leading-tight">Feito para quem vende rápido.</h2>
          <div className="space-y-10">
            {[
              { t: "Categorias Inteligentes", d: "Organize por cores, coleções ou promoções. O cliente acha o que quer em 2 cliques." },
              { t: "Checkout via WhatsApp", d: "Receba o pedido completo com foto, preço e variação direto no seu chat." },
              { t: "Gestão Mobile First", d: "Gerencie seu estoque enquanto toma um café. Interface otimizada para celular." }
            ].map((f, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                  <Check size={20} />
                </div>
                <div>
                  <h4 className="text-2xl font-playfair font-bold mb-2">{f.t}</h4>
                  <p className="text-slate-400 text-lg">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-[100px]"></div>
          <div className="relative aspect-square bg-slate-800 rounded-[3rem] border border-slate-700 flex items-center justify-center">
            <span className="text-slate-500 italic font-playfair text-xl">[Preview Produto Premium]</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- COMPONENTE PRINCIPAL ---

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-slate-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-slate-900 group-hover:bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold transition-colors">K</div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">KATALLO</span>
          </div>

          <nav className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500 uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Produtos</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Preços</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Cases</a>
          </nav>

          <Link href="/login">
            <button className="px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all shadow-xl shadow-slate-200">
              Acessar Painel
            </button>
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <Problem />
        <Features />

        {/* CTA FINAL PREMIUM */}
        <section className="py-32 bg-white text-center">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto bg-slate-50 rounded-[3rem] p-16 md:p-24 border border-slate-100">
              <h2 className="text-4xl md:text-6xl font-playfair font-bold text-slate-900 mb-8 leading-tight">
                Dê o próximo passo na sua jornada digital.
              </h2>
              <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-2xl transition-all hover:scale-105 shadow-2xl shadow-indigo-100">
                Criar minha vitrine grátis
              </button>
              <p className="mt-8 text-slate-400 font-medium tracking-wide uppercase text-xs italic">
                Sem cartão de crédito • Instalação instantânea
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-12 text-center md:text-left">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-black text-slate-900 mb-6">KATALLO</div>
            <p className="text-slate-500 max-w-sm font-medium">Elevando o padrão do comércio digital local com tecnologia de ponta e design focado em conversão.</p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Produto</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Funcionalidades</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Segurança</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">API</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-slate-900">Suporte</h4>
            <ul className="space-y-4 text-slate-500 font-medium">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Email</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}