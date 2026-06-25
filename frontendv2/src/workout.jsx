import './workout.css';
export default function Workout({ exercises, changeExercises, addExercise, removeExercise }) {

  const exerciseOptions = [
    // Chest
    "Bench Press",
    "Incline Bench Press",
    "Push-Ups",
    "Dumbbell Fly",

    // Back
    "Deadlift",
    "Pull-Ups",
    "Bent-Over Row",
    "Lat Pulldown",

    // Legs
    "Squat",
    "Leg Press",
    "Lunges",
    "Leg Curl",
    "Calf Raise",

    // Shoulders
    "Overhead Press",
    "Lateral Raise",
    "Front Raise",

    // Arms
    "Bicep Curl",
    "Tricep Extension",
    "Hammer Curl",

    // Core
    "Plank",
    "Crunches",
    "Russian Twist",

    // Cardio
    "Running",
    "Cycling",
    "Rowing",
  ];

  return (
    
      <div className="workout-container">
        {exercises.map((exercise, index) => (
          <div key={index} className="workout-row">
            <div className="exercise-field exercise-name">
              <label>Workout</label>
              <select value={exercise.name} name="name" onChange={(e) => changeExercises(index, e)}>
                <option value="">Select an exercise</option>
                {exerciseOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="exercise-field">
              <label>Sets</label>
              <input
                type="number"
                name="sets"
                placeholder="0"
                value={exercise.sets}
                onChange={(e) => changeExercises(index, e)}
              />
            </div>
            <div className="exercise-field">
              <label>Reps</label>
              <input
                type="number"
                name="reps"
                placeholder="0"
                value={exercise.reps}
                onChange={(e) => changeExercises(index, e)}
              />
            </div>
            {exercises.length > 1 && (
              <button type="button" className="icon-btn danger-btn" onClick={() => removeExercise(index)}>
                X
              </button>
            )}
          </div>
        ))}
        <div>
          <button type="button" className="add-exercise-btn" onClick={addExercise}>
            + Add exercise
          </button>
        </div>
      </div>
    
  );
}



