import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import BrigadasForm from '../components/BrigadasForm';

const BrigadasPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 relative overflow-x-hidden text-slate-800">
            {/* Navigation Header (Adapted from DiagnosisPage) */}
            <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <a href="https://observatorioecuadordigital.mintel.gob.ec/sfsied/economia-digital/" target="_top" className="flex items-center gap-3 group">
                            <img
                                src="/img/empoderatech_logo.png"
                                alt="EmpoderaTech Logo"
                                className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
                        </a>

                        {/* Back to Home Buttons */}
                        <div className="flex items-center gap-3">
                            {/* Mobile: Icon only */}
                            <a
                                href="https://observatorioecuadordigital.mintel.gob.ec/sfsied/economia-digital/"
                                target="_top"
                                className="md:hidden flex items-center gap-2 px-4 py-2 bg-gob-blue/10 hover:bg-gob-blue/20 border border-gob-blue/30 hover:border-gob-blue/50 text-gob-blue rounded-lg font-semibold transition-all"
                            >
                                <Home size={20} />
                            </a>

                            {/* Desktop: Full button */}
                            <a
                                href="https://observatorioecuadordigital.mintel.gob.ec/sfsied/economia-digital/"
                                target="_top"
                                className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-gob-blue/10 to-cyan-500/10 hover:from-gob-blue/20 hover:to-cyan-500/20 border border-gob-blue/30 hover:border-gob-blue/50 text-gob-blue rounded-lg font-semibold transition-all"
                            >
                                <ArrowLeft size={20} />
                                Volver al Inicio
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content with Top Padding to clear Fixed Navbar */}
            <main className="flex-grow pt-8 md:pt-12 pb-12 px-4 relative z-10 bg-slate-950 overflow-hidden">
                {/* Decorative Background Elements (Matched to DiagnosisPage) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Form Container (Title is inside) */}
                    <BrigadasForm />
                </div>
            </main>
        </div>
    );
};

export default BrigadasPage;
