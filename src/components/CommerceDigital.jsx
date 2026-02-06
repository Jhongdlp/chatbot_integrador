import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ChevronLeft,
    ChevronRight,
    Target,
    Clock,
    Building2,
    ArrowRight,
    TrendingUp,
    Scale,
    Database,
    Truck
} from 'lucide-react';

const dimensionsData = [
    {
        id: 1,
        title: "DIMENSIÓN 1",
        subtitle: "COMERCIO DIGITAL INCLUSIVO Y SOSTENIBLE",
        color: "from-purple-600 to-blue-600",
        icon: Users,
        actions: [
            {
                text: "Promover proyectos y programas de inclusión digital, mediante acciones de formación, acompañamiento técnico y articulación interinstitucional, que prioricen la participación de mujeres y grupos en situación de vulnerabilidad en el ecosistema del comercio digital.",
                responsable: "MINTEL",
                plazo: "Corto"
            },
            {
                text: "Implementar un Entorno Virtual de Aprendizaje que incluya contenidos especializados en Comercio Digital.",
                responsable: "MINTEL",
                plazo: "Mediano"
            },
            {
                text: "Fomentar la adopción segura e interoperable de medios de pago electrónicos en el comercio digital a través de la Estrategia Nacional de Inclusión Financiera",
                responsable: "BCE",
                plazo: "Mediano"
            },
            {
                text: "Implementar mecanismos de interoperabilidad entre las distintas redes de pago del país, que permita transferencias electrónicas de dinero en tiempo real.",
                responsable: "BCE",
                plazo: "Mediano"
            },
            {
                text: "Diseñar un Plan Nacional de Sensibilización y Cultura Digital que promueva el uso responsable y productivo de las tecnologías digitales.",
                responsable: "MINTEL",
                plazo: "Mediano"
            },
            {
                text: "Fortalecer el proceso de digitalización de trámites y servicios en el sector público.",
                responsable: "MINTEL",
                plazo: "Largo"
            },
            {
                text: "Incorporar de manera progresiva y transversal contenidos y habilidades vinculadas al comercio digital en el currículo nacional de los niveles de educación: Inicial, Educación General Básica y Bachillerato General.",
                responsable: "MINEDUC",
                plazo: "Largo"
            },
            {
                text: "Promover la digitalización de procesos en empresas y emprendimientos para fortalecer la economía digital nacional.",
                responsable: "MINTEL",
                plazo: "Largo"
            }
        ]
    },
    {
        id: 2,
        title: "DIMENSIÓN 2",
        subtitle: "PROMOCIÓN DEL COMERCIO DIGITAL (NACIONAL E INTERNACIONAL)",
        color: "from-blue-600 to-cyan-500",
        icon: TrendingUp,
        actions: [
            {
                text: "Desarrollar un Catálogo Nacional de Servicios Tecnológicos Exportables que visibilice la oferta ecuatoriana en mercados internacionales.",
                responsable: "PROECUADOR",
                plazo: "Largo"
            },
            {
                text: "Implementar campañas nacionales de comunicación, capacitación y promoción que aceleren la adopción del comercio electrónico a nivel nacional.",
                responsable: "MINTEL",
                plazo: "Mediano"
            },
            {
                text: "Promover campañas de divulgación que fortalezcan el conocimiento del consumidor sobre las vías de reclamo en el comercio digital.",
                responsable: "MPCEI",
                plazo: "Largo"
            }
        ]
    },
    {
        id: 3,
        title: "DIMENSIÓN 3",
        subtitle: "GOBERNANZA DIGITAL",
        color: "from-yellow-500 to-orange-500",
        icon: Scale,
        actions: [
            {
                text: "Conformar comités temporales temáticos para la ejecución, seguimiento y evaluación de la Estrategia Nacional de Comercio Digital 2030.",
                responsable: "MINTEL",
                plazo: "Largo"
            },
            {
                text: "Implementar un Observatorio de Datos Abiertos sobre Transformación Digital que incorpore un apartado de Comercio Digital",
                responsable: "MINTEL",
                plazo: "Largo"
            },
            {
                text: "Impulsar la generación, modernización y armonización normativa que potencie el desarrollo del comercio digital en el país.",
                responsable: "MINTEL",
                plazo: "Largo"
            }
        ]
    },
    {
        id: 4,
        title: "DIMENSIÓN 4",
        subtitle: "INNOVACIÓN, PRODUCTIVIDAD Y DATOS",
        color: "from-emerald-600 to-teal-500",
        icon: Database,
        actions: [
            {
                text: "Desarrollar un programa de reconocimiento público (sellos digitales) que destaque a las empresas que adopten buenas prácticas de digitalización en sus procesos.",
                responsable: "MINTEL",
                plazo: "Largo"
            },
            {
                text: "Incentivar la adopción y uso de tecnologías emergentes que impulsen la productividad y competitividad.",
                responsable: "MINTEL",
                plazo: "Mediano"
            }
        ]
    },
    {
        id: 5,
        title: "DIMENSIÓN 5",
        subtitle: "LOGÍSTICA Y COMERCIO TRANSFRONTERIZO",
        color: "from-indigo-600 to-violet-600",
        icon: Truck,
        actions: [
            {
                text: "Actualizar y modernizar el código postal ecuatoriano",
                responsable: "MINTEL",
                plazo: "Largo"
            },
            {
                text: "Implementar mejoras en los procesos y sistemas aduaneros para optimizar la eficiencia logística y reducir tiempos de comercio transfronterizo.",
                responsable: "SENAE",
                plazo: "Largo"
            },
            {
                text: "Fortalecer Servicios Postales del Ecuador para ampliar y optimizar el uso del programa Exporta Fácil, así como otras iniciativas de apoyo e impulso a las exportaciones efectuadas por el operador postal designado.",
                responsable: "SPE",
                plazo: "Largo"
            }
        ]
    }
    // Future dimensions can be added here
];

