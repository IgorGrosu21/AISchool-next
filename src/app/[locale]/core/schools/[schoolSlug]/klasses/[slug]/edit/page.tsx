import { errorHandler, fetchKlass } from '@/utils/api';
import { Editor } from './editor';
import { EditorProvider } from '@/providers';
import { editKlass } from '@/app/actions/school';
import { KlassEditorContext } from '@/providers';
import { getTranslations } from 'next-intl/server';
import { NavigationContainer } from '@/components';

export default async function Page({ params }: { params: Promise<{schoolSlug: string, slug: string}> }) {
  const { schoolSlug, slug } = await params;
  const [klassRaw, status] = await fetchKlass(schoolSlug, slug)
  const klass = await errorHandler(klassRaw, status)
  const t = await getTranslations('klasses')
  const segments = [
    {label: t('school_list'), href: 'schools'},
    {label: klass.school.name, href: schoolSlug},
    {label: t('list'), href: 'klasses'},
    {label: `${klass.grade}${klass.letter} ${t(`profiles.${klass.profile}`)}`, href: slug},
  ]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: KlassEditorContext,
      initial: klass,
      action: editKlass,
      segments
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}