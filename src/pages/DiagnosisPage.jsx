import DiagnosisForm from '../components/DiagnosisForm';
import { ArrowLeft, Home } from 'lucide-react';

const DiagnosisPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-cyan-50/30">
            {/* Navigation Header */}
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

            {/* Form Content */}
            <DiagnosisForm />
        </div>
    );
};

export default DiagnosisPage;
