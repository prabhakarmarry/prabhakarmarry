import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'About me', href: '#basicInfo' },
        { name: 'Skills', href: '#skills' },
        { name: 'Portfolio', href: '#researchProjects' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo Removed */}
                <div />

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-xs font-bold uppercase tracking-widest text-black hover:text-gray-600 transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                    <a
                        href="#contact"
                        className="px-6 py-2 bg-white border-2 border-black text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_rgba(0,0,0,1)] hover:shadow-none translate-y-[-1px] active:translate-y-0"
                    >
                        CONTACT ME
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-black"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-6 flex flex-col gap-6 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-lg font-bold uppercase tracking-widest text-black"
                        >
                            {link.name}
                        </a>
                    ))}
                    <a
                        href="#contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full text-center py-4 bg-black text-white text-sm font-bold uppercase tracking-widest rounded-full"
                    >
                        CONTACT ME
                    </a>
                </div>
            )}
        </nav>
    );
};
