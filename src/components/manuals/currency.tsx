'use server'

import { IBalance } from "@/utils/interfaces";
import { Stack, Typography } from "@mui/material"
import Image from "next/image";

interface CurrencyProps {
  stone: keyof IBalance
  quantity: number
}

export async function Currency({stone, quantity}: CurrencyProps) {
  return <Stack gap={1} direction='row' sx={{alignItems: 'center'}}>
    <Stack sx={{alignItems: 'center', justifyContent: 'center', bgcolor: 'white'}} style={{borderRadius: '50%'}}>
      <Image src={`/images/stones/${stone}.png`} style={{borderRadius: '50%'}} width={25} height={25} alt={stone as string} loading="lazy" />
    </Stack>
    <Typography>{quantity}</Typography>
  </Stack>
}