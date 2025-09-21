import { redirect } from '@/i18n';
import { getYear, getMonth } from 'date-fns';

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const { id } = await params

  const currentDate = new Date(2025, 2, 25)
  const currentYear = getYear(currentDate)
  const currentMonth = getMonth(currentDate) + 1

  let semester: string;
  
  if (currentMonth >= 9 && currentMonth <= 12) {
    semester = `${currentYear}.09.01-${currentYear}.12.31`;
  } else {
    semester = `${currentYear}.01.01-${currentYear}.05.31`;
  }

  await redirect(`/core/journal/students/${id}/${semester}`);
}
