import './workout.css';
export default function Workout({ exercises, changeExercises, addExercise, removeExercise }) {



  return (
    <>
      <div className="workout-container">
        {exercises.map((exercise, index) => (
          <div key={index} className="workout-row">
            <div className="exercise-field exercise-name">
              <label>Workout</label>
              <select value={exercise.name} name="name" onChange={(e) => changeExercises(index, e)}>
                {[...Array(31)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div className="exercise-field">
              <label>Sets</label>
              <input type="number" name="sets" placeholder="0" value={exercise.sets} onChange={(e) => changeExercises(index, e)} />
            </div>
            <div className="exercise-field">
              <label>Reps</label>
              <input type="number" name="reps" placeholder="0" value={exercise.reps} onChange={(e) => changeExercises(index, e)} />
            </div>
            {exercises.length > 1 && (
              <button type="button" className="icon-btn danger-btn" onClick={() => removeExercise(index)}>X</button>
            )}
          </div>
        ))}
        <button type="button" className="add-exercise-btn" onClick={addExercise}>+ Add exercise</button>
      </div>
      
    </>
  );
}



