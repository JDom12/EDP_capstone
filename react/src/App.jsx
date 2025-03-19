import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './assets/Login'
import Emp from './assets/Emp'
import Search from './assets/Search'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <h1>Enterprise Directory</h1>
      <Login/>
      <Emp/>
      <Search/>
    </>
  )
}

export default App
