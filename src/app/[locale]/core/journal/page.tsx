import { errorHandler, fetchUserRoutes } from "@/utils/api";
import { redirect } from '@/i18n';

export default async function Page() {
  const [userRoutesRaw, status] = await fetchUserRoutes()
  const userRoutes = await errorHandler(userRoutesRaw, status)

  await redirect(userRoutes.journalLink ?? '/core')
}