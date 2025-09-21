import { Typography } from "@mui/material"
import { errorHandler, fetchCity, fetchSchools } from "@/utils/api";
import { getTranslations } from "next-intl/server";
import { NavigationContainer, SchoolTable } from "@/components";

export default async function Page() {
  const [[schoolsRaw, schoolsStatus], [cityRaw, cityStatus]] = await Promise.all([fetchSchools(), fetchCity()])
  const schools = await errorHandler(schoolsRaw, schoolsStatus)
  const city = await errorHandler(cityRaw, cityStatus)
  const t = await getTranslations('schools');

  return <NavigationContainer segments={[]} last={t('list')}>
    <Typography variant='h4'>{t('list')}</Typography>
    <SchoolTable schools={schools} country={city.region.country} />
  </NavigationContainer>
}