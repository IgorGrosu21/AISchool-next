export { sendAuthUser, sendLogoutRequest, sendVerificationEmail } from "./auth";
export { fetchCountryNames, fetchRegionNames, fetchCityNames, fetchCity } from "./country";
export {
  fetchLessonNames, fetchLesson,
  fetchSpecificLessonNames, fetchSpecificLesson, sendSpecificLesson, deleteSpecificLesson, sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  fetchHomework, sendHomework, deleteHomework, sendHomeworkPhoto, deleteHomeworkPhoto,
  fetchStudentNotes, fetchTeacherNotes, sendNote
} from "./lesson";
export { fetchManuals, fetchManual, fetchModule, fetchTopic, sendTask } from "./manual";
export { fetchParent, sendParent, fetchStudent, sendStudent, fetchTeacher, sendTeacher } from "./person";
export {
  fetchSchoolNames, fetchSchools, fetchSchool, sendSchool, fetchSchoolWithKlasses, sendSchoolWithKlasses, fetchSchoolWithTimetable, sendSchoolWithTimetable,
  sendSchoolPreview, deleteSchoolPreview, sendSchoolPhoto, deleteSchoolPhoto, fetchSchoolLessonTimeNames,
  fetchKlass, sendKlass, fetchTeacherKlasses
} from "./school";
export { fetchSubjectsNames, fetchTeachedSubjects, fetchStudiedSubjects } from "./subject";
export { fetchUserRoutes, createUser, sendAvatar, deleteAvatar } from "./user";