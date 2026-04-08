import { Shield } from "lucide-react";
import { Route } from "next";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 mt-auto">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-white">
                        <Shield size={24} className="text-purple-400" />
                        <span className="text-xl font-bold tracking-wide">Rakshak</span>
                    </div>
                    <p className="text-sm text-gray-400">Empowering women with technology, awareness, and community support for a safer tomorrow.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-sm">
                        {['Home', 'About Us', 'Services', 'Know Your Rights'].map((label, i) => {
                            const routes: Route[] = ['/', 'about', 'services', 'understanding'];

                            return <li key={i}>
                                <Link href={routes[i]} className="hover:text-white transition">{label}</Link>
                            </li>;
                        })}
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Emergency</h4>
                    <ul className="space-y-2 text-sm">
                        <li><a href="tel:112" className="hover:text-white transition">Police: 112</a></li>
                        <li><a href="tel:1091" className="hover:text-white transition">Women Helpline: 1091</a></li>
                        <li><Link href={'emergency_dashboard'} className="text-red-400 hover:text-red-300 transition font-bold mt-2 block">Open SOS App</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Contact</h4>
                    <p className="text-sm text-gray-400">support@rakshak.org.in<br />Available 24/7</p>
                </div>
            </div>
            <div className="max-w-6xl mx-auto mt-8 pt-8 border-t border-gray-800 text-sm text-center text-gray-500">
                &copy; {new Date().getFullYear()} Rakshak Women Safety Platform. All rights reserved.
            </div>
        </footer>
    );
}