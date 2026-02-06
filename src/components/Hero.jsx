import { motion } from 'framer-motion';
import { ArrowRight, Globe, UserPlus } from 'lucide-react';
import { useState } from 'react';
import ParticleCanvas from './ui/particle-canvas';

const Hero = () => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-32">

            {/* Particle Canvas Background */}
            <ParticleCanvas />

            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">

                {/* COLUMNA IZQUIERDA: Texto */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-left"
                >
                    {/* Badge */}
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block bg-white/10 text-white border border-white/20 px-4 py-2 rounded-full text-sm font-bold tracking-wide uppercase mb-4 backdrop-blur-sm"
                    >
                        Digitaliza. Vende. Crece.

                    </motion.span>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                        Programa <br />
                        <span className="text-cyan-300">EmpoderaTech</span>
                    </h1>

                    <p className="text-white/90 text-lg mb-8 leading-relaxed">
                        EmpoderaTech acompaña a emprendedores y mipymes a digitalizarse, vender más y crecer en la economía digital.

                    </p>

                    <div className="flex flex-wrap gap-4">
                        <a
                            href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                            target="_top"
                            className="bg-white text-gob-blue px-8 py-3 rounded-full font-bold hover:bg-cyan-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                        >
                            Quiero ser parte del programa <ArrowRight size={20} />
                        </a>

                        <a
                            href="#proyectos"
                            className="bg-white/10 text-white border-2 border-white/30 px-8 py-3 rounded-full font-bold hover:bg-white/20 hover:border-white/50 transition-all cursor-pointer backdrop-blur-sm"
                        >
                            Conoce nuestros proyectos
                        </a>
                    </div>
                </motion.div>

                {/* COLUMNA DERECHA: Flip Card */}
                <div className="relative flex justify-center h-96 w-full items-center perspective-1000">
                    <motion.div
                        className="relative w-72 h-72 md:w-80 md:h-80 cursor-pointer preserve-3d"
                        animate={{ rotateY: isFlipped ? 180 : 0 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                        onHoverStart={() => setIsFlipped(true)}
                        onHoverEnd={() => setIsFlipped(false)}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* FRENTE */}
                        <div className="absolute inset-0 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 border border-white/20 backface-hidden">
                            <div className="absolute -top-6 -right-6 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg animate-bounce">
                                ¡Conoce más dando click! 🚀
                            </div>

                            <div className="text-center space-y-3">
                                <p className="text-2xl font-bold text-gray-900">
                                    ¿Listo para dar el siguiente paso?
                                </p>
                                <p className="text-sm text-gray-500">
                                    EmpoderaTech te acompaña a digitalizarte, vender y crecer.
                                </p>
                            </div>
                        </div>

                        {/* REVERSO - Botón de Inscripción */}
                        <div
                            className="absolute inset-0 bg-gradient-to-br from-gob-blue to-blue-700 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 border border-blue-900 backface-hidden rotate-y-180"
                        >
                            <div className="absolute -top-6 -left-6 bg-yellow-400 text-slate-900 font-bold px-4 py-2 rounded-xl shadow-lg">
                                ¡Únete Ahora! ✨
                            </div>

                            <UserPlus size={56} className="text-white mb-4" />
                            <h3 className="text-white font-black text-2xl mb-3 text-center">¡Inscríbete ahora!</h3>
                            <p className="text-center text-blue-100 text-sm mb-6 leading-relaxed">
                                Forma parte de la transformación digital del Ecuador
                            </p>

                            <a
                                href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                                target="_top"
                                className="bg-white text-gob-blue px-8 py-3 rounded-full font-bold hover:bg-yellow-400 hover:text-slate-900 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Ir al formulario <ArrowRight size={20} />
                            </a>
                        </div>
                    </motion.div>
                </div>

            </div>
        </div>
    );
};

export default Hero;