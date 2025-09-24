import { errorHandler, fetchUserRoutes } from "@/requests";
import { redirect } from '@/i18n';

export default async function Page() {
  const [userRoutesRaw, status] = await fetchUserRoutes()
  const userRoutes = await errorHandler(userRoutesRaw, status)

  await redirect(userRoutes.profileLink ?? '/core')
}