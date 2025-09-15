'use client'

import { IGroupName, ILessonName, ILessonTimeName, ISubjectName } from "@/utils/interfaces";
import { Typography, Breadcrumbs } from "@mui/material";
import { useCallback } from "react";
import { TimetableContainer } from "../container";
import Link from "next/link";
import { Lesson } from "./item";

interface LessonsProps<T> {
  groups: IGroupName[]
  timetable: T[]
  getLessonName: (lessonTime: T) => ILessonName | undefined
}

export function Lessons<T extends ILessonTimeName>({groups, timetable, getLessonName}: LessonsProps<T>) {
  const getGroups = useCallback((subject: ISubjectName) => groups.filter(g => g.subject.id === subject.id), [groups])

  return <TimetableContainer timetable={timetable} render={lessonTime => {
    const lesson = getLessonName(lessonTime)
    const groups = lesson ? getGroups(lesson.subject) : []

    return <Lesson key={lessonTime.order} lessonTime={lessonTime} lesson={lesson}>
      {groups.length === 0 ? <Link href={`/core/teachers/${lesson?.teacher?.id}`}>
        <Typography color='primary'>{lesson?.teacher?.user.surname ?? ''} {lesson?.teacher?.user.name ?? ''}</Typography>
      </Link> : <Breadcrumbs>
        {groups.map((group, k) => <Link key={k} href={`/core/teachers/${group.teacher?.id}`}>
          <Typography color='primary'>{group.teacher?.user.surname ?? ''} {group.teacher?.user.name ?? ''}</Typography>
        </Link>)}
      </Breadcrumbs>}
    </Lesson>
  }} />
}