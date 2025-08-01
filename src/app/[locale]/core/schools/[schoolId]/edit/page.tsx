import { fetchSchool } from '@/utils/api';
import Container from './container';
import { editSchool } from '@/app/actions/school';
import { SchoolEditorContext } from '@/providers';
import { EditorProvider } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolId: string}> }) {
  const { schoolId } = await params;
  const school = await fetchSchool(schoolId)
  const t = await getTranslations('schools');
  const segments = [{label: t('list'), href: 'schools'}, {label: school.name, href: schoolId}]
  
  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: SchoolEditorContext,
      initial: school,
      action: editSchool,
      segments
    }}>
      <Container />
    </EditorProvider>
  </NavigationContainer>
}