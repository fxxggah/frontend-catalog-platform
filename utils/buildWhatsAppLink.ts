import type { CartItem } from "@/types";
import { formatPrice } from "./formatPrice";

type BuildWhatsAppLinkParams = {
  whatsappNumber: string;
  items: CartItem[];
};

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppLink({
  whatsappNumber,
  items,
}: BuildWhatsAppLinkParams): string {
  const normalizedPhone = normalizePhone(whatsappNumber);

  const lines = [
    "Olá, gostaria de comprar:",
    "",
    ...items.map(
      (item) =>
        `${item.quantity}x ${item.name} - ${formatPrice(item.price * item.quantity)}`
    ),
    "",
    `Total: ${formatPrice(
      items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    )}`,
  ];

  const message = lines.join("\n");

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}