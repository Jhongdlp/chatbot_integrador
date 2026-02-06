import { motion } from 'framer-motion';
import {
    MapPin,
    Heart,
    Radio, // For Podcast/Webinars
    ShieldCheck,
    CheckCircle2,
    Users,
    TrendingUp,
    PlayCircle,
    Globe,
    Facebook,
    Instagram,
    Twitter
} from 'lucide-react';

const EmprendedorDigital = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const Programs = [
        {
            title: "DIGITALÍZATE RURAL",
            subtitle: "Vende desde tu territorio al mundo",
            target: "Para quién: emprendedores rurales, artesanos y comunidades productivas",
            goal: "Qué logramos: que tu producto tenga presencia digital y canales de venta activos",
            points: [
                "Aprendes a vender en línea",
                "Muestras tu producto con identidad local",
                "Accedes a mercados digitales sin intermediarios"
            ],
            tag: "Del territorio al cliente digital",
            icon: MapPin,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            border: "border-emerald-200"
        },
        {
            title: "EMPODERADAS",
            subtitle: "Mujeres que emprenden, venden y lideran en digital",
            target: "Para quién: mujeres emprendedoras",
            goal: "Qué logramos: autonomía económica usando herramientas digitales",
            points: [
                "Tu negocio visible en digital",
                "Más control de tus ventas",
                "Red de apoyo y acompañamiento"
            ],
            tag: "Tecnología para tu independencia económica",
            icon: Heart,
            color: "text-blue-600", // Keeping to blue theme as requested, avoiding strong pinks
            bg: "bg-blue-50",
            border: "border-blue-200"
        },
        {
            title: "EMPRENDEDOR DIGITAL / TECH TALKS",
            subtitle: "Aprende lo que hoy sí funciona en digital",
            target: "Charlas prácticas y contenidos claros para que:",
            goal: "", // Description moved to target for layout
            points: [
                "Entiendas cómo vender en digital",
                "Conozcas herramientas reales",
                "Pierdas el miedo a la tecnología"
            ],
            tag: "Menos teoría, más acción",
            icon: PlayCircle,
            color: "text-sky-600",
            bg: "bg-sky-50",
            border: "border-sky-200"
        },
        {
            title: "CIBERSEGURIDAD PARA MIPYMES",
            subtitle: "Protege tu negocio y gana confianza",
            target: "Te ayudamos a:",
            goal: "",
            points: [
                "Evitar fraudes y estafas",
                "Proteger tus datos y pagos",
                "Vender con mayor seguridad"
            ],
            tag: "Vender seguro también es vender más",
            icon: ShieldCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            border: "border-indigo-200"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-20 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <motion.div
                    className="text-center max-w-4xl mx-auto mb-20"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tight">
                        Proyecto <span className="text-blue-700">Emprendedor Digital</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 font-medium mb-2">
                        ¿Cómo impulsamos tu negocio?
                    </p>
                </motion.div>

                {/* Programs Grid */}
                <motion.div
                    className="grid md:grid-cols-2 gap-8 mb-24"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {Programs.map((program, idx) => (
                        <motion.div
                            key={idx}
                            variants={fadeIn}
                            className={`rounded-3xl p-8 md:p-10 border ${program.border} bg-white shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${program.bg} rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110`} />

                            <div className="relative z-10">
                                <div className={`w-14 h-14 ${program.bg} ${program.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <program.icon size={28} strokeWidth={2.5} />
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">
                                    {program.title}
                                </h3>
                                <p className={`text-lg font-semibold ${program.color} mb-6`}>
                                    {program.subtitle}
                                </p>

                                <div className="space-y-4 mb-8">
                                    {(program.target || program.goal) && (
                                        <div className="text-slate-600 text-sm leading-relaxed">
                                            {program.target && <p className="mb-1">{program.target}</p>}
                                            {program.goal && <p>{program.goal}</p>}
                                        </div>
                                    )}

                                    <ul className="space-y-3 mt-4">
                                        {program.points.map((point, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-700">
                                                <CheckCircle2 className={`w-5 h-5 ${program.color} flex-shrink-0 mt-0.5`} />
                                                <span className="font-medium">{point}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${program.bg} ${program.color} font-bold text-sm`}>
                                    <span>👉 {program.tag}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden mb-20"
                >
                    {/* Background Glow */}
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h3 className="text-3xl font-bold mb-8">Este proyecto es para ti si:</h3>

                        <div className="grid sm:grid-cols-2 gap-6 text-left mb-10">
                            {[
                                "Tienes un emprendimiento o negocio",
                                "Quieres vender más usando tecnología",
                                "Buscas apoyo real, no solo cursos",
                                "Quieres competir en la economía digital"
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                                    <CheckCircle2 className="text-sky-400 w-6 h-6 flex-shrink-0" />
                                    <span className="font-medium text-lg">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Social Media & Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center max-w-2xl mx-auto bg-white rounded-3xl p-8 border border-slate-200 shadow-sm"
                >
                    <div className="inline-block p-4 bg-yellow-50 rounded-full mb-6">
                        <span className="text-3xl">🔔</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Da el siguiente paso</h3>
                    <p className="text-slate-600 mb-8 leading-relaxed">
                        Las convocatorias se anuncian oficialmente a través de las redes sociales de MINTEL.<br />
                        <span className="font-bold text-blue-600">Síguenos y mantente atento para postular</span>
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="https://www.telecomunicaciones.gob.ec/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-600 hover:text-white transition-all hover:scale-110" title="Web Oficial">
                            <Globe size={24} />
                        </a>
                        <a href="https://www.facebook.com/share/1E1VnECyeV/" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-blue-700 hover:text-white transition-all hover:scale-110" title="Facebook">
                            <Facebook size={24} />
                        </a>
                        <a href="https://www.instagram.com/telecom.ec?igsh=MTR1NzlrcmJyZ2IxNg==" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-pink-600 hover:text-white transition-all hover:scale-110" title="Instagram">
                            <Instagram size={24} />
                        </a>
                        {/* X (formerly Twitter) icon */}
                        <a href="https://x.com/Telecom_Ec" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-black hover:text-white transition-all hover:scale-110" title="X (Twitter)">
                            <Twitter size={24} />
                        </a>
                        {/* TikTok Custom SVG since Lucide might not have it or it varies */}
                        <a href="https://www.tiktok.com/@telecom_ec?_r=1&_t=ZS-93Gp4oafCZk" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full text-slate-600 hover:bg-black hover:text-white transition-all hover:scale-110" title="TikTok">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
                        </a>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default EmprendedorDigital;
