import logo from './logo.svg';
import './App.css';
import {useCallback, useEffect, useState} from "react";

function App() {
  const [data, setData] = useState([]);
  const [item, setItem] = useState(null)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users').then((response) => response.json()).then((data) => { setData(data) });
  }, []);

  const handleItemClick = useCallback((id) => {
    if (id === item?.id) {
      setItem(null);
      return;
    }

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`).then((response) => response.json()).then((data) => { console.log(data); setItem(data); });

  }, [item])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <h2>List</h2>
        <ul>
          {data.map( user => (
                  <li key={user.id}>
                    <button onClick={() => handleItemClick(user.id)}>
                      {user.name}
                    </button>
                    { item?.id === user.id && (
                        <>
                          <p>Email: {item.email}</p>
                          <p>Phone: {item.phone}</p>
                          <p>Website: {item.website}</p>
                        </>
                    )}
                  </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
