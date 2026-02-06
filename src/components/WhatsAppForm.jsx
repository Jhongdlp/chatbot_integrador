import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ChevronRight,
    ChevronLeft,
    Send,
    User,
    MapPin,
    Building2,
    Sparkles,
    MessageCircle
} from 'lucide-react';

const WHATSAPP_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxW5-f4rzQ0WiCkMHSoSSQeSSODtUWlAVYibEn_hOnDPa3Gu3ApCQcE6ausnUgmfsQ-WA/exec";

export default function WhatsAppForm() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Total steps
    const totalSteps = 3;

    const [formData, setFormData] = useState({
        // PASO 1: Datos Personales
        nombres: '',
        apellidos: '',
        cedula: '',
        edad: '',
        genero: '',

        // PASO 2: Contacto y Ubicación
        email: '',
        telefono: '',
        provincia: '',
        canton: '',

        // PASO 3: Perfil e Institución
        institucion: '',
        institucionOtro: '',
        observaciones: '',
        autorizacionLOPDP: '' // Added for consistency/compliance although not explicitly requested, standard practice
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const validateStep = (step) => {
        if (step === 1) {
            const nombresValid = formData.nombres.trim() !== '';
            const apellidosValid = formData.apellidos.trim() !== '';
            const cedulaValid = formData.cedula.trim() !== '';
            const edadValid = formData.edad !== '';
            const generoValid = formData.genero !== '';
            return nombresValid && apellidosValid && cedulaValid && edadValid && generoValid;
        } else if (step === 2) {
            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
            const telefonoValid = formData.telefono.trim() !== '';
            const provinciaValid = formData.provincia !== '';
            const cantonValid = formData.canton.trim() !== '';
            return emailValid && telefonoValid && provinciaValid && cantonValid;
        } else if (step === 3) {
            const institucionValid = formData.institucion !== '' && (formData.institucion !== 'Otro' || formData.institucionOtro.trim() !== '');
            // Making LOPDP optional in validation if strict adherence to request list is needed, but recommended. 
            // The user didn't explicitly ask for LOPDP check in the list but it's usually mandatory. 
            // I'll leave it as a checkbox at the end, but maybe not block if not strictly requested? 
            // Re-reading: "Mantén el estilo 'Wizard' o de Tarjetas que ya usamos." Brigadas form has it. I'll include it.
            return institucionValid;
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
        if (!validateStep(3)) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }

        setIsSubmitting(true);

        try {
            const institucionFinal = formData.institucion === 'Otro'
                ? formData.institucionOtro
                : formData.institucion;

            const payload = {
                // Keys mapped exactly as requested
                email: formData.email,
                apellidos: formData.apellidos,
                nombres: formData.nombres,
                cedula: formData.cedula,
                edad: formData.edad,
                genero: formData.genero,
                institucion: institucionFinal,
                telefono: formData.telefono,
                provincia: formData.provincia,
                canton: formData.canton,
                observaciones: formData.observaciones
            };

            await fetch(WHATSAPP_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            alert('¡Registro al Taller WhatsApp Business Pro exitoso!');
            navigate('/');
        } catch (error) {
            console.error('Error al enviar:', error);
            alert('Hubo un error al enviar el registro. Intenta nuevamente.');
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

    const ageRanges = [
        "Menor de 18 años",
        "18 a 24 años",
        "25 a 29 años",
        "30 a 43 años",
        "44 a 59 años",
        "60 a 65 años",
        "Mayor de 65 años"
    ];

    const genders = [
        "Femenino",
        "Masculino",
        "LGBTIQA+",
        "Prefiero no decir"
    ];

    const institutions = [
        "Economía Popular y Solidaria (EPS)",
        "Empresa Privada",
        "Emprendedor / Mipyme",
        "Estudiante / Independiente",
        "Gobierno / Administración Pública",
        "Institución Educativa (Universidad, Colegio, etc.)",
        "Medios de Comunicación",
        "ONG/Fundación / Tercer Sector",
        "Organismo Internacional",
        "Otro"
    ];

    return (
        <div className="relative z-10 w-full max-w-4xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-4 backdrop-blur-sm">
                    <MessageCircle className="w-4 h-4" />
                    <span>Ciclo de formación permanente</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight drop-shadow-xl uppercase">
                    EMPRENDEDOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">DIGITAL</span>
                </h1>
                <div className="text-slate-300 max-w-2xl mx-auto font-light drop-shadow-md space-y-4 text-left md:text-center text-lg leading-relaxed">
                    <p>🚀 <strong>Tu crecimiento digital empieza aquí</strong></p>
                    <p>
                        Si tienes un emprendimiento o negocio y quieres usar mejor la tecnología para crecer, este espacio es para ti.
                    </p>
                    <p>
                        MINTEL impulsa webinars gratuitos y prácticos para ayudarte a fortalecer tus capacidades digitales y aplicar herramientas tecnológicas en tu día a día.
                    </p>
                    <p>
                        💡 <strong>No necesitas ser experto, solo ganas de aprender.</strong><br />
                        Completa tus datos y participa.
                    </p>
                    <p className="font-bold text-green-400 border-t border-white/10 pt-4 mt-4">
                        👉 Aprende. Aplica. Crece.
                    </p>
                    <p className="text-sm opacity-70">
                        #EmpoderaTechEcuador #MintelConecta
                    </p>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8 border border-white/20">
                <div className="flex items-center justify-between mb-3 text-white">
                    <span className="text-sm font-bold flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-green-400" /> Paso {currentStep} de {totalSteps}
                    </span>
                    <span className="text-sm font-light text-green-200">
                        {Math.round(((currentStep - 1) / totalSteps) * 100)}% completado
                    </span>
                </div>
                <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden border border-white/10">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500"
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
                        {/* PASO 1: Datos Personales */}
                        {currentStep === 1 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <User className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Datos Personales</h2>
                                        <p className="text-gray-500 font-medium">Información básica del participante</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Nombres <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.nombres}
                                            onChange={(e) => handleInputChange('nombres', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Sus nombres"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Apellidos <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.apellidos}
                                            onChange={(e) => handleInputChange('apellidos', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Sus apellidos"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        Cédula de Identidad <span className="text-pink-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.cedula}
                                        onChange={(e) => handleInputChange('cedula', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                        placeholder="Número de cédula"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Edad <span className="text-pink-500">*</span>
                                        </label>
                                        <select
                                            value={formData.edad}
                                            onChange={(e) => handleInputChange('edad', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700 cursor-pointer appearance-none"
                                        >
                                            <option value="">Seleccione un rango</option>
                                            {ageRanges.map(range => (
                                                <option key={range} value={range}>{range}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Género <span className="text-pink-500">*</span>
                                        </label>
                                        <select
                                            value={formData.genero}
                                            onChange={(e) => handleInputChange('genero', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700 cursor-pointer appearance-none"
                                        >
                                            <option value="">Seleccione una opción</option>
                                            {genders.map(gender => (
                                                <option key={gender} value={gender}>{gender}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 2: Contacto y Ubicación */}
                        {currentStep === 2 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <MapPin className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contacto y Ubicación</h2>
                                        <p className="text-gray-500 font-medium">¿Dónde te encuentras?</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Correo electrónico <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="tucorreo@ejemplo.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Teléfono (WhatsApp) <span className="text-pink-500">*</span>
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Provincia de domicilio <span className="text-pink-500">*</span>
                                        </label>
                                        <select
                                            value={formData.provincia}
                                            onChange={(e) => handleInputChange('provincia', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700 cursor-pointer appearance-none"
                                        >
                                            <option value="">Seleccione una provincia</option>
                                            {provinces.map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-lg font-bold text-slate-800 mb-3">
                                            Cantón / Ciudad <span className="text-pink-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.canton}
                                            onChange={(e) => handleInputChange('canton', e.target.value)}
                                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700"
                                            placeholder="Ej: Quito"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 3: Perfil Profesional */}
                        {currentStep === 3 && (
                            <div className="space-y-8">
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                                        <Building2 className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Perfil Profesional</h2>
                                        <p className="text-gray-500 font-medium">Cuéntanos sobre tu actividad</p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-4">
                                        ¿A qué institución u organización pertenece? <span className="text-pink-500">*</span>
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {institutions.map((option) => (
                                            <label
                                                key={option}
                                                className={`group flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.institucion === option
                                                    ? 'border-green-500 bg-green-50 shadow-md shadow-green-100/50'
                                                    : 'border-slate-100 hover:border-green-300 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="institucion"
                                                    value={option}
                                                    checked={formData.institucion === option}
                                                    onChange={(e) => handleInputChange('institucion', e.target.value)}
                                                    className="w-5 h-5 text-green-600 focus:ring-green-500 mt-0.5 border-gray-300"
                                                />
                                                <span className={`ml-3 text-sm font-medium transition-colors ${formData.institucion === option ? 'text-green-800' : 'text-slate-600'
                                                    }`}>{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                    {formData.institucion === 'Otro' && (
                                        <motion.input
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            type="text"
                                            placeholder="Especifique su institución..."
                                            value={formData.institucionOtro}
                                            onChange={(e) => handleInputChange('institucionOtro', e.target.value)}
                                            className="mt-4 w-full px-5 py-4 bg-slate-50 border-2 border-green-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-lg font-bold text-slate-800 mb-3">
                                        Observaciones generales / Preguntas
                                    </label>
                                    <textarea
                                        value={formData.observaciones}
                                        onChange={(e) => handleInputChange('observaciones', e.target.value)}
                                        className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 outline-none transition-all font-medium text-slate-700 resize-none"
                                        rows={4}
                                        placeholder="Escribe aquí si tienes alguna duda..."
                                    />
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
                            disabled={isSubmitting}
                            className={`px-10 py-4 rounded-xl font-bold flex items-center gap-2 shadow-xl transition-all transform hover:-translate-y-1 ${isSubmitting
                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                                : 'bg-gradient-to-r from-green-600 to-teal-600 text-white hover:shadow-green-200'
                                }`}
                        >
                            {isSubmitting ? (
                                'Registrando...'
                            ) : (
                                <>Completar Registro <Send className="w-5 h-5" /></>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
