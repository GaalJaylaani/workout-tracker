import { useState } from 'react'
import './App.css'
import './workout.css'
import './allEvent.css'
import Workout from './workout.jsx'
import AllEvents from './allEvent.jsx'

export default function App() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [exercises, setExercises] = useState([{ name: "", sets: 0, reps: 0 }]);
  const [workouts, setWorkouts] = useState([]);
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [allbtn, setAllbtn] = useState(false);
  const changeExercise = (index, e) => {
    const { name, value } = e.target;
    setExercises((prevData) =>
      prevData.map((exercise, i) => (i === index ? { ...exercise, [name]: value } : exercise)),
    );
  };

  const addExercise = () => {
    setExercises((prevData) => [...prevData, { name: "", sets: 0, reps: 0 }]);
  };

  const removeExercise = (index) => {
    setExercises((prevData) => prevData.filter((_, i) => i !== index));
  };

  const onCancel = () => {
    setTitle('');
    setDate('');
    setExercises([{ name: '', sets: 0, reps: 0 }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = exercises.filter(
      (exercise) => exercise.name && exercise.sets > 0 && exercise.reps > 0
    );
    setWorkouts((prevWorkouts) => [...prevWorkouts, { title, date, exercises: valid }]);
    setAllbtn(true);
    onCancel();

  };

  return (
    <>
      <h1>Workout Tracker</h1>
      <div className="event-btn">
      {allbtn && (
        <button className="event-button" onClick={() => setShowAllEvents(!showAllEvents)}>
          All events
        </button>
      )}
      </div>
      <div>
        <div className="add-event-form">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <div className="field-group">
                <label htmlFor="event-title">Event title</label>
                <input
                  id="event-title"
                  type="text"
                  name="title"
                  placeholder="Push day, legs, cardio..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="field-group">
                <label htmlFor="event-date">Date</label>
                <input id="event-date" type="date" name="date" value={date} required={true} onChange={(e) => setDate(e.target.value)} />
              </div>
            </div>
            <div className="exercise-section">
              <div className="section-heading">
                <span>Exercises</span>
                <p>Add sets and reps for each movement.</p>
              </div>
              <Workout
                exercises={exercises}
                changeExercises={changeExercise}
                addExercise={addExercise}
                removeExercise={removeExercise}
              />
              <div className="form-actions">
                <button type="submit">Save workout</button>
                {onCancel && (
                  <button type="button" className="secondary-btn" onClick={() =>
                    onCancel()
                  }>
                    Reset
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
        {/* <div className="saved-exercises">
          <h2>Exercises</h2>
          {displayExercises()}
        </div> */}
      </div>
      <AllEvents workouts={workouts} showAllEvents={showAllEvents} />
    </>
  )
}



