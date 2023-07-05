const express = require("express");
const { authenticate } = require("../middleware/authentication");
const Quiz = require("../model/quiz.model");

const quizRouter = express.Router();

// Create a new quiz
quizRouter.post("/", authenticate, async (req, res) => {
  try {
    const { title, questions } = req.body;
    const creator = req.user.userId;
    console.log(creator);

    const newQuiz = new Quiz({ title, questions, creator });

    await newQuiz.save();

    res.json({ message: "Quiz created successfully", quiz: newQuiz });
  } catch (error) {
    console.error("Quiz creation error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get All Quiz
quizRouter.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("creator", "username");

    res.json(quizzes);
  } catch (error) {
    console.error("Quiz retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get Single Quiz
quizRouter.get("/:id", async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate("creator", "username")
      .populate("participants.participant", "username");

    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("Quiz retrieval error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = { quizRouter };
