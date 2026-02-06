import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Rocket, Link2, TrendingUp, Target } from "lucide-react";

// Phases Data - EmpoderaTech 2025-2029
const phasesData = [
    {
        id: 1,
        year: "2026",
        title: "DESPEGUE",
        subtitle: "Activar capacidades y encender motores",
        tagline: "Todo gran impacto empieza construyendo una base sólida.",
        frontText: "Fortalecimiento de capacidades digitales, diagnóstico de brechas y preparación de emprendedores y mipymes.",
        backText: "Mipymes y emprendedores listos para integrarse al ecosistema digital, con habilidades, herramientas y claridad de ruta.",
        icon: Rocket,
        color: "cyan",
        colorClass: "text-cyan-400",
        glowClass: "group-hover:text-cyan-300 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,1)]",
        borderColor: "border-cyan-500/30",
        bgColor: "bg-cyan-500/10",
        shadowColor: "shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:shadow-[0_0_35px_rgba(56,189,248,0.7)]",
        dotColor: "bg-cyan-400",
        dotShadow: "shadow-[0_0_20px_rgba(34,211,238,0.9)]",
        position: "right"
    },
    {
        id: 2,
        year: "2026-2028",
        title: "ASCENSO",
        subtitle: "Conectar, acelerar y ganar tracción",
        tagline: "El cohete ya está en el aire: ahora se conecta con su entorno.",
        frontText: "Vinculación con aliados estratégicos, adopción tecnológica y acceso a oportunidades de mercado.",
        backText: "Ventas digitales en crecimiento, generación de empleo y negocios operando activamente en el ecosistema.",
        icon: Link2,
        color: "blue",
        colorClass: "text-blue-500",
        glowClass: "group-hover:text-blue-400 group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,1)]",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/10",
        shadowColor: "shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_35px_rgba(59,130,246,0.7)]",
        dotColor: "bg-blue-500",
        dotShadow: "shadow-[0_0_20px_rgba(59,130,246,0.9)]",
        position: "left"
    },
    {
        id: 3,
        year: "2028-2030",
        title: "ÓRBITA Y EXPANSIÓN",
        subtitle: "Escalar impacto y consolidar transformación país",
        tagline: "El impacto se sostiene, se expande y se vuelve estructural.",
        frontText: "Escalamiento nacional, impacto sostenible y articulación público-privada a gran escala.",
        backText: "Un ecosistema digital fortalecido con mipymes y emprendedores competitivos, empleo de calidad y crecimiento económico sostenido.",
        icon: TrendingUp,
        color: "yellow",
        colorClass: "text-yellow-400",
        glowClass: "group-hover:text-yellow-300 group-hover:drop-shadow-[0_0_20px_rgba(234,179,8,1)]",
        borderColor: "border-yellow-500/30",
        bgColor: "bg-yellow-500/10",
        shadowColor: "shadow-[0_0_15px_rgba(234,179,8,0.3)] group-hover:shadow-[0_0_35px_rgba(234,179,8,0.7)]",
        dotColor: "bg-yellow-400",
        dotShadow: "shadow-[0_0_20px_rgba(234,179,8,0.9)]",
        position: "right"
    }
];

