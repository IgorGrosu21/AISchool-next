'use server'

import { IBalance } from "@/interfaces"
import { Box, Stack, StackProps, Typography } from "@mui/material"
import { getTranslations } from "next-intl/server";
import { Currency } from "./currency";

interface BalanceProps extends StackProps {
  balance: IBalance,
  columns?: number,
  showText?: boolean
  hideZeros?: boolean
}

export async function Balance({balance, columns = 4, showText = true, hideZeros = false, ...props}: BalanceProps) {
  const t = await getTranslations('students')

  let iterable = Object.keys(balance).map(stone => ({
    stone: stone,
    quantity: balance[stone]
  }))

  if (hideZeros) {
    iterable = iterable.filter(entry => entry.quantity > 0)
  }

  return <Stack {...props} direction={props.direction ?? 'row'} gap={props.gap ?? 2}>
    {showText && <Typography variant='h6'>{t('balance')}:</Typography>}
    <Box sx={{display: 'grid', gridTemplateColumns: 'auto '.repeat(hideZeros ? iterable.length : columns), gap: 2}}>
      {iterable.map((entry, i) => <Currency key={i} stone={entry.stone} quantity={entry.quantity} />)}
    </Box>
  </Stack>
}