import model from "./model.js";
export async function findCoursesForUser(userId) {
 // console.log("user", userId);
 const enrollments = await model.find({ user: userId }).populate("course");
 // console.log(" users enrollments", enrollments);
 return enrollments.map((enrollment) => enrollment.course);
}
export async function findUsersForCourse(courseId) {
 const enrollments = await model.find({ course: courseId }).populate("user");
 const uniqueUsers = Array.from(
    new Map(enrollments.map((enrollment) => [enrollment.user._id, enrollment.user])).values()
  );

  return uniqueUsers;
}
export function enrollUserInCourse(user, course) {
 return model.create({ user, course });
}
export function unenrollUserFromCourse(user, course) {
 return model.deleteOne({ user, course });
}
