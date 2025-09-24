export { auth, logoutThis, logoutAll, verify } from "./auth";
export { getToken, createToken, setTokens, deleteTokens, isLoggedIn } from "./token";

export { getSpecificLessons, editSpecificLesson, editHomework } from "./lesson";
export { getGroupedStudentNotes, getGroupedTeacherNotes, editNote } from "./note";
export { editParent, editStudent, editTeacher } from "./person";
export { editKlass, editSchool, editSchoolPreview, editSchoolPhoto, removeSchoolPreview, removeSchoolPhoto, editSchoolWithKlasses, editSchoolWithTimetable } from "./school";
export { completeTask } from "./subject";
export { editAvatar, removeAvatar } from "./user";