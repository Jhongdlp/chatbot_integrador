import React, { useState } from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';

export default function Footer() {
    const [imageError, setImageError] = useState(false);

    return (
        <footer className="w-full bg-white font-sans text-sm relative z-50">

            {/* LEVEL 1: Navigation Buttons */}
            <div className="w-full bg-white py-8 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center gap-6">
                    <a
                        href="https://observatorioecuadordigital.mintel.gob.ec/sfsied"
                        className="flex items-center justify-center gap-3 bg-gob-blue hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Ir a Subsecretaría de Fomento - SFSIED
                    </a>
                    <a
                        href="https://observatorioecuadordigital.mintel.gob.ec"
                        className="flex items-center justify-center gap-3 bg-gob-blue hover:bg-blue-800 text-white px-8 py-3 rounded-lg font-bold transition-colors shadow-md"
                    >
                        <ArrowLeft size={20} />
                        Ir a Página de Inicio
                    </a>
                </div>
            </div>

            {/* LEVEL 2: Institutional Links */}
            <div className="w-full bg-gray-50 border-y border-gray-200 py-4">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-6 text-gray-700 font-medium">
                    <a
                        href="https://www.contactociudadano.gob.ec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gob-blue transition-colors flex items-center gap-2"
                    >
                        Contacto Ciudadano Digital
                        <ExternalLink size={14} className="opacity-50" />
                    </a>
                    <span className="hidden md:block text-gray-300">|</span>
                    <a
                        href="https://www.gob.ec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gob-blue transition-colors flex items-center gap-2"
                    >
                        Portal Trámites Ciudadanos
                        <ExternalLink size={14} className="opacity-50" />
                    </a>
                    <span className="hidden md:block text-gray-300">|</span>
                    <a
                        href="https://sni.presidencia.gob.ec/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gob-blue transition-colors flex items-center gap-2"
                    >
                        Sistema Nacional de Información (SNI)
                        <ExternalLink size={14} className="opacity-50" />
                    </a>
                </div>
            </div>

            {/* LEVEL 3: Logo & Info */}
            <div className="w-full bg-white py-12">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    {/* Logo Section with Fallback */}
                    <div className="flex-shrink-0">
                        {!imageError ? (
                            <img
                                src="/img/NuevoEcuador.png"
                                alt="Logo El Nuevo Ecuador"
                                className="h-20 w-auto object-contain"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="text-left">
                                <span className="block text-2xl font-black text-gray-300 leading-none">EL NUEVO</span>
                                <span className="block text-2xl font-black text-gob-blue leading-none">ECUADOR</span>
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="text-center md:text-right text-gray-600 leading-relaxed font-medium">
                        <p>Av. 6 de Diciembre N25-75 y Av. Colón</p>
                        <p>Código Postal: 170522</p>
                        <p>Quito - Ecuador</p>
                        <p className="mt-2 text-gob-blue font-bold">Teléfono: 593-2 220-0200</p>
                    </div>
                </div>
            </div>


        </footer>
    );
}