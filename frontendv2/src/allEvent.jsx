import './allEvent.css';
export default function AllEvents({ workouts, showAllEvents }) {
  return (
    showAllEvents && (
      <div className="all-events">
        <h2>All Workouts</h2>
        <div className="allworkout-container">
          {workouts.length === 0 ? (
            <p>No workouts added yet.</p>
          ) : (
          workouts.map((w, index) => (
            <div key={index} className="workout-item">
              <h3>{w.title}</h3>
              <p>Date: {w.date}</p>
              <div className="exercises-list">
                {w.exercises.map((exercise, index) => (
                  <div key={index} className="exercise-item">
                    <p className="exercise-name exercise-field">{exercise.name || "Unnamed"}</p>
                    <p className="exercise-stats exercise-field">
                      {exercise.sets} sets × {exercise.reps} reps
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    )  
);
}

