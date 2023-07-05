const express = require("express");

const app = express();
require("dotenv").config();
var cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { quizRouter } = require("./routes/quiz.route");
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("users page");
});

app.use("/auth", userRouter);
app.use("/quizzes", quizRouter);


app.listen(process.env.PORT, async () => {
    try {
      await connection;
      console.log("connected to DB");
    } catch (error) {
      console.log(error);
    }
  
    console.log(`server running on ${process.env.PORT}`);
  });