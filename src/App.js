import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from "react-icons/md";

function App() {

  const [myRepos, setMyRepos] = useState([]);

  useEffect(() => {
    async function fetchMyRepos() {
      const res = await fetch('https://api.github.com/users/thiagonscosta/repos');
      const data = await res.json();
      setMyRepos(data);
    }
    fetchMyRepos();
  }, []);

  function handleFavorite(id) {
    const favRepos = myRepos.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    });

    setMyRepos(favRepos);
  }

  useEffect(() => {

  }, [myRepos])

  const [repoName, setRepoName] = useState('');

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
    <main>
      <div className="content">
        <div className="content-wrap">
          <h4>Adicionar novo repositório</h4>
          <form onSubmit={handleAddRepository}>
            <input
              type="text"
              placeholder="Nome"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
            <button type="submit">Adicionar</button>
          </form>
          <ul>
            {repositories.map((r) => (
              <li key={r._id}>{r.name}</li>
            ))}
          </ul>
        </div>

        <div className="content-wrap">
          <h4>My Repos</h4>
          <ul className="myrepos-list">
            {myRepos.map((r) => (
              <li key={r.id}>
                <div>
                  <p>{r.name}</p>
                  <button onClick={() => handleFavorite(r.id)}>
                    {r.favorite && <MdFavorite color="#FF0000"/>}{" "}
                    {!r.favorite && <MdFavoriteBorder />}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}

export default App;
