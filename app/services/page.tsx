import PageHeader from "@/app/components/pageHeader/pageHeader";
import { Power, PhoneCall, Bell, MapPin, EyeOff, BookOpen } from "lucide-react";
import { Route } from "next";

export const SERVICES_DATA = [
    { title: "Immediate SOS Alerts", icon: Power, desc: "A single tap sends automated SMS, WhatsApp messages, and emails to your predefined trusted contacts and local authorities (112) with your live GPS location.", color: "text-red-600", bg: "bg-red-50 border-red-100" },
    { title: "Fake Call Simulator", icon: PhoneCall, desc: "Feeling uncomfortable? Schedule a realistic fake phone call to yourself. Answer it to play a pre-recorded audio that gives you a polite excuse to leave.", color: "text-green-600", bg: "bg-green-50 border-green-100" },
    { title: "High-Decibel Siren", icon: Bell, desc: "A digital panic button that instantly plays a blaring police-style siren at maximum device volume, accompanied by a flashing red screen.", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
    { title: "Live Location Tracking", icon: MapPin, desc: "Use the 'Walk With Me' feature to share a temporary, real-time tracking link with a trusted friend while commuting.", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
    { title: "Discreet/Incognito Mode", icon: EyeOff, desc: "Instantly disguise the safety app as a generic daily news website to protect yourself if someone checks your phone.", color: "text-gray-600", bg: "bg-gray-100 border-gray-200" },
    { title: "Rights & Helplines", icon: BookOpen, desc: "Offline-capable directory of critical Indian helplines and bite-sized guides on women's legal rights and cyber safety protocols.", color: "text-purple-600", bg: "bg-purple-50 border-purple-100" }
];

export default function ServicesPage({ setRoute }: { setRoute: (route: Route) => void }) {
    return (
        <div className="animate-fade-in py-16 px-4 max-w-6xl mx-auto space-y-12">
            <PageHeader title="Platform Services" subtitle="A suite of tools designed to provide preventative safety and immediate rescue." />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES_DATA.map((svc, idx) => (
                    <div key={idx} className={`p-6 rounded-2xl border ${svc.bg} flex flex-col h-full hover:-translate-y-1 transition-transform duration-300`}>
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                            <svc.icon size={24} className={svc.color} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{svc.title}</h3>
                        <p className="text-gray-700 leading-relaxed flex-grow">{svc.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}