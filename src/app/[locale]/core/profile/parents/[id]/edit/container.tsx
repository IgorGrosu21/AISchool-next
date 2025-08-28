'use client'

import { ProfileContainer as ParentContainer } from "@/components";
import { useParentEditorContext } from "@/providers";
import { Typography } from "@mui/material";

export default function Container() {
  const { instance: parent, setInstance: setParent } = useParentEditorContext()

  return <ParentContainer user={parent.user} setUser={user => setParent(s => ({...s, user}))}>
    <Typography variant="h4">Soon!</Typography>
  </ParentContainer>
}
