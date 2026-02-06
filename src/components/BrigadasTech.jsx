import { motion } from 'framer-motion';
import {
    MapPin,
    MousePointer2,
    Zap,
    Target,
    CheckCircle2,
    Clock,
    TrendingUp,
    Users,
    Smartphone,
    ShoppingBag
} from 'lucide-react';



const BrigadasTech = () => {
    const dailyActivities = [
        { id: 1, icon: Target, title: "Diagnóstico express", color: "from-blue-500 to-cyan-500" },
        { id: 2, icon: Users, title: "Construcción identidad digital", color: "from-purple-500 to-pink-500" },
        { id: 3, icon: Smartphone, title: "Activación de canales", color: "from-green-500 to-emerald-500" },
        { id: 4, icon: CheckCircle2, title: "Acompañamiento práctico", color: "from-orange-500 to-amber-500" },
        { id: 5, icon: ShoppingBag, title: "Primera venta acompañada", color: "from-teal-500 to-cyan-500" }
    ];

    const achievements = [
        { id: 1, icon: TrendingUp, text: "Negocios con canales de venta digital funcionando" },
        { id: 2, icon: Zap, text: "Mayor rapidez en adopción tecnológica" },
        { id: 3, icon: CheckCircle2, text: "Disminución de abandono post-capacitación" },
        { id: 4, icon: Target, text: "Resultados visibles desde el territorio" }
    ];

    return (
        <div className="w-full bg-gradient-to-b from-slate-50 via-white to-slate-50 font-sans overflow-hidden py-12 md:py-16">

            {/* Header */}
            <div className="max-w-6xl mx-auto px-4 md:px-6 text-center mb-12 md:mb-16">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-gob-blue to-purple-600 text-white text-sm font-bold mb-6 shadow-lg"
                >
                    <MousePointer2 size={16} className="animate-pulse" />
                    <span>CLICK PARA VENDER</span>
                </motion.div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                    Proyecto <span className="text-transparent bg-clip-text bg-gradient-to-r from-gob-blue to-purple-600">Brigadas Tech</span>
                </h2>

                <p className="text-base md:text-lg lg:text-xl text-slate-600 font-medium max-w-4xl mx-auto leading-relaxed">
                    Es un <strong className="text-slate-800">modelo de intervención territorial</strong> que acelera la digitalización en el corto plazo, brindando <strong className="text-slate-800">herramientas prácticas aplicadas a ventas, comercio electrónico, productividad e IA</strong>, con enfoque en resultados.
                </p>
            </div>

            {/* Main Content Grid */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">

                {/* LEFT: Interactive Map */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative h-[400px] md:h-[600px] bg-slate-50 rounded-3xl border-2 border-slate-200 overflow-hidden shadow-xl group flex items-center justify-center p-4"
                >
                    {/* Map Container - Optimized zoom level */}
                    {/* Map Container - Optimized zoom level with dynamic markers */}
                    <div className="relative h-[120%] w-auto aspect-square">
                        {/* Map Image */}
                        <img
                            src="/img/ecuador_map_silhouette.png"
                            alt="Mapa de Ecuador"
                            className="w-full h-full object-contain opacity-90"
                        />

                        {/* Cities - Coordinates relative to the square map container */}
                        {[
                            { id: 1, name: "Pto. Baquerizo Moreno", theme: "Galápagos", x: 26, y: 48 },
                            { id: 2, name: "Ibarra", theme: "Norte", x: 64, y: 32 },
                            { id: 3, name: "Quito", theme: "Pichincha", x: 59, y: 37 },
                            { id: 4, name: "Tena", theme: "Amazonía", x: 65, y: 44 },
                            { id: 5, name: "Portoviejo", theme: "Costa", x: 43, y: 45 },
                            { id: 6, name: "Ambato", theme: "Sierra Centro", x: 57, y: 48 },
                            { id: 7, name: "Guayaquil", theme: "Costa", x: 49, y: 51 },
                            { id: 8, name: "Cuenca", theme: "Austro", x: 56, y: 60 },
                            { id: 9, name: "Loja", theme: "Sur", x: 52, y: 70 },
                        ].map((city) => (
                            <div
                                key={city.id}
                                className="absolute group/beacon cursor-pointer z-10"
                                style={{ left: `${city.x}%`, top: `${city.y}%` }}
                            >
                                <span className="absolute flex h-6 w-6 md:h-8 md:w-8 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center">
                                    {/* Outer Ripple */}
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-20 duration-1000"></span>

                                    {/* Inner Glow Pulse */}
                                    <span className="relative inline-flex rounded-full h-3 w-3 md:h-4 md:w-4 bg-white shadow-[0_0_15px_rgba(59,130,246,1)] animate-pulse"></span>

                                    {/* Core Dot */}
                                    <span className="absolute inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-blue-600"></span>
                                </span>

                                {/* Hover Card */}
                                <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-36 md:w-48 opacity-0 group-hover/beacon:opacity-100 transition-all duration-300 transform translate-y-4 group-hover/beacon:translate-y-0 z-20 pointer-events-none">
                                    <div className="bg-white/95 backdrop-blur-md p-3 rounded-xl border border-blue-200 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] text-center relative overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                        <h4 className="font-black text-slate-900 leading-tight mb-1 text-xs md:text-sm">{city.name}</h4>
                                        <p className="text-[10px] md:text-xs text-blue-600 font-bold uppercase tracking-wider">{city.theme}</p>
                                    </div>
                                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-white/95 border-r-[6px] border-r-transparent mx-auto"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Badge */}
                    <div className="absolute bottom-6 right-6 bg-gradient-to-r from-gob-blue to-purple-600 text-white px-4 md:px-6 py-2 md:py-3 rounded-full font-bold shadow-xl flex items-center gap-2 animate-bounce hover:animate-none transition-all border-2 border-white text-sm md:text-base z-20">
                        <MousePointer2 size={18} />
                        OPERATIVO
                    </div>
                </motion.div>

                {/* RIGHT: What Happens in a Brigada */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center"
                >
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-bold mb-3">
                            <Clock size={16} />
                            EN 1 DÍA
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                            Qué pasa en una Brigada
                        </h3>
                        <p className="text-slate-600 text-sm md:text-base">
                            Intervención intensiva para resultados inmediatos
                        </p>
                    </div>

                    <div className="space-y-3">
                        {dailyActivities.map((activity, index) => {
                            const IconComponent = activity.icon;
                            return (
                                <motion.div
                                    key={activity.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 border border-slate-100 group"
                                >
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${activity.color} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="w-6 h-6 text-white" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-slate-900 text-sm md:text-base">{activity.title}</h4>
                                    </div>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                                        {activity.id}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Expected Achievements */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 mb-12 md:mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-8"
                >

                    <h3 className="text-2xl md:text-3xl font-black text-slate-900">Impacto de las Brigadas</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => {
                        const IconComponent = achievement.icon;
                        return (
                            <motion.div
                                key={achievement.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-gob-blue to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                                        <IconComponent className="w-6 h-6 text-white" strokeWidth={2} />
                                    </div>
                                    <p className="text-slate-700 font-semibold leading-relaxed flex-1">
                                        {achievement.text}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-5xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gob-blue via-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
                >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_50%)]" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                        <div className="max-w-xl">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3">
                                ¿Quieres que una Brigada TECH llegue a tu ciudad?
                            </h3>
                            <p className="text-blue-100 text-base md:text-lg font-medium">
                                Llevamos la transformación digital directamente a tu comunidad para activar negocios, generar ventas y fortalecer el ecosistema local.
                            </p>
                        </div>

                        <a
                            href="https://observatorioecuadordigital.mintel.gob.ec/brigadas/"
                            target="_top"
                            className="bg-white hover:bg-gray-100 text-gob-blue px-8 py-4 rounded-xl font-black text-lg shadow-xl transition-all flex items-center gap-3 transform hover:-translate-y-1 hover:shadow-2xl whitespace-nowrap"
                        >
                            REGÍSTRATE AHORA
                            <Zap fill="currentColor" size={22} />
                        </a>
                    </div>
                </motion.div>
            </div>

        </div>
    );
};

export default BrigadasTech;
