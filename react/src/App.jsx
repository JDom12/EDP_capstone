import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './assets/Login';
import Emp from './assets/Emp';
import Search from './assets/Search';
import { AuthProvider } from "./hooks/AuthContent";
import ProtectedRoute from "./assets/RequireAuth";

function App() {
  return (
  <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/emp" element={<Emp />} />
            <Route path="/search" element={<Search />} />
        </Route>
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;