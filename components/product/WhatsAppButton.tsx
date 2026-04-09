import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { generateWhatsAppLink } from "@/utils/formatPrice"

type WhatsAppButtonProps = {
  phone: string
  productName: string
  storeName: string
  className?: string
  size?: "default" | "lg"
}

export function WhatsAppButton({
  phone,
  productName,
  storeName,
  className,
  size = "default",
}: WhatsAppButtonProps) {
  const message = `Ola! Tenho interesse no produto "${productName}" que vi no site ${storeName}.`
  const link = generateWhatsAppLink(phone, message)

  return (
    <Button
      asChild
      variant="outline"
      size={size}
      className={className}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-5 w-5 mr-2" />
        Comprar via WhatsApp
      </a>
    </Button>
  )
}
