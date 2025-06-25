export type { EditorContextType } from "./base";
export {
  SpecificLessonEditorContext, useSpecificLessonEditorContext,
} from "./lesson";
export {
  StudentEditorContext, useStudentEditorContext,
  TeacherEditorContext, useTeacherEditorContext
} from "./person";
export {
  KlassEditorContext, useKlassEditorContext,
  SchoolEditorContext, useSchoolEditorContext,
  SchoolWithKlassesEditorContext, useSchoolWithKlassesEditorContext,
  SchoolWithTimetableEditorContext, useSchoolWithTimetableEditorContext
} from "./school";