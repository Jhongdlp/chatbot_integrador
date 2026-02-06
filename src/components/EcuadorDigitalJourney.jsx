import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    BrainCircuit,
    Globe,
    Zap,
    Rocket,
    ShoppingCart,
    ArrowRight,
    Target,
    Lightbulb,
    TrendingUp,
    CheckCircle2,
    FileText,
    GraduationCap,
    BarChart3,
    Cloud,
    Sun,
    Waves
} from 'lucide-react';

const stations = [
    {
        id: 0,
        title: "Sensibilización",
        subtitle: "El Origen Digital",
        desc: "Diagnóstico express y cambio de cultura.",
        icon: BrainCircuit,
        color: "bg-emerald-500",
        bgGradient: "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-green-900 via-emerald-950 to-black",
        region: "AMAZONÍA",
        atmosphere: (
            <>
                {/* Fireflies */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-yellow-300 rounded-full blur-[1px]"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [0, -20, 0],
                            x: [0, Math.random() * 20 - 10, 0]
                        }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
                {/* Jungle Silhouettes */}
                <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-30 pointer-events-none">
                    <svg viewBox="0 0 1440 320" className="w-full h-full text-emerald-900 fill-current">
                        <path fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </>
        )
    },
    {
        id: 1,
        title: "Presencia Digital",
        subtitle: "Construyendo Estructura",
        desc: "Tu primera web y redes sociales activas.",
        icon: Globe,
        color: "bg-blue-500",
        bgGradient: "bg-gradient-to-b from-slate-900 via-blue-900 to-slate-800",
        region: "SIERRA",
        atmosphere: (
            <>
                {/* Floating Clouds */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute text-white/10"
                        style={{
                            top: `${10 + i * 20}%`,
                            left: `${20 + i * 30}%`
                        }}
                        animate={{ x: [0, 50, 0] }}
                        transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                    >
                        <Cloud size={100 + i * 50} />
                    </motion.div>
                ))}
                {/* Mountains */}
                <div className="absolute bottom-0 w-full h-[50vh] z-0 opacity-40">
                    <div className="absolute bottom-0 left-[-10%] w-0 h-0 border-l-[30vw] border-r-[30vw] border-b-[40vh] border-l-transparent border-r-transparent border-b-slate-800" />
                    <div className="absolute bottom-0 right-[-10%] w-0 h-0 border-l-[40vw] border-r-[40vw] border-b-[50vh] border-l-transparent border-r-transparent border-b-slate-700" />
                </div>
            </>
        )
    },
    {
        id: 2,
        title: "Productividad",
        subtitle: "Eficiencia Digital",
        desc: "Digitalización de procesos internos.",
        icon: Zap,
        color: "bg-indigo-500",
        bgGradient: "bg-gradient-to-br from-indigo-900 via-violet-900 to-purple-950",
        region: "SIERRA ALTA",
        atmosphere: (
            <>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-400 to-transparent" />
                <motion.div
                    className="absolute top-20 right-20 text-indigo-300 opacity-20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                    <Zap size={200} />
                </motion.div>
            </>
        )
    },
    {
        id: 3,
        title: "Comercio Digital",
        subtitle: "Marketing y Ventas",
        desc: "Comercio electrónico y estrategias de marketing.",
        icon: ShoppingCart,
        color: "bg-sky-500",
        bgGradient: "bg-gradient-to-b from-sky-500 via-blue-600 to-blue-800",
        region: "COSTA",
        atmosphere: (
            <>
                {/* Sun */}
                <motion.div
                    className="absolute top-10 right-10 text-yellow-300"
                    animate={{ y: [0, -10, 0], rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity }}
                >
                    <Sun size={120} />
                </motion.div>
                {/* Waves */}
                <div className="absolute bottom-0 w-full opacity-50 text-blue-200">
                    <Waves className="w-full h-32" />
                </div>
            </>
        )
    },
    {
        id: 4,
        title: "Escalamiento + IA",
        subtitle: "Evolución y Crecimiento",
        desc: "Automatización, IA productiva y escalamiento digital.",
        icon: Rocket,
        color: "bg-teal-400",
        bgGradient: "bg-gradient-to-b from-cyan-500 via-teal-500 to-emerald-600",
        region: "GALÁPAGOS",
        atmosphere: (
            <>
                {/* Bubbles */}
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        style={{
                            bottom: `-${Math.random() * 20}%`,
                            left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: -800,
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: 10 + Math.random() * 10,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "linear"
                        }}
                    />
                ))}
            </>
        )
    }
];

