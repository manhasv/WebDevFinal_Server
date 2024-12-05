import * as quizDao from "./dao.js";

export default function QuizRoutes(app) {
    //Quiz routes
    app.delete("/api/quizz/:quizId", async (req, res) => {
        const { quizId } = req.params;
        await quizDao.deleteQuiz(quizId);
        res.sendStatus(204);
    });
    app.put("/api/quizz/:quizId", async (req, res) => {
        const { quizId } = req.params;
        const quizUpdates = req.body;
        await quizDao.updateQuiz(quizId, quizUpdates);
        res.sendStatus(204);
    });
}