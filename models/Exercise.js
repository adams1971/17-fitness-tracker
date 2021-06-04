const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now(),
    },
    exercises: [
      {
        type: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        duration: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
        },
        reps: {
          type: Number,
        },
        sets: {
          type: Number,
        },
        distance: {
          type: Number,
        },
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

exerciseSchema.virtual("totalDuration").get(function() {
  return this.exercises.reduce((total, exercise) => {
    return total + exercise.duration;
  },0);
})

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
