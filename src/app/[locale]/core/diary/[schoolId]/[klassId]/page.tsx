import { format } from "date-fns";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: Promise<{schoolId: string, klassId: string}> }) {
  const { schoolId, klassId } = await params

  const today = new Date(2025, 2, 13)
  return redirect(`/core/diary/${schoolId}/${klassId}/calendar/${format(today, 'y.M.d')}`)
}