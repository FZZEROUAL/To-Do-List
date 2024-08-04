import React, { useState, useEffect, useMemo } from 'react';
import './App.css';

const App = () => {
  const [a] = useState([
    { id: 1, T: 'Tache1', Tache: 'Développement du frontend ', durée: 2 },
    { id: 2, T: 'Tache2', Tache: 'Développement du backend', durée: 3 },
    { id: 3, T: 'Tache3', Tache: 'Gestion de la base de données', durée: 4 }
  ]);

  const [taches, settaches] = useState(a);
  const [nouvelletaches, setnouvelletaches] = useState({ T: '', Tache: '', durée: 0 });
  const [Annulation, setAnnulation] = useState([]);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('Toutes'); 

  const SelectionDeCheckbox = (id) => {
    if (Annulation.includes(id)) {
      setAnnulation(Annulation.filter((x) => x !== id));
    } else {
      setAnnulation([...Annulation, id]);
    }
  };

  useEffect(() => {
    if (message) {
      alert(message);
      setMessage('');
    }
  }, [message]);

  const Ajoutertache = () => {
    if (nouvelletaches.T && nouvelletaches.Tache && nouvelletaches.durée) {
      settaches((x) => [...x, { ...nouvelletaches, id: x.length + 1 }]);
      setnouvelletaches({ T: '', Tache: '', durée: 0 });
      setMessage('Tâche ajoutée.');
    }                                                 
  };

  const Supprimertache = (id) => {
    settaches(taches.filter((x) => x.id !== id));
    setMessage('Tâche supprimée.');
  };

  
  const filteredTaches = useMemo(() => {
    if (filter === 'Toutes') {
      return taches;
    } else if (filter === 'Complétées') {
      return taches.filter((x) => Annulation.includes(x.id));
    } else if (filter === 'Non Complétées') {
      return taches.filter((x) => !Annulation.includes(x.id));
    }
  }, [taches, Annulation, filter]);

  return (
    <div className="container">
      <h1>To-Do List</h1> <br />
    
      <div>
        <button onClick={() => setFilter('Toutes')}>Toutes</button>
        <button onClick={() => setFilter('Complétées')}>Complétées</button>
        <button onClick={() => setFilter('Non Complétées')}>Non Complétées</button>
      </div>

    
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={nouvelletaches.T}
          onChange={(e) => setnouvelletaches({ ...nouvelletaches, T: e.target.value })}
          placeholder=""
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={nouvelletaches.Tache}
          onChange={(e) => setnouvelletaches({ ...nouvelletaches, Tache: e.target.value })}
          placeholder="Tâches"
        />
      </div>

      <div className="row mb-3">
        <div className="col">
          <input
            type="number"
            className="form-control"
            value={nouvelletaches.durée}
            onChange={(e) => setnouvelletaches({ ...nouvelletaches, durée: parseInt(e.target.value) })}
            placeholder="durée"
          />
        </div>
      </div>

      <div className="col-auto">
        <button className="btn btn-primary" onClick={Ajoutertache}>AJOUTER UNE TÂCHE</button>
      </div>

   
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Tâches</th>
            <th>La durée</th>
            <th>SUPPRIMER</th>
          </tr>
        </thead>
        <tbody>
          {filteredTaches.map((x) => (
            <tr key={x.id}>
              <td style={Annulation.includes(x.id) ? { textDecoration: 'line-through' } : {}}>
                <input
                  type="checkbox"
                  checked={Annulation.includes(x.id)}
                  onChange={() => SelectionDeCheckbox(x.id)}
                />
                {x.T}
              </td>
              <td>{x.Tache}</td>
              <td>{x.durée} jours</td>

              <td>
                <button className="btn btn-danger" onClick={() => Supprimertache(x.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
