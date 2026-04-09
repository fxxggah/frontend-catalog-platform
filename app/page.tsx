import { redirect } from "next/navigation"
import { getDefaultStore } from "@/services/storeService"

export default async function HomePage() {
  const store = await getDefaultStore()
  redirect(`/${store.slug}`)
}
