import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    attempts: [
      {
        start: Number,
        submitted: Boolean,
        submittedAt: Number,
        score: Number,
        grade: Number,
        answers: [],
      },
    ],
  },
  { collection: "attempts" }
);
export default schema;
