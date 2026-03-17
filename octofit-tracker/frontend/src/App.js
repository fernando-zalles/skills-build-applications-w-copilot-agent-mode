import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const initialActivities = [
  { id: 1, date: '2026-03-16', activity: 'Run', duration: '40 min', calories: 350 },
  { id: 2, date: '2026-03-15', activity: 'Bike', duration: '55 min', calories: 450 },
  { id: 3, date: '2026-03-14', activity: 'Yoga', duration: '45 min', calories: 180 },
];

function App() {
  const [activities, setActivities] = useState(initialActivities);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ date: '', activity: '', duration: '', calories: '' });

  const addActivity = (e) => {
    e.preventDefault();
    const nextId = Math.max(0, ...activities.map((a) => a.id)) + 1;
    setActivities((prev) => [...prev, { id: nextId, ...form, calories: Number(form.calories) }]);
    setForm({ date: '', activity: '', duration: '', calories: '' });
    setShowModal(false);
  };

  const removeActivity = (id) => setActivities((prev) => prev.filter((a) => a.id !== id));

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} className="octofitapp-small-logo me-2" alt="octofitapp-small" />
            Octofit Tracker
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu" aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navMenu">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item"><a className="nav-link active" aria-current="page" href="#data">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="#add">Add Session</a></li>
              <li className="nav-item"><a className="nav-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">React Docs</a></li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search activity" aria-label="Search" />
              <button className="btn btn-outline-light" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <div className="card mb-4">
          <div className="card-body">
            <h1 className="card-title h3">Fitness Activity Dashboard</h1>
            <p className="card-text text-secondary">Consistent cards, tables, forms, modals, buttons, and navigation by Bootstrap.</p>
            <a className="btn btn-link" href="#data">Jump to Activity Table</a>
          </div>
        </div>

        <div className="row gy-4">
          <div className="col-lg-8" id="data">
            <div className="card">
              <div className="card-header"><h2 className="h5 mb-0">Tracked Activities</h2></div>
              <div className="table-responsive">
                <table className="table table-striped table-bordered mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Activity</th>
                      <th>Duration</th>
                      <th>Calories</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activities.map((item) => (
                      <tr key={item.id}>
                        <td>{item.date}</td>
                        <td>{item.activity}</td>
                        <td>{item.duration}</td>
                        <td>{item.calories}</td>
                        <td>
                          <button className="btn btn-sm btn-danger" onClick={() => removeActivity(item.id)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="card-body">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Add Activity</button>
              </div>
            </div>
          </div>

          <div className="col-lg-4" id="add">
            <div className="card">
              <div className="card-header"><h2 className="h5 mb-0">Quick Add Activity</h2></div>
              <div className="card-body">
                <form onSubmit={addActivity}>
                  <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input id="date" className="form-control" type="date" value={form.date} onChange={(e) => setForm((v) => ({ ...v, date: e.target.value }))} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="activity" className="form-label">Activity</label>
                    <input id="activity" className="form-control" type="text" value={form.activity} onChange={(e) => setForm((v) => ({ ...v, activity: e.target.value }))} placeholder="e.g., Swim" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="duration" className="form-label">Duration</label>
                    <input id="duration" className="form-control" type="text" value={form.duration} onChange={(e) => setForm((v) => ({ ...v, duration: e.target.value }))} placeholder="e.g., 30 min" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="calories" className="form-label">Calories</label>
                    <input id="calories" className="form-control" type="number" value={form.calories} onChange={(e) => setForm((v) => ({ ...v, calories: e.target.value }))} placeholder="e.g., 300" required min="0" />
                  </div>
                  <button type="submit" className="btn btn-success w-100">Save Activity</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog" aria-hidden={!showModal}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Activity</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close" />
            </div>
            <div className="modal-body">
              <form onSubmit={addActivity}>
                <div className="mb-3">
                  <label className="form-label" htmlFor="modal-date">Date</label>
                  <input id="modal-date" className="form-control" type="date" value={form.date} onChange={(e) => setForm((v) => ({ ...v, date: e.target.value }))} required />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="modal-activity">Activity</label>
                  <input id="modal-activity" className="form-control" type="text" value={form.activity} onChange={(e) => setForm((v) => ({ ...v, activity: e.target.value }))} required />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="modal-duration">Duration</label>
                  <input id="modal-duration" className="form-control" type="text" value={form.duration} onChange={(e) => setForm((v) => ({ ...v, duration: e.target.value }))} required />
                </div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="modal-calories">Calories</label>
                  <input id="modal-calories" className="form-control" type="number" value={form.calories} onChange={(e) => setForm((v) => ({ ...v, calories: e.target.value }))} required min="0" />
                </div>
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Cancel</button>
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {showModal && <div className="modal-backdrop fade show" />}
      </div>
    </>
  );
}

export default App;
