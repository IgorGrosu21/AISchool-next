import { redirect } from 'next/navigation';
import { getYear, getMonth } from 'date-fns';

type PageParams = {
  id: string,
  schoolSlug: string,
  klassSlug: string,
  subjectSlug: string,
}

export default async function Page({ params }: { params: Promise<PageParams> }) {
  const { id, schoolSlug, klassSlug, subjectSlug } = await params;

  const currentDate = new Date(2025, 2, 25);
  const currentYear = getYear(currentDate);
  const currentMonth = getMonth(currentDate) + 1;

  let semester: string;
  
  if (currentMonth >= 9 && currentMonth <= 12) {
    semester = `${currentYear}.09.01-${currentYear}.12.31`;
  } else {
    semester = `${currentYear}.01.01-${currentYear}.05.31`;
  }

  redirect(`/core/journal/teachers/${id}/${schoolSlug}/${klassSlug}/${subjectSlug}/${semester}`);
}
