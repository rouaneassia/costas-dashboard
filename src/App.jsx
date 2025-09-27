import {  RouterProvider } from 'react-router-dom';
import { useState } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { router } from './router';

function App() {
  const [equipe, setEquipe] = useState(() => {
    const saved = localStorage.getItem('equipe');
    return saved ? JSON.parse(saved) : [];
  });
  const saveToStorage = (data) => {
    localStorage.setItem('equipe', JSON.stringify(data));
  };

  const handleAdd = (membre) => {
    const updated = [...equipe, membre];
    setEquipe(updated);
    saveToStorage(updated);
  };

  const handleDelete = (index) => {
    const updated = equipe.filter((_, i) => i !== index);
    setEquipe(updated);
    saveToStorage(updated);
  };

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </>
  );
}

export default App;
