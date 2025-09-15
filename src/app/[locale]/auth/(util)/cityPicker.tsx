'use client'

import { ICityName, ICountryName, IRegionName } from '@/utils/interfaces'
import { Stack, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Input } from './input'
import { Select } from './select'
import { useCityPicker, useIsMobile } from '@/hooks'

export function CityPicker() {
  const t = useTranslations('auth.city_picker')
  const isMobile = useIsMobile();
  
  const {
    countries, city,
    isModalOpen,
    tempCountry, tempRegions, tempRegion, tempCities, tempCity,
    setTempCountry, setTempRegion, setTempCity,
    handleOpenModal, handleCloseModal, handleSaveModal, handleCancelModal
  } = useCityPicker() 

  return <>
    <Stack direction='row' gap={2} sx={{alignItems: 'center', justifyContent: 'space-between', flex: 1}}>
      <Typography variant='h6'>
        {t('label')}: {city?.name || t('not_selected')}
      </Typography>
      <Button variant='contained' onClick={handleOpenModal}>
        {t('change')}
      </Button>
    </Stack>
    <Input hidden value={city?.id ?? ''} name='city_id' />
    <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth='sm' fullWidth fullScreen={isMobile}>
      <DialogTitle>
        {t('dialog_title')}
      </DialogTitle>
      <DialogContent>
        <Stack gap={4}>
          <Select<ICountryName>
            name='country'
            options={countries}
            value={tempCountry}
            setValue={setTempCountry}
            renderOption={({key, ...props}, option) => {
              return <Box
                component='li'
                key={key}
                sx={{ 
                  '& > img': { mr: 2, flexShrink: 0 },
                  display: 'flex',
                  alignItems: 'center'
                }}
                {...props}
              >
                <Image loading='lazy' width={40} height={20} src={option.flag} alt='' />
                {option.name}
              </Box>
            }}
          />
          <Select<IRegionName>
            disabled={!tempCountry}
            name='region'
            options={tempRegions}
            value={tempRegion}
            setValue={setTempRegion}
          />
          <Select<ICityName>
            disabled={!tempRegion}
            name='city'
            options={tempCities}
            value={tempCity}
            setValue={setTempCity}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{p: 2, gap: 2}}>
        <Button onClick={handleCancelModal}>
          {t('cancel')}
        </Button>
        <Button onClick={handleSaveModal} variant='contained'>
          {t('save')}
        </Button>
      </DialogActions>
    </Dialog>
  </>
}