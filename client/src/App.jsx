import { useContext, useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { MyContext } from './Context/MyContext';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Home from './components/Home';

function App() {

  const { data, setData } = useContext(MyContext);

  return (
    <>
      <Router>
        <div className="app-div">
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
