'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import {
    ChevronDown,
    Calculator,
    TrendingUp,
    Wallet,
    FileText,
    Target,
    Shield,
    Users,
    Award,
    Briefcase,
    Building2,
    Heart,
    BookOpen,
    Newspaper,
    Mail,
    Phone
} from 'lucide-react';

// Menu data structure
const menuData = {
    services: [
        { icon: 'Calculator', title: 'ACCOUNTING ESSENTIALS', description: 'Complete bookkeeping and accounting services', href: '/services/accounting' },
        { icon: 'Wallet', title: 'TAX SERVICES', description: 'Expert tax planning and preparation', href: '/services/tax' },
        { icon: 'TrendingUp', title: 'WEALTH MANAGEMENT', description: 'Strategic wealth planning and investment', href: '/services/wealth' },
        { icon: 'FileText', title: 'FINANCIAL INSIGHTS', description: 'Data-driven financial analysis', href: '/services/insights' },
        { icon: 'Target', title: 'R&D TAX CREDITS', description: 'Maximize your R&D tax benefits', href: '/services/rd-tax' },
        { icon: 'Shield', title: 'APP ADVISORY', description: 'Technology and app consulting', href: '/services/app-advisory' },
        { icon: 'Briefcase', title: 'FUNDING OPTIONS', description: 'Business funding and financing solutions', href: '/services/funding' },
        { icon: 'Shield', title: 'BUSINESS PROTECTION SERVICES', description: 'Protect your business assets', href: '/services/protection' },
    ],
    about: [
        { icon: 'Users', title: 'Our Team', description: 'Meet our experts', href: '/about/team' },
        { icon: 'Award', title: 'Our Story', description: 'Learn about our journey', href: '/about/story' },
        { icon: 'Target', title: 'Careers', description: 'Join our team', href: '/about/careers' },
        { icon: 'Heart', title: 'Values', description: 'What drives us', href: '/about/values' },
    ],
    sectors: [
        { icon: 'Building2', title: 'Technology', description: 'Tech startups and scale-ups', href: '/sectors/technology' },
        { icon: 'Heart', title: 'Healthcare', description: 'Medical and health services', href: '/sectors/healthcare' },
        { icon: 'Briefcase', title: 'Professional Services', description: 'Consulting and advisory', href: '/sectors/professional' },
        { icon: 'TrendingUp', title: 'E-commerce', description: 'Online retail businesses', href: '/sectors/ecommerce' },
    ],
    resources: [
        { icon: 'BookOpen', title: 'Blog', description: 'Latest insights and articles', href: '/resources/blog' },
        { icon: 'Newspaper', title: 'Case Studies', description: 'Success stories', href: '/resources/case-studies' },
        { icon: 'FileText', title: 'Guides', description: 'Downloadable resources', href: '/resources/guides' },
        { icon: 'Mail', title: 'Newsletter', description: 'Stay updated', href: '/resources/newsletter' },
    ],
};

// Icon component mapper
const iconMap = {
    Calculator, TrendingUp, Wallet, FileText, Target, Shield,
    Users, Award, Briefcase, Building2, Heart, BookOpen, Newspaper, Mail, Phone
};

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [activeMobileMenu, setActiveMobileMenu] = useState<string | null>(null);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const getIcon = (iconName: string) => {
        const Icon = iconMap[iconName as keyof typeof iconMap];
        return Icon ? <Icon className="w-7 h-7 text-pink-500" /> : null;
    };

    const handleMenuEnter = (key: string) => {
        setActiveMenu(key);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
    };

    const handleMegaMenuMouseLeave = () => {
        setActiveMenu(null);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element;
            if (!target.closest('.menu-area')) {
                setActiveMenu(null);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <>
            <header
                className={`fixed inset-x-0 top-19 md:top-14 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm' : 'bg-white'
                    }`}
            >
                <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 transition-all duration-300 ${scrolled ? 'py-2' : 'py-6'}`}>
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <a href="/" className="flex items-center gap-3 z-50">
                            <Image src="/images/logo.svg" alt="Inform logo" width={44} height={44} priority />
                            {/* <span className="text-xl font-bold text-gray-900">Inform</span> */}
                        </a>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {Object.entries(menuData).map(([key, items]) => (
                                <div
                                    key={key}
                                    className="relative nav-item"
                                    onMouseEnter={() => handleMenuEnter(key)}
                                >
                                    <button className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 uppercase tracking-wide transition-colors py-2 cursor-pointer">
                                        {key === 'services' ? 'What we do' : key}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${activeMenu === key ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                </div>
                            ))}

                            <a
                                href="/contact"
                                className="ml-2 rounded-full border-2 border-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
                            >
                                Contact Us
                            </a>
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4 max-h-[calc(100vh-80px)] overflow-y-auto">
                            {Object.entries(menuData).map(([key, items]) => (
                                <div key={key} className="border-b border-gray-100">
                                    <button
                                        onClick={() => setActiveMobileMenu(activeMobileMenu === key ? null : key)}
                                        className="flex items-center justify-between w-full px-4 py-3 text-base font-semibold text-gray-900 uppercase hover:bg-gray-50 transition-colors"
                                    >
                                        {key === 'services' ? 'What we do' : key}
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform duration-200 ${activeMobileMenu === key ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>
                                    {activeMobileMenu === key && (
                                        <div className="bg-gray-50 py-2">
                                            {items.map((item) => (
                                                <a
                                                    key={item.href}
                                                    href={item.href}
                                                    className="flex items-start gap-3 px-6 py-3 hover:bg-white transition-colors"
                                                >
                                                    <div className="mt-0.5">
                                                        {getIcon(item.icon)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">{item.title}</div>
                                                        <div className="text-xs text-gray-600 mt-1 leading-relaxed">{item.description}</div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <a
                                href="/contact"
                                className="block mt-4 mx-4 text-center rounded-full border-2 border-gray-900 px-6 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-200 uppercase tracking-wide"
                            >
                                Contact Us
                            </a>
                        </div>
                    )}
                </div>
            </header>

            {/* Mega Menu Dropdown */}
            {activeMenu && (
                <>
                    {/* Backdrop that closes menu on hover */}
                    <div
                        className="fixed inset-0 bg-black/10 z-30"
                        style={{ top: scrolled ? '122px' : '128px' }}
                        onMouseEnter={handleMegaMenuMouseLeave}
                    />

                    {/* Menu Content */}
                    <div
                        className="fixed left-0 right-0 z-40 menu-area"
                        style={{ top: scrolled ? '122px' : '128px' }}
                        onMouseLeave={handleMegaMenuMouseLeave}
                    >
                        <div className="bg-white border-t border-b border-gray-200 shadow-lg">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                                <div className={`grid gap-4 ${activeMenu === 'services'
                                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                                        : activeMenu === 'about' || activeMenu === 'sectors'
                                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                                            : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                                    }`}>
                                    {menuData[activeMenu as keyof typeof menuData].map((item) => (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            className="group flex items-start gap-4 p-5 rounded-xl hover:bg-gray-50 transition-all duration-200 border border-transparent hover:border-gray-200 cursor-pointer"
                                        >
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getIcon(item.icon)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors text-sm mb-1.5 leading-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}