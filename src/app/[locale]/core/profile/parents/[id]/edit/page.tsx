import { fetchParent } from "@/utils/api";
import { Editor } from "./editor";
import { ParentEditorContext } from "@/providers";
import { EditorProvider } from "@/providers";
import { editParent } from "@/app/actions/person";
import { NavigationContainer } from "@/components";

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params;
  const parent = await fetchParent(id)
  const segments = [{label: `${parent.user.name} ${parent.user.surname}`, href: `profile/parents/${parent.id}`}]

  return <NavigationContainer segments={segments} last='edit'>
    <EditorProvider value={{
      Context: ParentEditorContext,
      initial: parent,
      action: editParent,
      segments
    }}>
      <Editor />
    </EditorProvider>
  </NavigationContainer>
}