import { motion } from 'framer-motion';
import { Globe, UserCheck, Check } from 'lucide-react';

const ImpactSection = () => {
    const benefits = {
        country: {
            title: 'PARA EL PAÍS',
            icon: Globe,
            color: 'text-gob-blue',
            bgColor: 'bg-blue-50',
            borderColor: 'border-gob-blue/20',
            items: [
                'Impulso a la economía digital y generación de empleo.',
                'Fortalecimiento del ecosistema emprendedor y productivo.',
                'Mayor competitividad digital a nivel nacional e internacional.',
                'Inclusión productiva de territorios rurales y sectores históricamente excluidos.',
                'Digitalización de procesos que mejora la eficiencia y sostenibilidad.',
                'Articulación público-privada para un crecimiento económico más sólido.'
            ]
        },
        participants: {
            title: 'PARA LOS PARTICIPANTES',
            icon: UserCheck,
            color: 'text-yellow-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-500/30',
            items: [
                'Más ventas, productividad y control de sus negocios.',
                'Mejores oportunidades de empleabilidad y generación de ingresos.',
                'Reducción de brechas digitales con acompañamiento real.',
                'Acceso a herramientas, formación y tecnología aplicada.',
                'Capacidad de tomar mejores decisiones con datos.',
                'Preparación para competir en mercados digitales nacionales e internacionales.'
            ]
        }
    };

    return (
        <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-12 md:py-16">
            <div className="container mx-auto px-6">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-5xl font-black text-gob-slate mb-4">
                        Impacto del Programa
                    </h2>
                    <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                        Beneficios tangibles para el país y sus participantes
                    </p>
                </motion.div>

                {/* Benefits Section - 2 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">

                    {/* Country Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${benefits.country.borderColor} hover:shadow-xl transition-all duration-300`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 ${benefits.country.bgColor} rounded-2xl flex items-center justify-center`}>
                                <benefits.country.icon className={`w-8 h-8 ${benefits.country.color}`} strokeWidth={2} />
                            </div>
                            <h3 className={`text-2xl font-black ${benefits.country.color}`}>
                                {benefits.country.title}
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {benefits.country.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <Check className={`w-5 h-5 ${benefits.country.color} flex-shrink-0 mt-0.5`} />
                                    <span className="text-gray-700 leading-relaxed font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Participant Benefits */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className={`bg-white rounded-2xl p-8 shadow-lg border-2 ${benefits.participants.borderColor} hover:shadow-xl transition-all duration-300`}
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className={`w-16 h-16 ${benefits.participants.bgColor} rounded-2xl flex items-center justify-center`}>
                                <benefits.participants.icon className={`w-8 h-8 ${benefits.participants.color}`} strokeWidth={2} />
                            </div>
                            <h3 className={`text-2xl font-black ${benefits.participants.color}`}>
                                {benefits.participants.title}
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {benefits.participants.items.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <Check className={`w-5 h-5 ${benefits.participants.color} flex-shrink-0 mt-0.5`} />
                                    <span className="text-gray-700 leading-relaxed font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                </div>

                {/* Closing Quote */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-gob-blue to-cyan-500 leading-tight">
                        Cuando las personas crecen, <br />
                        <span className="text-gob-slate">el país también crece.</span>
                    </h3>
                </motion.div>

            </div>
        </section>
    );
};

export default ImpactSection;
