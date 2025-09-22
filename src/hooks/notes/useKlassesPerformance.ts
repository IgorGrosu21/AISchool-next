'use client'

import { useCallback, useMemo } from "react"

export function useKlassesPerformance(bars: Array<{slug: string, values: string[]}>) {
  const roundToHundreeds = useCallback((val: number, q: number) => {
    return Math.round(val / q * 100) / 100
  }, [])

  const data = useMemo(() => {
    const data = []

    for (const bar of bars) {
      let sum = 0;
      let count = 0;
      for (const value of bar.values) {
        if (value !== '' && !value.includes('a')) {
          sum += parseInt(value)
          count++
        }
      }
      data.push({
        slug: bar.slug,
        performance: roundToHundreeds(sum, count)
      })
    }

    return data
  }, [bars, roundToHundreeds])

  return data
}