import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: 'Inicio', href: 'https://observatorioecuadordigital.mintel.gob.ec/sfsied/economia-digital/', target: '_top' },
        { name: 'Acerca de', href: '/#acerca-de' },
        { name: 'Recursos', href: '/#recursos' },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-md">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center py-4 md:py-6">

                    {/* LOGO - Mucho más grande y visible */}
                    <a href="https://observatorioecuadordigital.mintel.gob.ec/sfsied/economia-digital/" target="_top" className="flex items-center gap-3 group">
                        <img
                            src="/img/empoderatech_logo.png"
                            alt="EmpoderaTech Logo"
                            className="h-11 md:h-15 lg:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                    </a>

                    {/* DESKTOP MENU */}
                    <div className="hidden md:flex items-center gap-6 lg:gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                target={link.target}
                                className="text-gob-slate hover:text-gob-blue font-semibold text-base lg:text-lg transition-colors duration-300 relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gob-blue transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                            target="_top"
                            className="bg-gob-blue text-white px-6 py-2.5 lg:px-8 lg:py-3 rounded-full font-bold text-base lg:text-lg hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            Inscríbete
                        </a>
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-2 text-gob-slate hover:text-gob-blue transition-colors"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-white border-t border-gray-200"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.target}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gob-slate hover:text-gob-blue font-semibold text-lg py-2 border-b border-gray-100 last:border-0 transition-colors"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a
                                href="https://observatorioecuadordigital.mintel.gob.ec/diagnostico/"
                                target="_top"
                                onClick={() => setIsOpen(false)}
                                className="bg-gob-blue text-white px-6 py-3 rounded-full font-bold text-center hover:bg-blue-800 transition-all shadow-lg mt-2"
                            >
                                Inscríbete
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
