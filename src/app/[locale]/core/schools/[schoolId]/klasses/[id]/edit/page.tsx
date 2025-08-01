import { fetchKlass } from '@/utils/api';
import Container from './container';
import { EditorProvider } from '@/providers';
import { editKlass } from '@/app/actions/school';
import { KlassEditorContext } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolId: string, id: string}> }) {
  const { schoolId, id } = await params;
  const klass = await fetchKlass(schoolId, id)
  const t = await getTranslations('klasses')
  const segments = [
    {label: t('school_list'), href: 'schools'},
    {label: klass.school.name, href: schoolId},
    {label: t('list'), href: 'klasses'},
    {label: `${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`, href: id},
  ]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: KlassEditorContext,
      initial: klass,
      action: editKlass,
      segments
    }}>
      <Container />
    </EditorProvider>
  </NavigationContainer>
}