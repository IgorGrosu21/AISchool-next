import { Ad, NavigationContainer } from "@/components";
import { Stack } from "@mui/material";

export default async function Page() {
  return <NavigationContainer segments={[]} last=''>
    <Ad>
      <Stack></Stack>
    </Ad>
  </NavigationContainer>
}