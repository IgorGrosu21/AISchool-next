import { fetchTeacher } from '@/utils/api';
import { Experience, Profile, Subjects, TeacherPositions } from '@/components';

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const teacher = await fetchTeacher(id)

  return <Profile user={teacher.user} headerChildren={<Experience experience={teacher.experience} />}>
    <Subjects subjectNames={teacher.subjectNames} />
    <TeacherPositions positions={teacher.workPlaces} />
  </Profile>
}