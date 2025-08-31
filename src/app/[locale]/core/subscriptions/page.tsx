import { SubscriptionsProvider } from '@/providers'
import { NavigationContainer } from '@/components'
import { getTranslations } from 'next-intl/server'
import { Stack, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material'
import { Plans } from './plans'
import { GroupsDiscount } from './groupsDiscount'
import { ShowTeacherPrices } from './showTeacherPrices'
import { Navigation } from '@mui/icons-material'

export default async function Page() {
  const t = await getTranslations('subscriptions')

  const soloPluses = t('pluses.solo').split(';')
  const groupPluses = t('pluses.group').split(';')

  return <NavigationContainer segments={[]} last={t('plural')}>
    <SubscriptionsProvider value={{type: 'solo'}}>
      <Stack gap={4}>
        <Plans />
        <Stack gap={4} direction='row'>
          <Stack gap={4} sx={{p: 4, flex: 1}}>
            <Typography variant='h5' color='primary'>{t('pluses.about')}</Typography>
            <Divider />
            <Typography variant='h6'>{t('pluses.desc')}</Typography>
          </Stack>
          <Stack gap={4} sx={{p: 4, flex: 1}}>
            <Typography variant='h5' color='primary'>{t('pluses.advantages')}</Typography>
            <Divider />
            <List sx={{ width: '100%', maxWidth: 360 }}>
              {soloPluses.map((plus, i) => <ListItem key={i} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Navigation color='primary' sx={{transform: 'rotate(90deg)'}} />
                  </ListItemIcon>
                  <ListItemText primary={plus} />
                </ListItemButton>
              </ListItem>)}
            </List>
          </Stack>
          <Stack gap={4} sx={{p: 4, flex: 1}}>
            <Typography variant='h5' color='primary'>{t('pluses.group_details.title')}</Typography>
            <Divider />
            <Typography>{t('pluses.group_details.desc')}</Typography>
            <GroupsDiscount />
            <List sx={{ width: '100%', maxWidth: 360 }}>
              {groupPluses.map((plus, i) => <ListItem key={i} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <Navigation color='primary' sx={{transform: 'rotate(90deg)'}} />
                  </ListItemIcon>
                  <ListItemText primary={plus} />
                </ListItemButton>
              </ListItem>)}
            </List>
            <Box sx={{flex: 1}} />
            <ShowTeacherPrices />
          </Stack>
        </Stack>
      </Stack>
    </SubscriptionsProvider>
  </NavigationContainer>
}