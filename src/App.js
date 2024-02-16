import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import RekamMedis from './pages/RekamMedis';
import CreateRekamMedis from './pages/RekamMedis/Create';
import UpdateRekamMedis from './pages/RekamMedis/Update';
import Payment from './pages/Payment';
import Invoice from './pages/Payment/Invoice';

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route name='Dashboard' path="/" element={<Dashboard/>}/>
        <Route name='Login' path="/login" element={<LoginPage/>}/>
        <Route name='Payment' path="/payment" element={<Payment/>}/>
        <Route name='Invoice' path="/payment/invoice" element={<Invoice/>}/>
        <Route name='Rekam Medis' path="/rekam-medis" element={<RekamMedis/>}/>
        <Route name='Create Rekam Medis' path="/rekam-medis/create" element={<CreateRekamMedis/>}/>
        <Route name='Update Rekam Medis' path="/rekam-medis/update" element={<UpdateRekamMedis/>}/>
      </Routes>
    </div>
  );
}

export default App;
