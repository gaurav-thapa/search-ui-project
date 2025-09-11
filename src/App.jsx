import './App.css'
import Navbar from './components/navbar';
import HomePage from './components/HomePage';
import { useState } from 'react';

function App() {
  const [searchText, setSearchText] = useState("");

  return (
    <>
    <Navbar setHomePageText={setSearchText}/>
    <HomePage searchText={searchText}/>
    </>
  )
}

export default App
