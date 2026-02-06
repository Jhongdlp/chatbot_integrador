import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Waypoints,
    Store,
    Users,
    Landmark,
    Database,
    Check,
    MapPin,
    ArrowRight,
    ClipboardCheck,
    GraduationCap,
    BarChart3,
    BadgeCheck,
    Globe,
    Handshake
} from 'lucide-react';

// Custom Components
import EcuadorDigitalJourney from './EcuadorDigitalJourney';
import CommerceDigital from './CommerceDigital';
import EmprendedorDigital from './EmprendedorDigital';
import BrigadasTech from './BrigadasTech';
import EconomiaDigital from './EconomiaDigital';
import DataLab from './DataLab';
import ImpactSection from './ImpactSection';

const tabsData = [
    {
        id: 'programas',
        label: 'PROGRAMAS',
        type: 'grid',
        content: [
            {
                title: 'RUTA DE TRANSFORMACIÓN DIGITAL',
                icon: Waypoints,
                description: 'De empezar a vender. Paso a paso. Te acompañamos según el nivel real de tu negocio para ordenar, digitalizar y crecer con tecnología.',
                logros: [
                    'Más orden y control del negocio',
                    'Presencia digital que genera confianza',
                    'Nuevos canales de venta y clientes reales',
                    'Más ventas y capacidad de crecer'
                ],
                footer: 'No es teoría. Es una ruta guiada para crecer.'
            },
            {
                title: 'COMERCIO DIGITAL',
                icon: ShoppingCart,
                description: 'Un ecosistema que hace posible vender mejor. Fortalecemos el comercio digital del país para que más negocios vendan en línea con confianza.',
                listHeader: '¿QUÉ CAMBIA CON ESTE PROGRAMA?',
                logros: [
                    'Comercio digital más seguro y confiable',
                    'Mejores condiciones para entrar al e-commerce',
                    'Alianzas con plataformas y actores clave',
                    'Reglas claras y menos barreras'
                ],
                footer: 'Cuando el ecosistema mejora, todos pueden vender mejor.'
            },
            {
                title: 'EMPRENDEDOR DIGITAL',
                icon: Store,
                description: 'Tecnología que abre oportunidades reales. Acercamos la tecnología a emprendedores y mipymes con enfoque territorial, intercultural y de género.',
                logros: [
                    'Herramientas digitales adaptadas a tu realidad',
                    'Más visibilidad y oportunidades de venta',
                    'Acompañamiento para formalizar y crecer',
                    'Redes de apoyo y aprendizaje continuo'
                ],
                footer: 'La inclusión digital se construye con oportunidades.'
            },
            {
                title: 'BRIGADAS TECH',
                icon: Users,
                description: 'Resultados rápidos, en tu territorio. Llegamos directo a tu comunidad para activar tu negocio digital y lograr resultados visibles en poco tiempo.',
                logros: [
                    'Atención práctica y personalizada',
                    'Identidad digital lista para vender',
                    'Canales de venta activados rápidamente',
                    'Acompañamiento hasta la primera venta'
                ],
                footer: 'Menos espera. Más acción.'
            },
            {
                title: 'ECONOMÍA DIGITAL',
                icon: Landmark,
                description: 'Un país preparado para competir. Impulsamos una visión país que mejora el entorno para emprender, vender y crecer con tecnología.',
                logros: [
                    'Mejores condiciones para emprender y vender',
                    'Más empleo y oportunidades digitales',
                    'Servicios digitales más eficientes',
                    'Ecosistema alineado a estándares globales'
                ],
                footer: 'Cuando el país avanza, tu negocio también.'
            },
            {
                title: 'Open Data Transformación Digital',
                icon: Database,
                description: 'Inteligencia basada en evidencia. Promovemos el uso de datos abiertos para crear servicios digitales, soluciones tecnológicas e inteligencia.',
                listHeader: '¿QUÉ IMPULSAMOS?',
                logros: [
                    'Datos útiles para productividad y servicios',
                    'Innovación mediante retos y laboratorios',
                    'Decisiones públicas basadas en evidencia'
                ],
                footer: 'Con datos abiertos, las decisiones son más inteligentes.'
            }
        ]
    },
    {
        id: 'ruta',
        label: 'RUTA',
        type: 'custom' // Handled by EcuadorDigitalJourney
    },
    {
        id: 'comercio',
        label: 'COMERCIO',
        type: 'custom' // Handled by CommerceDigital
    },
    {
        id: 'mipyme',
        label: 'EMPRENDEDOR',
        type: 'custom' // Handled by MipymeDigital
    },
    {
        id: 'brigadas',
        label: 'BRIGADAS',
        type: 'cta',
        content: {
            mapPlaceholder: 'Mapa de Ecuador',
            ctaText: 'REGÍSTRATE A UNA BRIGADA'
        }
    },
    {
        id: 'economia',
        label: 'ECONOMÍA DIGITAL',
        type: 'custom' // Handled by EconomiaDigital
    },
    {
        id: 'datalab',
        label: 'DATOS ABIERTOS',
        type: 'custom' // Handled by DataLab
    }
];

