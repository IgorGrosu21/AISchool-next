import { Plans } from './plans'
import { Pluses } from './pluses'
import { NavigationContainer } from '@/components'
import { getTranslations } from 'next-intl/server'

export default async function Page() {
  const t = await getTranslations('subscriptions')

  return <NavigationContainer segments={[]} last={t('plural')}>
    <Plans />
    <Pluses />
  </NavigationContainer>
}