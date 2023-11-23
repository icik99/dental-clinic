import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="font-poppins">
      <Routes>
        <Route name='Dashboard' path="/" element={<Dashboard/>}/>
      </Routes>
    </div>
  );
}

export default App;
