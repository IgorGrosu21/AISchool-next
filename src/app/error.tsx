'use client'

import { useRouter } from "@/i18n";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.push('/error')
  }, [router])
}