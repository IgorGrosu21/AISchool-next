import { fetchSchoolWithTimetable } from "@/utils/api"
import { editSchoolWithTimetable } from '@/app/actions/school';
import { SchoolWithTimetableEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer, TimetableStepperEditor } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolId: string}> }) {
  const { schoolId } = await params;
  const school = await fetchSchoolWithTimetable(schoolId)
  const t = await getTranslations('schools');
  const segments = [
    {label: t('list'), href: 'schools'},
    {label: school.name, href: schoolId},
    {label: t('timetable'), href: 'timetable'},
  ]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolWithTimetableEditorContext,
      initial: school,
      action: editSchoolWithTimetable,
      segments
    }}>
      <TimetableStepperEditor />
    </EditorProvider>
  </NavigationContainer>
}