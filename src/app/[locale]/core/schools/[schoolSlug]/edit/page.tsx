import { errorHandler, fetchSchool } from '@/requests';
import { Editor } from './editor';
import { editSchool } from '@/app/actions';
import { SchoolEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string}> }) {
  const { schoolSlug } = await params;
  const [schoolRaw, status] = await fetchSchool(schoolSlug)
  const school = await errorHandler(schoolRaw, status)
  const t = await getTranslations('schools');
  const segments = [{label: t('list'), href: 'schools'}, {label: school.name, href: schoolSlug}]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolEditorContext,
      initial: school,
      action: editSchool,
      segments
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}