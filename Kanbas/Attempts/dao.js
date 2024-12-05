import model from "./model.js";

export async function startQuizAttempt(quizId, userId) {
  const existingAttempts = await model.findOne({ quiz: quizId, user: userId });

  if (existingAttempts !== null) {
    existingAttempts.attempts.push({
      start: Date.now(),
      submitted: false,
      submittedAt: 0,
      score: 0,
      grade: 0,
      answers: [],
    });
    existingAttempts.save();
    return existingAttempts;
  }

  return model.create({
    quiz: quizId,
    user: userId,
    attempts: [
      {
        start: Date.now(),
        submitted: false,
        submittedAt: 0,
        score: 0,
        grade: 0,
        answers: [],
      },
    ],
  });
}

export async function getLatestAttempt(quizId, userId) {
  const existingAttempts = await model.findOne({ quiz: quizId, user: userId });
  return existingAttempts?.attempts[existingAttempts.attempts.length - 1]; // i hope this gets the last one lol
}

export async function updateAttemptAnswers(quizId, userId, answers) {
  const existingAttempts = await model.findOne({ quiz: quizId, user: userId });
  if (!existingAttempts) {
    return false;
  }

  existingAttempts.attempts[existingAttempts.attempts.length - 1].answers =
    answers;
  existingAttempts.save();
  return true;
}

export async function getAllAttempts(quizId, userId) {
  const existingAttempts = await model.findOne({ quiz: quizId, user: userId });
  return existingAttempts?.attempts;
}

export async function submitAttempt(quizId, userId) {
  const existingAttempts = await model.findOne({ quiz: quizId, user: userId });
  if (!existingAttempts) {
    return false;
  }
  const latestAtt = existingAttempts.attempts[existingAttempts.attempts.length - 1];

  const thisQuiz = (await existingAttempts.populate("quiz")).quiz;

  // Calculate total points
  const totalPoints = thisQuiz.questions.reduce(
    (sum, question) => sum + (question.content.point || 1),
    0
  );

  // Calculate user's score
  let score = 0;
  thisQuiz.questions.forEach((question, index) => {
    const userAnswer = latestAtt.answers[index];
    const correctAnswer = question.content.answer;
    // console.log("userAnswer", userAnswer);
    // console.log("correctAnswer", correctAnswer);

    if (compareAnswers(question.type, userAnswer, correctAnswer)) {
      score += question.content.point || 1;
    }
  });

  const grade = (score / totalPoints) * 100;

  // Update attempt with score and submission status
  latestAtt.submitted = true;
  latestAtt.submittedAt = Date.now();
  latestAtt.score = score;
  latestAtt.grade = grade;

  existingAttempts.save();

  return true;
}

// Helper function to compare answers based on question type
function compareAnswers(questionType, userAnswer, correctAnswer) {
  switch (questionType) {
    case "TRUEFALSE":
      //console.log("userAnswer", userAnswer);
      //console.log("correctAnswer", correctAnswer);
      return userAnswer === correctAnswer;
    case "MULTIPLECHOICE":
      return userAnswer === correctAnswer;
    case "FILLINTHEBLANK":
      if (!Array.isArray(userAnswer) || !Array.isArray(correctAnswer)) {
        return false;
      }
      if (userAnswer.length !== correctAnswer.length) {
        return false;
      }
      return userAnswer.every((ans, idx) => ans === correctAnswer[idx]);
    default:
      return false;
  }
}
