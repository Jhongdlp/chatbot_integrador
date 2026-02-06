import { motion } from 'framer-motion';
import { Play, Instagram, Lightbulb, Headphones, ArrowUpRight, Sparkles } from 'lucide-react';
// ... imports

const MultimediaSection = () => {
    return (
        <section id="recursos" className="py-20 px-4 md:px-8 bg-white overflow-hidden scroll-mt-32">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12 text-center md:text-left">
                    <h2 className="text-4xl font-extrabold text-impulsa-dark mb-4">
                        Recursos <span className="text-transparent bg-clip-text bg-gradient-to-r from-gob-blue to-purple-600">Educativos</span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl">
                        Aprende con contenido dinámico, historias reales y tips rápidos para potenciar tu negocio hoy mismo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">

                    {/* Tarjeta 1: Podcast (Horizontal - Grande - Col Span 2) */}
                    <motion.a
                        href="https://observatorioecuadordigital.mintel.gob.ec/webinario-empoderatech/"
                        target="_top"
                        whileHover={{ y: -5 }}
                        className="md:col-span-2 relative group rounded-[2rem] overflow-hidden shadow-xl cursor-pointer block"
                    >
                        {/* Imagen de Fondo */}
                        <img
                            src="/img/webinar_card_bg.png"
                            alt="Webinarios EmpoderaTech"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Overlay Gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:bg-black/60" />

                        {/* Contenido */}
                        <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex items-end justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="bg-green-500/20 backdrop-blur-md text-green-300 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                        <Sparkles size={12} className="text-green-400" /> Disponible
                                    </span>
                                </div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                                    Regístrate ahora
                                </h3>
                            </div>

                            {/* Botón Play Gigante */}
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all group-hover:bg-white group-hover:text-green-600"
                            >
                                <Play size={32} fill="currentColor" className="ml-1" />
                            </motion.div>
                        </div>
                    </motion.a>

                    {/* Tarjeta 2: Reels & Tips (Vertical - Row Span 2) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="md:row-span-2 relative group rounded-[2rem] overflow-hidden shadow-xl cursor-pointer bg-gray-900 border-4 border-gray-900"
                    >
                        {/* Imagen de Fondo */}
                        <img
                            src="/img/person_speaking_tech_tips.png"
                            alt="EmpoderaTech Tips"
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute top-4 left-4 z-20">
                            <span className="bg-white/20 backdrop-blur-md text-white border border-white/30 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                                <Sparkles size={12} className="text-yellow-400" /> Próximamente
                            </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

                        {/* Top Bar */}
                        <div className="absolute top-6 right-6 z-10">
                            <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                                <Instagram size={20} />
                            </div>
                        </div>

                        {/* Contenido Bottom */}
                        <div className="absolute bottom-8 left-6 right-6 z-10">
                            <h3 className="text-4xl font-black text-white italic mb-2 tracking-tighter">
                                TIPS <br />
                            </h3>
                            <div className="h-1 w-20 bg-impulsa-yellow mb-4 rounded-full"></div>
                            <p className="text-gray-300 text-sm mb-4">
                                Marketing, herramientas y hacks de productividad para tu día a día.
                            </p>
                            <button className="w-full py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white font-bold text-sm hover:bg-white hover:text-impulsa-dark transition-all duration-300">
                                Ver en Instagram
                            </button>
                        </div>
                    </motion.div>

                    {/* Tarjeta 3: Fun Fact (Compacta - Col Span 1) */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-impulsa-yellow rounded-[2rem] p-8 shadow-lg flex flex-col justify-between relative overflow-hidden group"
                    >
                        <Lightbulb size={120} className="absolute -right-8 -bottom-8 text-yellow-600/20 rotate-12 group-hover:scale-110 group-hover:rotate-0 transition-transform duration-500" />

                        <div className="flex justify-between items-start z-10">
                            <div className="w-12 h-12 bg-impulsa-dark/10 rounded-full flex items-center justify-center text-impulsa-dark mb-4">
                                <span className="font-bold text-xl">?</span>
                            </div>
                            <ArrowUpRight className="text-impulsa-dark/40" />
                        </div>

                        <div className="z-10">
                            <h4 className="text-impulsa-dark font-black text-lg uppercase tracking-wide opacity-60 mb-1">
                                ¿Sabías que?
                            </h4>
                            <p className="text-impulsa-dark font-bold text-2xl leading-snug">
                                Las Pymes digitalizadas venden un <span className="underline decoration-4 decoration-white/50">40% más</span> que las tradicionales.
                            </p>
                        </div>
                    </motion.div>



                </div>
            </div>
        </section>
    );
};

export default MultimediaSection;
