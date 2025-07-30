export { sendAuthUser, sendLogoutRequest, sendVerificationEmail } from "./auth";
export { fetchCountryNames, fetchRegionNames, fetchCityNames, fetchCity } from "./country";
export {
  fetchSchoolWithTimetable, sendSchoolWithTimetable,
  fetchSpecificLessonNames, fetchSpecificLesson,
  sendSpecificLesson, deleteSpecificLesson, sendSpecificLessonPhoto, deleteSpecificLessonPhoto,
  sendHomework, deleteHomework, sendHomeworkPhoto, deleteHomeworkPhoto
} from "./lesson";
export { fetchStudent, sendStudent, fetchTeacher, sendTeacher } from "./person";
export {
  fetchSchoolNames, fetchSchools, fetchSchool, sendSchool,
  sendSchoolPreview, deleteSchoolPreview, sendSchoolPhoto, deleteSchoolPhoto,
  fetchSchoolWithKlasses, sendSchoolWithKlasses, fetchKlass, sendKlass, fetchKlassDiary
} from "./school";
export { fetchSubjectsNames, fetchSubjects, fetchSubject, fetchModule, fetchTopic, sendTheory } from "./subject";
export { fetchUserRoutes, createUser, sendAvatar, deleteAvatar } from "./user";