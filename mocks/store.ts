import type { Store } from "@/types"

export const mockStore: Store = {
  id: 1,
  name: "Bella Moda",
  slug: "bella-moda",
  logo: "/logo.png",
  primaryColor: "#c9a96e",
  secondaryColor: "#1a1a1a",
  tertiaryColor: "#f5f5f5",
  whatsappNumber: "5511999999999",
  instagram: "@bellamoda",
  facebook: "bellamoda",
  address: "Rua das Flores, 123 - Centro, Sao Paulo - SP",
  googleMapsLink: "https://maps.google.com",
  template: "fashion",
}

export const mockStores: Store[] = [mockStore]
