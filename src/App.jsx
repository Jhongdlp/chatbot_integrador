import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DiagnosisPage from './pages/DiagnosisPage';
import BrigadasPage from './pages/BrigadasPage';
import WhatsAppPage from './pages/WhatsAppPage';

function App() {
    return (
        <Router>
            <div className="bg-slate-50 min-h-screen">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/diagnostico" element={<DiagnosisPage />} />
                    <Route path="/brigadas" element={<BrigadasPage />} />
                    <Route path="/taller-whatsapp" element={<WhatsAppPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
