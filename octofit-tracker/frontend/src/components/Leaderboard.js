import React, { useEffect, useState } from 'react';

const buildUrl = (endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (apiUrl) {
    return `${apiUrl.replace(/\/+$/, '')}/${endpoint}/`;
  }
  const codeSpaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codeSpaceName) {
    return `https://${codeSpaceName}-8000.app.github.dev/api/${endpoint}/`;
  }
  return `http://localhost:8000/api/${endpoint}/`;
};

const getItems = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.results)) return raw.results;
  return [];
};

const safeCell = (value) => {
  if (value === null || value === undefined) return '-';
  if (typeof value === 'object') {
    if (value.name) return value.name;
    if (value.team) return value.team;
    if (value.username) return value.username;
    try {
      return JSON.stringify(value);
    } catch {
      return '-';
    }
  }
  return value;
};

function Leaderboard() {
  const [items, setItems] = useState([]);
  const url = buildUrl('leaderboard');

  useEffect(() => {
    console.log('[Leaderboard] endpoint:', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Leaderboard] fetched raw data:', data);
        setItems(getItems(data));
      })
      .catch((err) => console.error('[Leaderboard] fetch error:', err));
  }, [url]);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-success">
            <tr>
              <th>Rank</th>
              <th>Team/User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr key={row.id || row.pk || index}>
                <td>{safeCell(row.rank ?? index + 1)}</td>
                <td>{safeCell(row.name || row.user || row.team)}</td>
                <td>{safeCell(row.score ?? row.points)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;
