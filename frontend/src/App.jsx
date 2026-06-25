import { useState } from 'react'

import './App.css'

function App() {
  const [ username, setUsername] = useState('')
  const [ password, setPassword] = useState('')
  const [isSubmit, setIsSubmit] = useState(false);


  function submit(e) {
    e.preventDefault();
    fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // e.g. redirect, store token, show error, etc.
      })
      .catch((err) => console.error(err));
    setIsSubmit(true);

      
  }


  if (isSubmit) {
  //  return <DemoApp />;
  }
  return (
    <>
      <section id="center">
        <form id="login-form" onSubmit={submit}>
          <div id="login-section" className="login-section">
            <h1>Workout Tracker</h1>

            <div>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            <div>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
            <button type="submit">Login</button>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}

export default App
