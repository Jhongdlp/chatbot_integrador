import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
    BrainCircuit,
    Globe,
    Zap,
    Rocket,
    ShoppingCart,
    Lock,
    Unlock,
    Star,
    ChevronDown
} from 'lucide-react';

const levels = [
    {
        id: 0,
        title: "Sensibilización y diagnóstico express",
        desc: "Empieza tu cambio de cultura digital.",
        icon: BrainCircuit,
        color: "text-blue-500"
    },
    {
        id: 1,
        title: "Presencia digital básica",
        desc: "Tu primera web y redes sociales.",
        icon: Globe,
        color: "text-teal-500"
    },
    {
        id: 2,
        title: "Productividad digital interna",
        desc: "Eficiencia y digitalización de procesos.",
        icon: Zap,
        color: "text-purple-500"
    },
    {
        id: 3,
        title: "Escalamiento digital + datos e IA productiva",
        desc: "Inteligencia Artificial para crecer.",
        icon: Rocket,
        color: "text-pink-500"
    },
    {
        id: 4,
        title: "Comercio Electrónico y Marketing Avanzado + Sello Digital",
        desc: "Ventas online y certificación oficial.",
        icon: ShoppingCart,
        color: "text-orange-500"
    }
];

const GamifiedJourney = () => {
    const [unlockedLevel, setUnlockedLevel] = useState(0);

    const handleUnlock = (levelIndex) => {
        if (levelIndex === unlockedLevel && levelIndex < levels.length - 1) {
            // Trigger Confetti
            confetti({
                particleCount: 200,
                spread: 100,
                origin: { y: 0.6 },
                colors: ['#FFD700', '#FFFFFF', '#000000'],
                scalar: 1.2
            });

            // Unlock next level
            setTimeout(() => {
                setUnlockedLevel(prev => prev + 1);
            }, 800);
        }
    };

    // Auto-scroll to newly unlocked level
    useEffect(() => {
        if (unlockedLevel > 0) {
            setTimeout(() => {
                const element = document.getElementById(`level-${unlockedLevel}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }
    }, [unlockedLevel]);

    return (
        <div className="py-24 relative overflow-hidden bg-gray-50/50">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-impulsa-yellow/5 rounded-full blur-3xl -z-10" />

            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-20 animate-fade-in-up">
                    <span className="text-impulsa-yellow font-bold tracking-widest uppercase text-sm mb-2 block">Gamificación</span>
                    <h3 className="text-4xl md:text-5xl font-black text-impulsa-dark mb-4 drop-shadow-sm">
                        Tu Camino al <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">Éxito Digital</span>
                    </h3>
                    <p className="text-gray-500 max-w-xl mx-auto text-lg">
                        Desbloquea cada nivel para avanzar en tu transformación.
                    </p>
                </div>

                <div className="relative">
                    {/* Central Progress Line */}
                    <div className="absolute left-4 md:left-1/2 top-10 bottom-10 w-2 bg-gray-200 transform md:-translate-x-1/2 rounded-full overflow-hidden shadow-inner">
                        <motion.div
                            className="w-full bg-gradient-to-b from-impulsa-yellow to-yellow-600 shadow-[0_0_15px_#FFD700]"
                            initial={{ height: '0%' }}
                            animate={{ height: `${(unlockedLevel / (levels.length - 1)) * 100}%` }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                    </div>

                    <div className="space-y-16 md:space-y-24 pb-10">
                        {levels.map((level, index) => {
                            const isUnlocked = index <= unlockedLevel;
                            const isNextToUnlock = index === unlockedLevel;
                            const isCompleted = index < unlockedLevel;

                            return (
                                <motion.div
                                    id={`level-${index}`}
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    className={`relative flex items-center md:justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Center Node (Icon) */}
                                    <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 z-20 transition-all duration-700 ${isUnlocked ? 'scale-110' : 'scale-100 grayscale'
                                        }`}>
                                        <div className={`w-14 h-14 rounded-full border-4 flex items-center justify-center shadow-lg transition-colors duration-500 ${isUnlocked
                                                ? 'bg-impulsa-dark border-impulsa-yellow shadow-[0_0_20px_rgba(255,215,0,0.6)]'
                                                : 'bg-gray-300 border-white'
                                            }`}>
                                            {isUnlocked ? (
                                                <level.icon size={24} className="text-impulsa-yellow" />
                                            ) : (
                                                <Lock size={20} className="text-gray-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Spacer for zig-zag */}
                                    <div className="hidden md:block w-1/2" />

                                    {/* Card Content */}
                                    <motion.div
                                        className={`w-full md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16'}`}
                                        animate={{
                                            scale: isUnlocked ? 1 : 0.95,
                                            opacity: isUnlocked ? 1 : 0.6,
                                            filter: isUnlocked ? 'blur(0px)' : 'blur(2px) grayscale(100%)'
                                        }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className={`
                                            relative p-8 rounded-[2rem] border-2 transition-all duration-500 overflow-hidden group
                                            ${isUnlocked
                                                ? 'bg-white/80 backdrop-blur-md border-impulsa-yellow shadow-[0_10px_40px_-10px_rgba(255,215,0,0.3)]'
                                                : 'bg-gray-100 border-gray-200'
                                            }
                                        `}>
                                            {/* Glow Effect on Hover for Unlocked */}
                                            {isUnlocked && (
                                                <div className="absolute inset-0 bg-gradient-to-tr from-impulsa-yellow/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            )}

                                            <div className="relative z-10">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`text-sm font-black uppercase tracking-widest py-1 px-3 rounded-full ${isUnlocked ? 'bg-impulsa-yellow text-black' : 'bg-gray-200 text-gray-500'
                                                        }`}>
                                                        Nivel {index}
                                                    </span>
                                                    {isCompleted && <Star className="text-impulsa-yellow fill-impulsa-yellow animate-spin-slow" size={24} />}
                                                </div>

                                                <h4 className="text-2xl font-black text-gray-900 mb-2 leading-tight">
                                                    {level.title}
                                                </h4>
                                                <p className="text-gray-600 font-medium mb-6">
                                                    {level.desc}
                                                </p>

                                                {/* Interaction Area */}
                                                <div className="mt-6">
                                                    {isNextToUnlock && index < levels.length - 1 && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.05 }}
                                                            whileTap={{ scale: 0.95 }}
                                                            onClick={() => handleUnlock(index)}
                                                            className="w-full py-4 rounded-xl bg-gradient-to-r from-impulsa-dark to-black text-white font-bold text-lg shadow-lg flex items-center justify-center gap-2 group hover:shadow-2xl transition-all"
                                                        >
                                                            <Unlock size={20} className="text-impulsa-yellow group-hover:rotate-12 transition-transform" />
                                                            <span className="group-hover:text-impulsa-yellow transition-colors">Desbloquear Nivel</span>
                                                        </motion.button>
                                                    )}

                                                    {/* Unique Button for Final Level */}
                                                    {isNextToUnlock && index === levels.length - 1 && (
                                                        <motion.a
                                                            href="#"
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            className="block w-full text-center py-4 rounded-xl bg-impulsa-yellow text-black font-black text-xl shadow-[0_0_30px_#FFD700] animate-pulse hover:animate-none flex items-center justify-center gap-2"
                                                        >
                                                            REGÍSTRATE - 1ERA CONVOCATORIA 🚀
                                                        </motion.a>
                                                    )}

                                                    {isCompleted && (
                                                        <div className="w-full py-3 rounded-xl bg-green-50 text-green-700 font-bold flex items-center justify-center gap-2 border border-green-200">
                                                            <div className="bg-green-500 rounded-full p-1 text-white">
                                                                <Star size={12} fill="currentColor" />
                                                            </div>
                                                            Completado
                                                        </div>
                                                    )}

                                                    {/* Locked State Text */}
                                                    {!isUnlocked && (
                                                        <div className="flex items-center justify-center gap-2 text-gray-400 font-medium py-2">
                                                            <Lock size={16} />
                                                            Completa el nivel anterior
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GamifiedJourney;
