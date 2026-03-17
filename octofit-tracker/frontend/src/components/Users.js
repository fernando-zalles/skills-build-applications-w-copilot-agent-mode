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

function Users() {
  const [items, setItems] = useState([]);
  const url = buildUrl('users');

  useEffect(() => {
    console.log('[Users] endpoint:', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Users] fetched raw data:', data);
        setItems(getItems(data));
      })
      .catch((err) => console.error('[Users] fetch error:', err));
  }, [url]);

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-warning">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id || row.pk || JSON.stringify(row)}>
                <td>{row.id || row.pk || '-'}</td>
                <td>{row.username || row.name || '-'}</td>
                <td>{row.email || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