// FlipCard Component (now with hover instead of click)
const FlipCard = ({ phase }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const Icon = phase.icon;

    return (
        <motion.div
            className="relative w-full h-auto min-h-[350px] md:min-h-[380px] cursor-pointer preserve-3d group"
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}
            style={{ transformStyle: "preserve-3d" }}
        >
            {/* FRONT FACE */}
            <div className={`absolute inset-0 backface-hidden bg-slate-800/50 border ${phase.borderColor} rounded-2xl p-6 transition-all duration-300 ${phase.shadowColor}`}>
                <div className="flex flex-col h-full">
                    <div className={`p-3 ${phase.bgColor} rounded-lg border ${phase.borderColor} w-fit mb-4`}>
                        <Icon className={`w-8 h-8 ${phase.colorClass}`} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white uppercase mb-2 leading-tight">{phase.title}</h3>
                    <p className="text-base md:text-lg font-bold text-white mb-2 leading-tight">{phase.subtitle}</p>
                    <p className="text-xs text-gray-400 mb-4 italic">{phase.tagline}</p>
                    <p className="text-sm font-semibold text-gray-300 mb-2">Enfoque:</p>
                    <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                        {phase.frontText}
                    </p>
                </div>
                <div className={`absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 ${phase.borderColor} rounded-tr-2xl`}></div>
            </div>

            {/* BACK FACE */}
            <div
                className={`absolute inset-0 backface-hidden bg-slate-800/50 border ${phase.borderColor} rounded-2xl p-6 transition-all duration-300 ${phase.shadowColor}`}
                style={{ transform: "rotateY(180deg)" }}
            >
                <div className="flex flex-col h-full">
                    <div className={`p-2 ${phase.bgColor} rounded-lg border ${phase.borderColor} w-fit mb-4`}>
                        <Target className={`w-8 h-8 ${phase.colorClass}`} strokeWidth={1.5} />
                    </div>
                    <h4 className={`text-xs font-bold ${phase.colorClass} uppercase mb-3 tracking-wider`}>Resultados Esperados</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        {phase.backText}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

// TimelineItem Component
const TimelineItem = ({ phase, index }) => {
    return (
        <div className="group relative mb-12 md:mb-20 last:mb-0">
            {/* MOBILE LAYOUT: Vertical Stack (Year -> Card) */}
            <div className="md:hidden flex flex-col items-center gap-6">
                {/* Year - Always on top for mobile */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                >
                    <h2 className={`text-4xl sm:text-5xl font-black ${phase.colorClass} ${phase.glowClass} transition-all duration-300`}>
                        {phase.year}
                    </h2>
                </motion.div>

                {/* Card - Always below year for mobile */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.1 }}
                    className="w-full"
                >
                    <FlipCard phase={phase} />
                </motion.div>
            </div>

            {/* DESKTOP LAYOUT: Zig-Zag Grid */}
            <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-8">
                {/* LEFT SIDE */}
                {phase.position === "right" ? (
                    // Year on LEFT when card is on RIGHT
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="text-right"
                    >
                        <h2 className={`text-6xl lg:text-7xl font-black ${phase.colorClass} ${phase.glowClass} transition-all duration-300`}>
                            {phase.year}
                        </h2>
                    </motion.div>
                ) : (
                    // Card on LEFT when year is on RIGHT
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <FlipCard phase={phase} />
                    </motion.div>
                )}

                {/* CENTER - Timeline dot (Desktop only) */}
                <div className="relative flex-shrink-0">
                    <div className={`w-6 h-6 rounded-full ${phase.dotColor} border-4 border-slate-950 ${phase.dotShadow} z-10 animate-pulse`}></div>
                </div>

                {/* RIGHT SIDE */}
                {phase.position === "right" ? (
                    // Card on RIGHT when year is on LEFT
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                    >
                        <FlipCard phase={phase} />
                    </motion.div>
                ) : (
                    // Year on RIGHT when card is on LEFT
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="text-left"
                    >
                        <h2 className={`text-6xl lg:text-7xl font-black ${phase.colorClass} ${phase.glowClass} transition-all duration-300`}>
                            {phase.year}
                        </h2>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const Roadmap = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform scroll progress to line height
    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} id="roadmap" className="bg-slate-950 py-12 md:py-20 lg:py-32 overflow-hidden relative">
            {/* Background decoration */}
            <div className="absolute top-0 left-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2"></div>



            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-base md:text-xl lg:text-2xl font-bold text-gob-gold tracking-wide uppercase mb-2">
                        VISIÓN DE FUTURO
                    </h2>
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                        Hoja de Ruta <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-yellow-400">
                            EmpoderaTech 2025-2029
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl">
                        De activar capacidades a transformar el país.
                    </p>
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Vertical Line with Dynamic Glow */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/20 via-blue-500/40 to-yellow-500/20 -translate-x-1/2"></div>

                    {/* Glowing segment that follows scroll */}
                    <motion.div
                        className="hidden md:block absolute left-1/2 -translate-x-1/2 w-1.5 pointer-events-none rounded-full"
                        style={{
                            top: 0,
                            height: lineHeight,
                            background: "linear-gradient(to bottom, #22d3ee, #3b82f6, #eab308)",
                            boxShadow: "0 0 20px rgba(34,211,238,0.6), 0 0 30px rgba(59,130,246,0.6), 0 0 40px rgba(234,179,8,0.6)",
                        }}
                    />

                    {/* Timeline Items */}
                    <div className="relative">
                        {phasesData.map((phase, index) => (
                            <TimelineItem key={phase.id} phase={phase} index={index} />
                        ))}
                    </div>
                </div>

                {/* Closing Statement - Made Shorter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16 max-w-3xl mx-auto"
                >
                    <div className="bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-yellow-500/10 border border-cyan-500/30 rounded-2xl p-6 md:p-8">
                        <p className="text-xl md:text-2xl font-black text-white leading-tight mb-1">
                            EmpoderaTech no es un programa.
                        </p>
                        <p className="text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                            Es una ruta de despegue para el desarrollo productivo del Ecuador.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Roadmap;
