import React, { useEffect, useState } from 'react';

const buildUrl = (endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (apiUrl) {
    return `${apiUrl.replace(/\/+$/, '')}/${endpoint}/`;
  }
  const codeSpaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codeSpaceName) {
    return `https://${codeSpaceName}-8000.app.github.dev/api/teams/`;
  }
  return `http://localhost:8000/api/${endpoint}/`;
};

const getItems = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.results)) return raw.results;
  return [];
};

function Teams() {
  const [items, setItems] = useState([]);
  const url = buildUrl('teams');

  useEffect(() => {
    console.log('[Teams] endpoint:', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Teams] fetched raw data:', data);
        setItems(getItems(data));
      })
      .catch((err) => console.error('[Teams] fetch error:', err));
  }, [url]);

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-info">
            <tr>
              <th>ID</th>
              <th>Team Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id || row.pk || JSON.stringify(row)}>
                <td>{row.id || row.pk || '-'}</td>
                <td>{row.name || row.team_name || '-'}</td>
                <td>{row.members || row.member_count || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Teams;
