const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  day: {
    type: Date,
    default: Date.now(),
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: true,
      },

      name: {
        type: String,
        trim: true,
        required: true,
      },

      duration: {
        type: Number,
      },

      weight: {
        type: Number,
      },

      reps: {
        type: Number,
        default: 0,
      },

      sets: {
        type: Number,
        default: 0,
      },

      distance: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
