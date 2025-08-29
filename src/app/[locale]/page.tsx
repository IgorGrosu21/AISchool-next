import { isLoggedIn } from "@/app/actions/token";
import { redirect } from "next/navigation";

export default async function Page() {
  const loggedIn = await isLoggedIn()

  if (loggedIn) {
    redirect('/core')
  }
  
  redirect('/auth')
}