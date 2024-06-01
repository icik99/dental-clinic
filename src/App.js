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
import { Toaster } from 'react-hot-toast';
import Pasien from './pages/Pasien';
import Layanan from './pages/Layanan';
import CreatePasien from './pages/Pasien/Create';
import UpdatePasien from './pages/Pasien/Update';
import Register from './pages/Register';
import CobaOdontogram from './pages/CobaOdontogram';
import KartuIuran from './pages/Payment/KartuIuran';
import CetakRekamMedis from './pages/RekamMedis/Cetak';

function App() {
  return (
    <div className="font-poppins">

      <Toaster
          position="top-center"
          reverseOrder={true}
      />
      <Routes>
        <Route name='Dashboard' path="/dashboard" element={<Dashboard/>}/>
        <Route name='Login' path="/" element={<LoginPage/>}/>
        <Route name='Register' path="/register" element={<Register/>}/>
        <Route name='Payment' path="/payment" element={<Payment/>}/>
        <Route name='Pasien' path="/pasien" element={<Pasien/>}/>
        <Route name='Create Pasien' path="/pasien/create" element={<CreatePasien/>}/>
        <Route name='Update Pasien' path="/pasien/update" element={<UpdatePasien/>}/>
        <Route name='Layanan' path="/layanan" element={<Layanan/>}/>
        <Route name='Invoice' path="/payment/invoice" element={<Invoice/>}/>
        <Route name='Kartu Iuran' path="/payment/kartu-iuran" element={<KartuIuran/>}/>
        <Route name='Rekam Medis' path="/rekam-medis" element={<RekamMedis/>}/>
        <Route name='Cetak Rekam Medis' path="/rekam-medis/cetak" element={<CetakRekamMedis/>}/>
        <Route name='Create Rekam Medis' path="/rekam-medis/create" element={<CreateRekamMedis/>}/>
        <Route name='Update Rekam Medis' path="/rekam-medis/update" element={<UpdateRekamMedis/>}/>
        {/* <Route name='Coba Odontogram' path="/cobaOdontogram" element={<CobaOdontogram/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
