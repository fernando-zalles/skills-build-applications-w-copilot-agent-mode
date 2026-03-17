import React, { useEffect, useState } from 'react';

const buildUrl = (endpoint) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (apiUrl) {
    return `${apiUrl.replace(/\/+$/, '')}/${endpoint}/`;
  }
  const codeSpaceName = process.env.REACT_APP_CODESPACE_NAME;
  if (codeSpaceName) {
    return `https://${codeSpaceName}-8000.app.github.dev/api/activities/`;
  }
  return `http://localhost:8000/api/${endpoint}/`;
};

const getItems = (raw) => {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.results)) return raw.results;
  return [];
};

function Activities() {
  const [items, setItems] = useState([]);
  const url = buildUrl('activities');

  useEffect(() => {
    console.log('[Activities] endpoint:', url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log('[Activities] fetched raw data:', data);
        setItems(getItems(data));
      })
      .catch((err) => console.error('[Activities] fetch error:', err));
  }, [url]);

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <p>Loaded {items.length} records from API.</p>
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Activity</th>
              <th>Duration</th>
              <th>Calories</th>
            </tr>
          </thead>
          <tbody>
            {items.map((row) => (
              <tr key={row.id || row.pk || JSON.stringify(row)}>
                <td>{row.id || row.pk || 'n/a'}</td>
                <td>{row.date || '-'}</td>
                <td>{row.activity || row.name || '-'}</td>
                <td>{row.duration || '-'}</td>
                <td>{row.calories ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
