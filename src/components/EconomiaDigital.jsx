import { motion } from 'framer-motion';
import {
    Landmark,
    Map,
    Building2,
    Layers,
    BarChart3,
    Network,
    Target,
    Rocket,
    Users,
    TrendingUp
} from 'lucide-react';

const EconomiaDigital = () => {
    const components = [
        {
            id: 1,
            title: 'Planificación y Visión País',
            description: 'Visión país para economía digital',
            icon: Map,
            color: 'from-indigo-600 to-purple-600'
        },
        {
            id: 2,
            title: 'Marcos Estratégicos',
            description: 'Articulación institucional',
            icon: Building2,
            color: 'from-blue-600 to-cyan-600'
        },
        {
            id: 3,
            title: 'Estrategias Sectoriales',
            description: 'Habilitantes para el ecosistema',
            icon: Layers,
            color: 'from-teal-600 to-green-600'
        },
        {
            id: 4,
            title: 'Seguimiento y Medición',
            description: 'Avances nacionales',
            icon: BarChart3,
            color: 'from-amber-600 to-orange-600'
        },
        {
            id: 5,
            title: 'Gobernanza y Coordinación',
            description: 'Del ecosistema digital',
            icon: Network,
            color: 'from-purple-600 to-pink-600'
        }
    ];

    const achievements = [
        {
            icon: Target,
            text: 'Ecuador con una hoja de ruta clara hacia la economía digital',
            color: 'bg-blue-500'
        },
        {
            icon: Rocket,
            text: 'Mayor innovación pública y privada',
            color: 'bg-purple-500'
        },
        {
            icon: Users,
            text: 'Más oportunidades laborales en sectores digitales',
            color: 'bg-green-500'
        },
        {
            icon: TrendingUp,
            text: 'Mayor competitividad internacional',
            color: 'bg-amber-500'
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-white via-slate-50 to-white py-16 px-6">

            {/* Header Section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-3 mb-4"
                >

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900">
                        Proyecto <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Economía Digital</span>
                    </h2>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed max-w-4xl mx-auto px-4"
                >
                    El marco que transforma la digitalización en desarrollo para el Ecuador
                </motion.p>
            </div>

            {/* Components Section */}
            <div className="max-w-6xl mx-auto mb-20">
                <div className="text-center mb-12">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">Los pilares que sostienen la transformación digital del Ecuador</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {components.map((component, index) => {
                        const IconComponent = component.icon;
                        return (
                            <motion.div
                                key={component.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative min-h-[280px] rounded-3xl p-6 bg-gradient-to-br ${component.color} text-white shadow-xl hover:shadow-2xl cursor-pointer transform hover:scale-105 transition-all duration-300`}
                            >
                                {/* Icon Badge */}
                                <div className="absolute top-6 right-6 p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
                                    <IconComponent size={24} className="text-white" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="mb-2 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-lg inline-block">
                                        <span className="text-xs font-bold uppercase tracking-wide">Componente {component.id}</span>
                                    </div>
                                    <h4 className="text-lg font-bold mb-2 leading-tight">
                                        {component.title}
                                    </h4>
                                    <p className="text-sm text-white/90 leading-snug">
                                        {component.description}
                                    </p>
                                </div>

                                {/* Hover Glow Effect */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Expected Achievements Section */}
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mb-12"
                >

                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">Impacto Transformador</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => {
                        const IconComponent = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className={`flex-shrink-0 w-12 h-12 ${achievement.color} rounded-xl flex items-center justify-center shadow-md`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-slate-700 font-semibold leading-relaxed">
                                            {achievement.text}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Bottom CTA Section (Optional) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="max-w-4xl mx-auto mt-20 text-center"
            >
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-6 md:p-10 lg:p-12 shadow-2xl">
                    <h4 className="text-2xl md:text-3xl font-black text-white mb-4">
                        Construyendo el Ecuador Digital 2030
                    </h4>
                    <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
                        Una visión integral para posicionar a Ecuador como líder regional en economía digital, innovación y transformación tecnológica.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm">
                            #EcuadorDigital
                        </span>
                        <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm">
                            #Innovación
                        </span>
                        <span className="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold text-sm">
                            #Competitividad
                        </span>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default EconomiaDigital;
