import { errorHandler, fetchSchoolWithTimetable, fetchSubjectsNames } from "@/requests"
import { editSchoolWithTimetable } from '@/app/actions';
import { SchoolWithTimetableEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer, TimetableStepperEditor } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;
  const [[schoolRaw, schoolStatus], [subjectsRaw, subjectsStatus]] = await Promise.all([fetchSchoolWithTimetable(schoolSlug), fetchSubjectsNames()])
  const school = await errorHandler(schoolRaw, schoolStatus)
  const subjects = await errorHandler(subjectsRaw, subjectsStatus)
  const t = await getTranslations('schools');
  const segments = [
    {label: t('list'), href: 'schools'},
    {label: school.name, href: schoolSlug},
    {label: t('timetable'), href: 'timetable'},
  ]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolWithTimetableEditorContext,
      initial: school,
      action: editSchoolWithTimetable,
      segments
    }}>
      <TimetableStepperEditor subjects={subjects} />
    </EditorProvider>
  </NavigationContainer>
}