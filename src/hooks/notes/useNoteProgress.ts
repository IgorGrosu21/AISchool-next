'use client'

import { useCallback, useMemo } from "react"

export function useNoteProgress(points: Array<{date: string, value: string}>) {
  const roundToHundreeds = useCallback((val: number, q: number) => {
    return Math.round(val / q * 100) / 100
  }, [])

  const data = useMemo(() => {
    const data = []

    let sum = 0;
    let count = 0;
    for (const point of points) {
      if (point.value !== '' && !point.value.includes('a')) {
        sum += parseInt(point.value)
        count++
        data.push({
          date: point.date,
          value: roundToHundreeds(sum, count)
        })
      }
    }
    return data
  }, [points, roundToHundreeds])
  
  return data
}
