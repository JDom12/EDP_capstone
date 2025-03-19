import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from './assets/Login';
import Emp from './assets/Emp';
import Search from './assets/Search';
import { AuthProvider } from "./hooks/AuthContent";
import ProtectedRoute from "./assets/RequireAuth";
import SalaryPredictor from "./assets/SalaryPredictor";

function App() {
  return (
  <AuthProvider>
    <h1>Enterprise Directory</h1>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
            <Route path="/emp" element={<Emp />} />
            <Route path="/search" element={<Search />} />
            <Route path="/predict-salary" element={<SalaryPredictor />} />
        </Route>
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;