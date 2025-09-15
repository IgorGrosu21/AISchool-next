import { fetchUserRoutes } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function Page() {
  const userRoutes = await fetchUserRoutes()

  redirect(userRoutes.profileLink ?? '/core')
}