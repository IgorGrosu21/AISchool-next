import { redirect } from './navigation';
import { getLocale } from 'next-intl/server';

export async function redirectWithLocale(href: string) {
  const locale = await getLocale();

  return redirect({
    href,
    locale: locale
  });
}