const CommerceDigital = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentDimension = dimensionsData[currentIndex];

    // Helper for Responsable badge color
    const getResponsableColor = (resp) => {
        switch (resp) {
            case 'MINTEL': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'BCE': return 'bg-green-100 text-green-800 border-green-200';
            case 'MINEDUC': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'PROECUADOR': return 'bg-pink-100 text-pink-800 border-pink-200';
            case 'MPCEI': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'SENAE': return 'bg-slate-100 text-slate-800 border-slate-200';
            case 'SPE': return 'bg-orange-100 text-orange-800 border-orange-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Helper for Plazo badge color
    const getPlazoColor = (plazo) => {
        switch (plazo) {
            case 'Corto': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'Mediano': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'Largo': return 'bg-purple-100 text-purple-800 border-purple-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const nextSlide = () => {
        if (dimensionsData.length > 1) {
            setCurrentIndex((prev) => (prev + 1) % dimensionsData.length);
        }
    };

    const prevSlide = () => {
        if (dimensionsData.length > 1) {
            setCurrentIndex((prev) => (prev - 1 + dimensionsData.length) % dimensionsData.length);
        }
    };

    // --- TEMPORARY: STATE TO HIDE CONTENT ---
    // Change this to true to reveal the content again
    const showContent = false;

    if (!showContent) {
        return (
            <div className="w-full min-h-screen py-32 bg-slate-50 relative font-sans flex items-center justify-center overflow-hidden">
                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 text-center max-w-2xl px-6"
                >
                    <div className="mb-8 inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl shadow-lg transform rotate-3">
                        <Clock className="w-12 h-12 text-blue-600" strokeWidth={1.5} />
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                            PRÓXIMAMENTE
                        </span>
                    </h1>

                    <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                        Lanzamiento oficial de la estrategia nacional de <span className="font-bold text-slate-800">Comercio Digital</span>.
                    </p>

                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-md border border-slate-200 text-slate-500 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        En construcción
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen py-16 bg-slate-50 relative font-sans">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10">

                {/* Main Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6">
                        Estrategia Nacional de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Comercio Electrónico</span>
                    </h1>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Una hoja de ruta integral para fortalecer el ecosistema digital del Ecuador, articulando acciones entre el sector público, privado y la academia.
                    </p>
                </motion.div>

                {/* Dimension Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons (Only show if > 1 dimension) */}
                    {dimensionsData.length > 1 && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-80 -translate-x-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-2 border-slate-100 flex items-center justify-center text-slate-700 hover:text-gob-blue hover:border-gob-blue hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                <ChevronLeft size={28} strokeWidth={2.5} />
                            </button>
                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-80 translate-x-1/2 z-20 w-14 h-14 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border-2 border-slate-100 flex items-center justify-center text-slate-700 hover:text-gob-blue hover:border-gob-blue hover:scale-110 transition-all focus:outline-none focus:ring-4 focus:ring-blue-100"
                            >
                                <ChevronRight size={28} strokeWidth={2.5} />
                            </button>
                        </>
                    )}

                    {/* Card Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.4 }}
                            className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100"
                        >
                            {/* Dimension Header */}
                            <div className={`bg-gradient-to-r ${currentDimension.color} p-8 md:p-10 text-white relative overflow-hidden`}>
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                                <div className="flex flex-col md:flex-row md:items-center gap-6 relative z-10">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-inner border border-white/30">
                                        <currentDimension.icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm md:text-base font-bold tracking-widest opacity-80 mb-1">{currentDimension.title}</h2>
                                        <h3 className="text-2xl md:text-4xl font-black leading-tight">{currentDimension.subtitle}</h3>
                                    </div>
                                </div>
                            </div>

                            {/* Action Lines Grid */}
                            <div className="p-8 md:p-10 bg-slate-50/50">
                                <div className="flex items-center gap-2 mb-6 text-slate-400 font-bold text-xs uppercase tracking-wider">
                                    <Target size={14} />
                                    Líneas de Acción
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                    {currentDimension.actions.map((action, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 flex flex-col h-full"
                                        >
                                            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6 flex-grow">
                                                {action.text}
                                            </p>

                                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getResponsableColor(action.responsable)}`}>
                                                    <Building2 size={12} />
                                                    {action.responsable}
                                                </div>
                                                <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border ${getPlazoColor(action.plazo)}`}>
                                                    <Clock size={12} />
                                                    {action.plazo}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom Decor */}
                <div className="mt-12 flex justify-center">
                    <div className="flex gap-2">
                        {dimensionsData.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-blue-600' : 'w-2 bg-slate-300'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Expected Results - Re-added with new title */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center leading-tight">
                        Más comercio digital es más ventas, más empleo y más futuro para los negocios del Ecuador.
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: '🛒', text: 'Más negocios participando en comercio electrónico' },
                            { icon: '🔒', text: 'Mejor confianza de consumidores y sostenibilidad del ecosistema' },
                            { icon: '🤝', text: 'Coordinación nacional con marco de gobernanza' },
                            { icon: '🛡️', text: 'Reducción de riesgos mediante ciberseguridad aplicada' }
                        ].map((logro, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                            >
                                <div className="text-4xl mb-4">{logro.icon}</div>
                                <p className="text-sm font-semibold">{logro.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

            </div>
        </div>
    );
};

export default CommerceDigital;
