import mongoose from "mongoose";
const quizzSchema = new mongoose.Schema(
  {
    title: String,
    questions: [],
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    points: Number,
    availableDate: Date,
    dueDate: Date,
    untilDate: Date,
    numberOfQuestions: Number,
    multipleAttempts: Boolean,
    allowedAttempts: Number,
    description: String,
    type: String,
    shuffleAnswers: Boolean,
    oneQuestionPerPage: Boolean,
    timeLimit: String,
    publish:Boolean,
  },
  { collection: "quizzes" }
);
export default quizzSchema;
