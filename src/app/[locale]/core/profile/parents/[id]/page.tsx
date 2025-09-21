import { errorHandler, fetchParent } from "@/utils/api";
import { Profile, Students } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const [parentRaw, status] = await fetchParent(id)
  const parent = await errorHandler(parentRaw, status)

  return <Profile user={parent.user} headerChildren={<></>}>
    <Students students={parent.students} />
  </Profile>
}