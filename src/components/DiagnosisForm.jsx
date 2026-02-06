import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    Building2,
    User,
    BarChart3,
    Target,
    Send,
    Sparkles
} from 'lucide-react';

// URL del Google Apps Script (REEMPLAZAR CON LA URL REAL)
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwHAI59f1nwYvbqYcEfHN5QyllF-BlyEbjGalvhB7HoZr0Tu_WzUS9vcN_zmExrt6yH/exec";

const DiagnosisForm = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;

    // Estado del formulario con campos auxiliares para "Otro"
    const [formData, setFormData] = useState({
        // PASO 1: Datos del Negocio
        email: '',
        modalidad: '',
        organizacion: '',
        organizacionOtro: '',
        sector: '',
        sectorOtro: '',
        productoPrincipal: '',
        cantidadProd: '',
        frecuenciaProd: '',

        // PASO 2: Datos del Solicitante y Ubicación
        nombreNegocio: '',
        apellidos: '',
        nombres: '',
        identificacion: '',
        genero: '',
        edad: '',
        telefono: '',
        eventosMintel: '',
        temas: [],
        temasOtro: '',
        provincia: '',
        canton: '',
        parroquia: '',

        // PASO 3: Diagnóstico de Madurez Digital
        identidadDigital: '',
        correoCorp: '',
        buscadoresMapas: '',
        ofimaticaNube: '',
        procesosInternos: '',
        ventasDigitales: '',
        usoDatos: '',
        ciberseguridad: '',
        capacitacion: '',

        // PASO 4: Estrategia e Impacto
        habilitadoresAv: '',
        liderazgo: '',
        estrategia: '',
        colaboracion: '',
        innovacion: '',
        impactoAmb: '',
        crecimientoVentas: '',
        exportaciones: '',
        empleo: '',
        observaciones: ''
    });

    // Función para manejar cambios en inputs normales
    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // Función para manejar cambios en checkboxes múltiples
    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const currentArray = prev[field] || [];
            const newArray = currentArray.includes(value)
                ? currentArray.filter(item => item !== value)
                : [...currentArray, value];
            return { ...prev, [field]: newArray };
        });
    };

    // Validación por paso
    const validateStep = (step) => {
        if (step === 1) {
            const emailValid = formData.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
            const modalidadValid = formData.modalidad !== '';
            const organizacionValid = formData.organizacion !== '' &&
                (formData.organizacion !== 'Otro' || formData.organizacionOtro.trim() !== '');
            const sectorValid = formData.sector !== '' &&
                (formData.sector !== 'Otro' || formData.sectorOtro.trim() !== '');
            const productoPrincipalValid = formData.productoPrincipal.trim() !== '';
            const cantidadProdValid = formData.cantidadProd !== '';
            const frecuenciaProdValid = formData.frecuenciaProd !== '';

            return emailValid && modalidadValid && organizacionValid &&
                sectorValid && productoPrincipalValid && cantidadProdValid &&
                frecuenciaProdValid;
        } else if (step === 2) {
            const nombreNegocioValid = formData.nombreNegocio.trim() !== '';
            const apellidosValid = formData.apellidos.trim() !== '';
            const nombresValid = formData.nombres.trim() !== '';
            const identificacionValid = formData.identificacion.trim() !== '';
            const generoValid = formData.genero !== '';
            const edadValid = formData.edad !== '';
            const telefonoValid = formData.telefono.trim() !== '';
            const eventosMintelValid = formData.eventosMintel !== '';
            const temasValid = formData.temas.length > 0 &&
                (!formData.temas.includes('Otro') || formData.temasOtro.trim() !== '');
            const provinciaValid = formData.provincia !== '';
            const cantonValid = formData.canton.trim() !== '';
            const parroquiaValid = formData.parroquia.trim() !== '';

            return nombreNegocioValid && apellidosValid && nombresValid &&
                identificacionValid && generoValid && edadValid &&
                telefonoValid && eventosMintelValid && temasValid &&
                provinciaValid && cantonValid && parroquiaValid;
        }
        // Validación Step 3: Digital Maturity
        else if (step === 3) {
            return formData.identidadDigital !== '' &&
                formData.correoCorp !== '' &&
                formData.buscadoresMapas !== '' &&
                formData.ofimaticaNube !== '' &&
                formData.procesosInternos !== '' &&
                formData.ventasDigitales !== '' &&
                formData.usoDatos !== '' &&
                formData.ciberseguridad !== '' &&
                formData.capacitacion !== '';
        }
        // Validación Step 4: Strategy & Impact
        else if (step === 4) {
            return formData.habilitadoresAv !== '' &&
                formData.liderazgo !== '' &&
                formData.estrategia !== '' &&
                formData.colaboracion !== '' &&
                formData.innovacion !== '' &&
                formData.impactoAmb !== '' &&
                formData.crecimientoVentas !== '' &&
                formData.exportaciones !== '' &&
                formData.empleo !== '';
        }
        return true;
    };

    const nextStep = () => {
        if (validateStep(currentStep) && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            alert('Por favor, completa todos los campos obligatorios');
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
            alert('Por favor, completa todos los campos obligatorios');
            return;
        }

        try {
            // Combinar campos "Otro" antes de enviar
            const sectorFinal = formData.sector === 'Otro'
                ? `Otro: ${formData.sectorOtro}`
                : formData.sector;

            const organizacionFinal = formData.organizacion === 'Otro'
                ? `Otro: ${formData.organizacionOtro}`
                : formData.organizacion;

            const temasFinal = formData.temas.includes('Otro')
                ? [...formData.temas.filter(t => t !== 'Otro'), `Otro: ${formData.temasOtro}`].join(', ')
                : formData.temas.join(', ');

            // Crear payload limpio para Google Sheets
            const payload = {
                formType: 'convocatoria', // Identificador para el script
                // Paso 1: Datos del Negocio
                email: formData.email,
                modalidad: formData.modalidad,
                tipoOrganizacion: organizacionFinal,
                sector: sectorFinal,
                productoPrincipal: formData.productoPrincipal,
                cantidadProduccion: formData.cantidadProd,
                frecuenciaProduccion: formData.frecuenciaProd,

                // Paso 2: Datos del Solicitante
                nombreNegocio: formData.nombreNegocio,
                apellidos: formData.apellidos,
                nombres: formData.nombres,
                identificacion: formData.identificacion,
                genero: formData.genero,
                edad: formData.edad,
                telefono: formData.telefono,
                participacionMINTEL: formData.eventosMintel,
                temasInteres: temasFinal,
                provincia: formData.provincia,
                canton: formData.canton,
                parroquia: formData.parroquia,

                // Paso 3: Diagnóstico Digital
                identidadDigital: formData.identidadDigital,
                correoElectronico: formData.correoCorp,
                buscadoresMapas: formData.buscadoresMapas,
                herramientasOficinaCloudsentasCloud: formData.ofimaticaNube,
                procesosInternos: formData.procesosInternos,
                ventasDigitales: formData.ventasDigitales,
                usoDatos: formData.usoDatos,
                ciberseguridad: formData.ciberseguridad,
                capacitacion: formData.capacitacion,

                // Paso 4: Estrategia e Impacto
                habilitadoresAvanzados: formData.habilitadoresAv,
                liderazgo: formData.liderazgo,
                estrategia: formData.estrategia,
                colaboracion: formData.colaboracion,
                innovacion: formData.innovacion,
                impactoAmbientalLegal: formData.impactoAmb,
                crecimientoVentas: formData.crecimientoVentas,
                exportaciones: formData.exportaciones,
                generacionEmpleo: formData.empleo,
                observaciones: formData.observaciones
            };

            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            alert('¡Diagnóstico enviado exitosamente! Gracias por tu participación.');
            navigate('/');
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            alert('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 py-12 relative overflow-hidden text-slate-200">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-4xl mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4 backdrop-blur-sm">
                        <Sparkles className="w-4 h-4" />
                        <span>Iniciativa 2026</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight drop-shadow-xl">
                        Convocatoria <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Ruta de Transformación Digital</span>
                    </h1>
                    <div className="text-lg md:text-xl text-slate-200 max-w-3xl mx-auto font-light drop-shadow-md space-y-6 leading-relaxed">
                        <p className="font-medium text-white">
                            🚀 ¡Inicia tu camino hacia la transformación digital!
                        </p>
                        <p>
                            Participa en la <strong className="text-cyan-300 font-bold">1era Convocatoria</strong> de la Ruta de Transformación Digital y descubre el nivel de madurez digital de tu negocio a través de un diagnóstico gratuito.
                        </p>
                        <p>
                            Da el primer paso para fortalecer tus capacidades, innovar y llevar tu emprendimiento al siguiente nivel.
                        </p>
                        <p className="font-bold text-white">
                            👉 Inscríbete hoy y comienza tu ruta hacia el futuro.
                        </p>
                    </div>
                </div>

                {/* Barra de Progreso */}
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

                {/* Formulario */}
                {/* Formulario */}
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 border border-white/40 text-slate-900">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* PASO 1: Datos del Negocio */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                                        <Building2 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Datos del Negocio</h2>
                                        <p className="text-sm text-gray-600">Información sobre tu emprendimiento</p>
                                    </div>
                                </div>

                                {/* 1. Correo electrónico */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        1. Correo electrónico <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleInputChange('email', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="tu@email.com"
                                    />
                                </div>

                                {/* 2. Modalidad */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-3">
                                        2. ¿De qué manera quieres formar parte de la Ruta de Transformación Digital? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-3">
                                        {[
                                            { value: 'Virtual (Plataforma Moodle)', label: 'Virtual (Plataforma Moodle)' },
                                            { value: 'Presencial (Punto Digital Gratuito PDG más cercano)', label: 'Presencial (Punto Digital Gratuito PDG más cercano)' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.modalidad === option.value
                                                    ? 'border-blue-500 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="modalidad"
                                                    value={option.value}
                                                    checked={formData.modalidad === option.value}
                                                    onChange={(e) => handleInputChange('modalidad', e.target.value)}
                                                    className="w-5 h-5 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Formas de organización */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        3. Formas de organización <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.organizacion}
                                        onChange={(e) => handleInputChange('organizacion', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Sector Comunitario">Sector Comunitario</option>
                                        <option value="Sector Asociativo">Sector Asociativo</option>
                                        <option value="Sector Cooperativo">Sector Cooperativo</option>
                                        <option value="Unidades Económicas Populares">Unidades Económicas Populares</option>
                                        <option value="Otro">Otro</option>
                                    </select>

                                    {/* Campo condicional para "Otro" */}
                                    {formData.organizacion === 'Otro' && (
                                        <input
                                            type="text"
                                            value={formData.organizacionOtro}
                                            onChange={(e) => handleInputChange('organizacionOtro', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent mt-3"
                                            placeholder="Especifique..."
                                        />
                                    )}
                                </div>

                                {/* 4. Sector */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        4. ¿A qué sector pertenece tu emprendimiento? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.sector}
                                        onChange={(e) => handleInputChange('sector', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Agroindustria / Agropecuario">Agroindustria / Agropecuario</option>
                                        <option value="Alimentación / Gastronomía">Alimentación / Gastronomía</option>
                                        <option value="Artesanías">Artesanías</option>
                                        <option value="Comercio">Comercio</option>
                                        <option value="Educación / Formación">Educación / Formación</option>
                                        <option value="Mascotas / Productos y servicios para animales de compañía">Mascotas / Productos y servicios para animales de compañía</option>
                                        <option value="Moda y diseño / Textil">Moda y diseño / Textil</option>
                                        <option value="Salud y Bienestar">Salud y Bienestar</option>
                                        <option value="Servicios Digitales">Servicios Digitales</option>
                                        <option value="Servicios de Limpieza">Servicios de Limpieza</option>
                                        <option value="Servicios Profesionales">Servicios Profesionales</option>
                                        <option value="Tecnología / Innovación / Software">Tecnología / Innovación / Software</option>
                                        <option value="Turismo y Hospitalidad">Turismo y Hospitalidad</option>
                                        <option value="Otro">Otro</option>
                                    </select>

                                    {/* Campo condicional para "Otro" */}
                                    {formData.sector === 'Otro' && (
                                        <input
                                            type="text"
                                            value={formData.sectorOtro}
                                            onChange={(e) => handleInputChange('sectorOtro', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent mt-3"
                                            placeholder="Especifique..."
                                        />
                                    )}
                                </div>

                                {/* 5. Producto Principal */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        5. ¿Cuál es su producto principal? <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.productoPrincipal}
                                        onChange={(e) => handleInputChange('productoPrincipal', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                        placeholder="Enumere hasta 3 productos clave..."
                                    />
                                </div>

                                {/* 6. Cantidad */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        6. Para su producto o servicio principal, ¿cuántas unidades vende aproximadamente en un periodo regular? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.cantidadProd}
                                        onChange={(e) => handleInputChange('cantidadProd', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Menos de 10 unidades">Menos de 10 unidades</option>
                                        <option value="De 11 a 50">De 11 a 50</option>
                                        <option value="De 51 a 200">De 51 a 200</option>
                                        <option value="De 201 a 1000">De 201 a 1000</option>
                                        <option value="Más de 1000">Más de 1000</option>
                                    </select>
                                </div>

                                {/* 7. Frecuencia */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        7. ¿Con qué frecuencia realiza ventas de su producto o servicio principal? <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.frecuenciaProd}
                                        onChange={(e) => handleInputChange('frecuenciaProd', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Diaria">Diaria</option>
                                        <option value="Semanal">Semanal</option>
                                        <option value="Quincenal">Quincenal</option>
                                        <option value="Mensual">Mensual</option>
                                        <option value="Trimestral">Trimestral</option>
                                        <option value="Anual">Anual</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* PASO 2: Datos del Solicitante y Ubicación */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-500 rounded-xl flex items-center justify-center">
                                        <User className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Datos del Solicitante</h2>
                                        <p className="text-sm text-gray-600">Información personal y ubicación</p>
                                    </div>
                                </div>

                                {/* 8. Nombre del Negocio */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        8. ¿Cómo se llama tu negocio o emprendimiento? <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nombreNegocio}
                                        onChange={(e) => handleInputChange('nombreNegocio', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        placeholder="Nombre de mi emprendimiento"
                                    />
                                </div>

                                {/* 9. Apellidos */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        9. Apellidos <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.apellidos}
                                        onChange={(e) => handleInputChange('apellidos', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        placeholder="Tus apellidos"
                                    />
                                </div>

                                {/* 10. Nombres */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        10. Nombres <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.nombres}
                                        onChange={(e) => handleInputChange('nombres', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        placeholder="Tus nombres"
                                    />
                                </div>

                                {/* 11. Identificación */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        11. Cédula de identidad / DNI / RUC <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.identificacion}
                                        onChange={(e) => handleInputChange('identificacion', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        placeholder="Número de identificación"
                                    />
                                </div>

                                {/* 12. Género */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        12. Género <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.genero}
                                        onChange={(e) => handleInputChange('genero', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Femenino">Femenino</option>
                                        <option value="Masculino">Masculino</option>
                                        <option value="LGBTIQA+">LGBTIQA+</option>
                                        <option value="Prefiero no decir">Prefiero no decir</option>
                                    </select>
                                </div>

                                {/* 13. Edad */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        13. Edad <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.edad}
                                        onChange={(e) => handleInputChange('edad', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                    >
                                        <option value="">Selecciona una opción</option>
                                        <option value="Menor de 18 años">Menor de 18 años</option>
                                        <option value="18 a 24 años">18 a 24 años</option>
                                        <option value="25 a 29 años">25 a 29 años</option>
                                        <option value="30 a 43 años">30 a 43 años</option>
                                        <option value="44 a 59 años">44 a 59 años</option>
                                        <option value="60 a 65 años">60 a 65 años</option>
                                        <option value="Mayor de 65 años">Mayor de 65 años</option>
                                    </select>
                                </div>

                                {/* 14. Teléfono */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        14. Número de Teléfono o celular <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.telefono}
                                        onChange={(e) => handleInputChange('telefono', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        placeholder="+593..."
                                    />
                                </div>

                                {/* 15. Eventos MINTEL */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-3">
                                        15. ¿Has participado en eventos realizados por el MINTEL? <span className="text-red-500">*</span>
                                    </label>
                                    <div className="space-y-3">
                                        {[
                                            { value: 'Sí', label: 'Sí' },
                                            { value: 'No', label: 'No' },
                                            { value: 'No recuerdo', label: 'No recuerdo' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${formData.eventosMintel === option.value
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="eventosMintel"
                                                    value={option.value}
                                                    checked={formData.eventosMintel === option.value}
                                                    onChange={(e) => handleInputChange('eventosMintel', e.target.value)}
                                                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 16. Temáticas para capacitación */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-3">
                                        16. ¿Qué temáticas consideras necesarias para una próxima capacitación? <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-3">Puedes seleccionar múltiples opciones</p>
                                    <div className="space-y-2">
                                        {[
                                            'Alfabetización digital',
                                            'Ciberseguridad',
                                            'Google Drive/Gestión Proyectos',
                                            'Google My Business',
                                            'Marketing Digital',
                                            'Páginas web',
                                            'Plan de negocios',
                                            'Redes sociales',
                                            'Ventas digitales',
                                            'Otro'
                                        ].map((tema) => (
                                            <label
                                                key={tema}
                                                className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all ${formData.temas.includes(tema)
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-green-300'
                                                    }`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={formData.temas.includes(tema)}
                                                    onChange={() => handleCheckboxChange('temas', tema)}
                                                    className="w-5 h-5 text-green-600 focus:ring-green-500 rounded"
                                                />
                                                <span className="ml-3 text-sm font-medium text-gray-700">{tema}</span>
                                            </label>
                                        ))}
                                    </div>

                                    {/* Campo condicional para "Otro" */}
                                    {formData.temas.includes('Otro') && (
                                        <input
                                            type="text"
                                            value={formData.temasOtro}
                                            onChange={(e) => handleInputChange('temasOtro', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent mt-3"
                                            placeholder="Especifique otra temática..."
                                        />
                                    )}
                                </div>

                                {/* Ubicación */}
                                <div className="border-t pt-6 mt-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Ubicación</h3>

                                    {/* 17. Provincia */}
                                    <div className="mb-4">
                                        <label className="block text-base font-bold text-gray-800 mb-2">
                                            17. Provincia <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            value={formData.provincia}
                                            onChange={(e) => handleInputChange('provincia', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                        >
                                            <option value="">Selecciona una provincia</option>
                                            <option value="Azuay">Azuay</option>
                                            <option value="Bolívar">Bolívar</option>
                                            <option value="Cañar">Cañar</option>
                                            <option value="Carchi">Carchi</option>
                                            <option value="Chimborazo">Chimborazo</option>
                                            <option value="Cotopaxi">Cotopaxi</option>
                                            <option value="El Oro">El Oro</option>
                                            <option value="Esmeraldas">Esmeraldas</option>
                                            <option value="Galápagos">Galápagos</option>
                                            <option value="Guayas">Guayas</option>
                                            <option value="Imbabura">Imbabura</option>
                                            <option value="Loja">Loja</option>
                                            <option value="Los Ríos">Los Ríos</option>
                                            <option value="Manabí">Manabí</option>
                                            <option value="Morona Santiago">Morona Santiago</option>
                                            <option value="Napo">Napo</option>
                                            <option value="Orellana">Orellana</option>
                                            <option value="Pastaza">Pastaza</option>
                                            <option value="Pichincha">Pichincha</option>
                                            <option value="Santa Elena">Santa Elena</option>
                                            <option value="Santo Domingo de los Tsáchilas">Santo Domingo de los Tsáchilas</option>
                                            <option value="Sucumbíos">Sucumbíos</option>
                                            <option value="Tungurahua">Tungurahua</option>
                                            <option value="Zamora Chinchipe">Zamora Chinchipe</option>
                                        </select>
                                    </div>

                                    {/* 18. Cantón */}
                                    <div className="mb-4">
                                        <label className="block text-base font-bold text-gray-800 mb-2">
                                            18. Cantón <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.canton}
                                            onChange={(e) => handleInputChange('canton', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            placeholder="Nombre del cantón"
                                        />
                                    </div>

                                    {/* 19. Parroquia */}
                                    <div>
                                        <label className="block text-base font-bold text-gray-800 mb-2">
                                            19. Parroquia <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.parroquia}
                                            onChange={(e) => handleInputChange('parroquia', e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                            placeholder="Nombre de la parroquia"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 3: Diagnóstico de Madurez Digital */}
                        {currentStep === 3 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center">
                                        <BarChart3 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Diagnóstico de Madurez Digital</h2>
                                        <p className="text-sm text-gray-600">Este diagnóstico express permitirá conocer rápidamente el grado de madurez digital de tu emprendimiento y los próximos pasos para avanzar.</p>
                                    </div>
                                </div>

                                {/* 1. Identidad Digital */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        1. IDENTIDAD DIGITAL <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con la <strong>presencia digital</strong> de tu emprendimiento, ¿Cuál de las siguientes afirmaciones te representa mejor?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No tengo', label: 'No tengo redes sociales ni página web' },
                                            { value: 'Redes sin estrategia', label: 'Tengo redes sociales, pero sin estrategia definida' },
                                            { value: 'Web y estrategia', label: 'Tengo página web y redes sociales activas con estrategia clara' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.identidadDigital === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="identidadDigital"
                                                        value={option.value}
                                                        checked={formData.identidadDigital === option.value}
                                                        onChange={(e) => handleInputChange('identidadDigital', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Correo y Comunicación */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        2. CORREO Y COMUNICACIÓN CORPORATIVA <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con el uso de <strong>correo electrónico y canales de comunicación</strong> para tu negocio, ¿Cuál de las siguientes afirmaciones te representa mejor?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'Personal', label: 'Uso solo correos personales' },
                                            { value: 'Gmail empresa', label: 'Uso Gmail/Outlook/Yahoo con nombre de la empresa' },
                                            { value: 'Corporativo propio', label: 'Tengo correo corporativo con dominio propio y firma profesional' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.correoCorp === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="correoCorp"
                                                        value={option.value}
                                                        checked={formData.correoCorp === option.value}
                                                        onChange={(e) => handleInputChange('correoCorp', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Buscadores y Mapas */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        3. PRESENCIA EN BUSCADORES Y MAPAS <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con la <strong>visibilidad de tu negocio en buscadores</strong> (como Google) y mapas digitales (Google Maps, Waze, etc.), ¿Cuál de las siguientes afirmaciones te representa mejor?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No estoy', label: 'No estoy en Google Business ni en mapas' },
                                            { value: 'Incompleto', label: 'Tengo Google Business, pero incompleto' },
                                            { value: 'Completo', label: 'Perfil completo en Google Business y reseñas activas' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.buscadoresMapas === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="buscadoresMapas"
                                                        value={option.value}
                                                        checked={formData.buscadoresMapas === option.value}
                                                        onChange={(e) => handleInputChange('buscadoresMapas', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Herramientas Ofimáticas */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        4. USO DE HERRAMIENTAS OFIMÁTICAS Y EN LA NUBE <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En cuanto al uso de <strong>herramientas ofimáticas</strong> (Word, Excel, PowerPoint, etc.) y <strong>soluciones en la nube</strong> (Google Drive, OneDrive, Dropbox, etc.), ¿Cuál de las siguientes afirmaciones describe mejor la realidad de tu negocio?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'Papel', label: 'Solo uso papel o Excel básico' },
                                            { value: 'Office parcial', label: 'Uso Google Workspace/Office 365 de forma parcial' },
                                            { value: 'Nube colaborativa', label: 'Uso colaborativo en la nube para documentos, hojas de cálculo y reuniones' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.ofimaticaNube === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="ofimaticaNube"
                                                        value={option.value}
                                                        checked={formData.ofimaticaNube === option.value}
                                                        onChange={(e) => handleInputChange('ofimaticaNube', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 5. Procesos Internos */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        5. PROCESOS INTERNOS DIGITALIZADOS <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con la <strong>gestión interna del negocio</strong> como inventarios, facturación, cobros o pagos, ¿Cuál de las siguientes afirmaciones refleja mejor tu situación actual?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'Manual', label: 'Todo es manual' },
                                            { value: 'Básico', label: 'Uso algún sistema básico (facturación electrónica o pagos digitales)' },
                                            { value: 'Integrado', label: 'Tengo sistemas integrados para inventarios, facturación y pagos en línea' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.procesosInternos === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="procesosInternos"
                                                        value={option.value}
                                                        checked={formData.procesosInternos === option.value}
                                                        onChange={(e) => handleInputChange('procesosInternos', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 6. Ventas Digitales */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        6. VENTAS DIGITALES Y COMERCIO ELECTRÓNICO <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con tus <strong>ventas en línea y el uso de canales digitales</strong> (redes sociales, marketplace, página web, etc.), ¿Cuál de las siguientes afirmaciones representa mejor tu situación actual?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No vendo en línea' },
                                            { value: 'Esporádico', label: 'Vendo esporádicamente por redes sociales o marketplace' },
                                            { value: 'Tienda online', label: 'Tengo tienda online o ventas frecuentes en plataformas digitales' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.ventasDigitales === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="ventasDigitales"
                                                        value={option.value}
                                                        checked={formData.ventasDigitales === option.value}
                                                        onChange={(e) => handleInputChange('ventasDigitales', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 7. Uso de Datos */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        7. USO DE DATOS PARA DECISIONES <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con el <strong>uso de datos o información</strong> para tomar decisiones en tu negocio (ventas, clientes, operaciones, marketing, etc.), ¿Cuál de las siguientes afirmaciones te representa mejor?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No recopilo datos ni los uso' },
                                            { value: 'Básicas', label: 'Reviso métricas básicas (ventas, redes sociales)' },
                                            { value: 'Analítica', label: 'Uso de analíticas avanzadas (Google Analytics, CRM)' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.usoDatos === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="usoDatos"
                                                        value={option.value}
                                                        checked={formData.usoDatos === option.value}
                                                        onChange={(e) => handleInputChange('usoDatos', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 8. Ciberseguridad */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        8. CIBERSEGURIDAD <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con la <strong>seguridad digital</strong> de tu negocio (protección de información, contraseñas, accesos, copias de seguridad, etc.), ¿Cuál de las siguientes afirmaciones te representa mejor?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No aplico medidas de seguridad' },
                                            { value: 'Antivirus', label: 'Uso antivirus o contraseñas fuertes' },
                                            { value: 'Protocolos', label: 'Tengo protocolos claros y capacitación en ciberseguridad' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.ciberseguridad === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="ciberseguridad"
                                                        value={option.value}
                                                        checked={formData.ciberseguridad === option.value}
                                                        onChange={(e) => handleInputChange('ciberseguridad', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 9. Capacitación */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        9. CAPACITACIÓN DIGITAL RECIENTE (ÚLTIMOS 12 MESES) <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En los <strong>últimos 12 meses</strong>, ¿Qué nivel de capacitación o formación digital has tenido (en temas como marketing digital, comercio electrónico, ofimática, ciberseguridad, etc.)?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No hemos recibido capacitación' },
                                            { value: 'Taller', label: 'Algún taller básico' },
                                            { value: 'Formal', label: 'Capacitación formal en marketing digital, e-commerce, o IA' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.capacitacion === option.value
                                                    ? 'border-purple-500 bg-purple-50 shadow-purple-100'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="capacitacion"
                                                        value={option.value}
                                                        checked={formData.capacitacion === option.value}
                                                        onChange={(e) => handleInputChange('capacitacion', e.target.value)}
                                                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PASO 4: Estrategia e Impacto */}
                        {currentStep === 4 && (
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-orange-600 to-red-500 rounded-xl flex items-center justify-center">
                                        <Target className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900">Estrategia e Impacto</h2>
                                        <p className="text-sm text-gray-600">Visión digital y resultados del negocio</p>
                                    </div>
                                </div>

                                {/* 1. Habilitadores Avanzados */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        1. USO DE HABILITADORES DIGITALES AVANZADOS <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con el uso o exploración de <strong>habilitadores digitales avanzados</strong> como inteligencia artificial (IA), internet de las cosas (IoT), blockchain, realidad aumentada (AR) o realidad virtual (VR), ¿Cuál de las siguientes afirmaciones describe mejor tu situación actual?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No conozco', label: 'No los conozco ni uso' },
                                            { value: 'Conozco', label: 'Los conozco, pero aún no los aplico' },
                                            { value: 'Uso', label: 'Ya los uso o tengo plan de adopción' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.habilitadoresAv === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="habilitadoresAv"
                                                        value={option.value}
                                                        checked={formData.habilitadoresAv === option.value}
                                                        onChange={(e) => handleInputChange('habilitadoresAv', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 2. Liderazgo */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        2. LIDERAZGO Y CULTURA DIGITAL <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        En relación con el <strong>liderazgo, la cultura organizacional y la apertura al cambio digital</strong> dentro de tu negocio o emprendimiento, ¿Cuál de las siguientes afirmaciones describe mejor tu situación actual?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No prioridad', label: 'La dirección no considera prioridad la transformación digital' },
                                            { value: 'Interés', label: 'Hay interés, pero sin plan formal' },
                                            { value: 'Impulsa', label: 'Alta dirección impulsa activamente la transformación digital' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.liderazgo === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="liderazgo"
                                                        value={option.value}
                                                        checked={formData.liderazgo === option.value}
                                                        onChange={(e) => handleInputChange('liderazgo', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 3. Estrategia */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        3. ESTRATEGIA DIGITAL CLARA (2-5 AÑOS) <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        ¿Tu negocio o emprendimiento cuenta con una <strong>estrategia digital definida</strong> que guíe sus acciones y objetivos para los próximos 2 a 5 años?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No existe', label: 'No existe' },
                                            { value: 'Discusión', label: 'Está en discusión' },
                                            { value: 'Definida', label: 'Está definida y comunicada' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.estrategia === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="estrategia"
                                                        value={option.value}
                                                        checked={formData.estrategia === option.value}
                                                        onChange={(e) => handleInputChange('estrategia', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 4. Colaboración */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        4. COLABORACIÓN DIGITAL CON TERCEROS <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        ¿Qué nivel de uso de herramientas digitales tiene tu negocio para <strong>colaborar, comunicarse o intercambiar información</strong> con proveedores, clientes o aliados estratégicos?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'Manual', label: 'Todo es manual' },
                                            { value: 'Whatsapp', label: 'Uso ocasional de WhatsApp/Email' },
                                            { value: 'Plataformas', label: 'Uso CRM, plataformas de pedidos o integraciones digitales' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.colaboracion === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="colaboracion"
                                                        value={option.value}
                                                        checked={formData.colaboracion === option.value}
                                                        onChange={(e) => handleInputChange('colaboracion', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 5. Innovación */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        5. INNOVACIÓN Y MEJORA CONTINUA <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        🚀 En tu negocio o emprendimiento, ¿Cómo se promueve la <strong>innovación y la mejora continua</strong> en productos, servicios o procesos?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No realizamos innovaciones tecnológicas' },
                                            { value: 'Pequeñas', label: 'Hacemos pequeñas mejoras digitales' },
                                            { value: 'Activa', label: 'Innovamos activamente o participamos en proyectos piloto' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.innovacion === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="innovacion"
                                                        value={option.value}
                                                        checked={formData.innovacion === option.value}
                                                        onChange={(e) => handleInputChange('innovacion', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 6. Impacto Ambiental y Legal */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        6. EVALUACIÓN DEL IMPACTO AMBIENTAL/DATOS Y CUMPLIMIENTO REGULATORIO <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        🌱 ¿Tu negocio o emprendimiento considera el <strong>impacto ambiental</strong>, el <strong>uso responsable de los datos</strong> y el <strong>cumplimiento de normas digitales o legales</strong> en sus operaciones?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No lo hemos considerado' },
                                            { value: 'Discutido', label: 'Hemos discutido algunos aspectos' },
                                            { value: 'Políticas', label: 'Tenemos políticas y prácticas establecidas' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.impactoAmb === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="impactoAmb"
                                                        value={option.value}
                                                        checked={formData.impactoAmb === option.value}
                                                        onChange={(e) => handleInputChange('impactoAmb', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 7. Crecimiento de Ventas */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        7. CRECIMIENTO DE VENTAS POR DIGITALIZACIÓN <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        📊 ¿Tu negocio ha experimentado <strong>crecimiento en sus ventas o clientes</strong> gracias al uso de herramientas, canales o estrategias digitales?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No hemos visto aumento atribuible a la digitalización' },
                                            { value: '<10%', label: 'Hemos tenido un crecimiento menor al 10%' },
                                            { value: '>=10%', label: 'Hemos tenido un crecimiento igual o superior al 10%' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.crecimientoVentas === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="crecimientoVentas"
                                                        value={option.value}
                                                        checked={formData.crecimientoVentas === option.value}
                                                        onChange={(e) => handleInputChange('crecimientoVentas', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 8. Exportaciones */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        8. EXPORTACIONES (DIGITALES) <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        🌍 ¿Tu negocio o emprendimiento ha utilizado <strong>canales digitales</strong> para vender, promocionar o conectar con clientes y aliados en el <strong>exterior</strong>?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No realizamos exportaciones digitales' },
                                            { value: 'Ocasional', label: 'Exportamos ocasionalmente a través de canales digitales' },
                                            { value: 'Frecuente', label: 'Exportamos frecuentemente o estamos aumentando nuestras exportaciones digitales' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.exportaciones === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="exportaciones"
                                                        value={option.value}
                                                        checked={formData.exportaciones === option.value}
                                                        onChange={(e) => handleInputChange('exportaciones', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 9. Generación de Empleo */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        9. EMPLEO GENERADO POR TRANSFORMACIÓN DIGITAL <span className="text-red-500">*</span>
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        💼 ¿Tu negocio o emprendimiento ha generado <strong>nuevos empleos, roles o servicios</strong> como resultado del proceso de <strong>transformación digital</strong>?
                                    </p>
                                    <div className="grid grid-cols-1 gap-3">
                                        {[
                                            { value: 'No', label: 'No hemos generado empleo adicional por digitalización' },
                                            { value: '1-3', label: 'Hemos generado 1–3 nuevos empleos relacionados con lo digital' },
                                            { value: '>3', label: 'Hemos generado más de 3 nuevos empleos relacionados con lo digital' }
                                        ].map((option) => (
                                            <label
                                                key={option.value}
                                                className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${formData.empleo === option.value
                                                    ? 'border-orange-500 bg-orange-50 shadow-orange-100'
                                                    : 'border-gray-200 hover:border-orange-300'
                                                    }`}
                                            >
                                                <div className="flex items-center h-5">
                                                    <input
                                                        type="radio"
                                                        name="empleo"
                                                        value={option.value}
                                                        checked={formData.empleo === option.value}
                                                        onChange={(e) => handleInputChange('empleo', e.target.value)}
                                                        className="w-5 h-5 text-orange-600 focus:ring-orange-500"
                                                    />
                                                </div>
                                                <span className="ml-3 text-sm font-medium text-gray-700 leading-tight">{option.label}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* 10. Observaciones */}
                                <div>
                                    <label className="block text-base font-bold text-gray-800 mb-2">
                                        10. Observaciones generales / Información adicional
                                    </label>
                                    <p className="text-sm text-gray-600 mb-4">
                                        Si deseas, comparte aquí información adicional, comentarios o sugerencias sobre tu negocio o tus necesidades digitales.
                                    </p>
                                    <textarea
                                        name="observaciones"
                                        value={formData.observaciones || ''}
                                        onChange={(e) => handleInputChange('observaciones', e.target.value)}
                                        rows="4"
                                        className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-4 focus:ring-orange-100 outline-none transition-all resize-none"
                                        placeholder="Escribe aquí tus comentarios..."
                                    ></textarea>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Botones de Navegación */}
                    <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 1}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${currentStep === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg'
                                }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                            Atrás
                        </button>

                        {currentStep < totalSteps ? (
                            <button
                                onClick={nextStep}
                                disabled={!validateStep(currentStep)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${validateStep(currentStep)
                                    ? 'bg-gradient-to-r from-gob-blue to-cyan-500 text-white hover:from-gob-blue hover:to-cyan-600 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Siguiente
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={!validateStep(4)}
                                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all ${validateStep(4)
                                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl'
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                <Send className="w-5 h-5" />
                                Enviar Diagnóstico
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisForm;
