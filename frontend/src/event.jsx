import  { useState } from 'react';
import Workout from './workout.jsx'
import'./workout.css';
export default function AddEvent({ initialDate = '', onAddEvent, onCancel }) {
    const [title , setTitle] = useState('');
    const [date , setDate] = useState(initialDate);
   const [exercises, setExercises] = useState([{ name: '', sets: 0, reps: 0 }]);


    const changeExercise = (index,e) => {
      const { name, value } = e.target;

      setExercises((prevData) => 
        prevData.map((exercise, i) =>
          i === index ? { ...exercise, [name]: value } : exercise
        )
      );
    };

    const addExercise = () => {
      setExercises((prevData) => [...prevData, { name: '', sets: 0, reps: 0 }]);
    };

    const removeExercise = (index) => {
      setExercises((prevData) => prevData.filter((_, i) => i !== index));
    };


    const handleSubmit = (e) => {
      e.preventDefault();
      if (!title.trim() || !date)return;
      onAddEvent({ title, date, exercises });
    setTitle('');
    setDate('');
    setExercises([{ name: '', sets: 0, reps: 0 }]);
    
    };
    
    return (
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
              <input id="event-date" type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />
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
            <button type="submit">Save event</button>
            {onCancel && (
              <button type="button" className="secondary-btn" onClick={onCancel}>
                Cancel
              </button>
            )}
            </div>
          </div>
        </form>
      </div>
    );
   
  }