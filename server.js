const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const routes = require("./routes");
const path = require("path");
const Exercise = require("./models/Exercise");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

//connects to mongo DB and creates mongo object from imports above
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// app.use(routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "exercise.html"));
});

app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "stats.html"));
});

app.post("/api/workouts", (req, res) => {
  Exercise.create({})
    .then((data) => res.json(data))
    .catch((e) => console.error(e));
});

app.get("/api/workouts", (req, res) => {
  Exercise.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
});

app.put("/api/workouts/:id", ({ body, params }, res) => {
  console.log("body put", body);

  Exercise.findByIdAndUpdate(params.id, { $push: { exercises: body } },
     {new: true, runValidators: true})
    .then(updatedWorkout => res.json(updatedWorkout))
    .catch((e) => console.error("put error", e));
});

app.get("api/workouts/range", (req, res) => {
  Exercise.find().then((workout) => res.json(workout));
  console
    .log("you are in workout", workout)
    .catch((e) => console.error("get error", e));
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}`);
});
