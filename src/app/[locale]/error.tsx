'use client'

import { useRouter } from "@/i18n";

export default function Page() {
  const router = useRouter()
  router.push('/error')
}