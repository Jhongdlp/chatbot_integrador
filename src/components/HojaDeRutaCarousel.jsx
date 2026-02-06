import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Rocket, TrendingUp, Trophy, CheckCircle2, Zap, Globe } from 'lucide-react';

const plazos = [
    {
        id: 0,
        title: "CORTO PLAZO",
        subtitle: "Fase 1: Despegue (2025)",
        desc: "Instalación de la base del ecosistema y generación de confianza.",
        color: "text-emerald-600",
        borderColor: "border-emerald-500",
        icon: Rocket,
        diagramNodes: [
            { label: "Diagnóstico Nacional", icon: CheckCircle2 },
            { label: "Marco Legal Ágil", icon: Zap },
            { label: "Pilotos Regionales", icon: Globe }
        ]
    },
    {
        id: 1,
        title: "MEDIANO PLAZO",
        subtitle: "Fase 2: Quick Wins (2025-2026)",
        desc: "Masificación de herramientas y primeras victorias comerciales.",
        color: "text-blue-600",
        borderColor: "border-blue-500",
        icon: TrendingUp,
        diagramNodes: [
            { label: "10k MIPYMES Digitales", icon: CheckCircle2 },
            { label: "Sello de Confianza", icon: Zap },
            { label: "Red de Expertos", icon: Globe }
        ]
    },
    {
        id: 2,
        title: "LARGO PLAZO",
        subtitle: "Fase 3: Consolidación (2027-2029)",
        desc: "Ecosistema maduro y competitividad internacional.",
        color: "text-purple-600",
        borderColor: "border-purple-500",
        icon: Trophy,
        diagramNodes: [
            { label: "Exportación Digital", icon: CheckCircle2 },
            { label: "Unicornios Locales", icon: Zap },
            { label: "Hub Regional", icon: Globe }
        ]
    }
];

const HojaDeRutaCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const nextSlide = () => {
        setActiveIndex((prev) => (prev === plazos.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setActiveIndex((prev) => (prev === 0 ? plazos.length - 1 : prev - 1));
    };

    const activeSlide = plazos[activeIndex];

    return (
        <section id="roadmap" className="py-24 bg-impulsa-dark relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
                backgroundSize: '30px 30px'
            }}></div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Hoja de <span className="text-impulsa-yellow">Ruta</span> de Implementación
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Nuestra estrategia escalonada para transformar el Ecuador.
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">

                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:flex p-4 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:scale-110 shadow-lg border border-gray-700 z-20"
                    >
                        <ArrowLeft size={32} />
                    </button>

                    {/* Main Slide Card */}
                    <div className="flex-1 relative min-h-[500px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                                className="w-full bg-white rounded-3xl shadow-2xl overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Left Content Side */}
                                    <div className="w-full md:w-2/5 p-8 md:p-12 bg-gray-50 flex flex-col justify-center border-r border-gray-100">
                                        <div className={`text-sm font-black tracking-widest mb-2 uppercase border-b-4 inline-block pb-1 ${activeSlide.color} ${activeSlide.borderColor}`}>
                                            {activeSlide.title}
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">{activeSlide.subtitle}</h3>
                                        <p className="text-gray-600 leading-relaxed mb-8">
                                            {activeSlide.desc}
                                        </p>
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${activeSlide.color.replace('text-', 'bg-').replace('600', '100')} ${activeSlide.color}`}>
                                            <activeSlide.icon size={32} />
                                        </div>
                                    </div>

                                    {/* Right Diagram Side */}
                                    <div className="w-full md:w-3/5 p-8 md:p-12 relative flex items-center justify-center bg-white">
                                        {/* Simplified Diagram Visual */}
                                        <div className="relative w-full max-w-sm">
                                            {/* Connecting Line */}
                                            <div className="absolute left-[27px] top-8 bottom-8 w-1 bg-gray-200 rounded-full"></div>

                                            <div className="space-y-8 relative">
                                                {activeSlide.diagramNodes.map((node, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.2 + (i * 0.1) }}
                                                        className="flex items-center gap-6"
                                                    >
                                                        <div className={`relative z-10 w-14 h-14 rounded-full border-4 border-white shadow-lg flex items-center justify-center ${activeSlide.color.replace('text-', 'bg-').replace('600', '500')} text-white`}>
                                                            <node.icon size={20} />
                                                        </div>
                                                        <div className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-100 flex-1">
                                                            <span className="font-bold text-gray-700">{node.label}</span>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="hidden md:flex p-4 rounded-full bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 transition-all hover:scale-110 shadow-lg border border-gray-700 z-20"
                    >
                        <ArrowRight size={32} />
                    </button>
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex justify-center gap-4 mt-8 md:hidden">
                    <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-gray-800 text-white shadow-lg"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <span className="text-white font-bold self-center">{activeIndex + 1} / {plazos.length}</span>
                    <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-gray-800 text-white shadow-lg"
                    >
                        <ArrowRight size={24} />
                    </button>
                </div>

            </div>
        </section>
    );
};

export default HojaDeRutaCarousel;
