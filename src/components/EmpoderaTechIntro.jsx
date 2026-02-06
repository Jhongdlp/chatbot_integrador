import { motion } from 'framer-motion';
import { Sparkles, Target, Users, TrendingUp } from 'lucide-react';

const EmpoderaTechIntro = () => {
    const features = [
        {
            icon: Target,
            title: "Enfoque Estratégico",
            description: "Acompañamiento integral a emprendedores y mipymes en su transformación digital"
        },
        {
            icon: Users,
            title: "Alcance Nacional",
            description: "Presencia en todo el territorio ecuatoriano con énfasis en sectores vulnerables"
        },
        {
            icon: TrendingUp,
            title: "Impacto Medible",
            description: "Resultados tangibles en ventas, empleo y competitividad digital"
        }
    ];

    return (
        <section className="bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 py-16 md:py-24 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Main Content */}
                <div className="max-w-5xl mx-auto">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-center mb-6"
                    >
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 px-4 py-2 rounded-full">
                            <Sparkles className="w-4 h-4 text-cyan-600" />
                            <span className="text-cyan-700 font-bold text-sm uppercase tracking-wide">
                                Programa Nacional
                            </span>
                        </div>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-4xl lg:text-5xl font-black text-center text-slate-900 mb-6"
                    >
                        ¿Qué es{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gob-blue via-cyan-600 to-blue-600">
                            EmpoderaTech?
                        </span>
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-700 text-center leading-relaxed mb-12 max-w-4xl mx-auto"
                    >
                        EmpoderaTech es el programa nacional de transformación digital productiva que impulsa a emprendedores y mipymes del Ecuador a{' '}
                        <span className="font-bold text-gob-blue">digitalizarse, vender más y competir</span> en los mercados digitales.
                        A través de alianzas estratégicas con el Gobierno y el sector privado, brindamos{' '}
                        <span className="font-bold text-cyan-600">capacitación, herramientas y acompañamiento</span> para cerrar brechas digitales y generar oportunidades reales de crecimiento económico.
                    </motion.p>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    whileHover={{ y: -5, scale: 1.02 }}
                                    className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="flex flex-col items-center text-center">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center mb-4 shadow-lg">
                                            <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 mb-2">{feature.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                    >
                        <p className="text-gray-600 text-base mb-4">
                            Conoce nuestros programas y encuentra el que mejor se adapta a tu negocio
                        </p>
                        <div className="flex items-center justify-center gap-2">
                            <div className="h-1 w-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"></div>
                            <span className="text-cyan-600 font-bold text-sm uppercase tracking-wider">
                                Explora abajo
                            </span>
                            <div className="h-1 w-8 bg-gradient-to-l from-cyan-500 to-blue-600 rounded-full"></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EmpoderaTechIntro;
