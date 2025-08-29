'use client'

import { useSubscriptionsContext } from '@/providers';
import { Button, FormControl, FormControlLabel, MenuItem, Radio, RadioGroup, Rating, Select, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GroupsDiscount } from './groupsDiscount';

export function Plans() {
  const { type, setType } = useSubscriptionsContext()
  const [plan, setPlan] = useState(3)
  const t = useTranslations('subscriptions.plans');

  const plans = useMemo(() => [
    { name: 'monthly', price: 150, discount: '', benefit: 3 },
    { name: 'quarter', price: 250, discount: '-16%', benefit: 4 },
    { name: 'semester', price: 600, discount: '-33%', benefit: 5 },
    { name: 'yearly', price: 1000, discount: '-45%', benefit: 7 },
    { name: 'forever', price: 3600, discount: '-75%', benefit: 10 }
  ].map(plan => ({
    ...plan,
    price: type === 'group' ? plan.price / 2 : plan.price
  })), [type])

  return <Stack gap={4} sx={{p: 4, flex: 1}}>
    <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'space-between'}}>
      <Typography variant='h5' color='primary'>{t('title')}</Typography>
        <Select value={type} onChange={e => setType(e.target.value as 'solo' | 'group')}>
        <MenuItem value='solo'>{t('user_type.solo')}</MenuItem>
        <MenuItem value='group'>{t('user_type.group')}</MenuItem>
      </Select>
    </Stack>
    <FormControl>
      <RadioGroup value={plan} onChange={e => setPlan(Number(e.target.value))} name='plan'>
        <AnimatePresence mode="wait">
          <motion.div
            key={type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ 
              duration: 0.4,
              ease: "easeInOut"
            }}
          >
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
                    <FormControlLabel value={i} control={<Radio color={type === 'group' ? 'secondary' : 'primary'} />} label='' />
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
                    <Rating name='read-only' value={plan.benefit} max={plan.benefit > 5 ? plan.benefit : 5} readOnly sx={{
                      flexGrow: 0,
                      '& .MuiRating-iconFilled': {
                        color: type === 'group' ? 'secondary.main' : 'primary.main',
                      },
                    }} />
                  </TableCell>
                </TableRow>)}
              </TableBody>
            </Table>
          </motion.div>
        </AnimatePresence>
      </RadioGroup>
    </FormControl>
    <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'space-between'}}>
      <GroupsDiscount />
      <Button variant='contained'>{t('submit')}</Button>
    </Stack>
  </Stack>
}