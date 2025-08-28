import { fetchParent } from "@/utils/api";
import { Profile, Students } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const parent = await fetchParent(id)

  return <Profile user={parent.user} headerChildren={<></>}>
    <Students students={parent.students} />
  </Profile>
}