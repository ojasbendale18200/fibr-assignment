const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswers: [String],
    },
  ],
  participants: [
    {
      participant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      score: Number,
    },
  ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
