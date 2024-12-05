import Database from "../Database/index.js";
import quizModel from "./quizModel.js";

export function findQuizzesForCourse(courseId) {
  return quizModel.find({ course: courseId });
}
export function createQuiz(quiz) {
  if (!quiz.hasOwnProperty("questions") || !Array.isArray(quiz.questions)) {
    quiz.questions = [];
  }
  delete quiz._id
  return quizModel.create(quiz);
}
export function deleteQuiz(quizId) {
  return quizModel.deleteOne({ _id: quizId });
}
export function updateQuiz(quizId, quizUpdates) {
  return quizModel.updateOne({ _id: quizId }, quizUpdates);
}
export function publishQuiz(quizId) {
  return quizModel.updateOne({ _id: quizId }, { publish: true });
}
export function unpublishQuiz(quizId) {
  return quizModel.updateOne({ _id: quizId }, { publish: false });
}