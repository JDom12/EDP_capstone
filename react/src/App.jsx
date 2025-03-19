import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './assets/Login';
import Emp from './assets/Emp';
import Search from './assets/Search';
import { AuthProvider } from "./hooks/AuthContent";

function App() {
  return (
  <AuthProvider>
    <Router>
      <div>
        <h1>Enterprise Directory</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/emp" element={<Emp />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
    </AuthProvider>
  );
}

export default App;