import { Typography } from "@mui/material"
import { fetchCity, fetchSchools } from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { NavigationContainer, SchoolTable } from "@/components";

export default async function Page() {
  const [schools, city] = await Promise.all([fetchSchools(), fetchCity()])
  const t = await getTranslations('schools');

  return <NavigationContainer segments={[]} last={t('list')}>
    <Typography variant='h4'>{t('list')}</Typography>
    <SchoolTable schools={schools} country={city.region.country} />
  </NavigationContainer>
}