import * as attemptsDao from "./dao.js";

export default function AttemptRoutes(app) {
  // Quiz Attempts routes
  app.get("/api/quizz/:quizId/attempt/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    const status = await attemptsDao.getLatestAttempt(quizId, userId);
    // console.log("get latest, sending: ", JSON.stringify(status));
    res.send(status);
  });
  app.post("/api/quizz/:quizId/attempt/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    const status = await attemptsDao.startQuizAttempt(quizId, userId);
    // console.log("post attempt, sending: ", JSON.stringify(status));
    res.send(status.attempts[status.attempts.length - 1]);
  });
  app.put("/api/quizz/:quizId/attempt/:userId", async (req, res) => {
      const { quizId, userId } = req.params;
      const answers = req.body;
      const didUpdateAttempt = await attemptsDao.updateAttemptAnswers(quizId, userId, answers);
      res.sendStatus(didUpdateAttempt ? 200 : 400);
  });
  app.post("/api/quizz/:quizId/attempt/:userId/submit", async (req, res) => {
      const { quizId, userId } = req.params;
      const maybeSubmittedAttempt = await attemptsDao.submitAttempt(quizId, userId);
      if (maybeSubmittedAttempt) {
        res.send(maybeSubmittedAttempt);
      } else {
        res.sendStatus(400);
      }
  });
  app.get("/api/quizz/:quizId/attempts/:userId", async (req, res) => {
      const { quizId, userId } = req.params;
      res.send(await attemptsDao.getAllAttempts(quizId, userId));
  });
}
