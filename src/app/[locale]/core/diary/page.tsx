import { fetchUserRoutes } from "@/utils/api";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await fetchUserRoutes()

  return redirect(user.diaryLink ?? '/core')
}