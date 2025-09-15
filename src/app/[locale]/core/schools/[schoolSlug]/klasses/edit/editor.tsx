'use client'

import { Button, Grid2, Stack, Typography } from '@mui/material'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { useKlassListEditor } from '@/hooks'

export function Editor() {
  const { grouped, removeKlass, addKlass } = useKlassListEditor()

  return <Grid2 container spacing={8} columns={2}>
    {grouped.map((group, i) => <Grid2 size={1} key={group.grade}>
      <Stack direction={{xs: 'column', md: 'row'}} gap={2} sx={{alignItems: 'center'}}>
        {group.klasses.map((klass, j) => <Button variant='contained' key={j} sx={{
          borderRadius: '15%',
          width: 75,
          aspectRatio: 1,
          justifyContent: 'center',
          transition: '0.5s',
          [':hover']: {
            opacity: 0.2,
            ['& svg']: {
              opacity: 1
            }
          }
        }} onClick={() => removeKlass(i, klass)}>
          <Typography variant='h6' sx={{color: 'primary.contrastText', textAlign: 'center'}}>{klass.grade}{klass.letter}</Typography>
          <RemoveCircle fontSize='large' sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            opacity: 0,
            transition: '0.5s'
          }} />
        </Button>)}
        <Button variant='contained' disabled={group.klasses.length >= 5} sx={{
          display: 'flex',
          borderRadius: '15%',
          width: 75,
          aspectRatio: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }} onClick={() => addKlass(i)}>
          <AddCircle fontSize='large' sx={{color: 'primary.contrastText'}} />
        </Button>
      </Stack>
    </Grid2>)}
  </Grid2>
}