'use server'

import { ErrorPage } from "@/components";

export default async function Page() {
  return <ErrorPage code={401} />
}