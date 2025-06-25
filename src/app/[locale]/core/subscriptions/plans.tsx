'use client'

import { Button, FormControl, FormControlLabel, Radio, RadioGroup, Rating, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

export function Plans() {
  const [plan, setPlan] = useState(1)
  const t = useTranslations('subscriptions.plans');

  const plans = useMemo(() => [
    { name: 'monthly', price: 150, discount: '', benefit: 4 },
    { name: 'yearly', price: 1000, discount: '-45%', benefit: 5 },
    { name: 'forever', price: 3600, discount: '-75%', benefit: 7 }
  ], [])

  return <Stack gap={4} sx={{p: 4, flex: 1}}>
    <Typography variant='h5' color='primary'>{t('title')}</Typography>
    <FormControl>
      <RadioGroup value={plan} onChange={e => setPlan(Number(e.target.value))} name='plan'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align='right'>{t('duration')}</TableCell>
              <TableCell align='right'>{t('price')}</TableCell>
              <TableCell align='right'>{t('discount')}</TableCell>
              <TableCell align='right'>{t('benefit')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {plans.map((plan, i) => <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                <FormControlLabel value={i} control={<Radio />} label='' />
              </TableCell>
              <TableCell align='right'>
                <Typography>{t(plan.name)}</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography>{plan.price}L</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography>{plan.discount}</Typography>
              </TableCell>
              <TableCell align='right'>
                <Rating name='read-only' value={plan.benefit} max={plan.benefit === 7 ? 7 : 5} readOnly sx={{
                  '& .MuiRating-iconFilled': {
                    color: 'primary.main',
                  },
                }} />
              </TableCell>
            </TableRow>)}
          </TableBody>
        </Table>
      </RadioGroup>
    </FormControl>
    <Button sx={{alignSelf: 'flex-end'}} variant='contained'>{t('submit')}</Button>
  </Stack>
}