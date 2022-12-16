import './App.css';
import Header from './components/Header';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/profile';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SavedData from './pages/SavedData/SavedData';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    setUser(user)
  }, [])
  return (
    <BrowserRouter>
      <Header user={user} setUser={setUser} />
      <div className="App">

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/login' element={<Login />} />
          <Route path='/savedData' element={<SavedData />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
