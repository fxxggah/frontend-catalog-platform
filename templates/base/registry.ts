import type { StoreTemplateModule } from "./types";
import { minimalTemplate } from "../minimal";

// Aqui você adiciona novos templates futuramente
// import { clienteATemplate } from "../clients/cliente-a";

const templateRegistry: Record<string, StoreTemplateModule> = {
  minimal: minimalTemplate,

  // exemplos futuros:
  // "cliente-a": clienteATemplate,
};

export function getTemplate(templateName?: string): StoreTemplateModule {
  if (!templateName) return minimalTemplate;

  return templateRegistry[templateName] || minimalTemplate;
}