const StationCard = ({ station, isLast }) => {
    return (
        <div className="relative w-[85vw] md:w-[45vw] lg:w-[30vw] h-[55vh] flex-shrink-0 mx-4 md:mx-6 snap-center flex items-center justify-center">
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full h-full md:h-auto md:min-h-[400px] rounded-[2rem] bg-white/5 backdrop-blur-2xl border border-white/20 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] p-6 md:p-8 flex flex-col justify-between relative overflow-hidden group"
            >
                {/* Inner Glow */}
                <div className={`absolute top-0 right-0 w-64 h-64 ${station.color} opacity-20 blur-[100px] rounded-full pointer-events-none group-hover:opacity-30 transition-opacity duration-700`} />

                {/* Region Tag */}
                <div className="relative z-10 mb-8 flex justify-between items-start">
                    <span className="inline-block px-5 py-2 rounded-full bg-white/10 text-white font-bold text-xs tracking-[0.2em] uppercase border border-white/10 backdrop-blur-md">
                        {station.region}
                    </span>
                    <station.icon size={32} className="text-white/50" />
                </div>

                {/* Typography */}
                <div className="relative z-10 mb-8">
                    <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-4 leading-[0.9] break-words">
                        {station.title}
                    </h2>
                    <h3 className="text-xl md:text-2xl text-impulsa-yellow font-light tracking-wide flex items-center gap-3">
                        <span className="w-8 h-[1px] bg-impulsa-yellow/50"></span>
                        {station.subtitle}
                    </h3>
                </div>

                {/* Description & Action */}
                <div className="relative z-10">
                    <p className="text-lg md:text-xl text-gray-200 font-light leading-relaxed mb-10 max-w-md">
                        {station.desc}
                    </p>

                    {isLast ? (
                        <motion.a
                            href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                            target="_top"
                            whileHover={{ scale: 1.02, boxShadow: "0 0 50px rgba(45,212,191,0.8)" }}
                            whileTap={{ scale: 0.98 }}
                            className="block w-full py-6 bg-teal-600/40 backdrop-blur-md border-2 border-teal-400 text-white font-black text-xl md:text-2xl rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.5)] text-center relative overflow-hidden group/btn"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-4 drop-shadow-md">
                                REGÍSTRATE AHORA <ArrowRight strokeWidth={4} />
                            </span>
                            <div className="absolute inset-0 bg-teal-400/50 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                        </motion.a>
                    ) : (
                        <div className="flex items-center gap-4 text-white/40 text-sm font-medium">
                            <div className="w-12 h-1 bg-white/20 rounded-full" />
                            <span>Desliza para continuar</span>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

const EcuadorDigitalJourney = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Calculate scroll end position dynamically based on number of cards
    const [scrollEndX, setScrollEndX] = useState("-55%");

    useEffect(() => {
        const updateScroll = () => {
            const width = window.innerWidth;
            if (width >= 1024) { // lg - 30vw cards
                // Improved calculation for centering last card
                setScrollEndX("-140vw");
            } else if (width >= 768) { // md - 45vw cards
                // Improved calculation for centering last card
                setScrollEndX("-215vw");
            } else {
                setScrollEndX("-55%");
            }
        };

        updateScroll(); // Initial call
        window.addEventListener('resize', updateScroll);
        return () => window.removeEventListener('resize', updateScroll);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], ["0%", scrollEndX]);

    // Rocket Animation - Moves across the screen
    // Ends at 50vw to align with the centered last card
    const rocketX = useTransform(scrollYProgress, [0, 1], ["10vw", "50vw"]);
    const rocketY = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, -20, 0, -20, 0]);
    const rocketRotate = useTransform(scrollYProgress, [0, 1], [45, 45]);

    const bg = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.6, 0.9],
        ["#064e3b", "#312e81", "#4c1d95", "#0369a1", "#0d9488"]
    );

    return (
        <div className="bg-gray-900 font-sans">
            {/* Header Content Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 py-12">
                <div className="max-w-6xl mx-auto px-6">

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gob-slate mb-6">
                            Ruta de Transformación Digital
                        </h1>
                        <p className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto px-4">
                            Acompañamos a emprendedores, artesanos y mipymes en una ruta clara y progresiva para que adopten tecnología, mejoren su productividad, aumenten ventas y compitan en la economía digital, desde su nivel actual hasta un estadio avanzado con uso de IA aplicada.
                        </p>
                    </motion.div>

                    {/* New Video Section */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                        <div className="grid md:grid-cols-2">
                            {/* Text Content */}
                            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-slate-50 to-white">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <h2 className="text-2xl md:text-3xl font-black text-gob-slate mb-6 leading-tight">
                                        ¿Listo para llevar tu negocio de empezar en digital a <span className="text-gob-blue">vender de verdad</span>?
                                    </h2>
                                    <p className="text-lg text-gray-700 font-medium mb-6">
                                        Te mostramos cómo funciona la Ruta de Transformación Digital.
                                    </p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500 italic">
                                        <div className="w-10 h-[1px] bg-gob-blue"></div>
                                        <span>Descubre tu potencial</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Video Player */}
                            <div className="relative bg-slate-900 group h-[300px] md:h-auto">
                                <video
                                    className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                                    controls
                                    preload="metadata"
                                    poster="/img/video_poster_placeholder.jpg"
                                >
                                    <source src="/videos/ruta_transformacion.mp4" type="video/mp4" />
                                    Tu navegador no soporta el elemento de video.
                                </video>

                                {/* Overlay pattern */}
                                <div className="absolute inset-0 bg-blue-900/10 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile View (Vertical) */}
            <div className="md:hidden">
                {stations.map((station) => (
                    <div key={station.id} className="min-h-screen flex flex-col justify-end px-4 py-8 relative overflow-hidden bg-gray-900 border-b border-white/10">
                        <div className={`absolute inset-0 opacity-50 ${station.color.replace('bg-', 'bg-')}/20`} />
                        {station.atmosphere}
                        <div className="relative z-10 bg-black/30 backdrop-blur-xl border border-white/20 rounded-3xl p-6 mb-4 shadow-xl">
                            <span className="text-xs font-bold text-white/60 uppercase tracking-widest block mb-3">{station.region}</span>
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">{station.title}</h2>
                            <p className="text-white/80 text-base mb-6 font-light leading-relaxed">{station.desc}</p>
                            {station.id === 4 && (
                                <a
                                    href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                                    target="_top"
                                    className="block w-full py-4 text-center bg-impulsa-yellow text-black font-bold rounded-xl"
                                >
                                    REGÍSTRATE AHORA
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View (Horizontal Scroll) */}
            <section ref={targetRef} className="hidden md:block relative h-[600vh]">
                <motion.div
                    style={{ backgroundColor: bg }}
                    className="sticky top-0 h-screen flex items-center overflow-hidden transition-colors duration-500"
                >
                    {/* Atmosphere Layers */}
                    <motion.div
                        className="absolute inset-0 z-0 flex h-full"
                        style={{ x }}
                    >
                        {stations.map((station) => (
                            <div
                                key={station.id}
                                className="w-screen h-full flex-shrink-0 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-transparent" />
                                {station.atmosphere}
                            </div>
                        ))}
                    </motion.div>

                    {/* Content Rail */}
                    <motion.div style={{ x }} className="flex h-full items-center pl-[5vw] gap-[5vw] relative z-20">
                        {stations.map((station) => (
                            <StationCard key={station.id} station={station} isLast={station.id === 4} />
                        ))}
                    </motion.div>

                    {/* Fixed HUD */}
                    <div className="absolute top-8 left-10 z-50 flex items-center gap-4 mix-blend-difference text-white opacity-80">
                        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                            <Globe size={20} />
                        </div>
                        <div>
                            <h4 className="font-bold text-sm tracking-widest uppercase">Ruta Digital</h4>
                            <p className="text-[10px] opacity-70">Scroll para explorar</p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 w-full h-2 bg-white/10 z-50">
                        <motion.div
                            className="h-full bg-impulsa-yellow shadow-[0_0_10px_#FFD700]"
                            style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
                        />
                    </div>

                    {/* Flying Rocket */}
                    <motion.div
                        className="absolute bottom-20 z-50 text-white drop-shadow-[0_0_15px_rgba(255,215,0,0.8)]"
                        style={{ left: rocketX, y: rocketY, rotate: rocketRotate }}
                    >
                        <div className="relative">
                            <Rocket size={64} className="text-impulsa-yellow fill-impulsa-yellow" />
                            {/* Rocket Trail */}
                            <motion.div
                                className="absolute top-1/2 right-full w-20 h-2 bg-gradient-to-r from-transparent to-orange-500 rounded-full blur-sm"
                                style={{ y: '-50%' }}
                                animate={{ opacity: [0.5, 0.8, 0.5], width: [60, 80, 60] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* Bottom Content Section */}
            <div className="bg-gradient-to-br from-white to-blue-50 py-16">
                <div className="max-w-6xl mx-auto px-6">


                    {/* Beneficios tangibles */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-gob-slate mb-6 text-center">
                            Beneficios tangibles
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { icon: '👁️', title: 'Aumenta visibilidad', desc: 'Más clientes te encontrarán' },
                                { icon: '⚡', title: 'Optimiza procesos', desc: 'Eficiencia operativa' },
                                { icon: '🛒', title: 'Vende digitalmente', desc: 'Nuevos ingresos' },
                                { icon: '🤖', title: 'Usa IA', desc: 'Ahorra tiempo y mejora decisiones' }
                            ].map((beneficio, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100"
                                >
                                    <div className="text-4xl mb-3">{beneficio.icon}</div>
                                    <h3 className="font-bold text-gray-900 mb-2">{beneficio.title}</h3>
                                    <p className="text-sm text-gray-600">{beneficio.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    {/* Action Buttons */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 md:p-12"
                    >
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                            ¡Comienza tu transformación digital ahora!
                        </h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            <motion.a
                                href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                                target="_top"
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-cyan-400"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-gob-blue to-cyan-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Inscripción</h3>
                                <p className="text-gray-600 text-sm mb-4">Regístrate para comenzar</p>
                                <div className="flex items-center gap-2 text-gob-blue font-semibold group-hover:gap-3 transition-all">
                                    Inscribirse <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.a>

                            <motion.a
                                href="https://pymedigital.ec/User/Registrar#"
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-purple-400"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <BarChart3 className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Chequeo Digital</h3>
                                <p className="text-gray-600 text-sm mb-4">Descubre tu nivel madurez digital</p>
                                <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                                    Evaluar <ArrowRight className="w-4 h-4" />
                                </div>
                            </motion.a>

                            <motion.a
                                href="#cursos"
                                whileHover={{ scale: 1.03, y: -5 }}
                                whileTap={{ scale: 0.98 }}
                                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-400"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <GraduationCap className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Cursos y talleres</h3>
                                <p className="text-gray-600 text-sm mb-4">Capacítate en digital</p>
                                <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                                    Proximamente
                                </div>
                            </motion.a>
                        </div>
                    </motion.section>

                </div>
            </div>
        </div>
    );
};

export default EcuadorDigitalJourney;