const ProgramTabs = () => {
    const [activeTab, setActiveTab] = useState(tabsData[0].id);
    const [flippedCards, setFlippedCards] = useState({});

    const activeContent = tabsData.find(tab => tab.id === activeTab);

    const handleCardFlip = (idx, isFlipped) => {
        setFlippedCards(prev => ({
            ...prev,
            [idx]: isFlipped
        }));
    };

    // Deep Linking: Handle hash changes to switch tabs and scroll
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (['#acerca-de', '#proyectos', '#programas'].includes(hash)) {
                if (activeTab !== 'programas') {
                    setActiveTab('programas');
                    // Wait for render then scroll
                    setTimeout(() => {
                        const element = document.querySelector(hash);
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }, 100);
                } else {
                    // Already on tab, but ensure scroll
                    const element = document.querySelector(hash);
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        // Check on mount
        handleHashChange();
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [activeTab]);

    // Cleanup: Clear hash if switching away from programs while hash points to it
    useEffect(() => {
        if (activeTab !== 'programas') {
            const hash = window.location.hash;
            if (['#acerca-de', '#proyectos'].includes(hash)) {
                // Use replaceState to avoid cluttering history
                window.history.replaceState(null, '', window.location.pathname + window.location.search);
            }
        }
    }, [activeTab]);

    return (
        <section id="programas" className="bg-slate-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Sticky Tabs Navigation */}
                <div className="sticky top-0 z-30 bg-slate-100/95 backdrop-blur-sm py-4 mb-12">
                    <div className="flex overflow-x-auto gap-2 md:gap-4 pb-2 md:justify-center no-scrollbar">
                        {tabsData.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                                    relative px-5 py-2.5 md:px-7 md:py-3 rounded-full font-bold text-sm md:text-base
                                    whitespace-nowrap transition-all duration-300 flex-shrink-0
                                    ${activeTab === tab.id
                                        ? 'text-white'
                                        : 'text-gray-600 hover:text-gob-blue hover:bg-white/50'
                                    }
                                `}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gob-blue rounded-full"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[500px]">
                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {/* Custom Components per Tab */}
                            {activeTab === 'ruta' && <EcuadorDigitalJourney />}
                            {activeTab === 'comercio' && <CommerceDigital />}
                            {activeTab === 'mipyme' && <EmprendedorDigital />}
                            {activeTab === 'brigadas' && <BrigadasTech />}
                            {activeTab === 'economia' && <EconomiaDigital />}
                            {activeTab === 'datalab' && <DataLab />}

                            {/* PROGRAMAS Grid with Flip Cards */}
                            {activeContent?.type === 'grid' && (
                                <>
                                    {/* EmpoderaTech Overview Section - Two Columns */}
                                    <div id="acerca-de" className="mb-12 max-w-7xl mx-auto scroll-mt-40">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            {/* LEFT COLUMN: ¿Para qué sirve? */}
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg"
                                            >
                                                <div className="flex items-start gap-3 mb-4">
                                                    <span className="text-4xl">🚀</span>
                                                    <div>
                                                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                                                            ¿QUÉ ES EMPODERATECH?
                                                        </h2>
                                                        <p className="text-lg font-bold text-gob-blue mb-3">
                                                            De empezar en digital a vender de verdad
                                                        </p>
                                                    </div>
                                                </div>

                                                <p className="text-gray-700 leading-relaxed mb-4">
                                                    Es un programa que acompaña a emprendedores y mipymes para usar la tecnología de forma sencilla, ordenar su negocio, vender más y crecer, paso a paso.
                                                </p>

                                                <p className="text-gray-700 font-medium mb-6">
                                                    No necesitas saber de tecnología. EmpoderaTech te guía desde donde estás.
                                                </p>

                                                <div className="mb-6">
                                                    <p className="font-bold text-slate-900 mb-3">¿Qué ganas con EmpoderaTech?</p>
                                                    <ul className="space-y-2">
                                                        {[
                                                            'Tener una presencia digital que se vea profesional',
                                                            'Usar herramientas digitales que sí te ayudan en el día a día',
                                                            'Vender por internet y aceptar pagos digitales',
                                                            'Llegar a más clientes y nuevos mercados',
                                                            'Aprovechar la inteligencia artificial sin complicaciones',
                                                            'Mejorar tus ventas, tu productividad y tu negocio'
                                                        ].map((item, index) => (
                                                            <li key={index} className="flex items-start gap-2">
                                                                <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                                <span className="text-gray-700 text-sm">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <p className="text-gray-600 text-sm leading-relaxed bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200">
                                                    EmpoderaTech llega a todo el país, con enfoque en territorio, inclusión y alianzas que hacen posible la transformación digital para todos.
                                                </p>
                                            </motion.div>

                                            {/* RIGHT COLUMN: ¿Por qué es diferente? */}
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="bg-gradient-to-b from-indigo-950 to-slate-900 rounded-2xl p-8 border border-indigo-800 shadow-lg text-white"
                                            >
                                                <h2 className="text-2xl md:text-3xl font-black mb-2">
                                                    ¿POR QUÉ EMPODERATECH ES DIFERENTE?
                                                </h2>
                                                <p className="text-lg font-bold text-cyan-300 mb-4">
                                                    Aquí no te dejan solo.
                                                </p>

                                                <p className="text-blue-100 leading-relaxed mb-6">
                                                    Mientras otros programas solo enseñan, EmpoderaTech te acompaña, te orienta y avanza contigo hasta que ves resultados reales.
                                                </p>

                                                <div>
                                                    <p className="font-bold text-yellow-400 mb-3">¿Qué lo hace diferente?</p>
                                                    <ul className="space-y-2">
                                                        {[
                                                            'Una ruta clara, según tu nivel',
                                                            'Diagnóstico para saber qué necesitas',
                                                            'Acompañamiento práctico, no solo clases',
                                                            'Apoyo de plataformas y aliados',
                                                            'Enfoque en vender y crecer, no solo aprender',
                                                            'Inclusión territorial y de género',
                                                            'Uso simple y útil de la tecnología'
                                                        ].map((item, index) => (
                                                            <li key={index} className="flex items-start gap-2">
                                                                <Check className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                                                <span className="text-blue-100 text-sm">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <p className="text-cyan-200 text-sm font-bold mt-8 italic text-center">
                                                    Esta es una gran oportunidad para hacer crecer tu negocio.
                                                </p>
                                            </motion.div>
                                        </div>

                                        {/* Divider */}
                                        <div id="proyectos" className="flex items-center justify-center gap-3 mt-12 mb-8">
                                            <div className="h-px w-24 bg-gradient-to-r from-transparent to-gray-300"></div>
                                            <span className="text-gray-500 font-bold text-sm uppercase tracking-wider">
                                                Nuestros proyectos
                                            </span>
                                            <div className="h-px w-24 bg-gradient-to-l from-transparent to-gray-300"></div>
                                        </div>
                                    </div>

                                    {/* Programs Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {activeContent.content.map((item, idx) => {
                                            const ItemIcon = item.icon;
                                            const isFlipped = flippedCards[idx] || false;

                                            return (
                                                <motion.div
                                                    key={idx}
                                                    className="relative h-96 perspective-1000 cursor-pointer group"
                                                    onHoverStart={() => handleCardFlip(idx, true)}
                                                    onHoverEnd={() => handleCardFlip(idx, false)}
                                                    onClick={() => handleCardFlip(idx, !isFlipped)}
                                                >
                                                    <motion.div
                                                        className="relative w-full h-full preserve-3d"
                                                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                                                        transition={{ duration: 0.5 }}
                                                    >
                                                        {/* FRONT - Program Title */}
                                                        <div className="absolute inset-0 p-8 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-xl border border-slate-700 group-hover:border-cyan-500 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-500 backface-hidden flex flex-col items-center justify-center text-center">
                                                            {/* Icon Badge - Glass Style */}
                                                            <div className="relative mb-6">
                                                                <div className="w-20 h-20 bg-cyan-900/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-cyan-500/30 group-hover:border-cyan-400 transition-all duration-300">
                                                                    <ItemIcon className="w-10 h-10 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" strokeWidth={2} />
                                                                </div>
                                                                {/* Neón glow effect */}
                                                                <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                                            </div>

                                                            {/* Title */}
                                                            <h3 className="text-xl font-extrabold text-white mb-3 leading-tight">
                                                                {item.title}
                                                            </h3>

                                                            {/* Hover indicator */}
                                                            <div className="flex items-center gap-2 text-xs text-slate-400 group-hover:text-cyan-400 transition-colors duration-300">
                                                                <span>Pasa el mouse para más info</span>
                                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                                                            </div>

                                                            {/* Tech decoration corners */}
                                                            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-cyan-500/20 rounded-tr-2xl"></div>
                                                            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-cyan-500/20 rounded-bl-2xl"></div>
                                                        </div>

                                                        {/* BACK - Description + Details */}
                                                        <div className="absolute inset-0 p-6 bg-gradient-to-b from-indigo-950 to-slate-900 rounded-2xl shadow-xl border border-indigo-800 backface-hidden rotate-y-180 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                                            {/* Title on back */}
                                                            <h3 className="text-white font-bold text-lg mb-3 pb-2 border-b border-indigo-700">
                                                                {item.title}
                                                            </h3>

                                                            {/* Description */}
                                                            <p className="text-slate-300 text-sm leading-relaxed mb-4">
                                                                {item.description}
                                                            </p>

                                                            {/* Logros / Iniciativas / Objetivos */}
                                                            {/* Show logros if exists */}
                                                            {item.logros && (
                                                                <div className="space-y-2 mb-4">
                                                                    <h4 className="text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                        <div className="h-px w-4 bg-cyan-400"></div>
                                                                        {item.listHeader || '¿QUÉ GANAS AL SUMARTE?'}
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {item.logros.map((detail, i) => (
                                                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                                                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                                                                <span className="leading-relaxed">{detail}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Show iniciativas if exists */}
                                                            {item.iniciativas && (
                                                                <div className="space-y-2 mb-4">
                                                                    <h4 className="text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                        <div className="h-px w-4 bg-cyan-400"></div>
                                                                        INICIATIVAS QUE LO HACEN POSIBLE
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {item.iniciativas.map((detail, i) => (
                                                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                                                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                                                                <span className="leading-relaxed">{detail}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Show objetivos if exists (for cards that only have objetivos) */}
                                                            {!item.logros && !item.iniciativas && item.objetivos && (
                                                                <div className="space-y-2">
                                                                    <h4 className="text-cyan-300 font-bold text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                                                                        <div className="h-px w-4 bg-cyan-400"></div>
                                                                        QUÉ BUSCAMOS
                                                                    </h4>
                                                                    <ul className="space-y-2">
                                                                        {item.objetivos.map((detail, i) => (
                                                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                                                                                <Check className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" strokeWidth={2.5} />
                                                                                <span className="leading-relaxed">{detail}</span>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Footer text if exists */}
                                                            {item.footer && (
                                                                <div className="mt-4 pt-3 border-t border-indigo-800/50">
                                                                    <p className="text-cyan-300/90 text-sm font-semibold italic text-center">
                                                                        {item.footer}
                                                                    </p>
                                                                </div>
                                                            )}

                                                            {/* Decorative tech element at bottom */}
                                                            <div className="absolute bottom-4 right-4 flex items-center gap-1 opacity-20">
                                                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Impact Section - Only visible in this tab */}
                                    <div className="mt-20">
                                        <ImpactSection />
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};


export default ProgramTabs;
