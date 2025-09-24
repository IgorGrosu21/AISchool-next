'use server'

import { IBalance } from '@/interfaces';
import { LinearProgress, Stack, Typography } from '@mui/material';
import { Currency } from './currency';
import { Balance } from './balance';

interface ModuleHeaderProps {
  title: string
  progress?: number
  balance?: IBalance
  currency?: {
    stone: keyof IBalance
    quantity: number
  }
}

export async function ModuleHeader({title, progress, balance, currency}: ModuleHeaderProps) {
  return <Stack direction='row' sx={{justifyContent: 'space-between'}}>
    <Stack gap={2}>
      <Typography variant='h4' sx={{color: 'secondary.main'}}>{title}</Typography>
      {progress !== undefined && <Stack direction='row' gap={2} sx={{alignItems: 'center'}}>
        <LinearProgress sx={{flex: 1}} variant='determinate' color='secondary' value={progress * 100} />
        <Typography variant='h6' sx={{color: 'secondary.main'}}>{progress * 100}%</Typography>
      </Stack>}
    </Stack>
    {balance && <Balance balance={balance} showText={false} hideZeros />}
    {currency && <Currency {...currency} />}
  </Stack>
}