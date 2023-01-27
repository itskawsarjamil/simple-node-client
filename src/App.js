import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleSubmit = (e) => {
    const name = e.target.name.value;
    const passion = e.target.passion.value;

    const user = { name, passion };
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log("post fetch data:", data);
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch(err => console.error(err));
  }
  return (
    <div className="App">
      <div>
        <form onSubmit={handleSubmit}>
          <br />
          <input type="text" name='name' placeholder='name' required />
          <input type="text" required name='passion' placeholder='passion' />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      {
        users.map((user, idx) => (
          <p style={{ border: "2px solid red" }} key={idx}>name: {user.name}, Passion: {user.passion}</p>
        ))
      }
    </div>
  );
}

export default App;
