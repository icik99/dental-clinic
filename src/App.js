import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import RekamMedis from './pages/RekamMedis';

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route name='Dashboard' path="/" element={<Dashboard/>}/>
        <Route name='Login' path="/login" element={<LoginPage/>}/>
        <Route name='Rekam Medis' path="/rekam-medis" element={<RekamMedis/>}/>
      </Routes>
    </div>
  );
}

export default App;
