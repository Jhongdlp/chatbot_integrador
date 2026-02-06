import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    ChevronLeft,
    Send,
    MapPin,
    User,
    BookOpen,
    Building2,
    Sparkles
} from 'lucide-react';

const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbwHAI59f1nwYvbqYcEfHN5QyllF-BlyEbjGalvhB7HoZr0Tu_WzUS9vcN_zmExrt6yH/exec';

export default function BrigadasForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Total steps
    const totalSteps = 4;

    const [formData, setFormData] = useState({
        // PASO 1: Registro Inicial
        participacionPrevia: '',
        participacionPreviaOtro: '',
        ciudadContacto: '',
        apellidos: '',
        nombres: '',

        // PASO 2: Perfil y Contacto
        edad: '',
        genero: '',
        email: '',
        telefono: '',
        sitioTaller: '',

        // PASO 3: Logística y Ubicación
        espacioFisico: '',
        provincia: '',
        ciudadCanton: '',
        direccion: '',

        // PASO 4: Temáticas y Cierre
        tematicas: [],
        tematicasOtro: '',
        observaciones: '',
        autorizacionLOPDP: ''
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const currentValues = prev[field] || [];
            if (currentValues.includes(value)) {
                return { ...prev, [field]: currentValues.filter(item => item !== value) };
            } else {
                if (currentValues.length >= 3) {
                    return prev;
                }
                return { ...prev, [field]: [...currentValues, value] };
            }
        });
    };

    const validateStep = (step) => {
        if (step === 1) {
            const partValid = formData.participacionPrevia !== '';
            const ciudadValid = formData.ciudadContacto.trim() !== '';
            const apellidosValid = formData.apellidos.trim() !== '';
            const nombresValid = formData.nombres.trim() !== '';
            return partValid && ciudadValid && apellidosValid && nombresValid;
        } else if (step === 2) {
            const edadValid = formData.edad !== '';
            const generoValid = formData.genero !== '';
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
            const telefonoValid = formData.telefono.trim() !== '';
            return edadValid && generoValid && emailValid && telefonoValid;
        } else if (step === 3) {
            const espacioValid = formData.espacioFisico !== '';
            const provinciaValid = formData.provincia !== '';
            const cantonValid = formData.ciudadCanton.trim() !== '';
            const direccionValid = formData.direccion.trim() !== '';
            return espacioValid && provinciaValid && cantonValid && direccionValid;
        } else if (step === 4) {
            const tematicasValid = formData.tematicas.length > 0;
            const lopdpValid = formData.autorizacionLOPDP === 'Sí autorizo';
            const otroTemasValid = !formData.tematicas.includes('Otro') || formData.tematicasOtro.trim() !== '';

            return tematicasValid && lopdpValid && otroTemasValid;
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep) && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Por favor, completa todos los campos obligatorios correctamente.');
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) {
            alert('Por favor, completa todos los campos obligatorios y acepta la autorización.');
            return;
        }

        setIsSubmitting(true);

        try {
            const tematicasFinal = formData.tematicas.includes('Otro')
                ? [...formData.tematicas.filter(t => t !== 'Otro'), `Otro: ${formData.tematicasOtro}`].join(', ')
                : formData.tematicas.join(', ');

            const participacionFinal = formData.participacionPrevia === '(Si he participado anteriormente - varias iniciativas)'
                ? `Sí: ${formData.participacionPreviaOtro}`
                : formData.participacionPrevia;

            const payload = {
                formType: 'brigadas',
                participacion: participacionFinal,
                ciudadSector: formData.ciudadContacto,
                apellidos: formData.apellidos,
                nombres: formData.nombres,
                edad: formData.edad,
                genero: formData.genero,
                email: formData.email,
                telefono: formData.telefono,
                lugarTaller: formData.sitioTaller,
                espacioFisico: formData.espacioFisico,
                provincia: formData.provincia,
                ciudadCanton: formData.ciudadCanton,
                direccion: formData.direccion,
                tematicas: tematicasFinal,
                observaciones: formData.observaciones,
                autorizacion: formData.autorizacionLOPDP
            };

            await fetch(GOOGLE_SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            alert('¡Solicitud de Brigada enviada exitosamente!');
            navigate('/');
        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Hubo un error al enviar el formulario. Intenta nuevamente.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const provinces = [
        "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas",
        "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago",
        "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas",
        "Sucumbíos", "Tungurahua", "Zamora Chinchipe"
    ];

    return (
        <div className="relative z-10 w-full max-w-4xl mx-auto">
            {/* HEADER SECTION (Moved inside Form) */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4 backdrop-blur-sm">
                    <Sparkles className="w-4 h-4" />
                    <span>Iniciativa 2026</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                    Registro de <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Brigadas TECH 2026</span>
                </h1>
                <p className="text-xl text-slate-200 max-w-2xl mx-auto font-light drop-shadow-md">
                    Más digitalización. Más ventas. Más oportunidades.
                </p>
            </div>

            {/* Progress Bar Glassmorphism */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
                <div className="flex items-center justify-between mb-3 text-white">
                    <span className="text-sm font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-cyan-400" /> Paso {currentStep} de {totalSteps}
                    </span>
                    <span className="text-sm font-light text-cyan-200">
                        {Math.round(((currentStep - 1) / totalSteps) * 100)}% completado
                    </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden border border-white/10">
                    <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentStep - 1) / totalSteps) * 100}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>

            {/* Main Form Container */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/40 text-slate-900">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* PASO 1: Registro Inicial */}
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <Building2 className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Registro Inicial</h2>
                                        <p className="text-gray-500 font-medium">Información básica del solicitante</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-4">
                                        1. ¿Ha participado anteriormente en talleres o iniciativas de MINTEL? <span className="text-pink-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {[
                                            "No he participado anteriormente",
                                            "Talleres en los PDG",
                                            "Capacitaciones en los PDG",
                                            "Webinar en linea",
                                            "Cursos virtuales",
                                            "(Si he participado anteriormente - varias iniciativas)"
                                        ].map((option) => (
                                            <label
                                                key={option}
                                                className={`group relative flex items-start p-4 border-2 rounded-2xl cursor-pointer transition-all duration-200 overflow-hidden ${formData.participacionPrevia === option
                                                    ? 'border-cyan-500 bg-cyan-50 shadow-lg shadow-cyan-100/50'
                                                    : 'border-slate-100 hover:border-cyan-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5 mr-3">
                                                    <input
                                                        type="radio"
                                                        name="participacionPrevia"
                                                        value={option}
                                                        checked={formData.participacionPrevia === option}
                                                        onChange={(e) => handleInputChange('participacionPrevia', e.target.value)}
                                                        className="w-5 h-5 text-cyan-600 focus:ring-cyan-500"
                                                    />
                                                </div>
                                                <span className={`text-sm font-medium transition-colors ${formData.participacionPrevia === option ? 'text-cyan-900' : 'text-slate-600'
                                                    }`}>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {formData.participacionPrevia === '(Si he participado anteriormente - varias iniciativas)' && (
                                        <motion.input
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            type="text"
                                            placeholder="Especifique cuáles..."
                                            value={formData.participacionPreviaOtro}
                                            onChange={(e) => handleInputChange('participacionPreviaOtro', e.target.value)}
                                            className="mt-4 w-full px-5 py-4 bg-slate-50 border-2 border-cyan-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        2. Ciudad / Sector del contacto <span className="text-pink-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.ciudadContacto}
                                        onChange={(e) => handleInputChange('ciudadContacto', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all font-medium text-slate-700"
                                        placeholder="Ej: Quito, Sector La Mariscal"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            3. Apellidos <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.apellidos}
                                            onChange={(e) => handleInputChange('apellidos', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Sus apellidos"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            4. Nombres <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nombres}
                                            onChange={(e) => handleInputChange('nombres', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Sus nombres"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 2: Perfil y Contacto */}
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <User className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Perfil y Contacto</h2>
                                        <p className="text-gray-500 font-medium">Datos demográficos y contacto</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        5. Edad (rango) <span className="text-pink-500">*</span>
                                    </label>
                                    <select
                                        value={formData.edad}
                                        onChange={(e) => handleInputChange('edad', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700 cursor-pointer appearance-none"
                                    >
                                        <option value="">Seleccione un rango</option>
                                        <option value="Menor de 18 años">Menor de 18 años</option>
                                        <option value="18 a 24 años">18 a 24 años</option>
                                        <option value="25 a 29 años">25 a 29 años</option>
                                        <option value="30 a 43 años">30 a 43 años</option>
                                        <option value="44 a 59 años">44 a 59 años</option>
                                        <option value="60 a 65 años">60 a 65 años</option>
                                        <option value="Mayor de 65 años">Mayor de 65 años</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-4">
                                        6. Género <span className="text-pink-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {["Femenino", "Masculino", "LGBTIQA+", "Prefiero no decir"].map((option) => (
                                            <label
                                                key={option}
                                                className={`flex flex-col items-center justify-center p-4 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md ${formData.genero === option
                                                    ? 'border-green-500 bg-green-50 text-green-700 font-bold shadow-green-100'
                                                    : 'border-slate-100 text-slate-600 hover:border-green-300 bg-slate-50'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="genero"
                                                    value={option}
                                                    checked={formData.genero === option}
                                                    onChange={(e) => handleInputChange('genero', e.target.value)}
                                                    className="hidden"
                                                />
                                                <span>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            7. Correo de contacto <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="ejemplo@correo.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            8. Teléfono de contacto <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            value={formData.telefono}
                                            onChange={(e) => handleInputChange('telefono', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="099..."
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        Sitio / Lugar para el taller
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.sitioTaller}
                                        onChange={(e) => handleInputChange('sitioTaller', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                        placeholder="Nombre del lugar (Opcional)"
                                    />
                                </div>
                            </div>
                        )}

                        {/* PASO 3: Logística y Ubicación */}
                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <MapPin className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Logística y Ubicación</h2>
                                        <p className="text-gray-500 font-medium">¿Dónde realizaremos la brigada?</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-4">
                                        9. ¿Cuenta con un espacio físico para la Brigada? <span className="text-pink-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {["Sí", "No", "Podría conseguir un espacio"].map((option) => (
                                            <label
                                                key={option}
                                                className={`flex items-center justify-center p-6 border-2 rounded-2xl cursor-pointer transition-all hover:shadow-md ${formData.espacioFisico === option
                                                    ? 'border-purple-500 bg-purple-50 font-bold text-purple-700 shadow-purple-100'
                                                    : 'border-slate-100 hover:border-purple-300 bg-slate-50 text-slate-600'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="espacioFisico"
                                                    value={option}
                                                    checked={formData.espacioFisico === option}
                                                    onChange={(e) => handleInputChange('espacioFisico', e.target.value)}
                                                    className="hidden"
                                                />
                                                <span className="text-center">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        10. Provincia de domicilio <span className="text-pink-500">*</span>
                                    </label>
                                    <select
                                        value={formData.provincia}
                                        onChange={(e) => handleInputChange('provincia', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all font-medium text-slate-700 cursor-pointer"
                                    >
                                        <option value="">Seleccione una provincia</option>
                                        {provinces.map(p => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            11. Ciudad / Cantón <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.ciudadCanton}
                                            onChange={(e) => handleInputChange('ciudadCanton', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Ej: Guayaquil"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            12. Dirección del sitio <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.direccion}
                                            onChange={(e) => handleInputChange('direccion', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:ring-4 focus:ring-purple-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Calle principal, referencia"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 4: Temáticas y Cierre */}
                        {currentStep === 4 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <BookOpen className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Temáticas y Cierre</h2>
                                        <p className="text-gray-500 font-medium">Define el contenido de la brigada</p>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-baseline mb-4">
                                        <label className="block text-lg font-bold text-slate-800">
                                            13. ¿Qué temáticas se deberían impartir? <span className="text-pink-500">*</span>
                                        </label>
                                        <span className="text-xs font-bold bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full uppercase tracking-wide">Máximo 3</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {[
                                            "Fotografía de productos y edición",
                                            "Inteligencia artificial",
                                            "Ingeniería de prompts",
                                            "Investigación aumentada",
                                            "Identidad digital",
                                            "Marketing Digital",
                                            "Modelo de negocios digitales",
                                            "Redes Sociales",
                                            "Ventas en línea",
                                            "Otro"
                                        ].map((tema) => (
                                            <label
                                                key={tema}
                                                className={`group flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.tematicas.includes(tema)
                                                    ? 'border-indigo-500 bg-indigo-50 shadow-md shadow-indigo-100/50'
                                                    : formData.tematicas.length >= 3 && !formData.tematicas.includes(tema)
                                                        ? 'border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed'
                                                        : 'border-slate-100 hover:border-indigo-300 hover:bg-white'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.tematicas.includes(tema)}
                                                    onChange={() => handleCheckboxChange('tematicas', tema)}
                                                    disabled={formData.tematicas.length >= 3 && !formData.tematicas.includes(tema)}
                                                    className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 rounded border-gray-300"
                                                />
                                                <span className={`ml-3 text-sm font-medium transition-colors ${formData.tematicas.includes(tema) ? 'text-indigo-800' : 'text-slate-600'
                                                    }`}>{tema}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {formData.tematicas.includes('Otro') && (
                                        <motion.input
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            type="text"
                                            placeholder="Especifique otra temática..."
                                            value={formData.tematicasOtro}
                                            onChange={(e) => handleInputChange('tematicasOtro', e.target.value)}
                                            className="mt-4 w-full px-5 py-4 bg-slate-50 border-2 border-indigo-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                                        />
                                    )}
                                    {formData.tematicas.length >= 3 && (
                                        <p className="text-xs text-orange-500 mt-2 font-bold animate-pulse">
                                            Has alcanzado el límite de 3 opciones.
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        14. Observaciones generales
                                    </label>
                                    <textarea
                                        value={formData.observaciones}
                                        onChange={(e) => handleInputChange('observaciones', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all font-medium text-slate-700 resize-none"
                                        rows={4}
                                        placeholder="Comentarios adicionales o necesidades específicas..."
                                    />
                                </div>

                                <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100">
                                    <h3 className="text-sm font-bold text-indigo-900 mb-3 flex items-center gap-2">
                                        15. Autorización LOPDP <span className="text-pink-500">*</span>
                                    </h3>
                                    <p className="text-xs text-slate-600 mb-5 leading-relaxed text-justify">
                                        En cumplimiento con la Ley Orgánica de Protección de Datos Personales, autorizo el tratamiento de mis datos personales para fines de contacto, coordinación y gestión de las Brigadas Tech.
                                    </p>
                                    <div className="flex gap-6">
                                        {["Sí autorizo", "No autorizo"].map((option) => (
                                            <label key={option} className="flex items-center cursor-pointer group">
                                                <div className="relative flex items-center justify-center w-6 h-6 border-2 border-indigo-300 rounded-full group-hover:border-indigo-500 bg-white transition-colors">
                                                    <input
                                                        type="radio"
                                                        name="lopdp"
                                                        value={option}
                                                        checked={formData.autorizacionLOPDP === option}
                                                        onChange={(e) => handleInputChange('autorizacionLOPDP', e.target.value)}
                                                        className="peer appearance-none w-full h-full rounded-full cursor-pointer"
                                                    />
                                                    {formData.autorizacionLOPDP === option && (
                                                        <div className="absolute w-3 h-3 bg-indigo-600 rounded-full animate-scale-in" />
                                                    )}
                                                </div>
                                                <span className={`ml-3 text-sm font-bold transition-colors ${formData.autorizacionLOPDP === option ? 'text-indigo-900' : 'text-slate-600'
                                                    }`}>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons */}
                <div className={`flex items-center mt-12 pt-8 border-t border-slate-100 ${currentStep > 1 ? 'justify-between' : 'justify-end'}`}>
                    {currentStep > 1 && (
                        <button
                            onClick={prevStep}
                            className="px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 flex items-center gap-2 transition-all"
                        >
                            <ChevronLeft className="w-5 h-5" /> Atrás
                        </button>
                    )}

                    {currentStep < totalSteps ? (
                        <button
                            onClick={nextStep}
                            className="px-8 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-black flex items-center gap-2 shadow-xl shadow-slate-200 transition-all hover:translate-y-[-2px]"
                        >
                            Siguiente <ChevronRight className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting || formData.autorizacionLOPDP !== 'Sí autorizo'}
                            className={`px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl transition-all transform hover:-translate-y-1 ${isSubmitting || formData.autorizacionLOPDP !== 'Sí autorizo'
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-indigo-200'
                                }`}
                        >
                            {isSubmitting ? (
                                'Enviando...'
                            ) : (
                                <>Enviar Solicitud <Send className="w-5 h-5" /></>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
