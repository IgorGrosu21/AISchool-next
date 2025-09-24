import { errorHandler, fetchSchoolWithKlasses } from '@/requests';
import { Editor } from './editor';
import { editSchoolWithKlasses } from '@/app/actions';
import { SchoolWithKlassesEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;
  const [schoolRaw, status] = await fetchSchoolWithKlasses(schoolSlug)
  const school = await errorHandler(schoolRaw, status)
  const t = await getTranslations('klasses');
  const segments = [
    {label: t('school_list'), href: 'schools'},
    {label: school.name, href: schoolSlug},
    {label: t('list'), href: 'klasses'},
  ]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolWithKlassesEditorContext,
      initial: school,
      action: editSchoolWithKlasses,
      segments
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}