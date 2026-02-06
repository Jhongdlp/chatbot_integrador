import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Truck,
    Castle,
    Shield,
    Users,
    TrendingUp,
    Handshake,
    X,
    CheckCircle2,
    Zap,
    Globe
} from 'lucide-react';

// Define the 3 phases, each containing the map data
const roadmapPhases = [
    {
        id: 0,
        phaseTitle: "Hoja de Ruta de Implementación Corto Plazo",
        mapLevels: [
            { id: 0, shortLabel: "T: Gobernanza", title: "Marco de Gobernanza", concept: "Establecimiento de normativas iniciales y creación del comité de transformación digital.", icon: Castle, x: 10, y: 75 },
            { id: 1, shortLabel: "D1: Inclusión", title: "Comercio Inclusivo", concept: "Pilotos de alfabetización digital en zonas rurales prioritarias.", icon: Users, x: 30, y: 40 },
            { id: 2, shortLabel: "D2: Promoción", title: "Promoción Inicial", concept: "Lanzamiento del sello 'Comercio Digital' para primeras 100 MIPYMES.", icon: TrendingUp, x: 50, y: 70 },
            { id: 3, shortLabel: "D3: Alianzas", title: "Primeras Alianzas", concept: "Firma de convenios con cámaras de comercio locales.", icon: Handshake, x: 70, y: 35 },
            { id: 4, shortLabel: "D4: Ciberseguridad", title: "Diagnóstico Seguridad", concept: "Evaluación de vulnerabilidades en infraestructura crítica.", icon: Shield, x: 90, y: 65 }
        ]
    },
    {
        id: 1,
        phaseTitle: "Hoja de Ruta de Implementación Mediano Plazo",
        mapLevels: [
            { id: 0, shortLabel: "T: Gobernanza", title: "Marco de Gobernanza", concept: "Consolidación de leyes de comercio electrónico y protección de datos.", icon: Castle, x: 10, y: 75 },
            { id: 1, shortLabel: "D1: Inclusión", title: "Comercio Inclusivo", concept: "Expansión de conectividad a 50% de zonas rurales.", icon: Users, x: 30, y: 40 },
            { id: 2, shortLabel: "D2: Promoción", title: "Promoción Regional", concept: "Ruedas de negocios virtuales con países vecinos.", icon: TrendingUp, x: 50, y: 70 },
            { id: 3, shortLabel: "D3: Alianzas", title: "Red de Expertos", concept: "Creación de red nacional de mentores digitales.", icon: Handshake, x: 70, y: 35 },
            { id: 4, shortLabel: "D4: Ciberseguridad", title: "Centro de Respuesta", concept: "Implementación del CSIRT sectorial.", icon: Shield, x: 90, y: 65 }
        ]
    },
    {
        id: 2,
        phaseTitle: "Hoja de Ruta de Implementación Largo Plazo",
        mapLevels: [
            { id: 0, shortLabel: "T: Gobernanza", title: "Marco de Gobernanza", concept: "Ecuador referente regional en legislación digital.", icon: Castle, x: 10, y: 75 },
            { id: 1, shortLabel: "D1: Inclusión", title: "Comercio Inclusivo", concept: "Brecha digital reducida al mínimo histórico.", icon: Users, x: 30, y: 40 },
            { id: 2, shortLabel: "D2: Promoción", title: "Hub Global", concept: "Plataforma nacional de exportación digital consolidada.", icon: TrendingUp, x: 50, y: 70 },
            { id: 3, shortLabel: "D3: Alianzas", title: "Inversión Global", concept: "Atracción masiva de capital de riesgo tecnológico.", icon: Handshake, x: 70, y: 35 },
            { id: 4, shortLabel: "D4: Ciberseguridad", title: "Ciber-Resiliencia", concept: "Infraestructura nacional con certificación de seguridad avanzada.", icon: Shield, x: 90, y: 65 }
        ]
    }
];

