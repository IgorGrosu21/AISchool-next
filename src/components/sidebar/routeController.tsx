'use client'

import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

export function RouteController() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname.includes('core')) {
      router.push('/')
    }
  }, [pathname, router])

  return <></>
}