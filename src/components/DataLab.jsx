import { motion } from 'framer-motion';
import {
    Database,
    Brain,
    Users,
    Shield,
    Sparkles,
    LineChart,
    FileText,
    Award,
    Lightbulb,
    Eye
} from 'lucide-react';

const DataLab = () => {
    const achievements = [
        {
            icon: Lightbulb,
            title: 'Soluciones Tecnológicas',
            description: 'Soluciones tecnológicas basadas en datos',
            color: 'from-blue-600 to-cyan-500',
            iconBg: 'bg-blue-500'
        },
        {
            icon: Eye,
            title: 'Transparencia y Confianza',
            description: 'Mayor transparencia y confianza',
            color: 'from-green-600 to-emerald-500',
            iconBg: 'bg-green-500'
        },
        {
            icon: Sparkles,
            title: 'Innovación Estratégica',
            description: 'Innovación aplicada a sectores estratégicos',
            color: 'from-purple-600 to-pink-500',
            iconBg: 'bg-purple-500'
        },
        {
            icon: LineChart,
            title: 'Decisiones Basadas en Evidencia',
            description: 'Decisiones públicas basadas en evidencia',
            color: 'from-orange-600 to-amber-500',
            iconBg: 'bg-orange-500'
        }
    ];

    return (
        <div className="w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 py-16 px-6">

            {/* Header Section */}
            <div className="max-w-6xl mx-auto text-center mb-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-4 mb-6"
                >
                    <div className="p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl">
                        <Database className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                    <div className="text-left">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600">ECUADOR DIGITAL EN DATOS</span>
                        </h2>
                        <p className="text-sm text-slate-500 font-semibold uppercase tracking-wide mt-1">
                            Programa EmpoderaTech
                        </p>
                    </div>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed max-w-4xl mx-auto px-4"
                >
                    Donde los datos públicos se convierten en soluciones, negocios e innovación
                </motion.p>
            </div>

            {/* Main Visual Section */}
            <div className="max-w-6xl mx-auto mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="relative bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700 rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl overflow-hidden"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                            backgroundSize: '30px 30px'
                        }}></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 text-center text-white">
                        <div className="flex justify-center items-center gap-6 mb-8">
                            <Brain className="w-16 h-16 text-cyan-200" strokeWidth={1.5} />
                            <Database className="w-20 h-20" strokeWidth={1.5} />
                            <Users className="w-16 h-16 text-cyan-200" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-6">
                            Datos Abiertos, Oportunidades Infinitas
                        </h3>

                        <p className="text-base md:text-lg lg:text-xl text-blue-100 font-medium max-w-3xl mx-auto leading-relaxed mb-8">
                            Democratiza datos públicos estratégicos para que ciudadanía, emprendedores, academia y sector privado creen soluciones digitales, servicios innovadores y nuevas oportunidades económicas.
                        </p>


                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-300/20 rounded-full blur-3xl"></div>
                </motion.div>
            </div>

            {/* Expected Achievements Section */}
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mb-12"
                >

                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">Impacto del Data Lab</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {achievements.map((achievement, index) => {
                        const IconComponent = achievement.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="h-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100">
                                    {/* Icon */}
                                    <div className={`w-14 h-14 ${achievement.iconBg} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-7 h-7 text-white" strokeWidth={2} />
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                                        {achievement.title}
                                    </h4>

                                    {/* Description */}
                                    <p className="text-sm text-slate-600 leading-relaxed">
                                        {achievement.description}
                                    </p>

                                    {/* Hover Gradient Border */}
                                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Call to Action */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="max-w-4xl mx-auto mt-20"
            >
                <div className="bg-slate-900 rounded-3xl p-6 md:p-10 lg:p-12 text-center shadow-2xl relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'linear-gradient(45deg, #06b6d4 25%, transparent 25%), linear-gradient(-45deg, #06b6d4 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #06b6d4 75%), linear-gradient(-45deg, transparent 75%, #06b6d4 75%)',
                            backgroundSize: '20px 20px',
                            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                        }}></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                        <Award className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                        <h4 className="text-2xl md:text-3xl font-black text-white mb-4">
                            Colabora con Data Lab
                        </h4>
                        <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
                            Únete a la comunidad de innovadores que están transformando datos públicos en soluciones que benefician a toda la sociedad ecuatoriana.
                        </p>
                        <div className="mb-6 inline-block bg-white/10 px-6 py-2 rounded-xl backdrop-blur-sm border border-white/20">
                            <p className="text-white font-medium">
                                Contacto: <a href="mailto:fomento.economia@mintel.gob.ec" className="text-cyan-300 hover:text-white transition-colors underline decoration-dotted">fomento.economia@mintel.gob.ec</a>
                            </p>
                        </div>
                        <div className="flex gap-3 justify-center flex-wrap">
                            <span className="px-5 py-2 bg-cyan-500 text-white rounded-full text-sm font-bold shadow-lg">
                                #DatosAbiertos
                            </span>
                            <span className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-bold shadow-lg">
                                #Innovación
                            </span>
                            <span className="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg">
                                #Transparencia
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default DataLab;
