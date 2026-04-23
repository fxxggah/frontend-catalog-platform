"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Save, 
  UploadCloud, 
  Image as ImageIcon, 
  Loader2, 
  Check, 
  X, 
  Trash2,
  Sparkles
} from "lucide-react";

import { productService } from "@/services/productService";
import { imageService } from "@/services/imageService";
import type { ProductResponse } from "@/types";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BackButton } from "@/components/admin/BackButton";

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storeSlug = params.storeSlug as string;
  const productId = Number(params.id);

  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  async function load() {
    try {
      const data = await productService.getProductById(storeSlug, productId);
      setProduct(data);
      setName(data.name);
      setPrice(String(data.price));
    } catch (error) {
      console.error("Erro ao carregar produto", error);
    }
  }

  useEffect(() => {
    if (storeSlug && productId) load();
  }, [storeSlug, productId]);

  async function handleSave() {
    if (!product) return;
    setIsSaving(true);
    try {
      await productService.updateProduct(storeSlug, product.id, {
        name,
        description: product.description,
        price: Number(price),
        categoryId: product.categoryId,
        visible: product.visible,
      });
      router.push(`/admin/${storeSlug}/products`);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      await imageService.uploadProductImage(storeSlug, productId, file);
      await load();
    } finally {
      setIsUploading(false);
    }
  }

  if (!product) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-slate-300" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 py-8">
      <div className="flex items-center justify-between">
        <BackButton href={`/admin/${storeSlug}/products`} />
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
          <Sparkles size={12} />
          Editor de Catálogo
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Coluna da Esquerda: Imagens */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <Label className="text-xs font-black uppercase tracking-widest text-slate-500">Galeria de Imagens</Label>
            
            <div className="grid grid-cols-2 gap-3">
              {product.images?.map((img) => {
                const optimized = img.imageUrl.replace("/upload/", "/upload/w_400,q_auto,f_auto/");
                return (
                  <div key={img.id} className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-100 bg-white">
                    <img src={optimized} alt="" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                       {/* Aqui você poderia adicionar um botão de delete no futuro */}
                       <ImageIcon className="text-white opacity-50" size={24} />
                    </div>
                  </div>
                );
              })}
              
              {/* Dropzone/Upload Button */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 transition-all hover:border-indigo-300 hover:bg-indigo-50/50"
              >
                {isUploading ? (
                  <Loader2 className="animate-spin text-indigo-600" />
                ) : (
                  <>
                    <UploadCloud className="text-slate-400" size={24} />
                    <span className="text-[10px] font-bold uppercase text-slate-500">Adicionar</span>
                  </>
                )}
              </button>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleUpload} 
              className="hidden" 
              accept="image/*"
            />
          </div>
        </div>

        {/* Coluna da Direita: Dados */}
        <Card className="lg:col-span-3 border-none bg-white shadow-[0_32px_64px_-15px_rgba(0,0,0,0.05)] rounded-[2.5rem]">
          <CardHeader className="p-8 md:p-10 border-b border-slate-50">
            <CardTitle className="text-2xl font-black text-slate-900">Detalhes do Produto</CardTitle>
          </CardHeader>
          
          <CardContent className="p-8 md:p-10 space-y-8">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-slate-400">Nome Público</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-lg transition-all"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price" className="text-xs font-black uppercase tracking-widest text-slate-400">Preço de Venda (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white text-lg transition-all"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleSave} 
                disabled={isSaving}
                className="flex-1 h-14 rounded-2xl bg-slate-900 text-base font-bold shadow-xl shadow-slate-200 transition-all hover:scale-[1.02]"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : (
                  <span className="flex items-center gap-2">
                    <Save size={18} /> Salvar Alterações
                  </span>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="h-14 w-14 rounded-2xl border-slate-100 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all"
              >
                <X size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}