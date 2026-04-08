"use client";
import { Shield, EyeOff, AlertCircle, X, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 1. Import usePathname
import { useCallback, useState } from "react";

// 2. Update IDs to match actual Next.js route paths
const navItems = [
    { id: '/', label: 'Home' },
    { id: '/about', label: 'About' },
    { id: '/services', label: 'Services' },
    { id: '/understanding', label: 'Understanding' },
];

export default function HeaderNav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname(); // 3. Get the current active URL path

    const handleNav = useCallback(() => {
        setMobileMenuOpen(false);
    }, []);

    return (
        <header className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                <Link className="flex items-center gap-2 cursor-pointer text-purple-800" href="/" onClick={handleNav}>
                    <Shield size={28} className="text-purple-600" />
                    <span className="text-2xl font-extrabold tracking-tight">Rakshak</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 font-medium text-sm text-gray-600">
                    {navItems.map(item => (
                        <Link
                            key={item.id}
                            href={item.id}
                            // 4. Compare current pathname to the item.id
                            className={`hover:text-purple-700 transition ${pathname === item.id ? 'text-purple-700 font-bold' : ''}`}
                            onClick={handleNav}
                        >
                            {item.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
                        <Link href={'/emergency_dashboard'} onClick={handleNav} className="bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-full font-bold hover:bg-red-100 transition flex items-center gap-2">
                            <AlertCircle size={18} /> Open App
                        </Link>
                    </div>
                </nav>

                <div className="md:hidden flex items-center gap-4">
                    <Link href={"/emergency_dashboard"} onClick={handleNav} className="bg-red-100 text-red-600 p-2 rounded-full font-bold">
                        <AlertCircle size={20} />
                    </Link>
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-600">
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-4 z-50">
                    {navItems.map(item => (
                        <Link
                            key={item.id}
                            href={item.id}
                            onClick={handleNav}
                            // Applied active state to mobile menu as well
                            className={`text-left py-2 font-medium border-b border-gray-50 ${pathname === item.id ? 'text-purple-700 font-bold' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            )}
        </header>
    );
}