export type { EditorContextType } from "./base";
export {
  SpecificLessonEditorContext, useSpecificLessonEditorContext,
  HomeworkEditorContext, useHomeworkEditorContext,
} from "./lesson";
export {
  ParentEditorContext, useParentEditorContext,
  StudentEditorContext, useStudentEditorContext,
  TeacherEditorContext, useTeacherEditorContext
} from "./person";
export {
  KlassEditorContext, useKlassEditorContext,
  SchoolEditorContext, useSchoolEditorContext,
  SchoolWithKlassesEditorContext, useSchoolWithKlassesEditorContext,
  SchoolWithTimetableEditorContext, useSchoolWithTimetableEditorContext
} from "./school";