import { Stack, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Checkbox, ListItemText, Box, Button } from "@mui/material";
import { getTranslations } from "next-intl/server";

export async function Pluses() {
  const t = await getTranslations('subscriptions.pluses');
  
  const soloPluses = t('solo').split(';')
  const groupPluses = t('group').split(';')
  
  return <Stack gap={8} direction='row'>
    <Stack gap={4} sx={{p: 4, flex: 1}}>
      <Typography variant='h5' color='primary'>{t('about')}</Typography>
      <Divider />
      <Typography variant='h6'>{t('desc')}</Typography>
    </Stack>
    <Stack gap={4} sx={{p: 4, flex: 1}}>
      <Typography variant='h5' color='primary'>{t('advantages')}</Typography>
      <Divider />
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {soloPluses.map((plus, i) => <ListItem key={i} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox edge='start' checked disableRipple />
            </ListItemIcon>
            <ListItemText primary={plus} />
          </ListItemButton>
        </ListItem>)}
      </List>
    </Stack>
    <Stack gap={4} sx={{p: 4, flex: 1}}>
      <Typography variant='h5' color='primary'>{t('group_details.title')}</Typography>
      <Divider />
      <Typography>{t('group_details.desc')}</Typography>
      <List sx={{ width: '100%', maxWidth: 360 }}>
        {groupPluses.map((plus, i) => <ListItem key={i} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Checkbox edge='start' checked disableRipple />
            </ListItemIcon>
            <ListItemText primary={plus} />
          </ListItemButton>
        </ListItem>)}
      </List>
      <Divider />
      <Box sx={{flex: 1}} />
      <Stack direction='row' sx={{alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant='h6' color='primary'>{t('group_details.price')}: 500L</Typography>
        <Button variant='contained'>{t('group_details.proceed')}</Button>
      </Stack>
    </Stack>
  </Stack>
}