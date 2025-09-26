import { useState, useEffect } from 'react';
import axios from 'axios';

const WorkspaceDashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [newName, setNewName] = useState('');

  const token = localStorage.getItem('token');

  // Fetch user workspaces
  const fetchWorkspaces = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/workspace', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWorkspaces(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchWorkspaces(); }, []);

  // Create new workspace
  const handleCreate = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/workspace/create',
        { name: newName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkspaces([...workspaces, res.data]);
      setNewName('');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Your Workspaces</h2>
      <ul>
        {workspaces.map(ws => <li key={ws._id}>{ws.name}</li>)}
      </ul>
      <input
        type="text"
        value={newName}
        onChange={e => setNewName(e.target.value)}
        placeholder="New Workspace Name"
      />
      <button onClick={handleCreate}>Create Workspace</button>
    </div>
  );
};

export default WorkspaceDashboard;
