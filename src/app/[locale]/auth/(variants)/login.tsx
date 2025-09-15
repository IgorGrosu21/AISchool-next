'use client'

import { FormState } from "@/app/actions/auth";
import { AuthFields } from "../(util)";

export function Login({state}: {state: FormState}) {
  return <AuthFields state={state} />
}