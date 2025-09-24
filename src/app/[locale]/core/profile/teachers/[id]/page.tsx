import { errorHandler, fetchTeacher } from '@/requests';
import { Experience, Profile, Subjects, TeacherPositions } from '@/components';

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const [teacherRaw, status] = await fetchTeacher(id)
  const teacher = await errorHandler(teacherRaw, status)

  return <Profile user={teacher.user} headerChildren={<Experience experience={teacher.experience} />}>
    <Subjects subjects={teacher.subjects} />
    <TeacherPositions positions={teacher.workPlaces} />
  </Profile>
}