const CommerceRoadmap = () => {
    const [activePhaseIndex, setActivePhaseIndex] = useState(0);
    const [activeLevel, setActiveLevel] = useState(0);
    const [showModal, setShowModal] = useState(false);

    // Get current phase data
    const currentPhase = roadmapPhases[activePhaseIndex];
    const mapLevels = currentPhase.mapLevels;

    const handleLevelClick = (id) => {
        setActiveLevel(id);
        setShowModal(true);
    };

    const nextPhase = () => {
        setActivePhaseIndex((prev) => (prev === roadmapPhases.length - 1 ? 0 : prev + 1));
        setActiveLevel(0); // Reset player position on phase change
        setShowModal(false);
    };

    const prevPhase = () => {
        setActivePhaseIndex((prev) => (prev === 0 ? roadmapPhases.length - 1 : prev - 1));
        setActiveLevel(0);
        setShowModal(false);
    };

    return (
        <div className="w-full relative py-20 bg-gradient-to-br from-[#F0FDF4] via-[#E6FFFA] to-[#F5F3FF] overflow-hidden select-none font-sans border-t border-emerald-50">

            {/* Eco-Tech Texture Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#34D399_1px,transparent_1px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

            {/* Carousel Navigation Wrapper */}
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex items-center justify-between">

                {/* Left Arrow */}
                <button
                    onClick={prevPhase}
                    className="hidden md:flex p-3 rounded-full bg-white shadow-lg text-emerald-700 hover:bg-emerald-50 hover:scale-110 transition-all border border-emerald-100 z-20"
                >
                    <ArrowLeft size={32} />
                </button>

                {/* Main Content Area (Title + Map) */}
                <div className="flex-1 w-full">

                    {/* Title Section (Dynamic based on phase) */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePhaseIndex}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="text-center mb-10"
                        >
                            <h2 className="text-3xl font-bold text-emerald-950 tracking-tight">
                                {currentPhase.phaseTitle}
                            </h2>
                            <div className="w-24 h-1.5 bg-emerald-500 mx-auto mt-4 rounded-full shadow-sm" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Map Container */}
                    <div className="relative h-[450px] max-w-5xl mx-auto px-4 z-10">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activePhaseIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full relative"
                            >
                                {/* SVG Path */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.05))' }}>
                                    <path
                                        d="M 10% 75% Q 25% 75% 30% 40% T 50% 70% T 70% 35% T 90% 65%"
                                        fill="none"
                                        stroke="#cbd5e1"
                                        strokeWidth="10"
                                        strokeDasharray="20 20"
                                        strokeLinecap="round"
                                        className="opacity-60"
                                    />
                                    {/* Inner clearer line for 'road' effect */}
                                    <path
                                        d="M 10% 75% Q 25% 75% 30% 40% T 50% 70% T 70% 35% T 90% 65%"
                                        fill="none"
                                        stroke="#fff"
                                        strokeWidth="4"
                                        strokeDasharray="20 20"
                                        strokeLinecap="round"
                                        className="opacity-40"
                                    />
                                </svg>

                                {/* Nodes */}
                                {mapLevels.map((level) => (
                                    <div
                                        key={level.id}
                                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center z-10"
                                        style={{ left: `${level.x}%`, top: `${level.y}%` }}
                                        onClick={() => handleLevelClick(level.id)}
                                    >
                                        {/* Inner Circle - Handles Interactions */}
                                        <div className={`
                                            w-14 h-14 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center 
                                            transition-all duration-300 relative z-10
                                            shadow-lg shadow-emerald-100
                                            group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-emerald-500/20 group-hover:border-emerald-400
                                            border-2 ${activeLevel === level.id ? 'border-emerald-500 ring-4 ring-emerald-100 scale-105' : 'border-slate-50'}
                                        `}>
                                            {(() => {
                                                const NodeIcon = level.icon;
                                                return <NodeIcon
                                                    size={24}
                                                    className={`transition-colors duration-300 ${activeLevel === level.id ? 'text-emerald-600' : 'text-slate-400 group-hover:text-emerald-500'}`}
                                                    strokeWidth={activeLevel === level.id ? 2.5 : 2}
                                                />;
                                            })()}
                                        </div>

                                        {/* Label underneath */}
                                        <div className="mt-3 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm border border-emerald-100/50 group-hover:translate-y-1 transition-transform duration-300">
                                            <span className="text-[10px] md:text-xs font-bold text-emerald-900 whitespace-nowrap">{level.shortLabel}</span>
                                        </div>

                                    </div>
                                ))}

                                {/* Player Character (Van) */}
                                {mapLevels.map((level) => (
                                    activeLevel === level.id && (
                                        <motion.div
                                            layoutId={`player-${activePhaseIndex}`} // Unique layoutId per phase to avoid glitches
                                            key="player"
                                            className="absolute z-20 pointer-events-none"
                                            style={{
                                                left: `${level.x}%`,
                                                top: `${level.y}%`,
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                            transition={{ type: "spring", stiffness: 90, damping: 14 }}
                                        >
                                            <div className="relative flex items-center justify-center">
                                                <div className="absolute -top-12 z-30">
                                                    <div className="bg-yellow-400 p-2 rounded-lg border-2 border-white shadow-xl -rotate-3 text-yellow-950">
                                                        <Truck size={24} fill="currentColor" />
                                                    </div>
                                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-yellow-400 border-r-[6px] border-r-transparent mx-auto mt-[-2px] drop-shadow-sm"></div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                ))}
                            </motion.div>
                        </AnimatePresence>

                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={nextPhase}
                    className="hidden md:flex p-3 rounded-full bg-white shadow-lg text-emerald-700 hover:bg-emerald-50 hover:scale-110 transition-all border border-emerald-100 z-20"
                >
                    <ArrowRight size={32} />
                </button>
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex justify-center gap-6 mt-4 md:hidden items-center relative z-20">
                <button
                    onClick={prevPhase}
                    className="p-3 rounded-full bg-white text-emerald-700 shadow-md active:scale-95 border border-emerald-100"
                >
                    <ArrowLeft size={24} />
                </button>
                <div className="flex gap-2">
                    {roadmapPhases.map((_, idx) => (
                        <div key={idx} className={`w-2 h-2 rounded-full transition-all ${idx === activePhaseIndex ? 'w-6 bg-emerald-500' : 'bg-slate-200'}`} />
                    ))}
                </div>
                <button
                    onClick={nextPhase}
                    className="p-3 rounded-full bg-white text-emerald-700 shadow-md active:scale-95 border border-emerald-100"
                >
                    <ArrowRight size={24} />
                </button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/40 backdrop-blur-sm p-4"
                        onClick={() => setShowModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 10 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 10 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-emerald-100 ring-1 ring-emerald-50"
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50 rounded-full p-2 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-6 shadow-inner text-emerald-600">
                                {(() => {
                                    const ModalIcon = mapLevels[activeLevel].icon;
                                    return <ModalIcon size={32} />;
                                })()}
                            </div>

                            <h3 className="text-2xl font-bold text-emerald-950 text-center mb-3">
                                {mapLevels[activeLevel].title}
                            </h3>

                            <p className="text-lg text-slate-600 text-center leading-relaxed mb-8">
                                {mapLevels[activeLevel].concept}
                            </p>

                            <button
                                onClick={() => setShowModal(false)}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 active:scale-[0.98]"
                            >
                                Entendido
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommerceRoadmap;
