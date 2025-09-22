'use client'

import { ILessonName, ILessonTimeName } from "@/utils/interfaces";
import { Stack, Typography, Divider, type StackProps } from "@mui/material";
import { Link } from '@/i18n';

interface LessonProps extends StackProps {
  lessonTime: ILessonTimeName;
  lesson?: ILessonName;
  showSubject?: boolean;
  disableLink?: boolean;
}

export function Lesson({lessonTime, lesson, children, showSubject = true, disableLink = false, ...props}: LessonProps) {
  return <Stack gap={2}>
    {lessonTime.order > 0 && <Divider />}
    <Stack {...props} direction={props.direction ?? 'row'} gap={props.gap ?? 1}>
      <Typography variant='h6'>{lessonTime.order + 1}.</Typography>
      <Stack gap={2} sx={{flex: 1}}>
        {showSubject && <Stack direction='row' sx={{justifyContent: 'space-between', alignItems: 'center'}}>
          {disableLink ? <Typography variant='h6' color='primary'>
            {lesson?.subject.verboseName}
          </Typography> : <Link href={`/core/manuals/${lesson?.manualSlug}`}>
            <Typography variant='h6' color='primary'>{lesson?.subject.verboseName}</Typography>
          </Link>}
          <Typography>{lessonTime.starting} - {lessonTime.ending}</Typography>
        </Stack>}
        {children}
      </Stack>
    </Stack>
  </Stack>
}