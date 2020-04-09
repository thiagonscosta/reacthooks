import React, { useState, useEffect } from 'react';

function App() {

  useEffect(async () => {
    const res = await fetch('https://api.github.com/users/thiagonscosta/repos');
    const data = await res.json();
    setMyRepos(data);
  }, []);

  const [repoName, setRepoName] = useState('');

  const [myRepos, setMyRepos] = useState([]);

  const [repositories, setRepositories] = useState([
    {_id: 1, name: 'repo-1'},
    {_id: 2, name: 'repo-2'},
    {_id: 3, name: 'repo-3'},
  ]);

  function handleAddRepository(e) {
    e.preventDefault();
    let id = repositories.length + 1;
    let newRepo = { _id: id, name: repoName };
    setRepositories([...repositories, newRepo ]);
    setRepoName('');
  }

  return (
    <div>
      <p>Adicionar novo repositório</p>
      <form onSubmit={handleAddRepository}>
        <input 
          type="text" 
          placeholder="Nome"
          value={repoName} 
          onChange={e => setRepoName(e.target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
      {repositories.map(r => (
        <li key={r._id}>{r.name}</li>
      ))}

      <p>My Repos</p>
      {myRepos.map(r => (
        <li key={r.id}>{r.name}</li>
      ))}
    </div>

  );
}

export default App;
