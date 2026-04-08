"use client";

import ActionButton from "@/app/components/actionButton/actionButton";
import Card from "@/app/components/card/card";
import FakeCallOverlay from "@/app/components/fakeCallOverlay/fakeCallOverlay";
import { MapPin, AlertCircle, Bell, PhoneCall, Phone, Navigation, Power, BookOpen } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type EmergencyTab = 'home' | 'helplines' | 'fakecall' | 'map';

const HELPLINES = [
    { name: 'National Emergency', number: '112', desc: 'Police, Fire, Ambulance' },
    { name: 'Women Helpline', number: '1091', desc: 'All India Women in Distress' },
    { name: 'Domestic Abuse', number: '181', desc: 'Women Helpline' },
    { name: 'NCW Helpline', number: '14490', desc: 'National Commission for Women' },
    { name: 'Cyber Crime', number: '1930', desc: 'Report Digital Harassment' },
];

export default function EmergencyDashboard() {
    const [activeTab, setActiveTab] = useState<EmergencyTab>('home');
    const [sosActive, setSosActive] = useState(false);
    const [fakeCallStatus, setFakeCallStatus] = useState<'idle' | 'ringing' | 'connected'>('idle');
    const [sirenActive, setSirenActive] = useState(false);
    const [location, setLocation] = useState<string>("Fetching location...");

    const audioCtxRef = useRef<AudioContext | null>(null);
    const oscillatorRef = useRef<OscillatorNode | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!("geolocation" in navigator)) return setLocation("Geolocation not supported");

        setLocation("Requesting GPS access...");
        const watchId = navigator.geolocation.watchPosition(
            async (pos) => {
                const { latitude: lat, longitude: lon, accuracy: acc } = pos.coords;
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                    const data = await res.json();
                    setLocation(`${data.display_name?.split(',').slice(0, 2).join(', ') || `Lat: ${lat.toFixed(4)}`} (Acc: ${Math.round(acc)}m)`);
                } catch {
                    setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lon.toFixed(4)}`);
                }
            },
            (err) => {
                if (err.code === err.PERMISSION_DENIED) {
                    setLocation("Location blocked. Using simulated location...");
                    setTimeout(() => setLocation("Connaught Place, New Delhi (Simulated)"), 1500);
                }
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
        );
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    const handleSOS = () => {
        setSosActive(true);
        setTimeout(() => alert("SOS Alert Sent!"), 500);
    };

    const playSiren = () => {
        setSirenActive(true);
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        audioCtxRef.current = ctx;
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'square';
        osc.frequency.value = 400;
        gainNode.gain.value = 0.1;
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
        intervalRef.current = setInterval(() => {
            if (oscillatorRef.current) oscillatorRef.current.frequency.value = oscillatorRef.current.frequency.value === 400 ? 800 : 400;
        }, 400);
    };

    const stopSiren = () => {
        setSirenActive(false);
        oscillatorRef.current?.stop();
        oscillatorRef.current?.disconnect();
        audioCtxRef.current?.close();
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    useEffect(() => stopSiren, []);

    if (fakeCallStatus !== 'idle') {
        return <FakeCallOverlay
            status={fakeCallStatus}
            onAnswer={() => setFakeCallStatus('connected')}
            onEnd={() => setFakeCallStatus('idle')}
        />;
    }

    return (
        <div className={`min-h-[calc(100vh-64px)] pb-24 ${sirenActive ? 'bg-red-100 animate-pulse' : 'bg-gray-100'} transition-colors duration-300 relative`}>
            <div className="max-w-md mx-auto p-4 space-y-6 pt-6">
                {activeTab === 'home' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex items-center gap-3 text-sm text-gray-700">
                            <MapPin className="text-purple-600 shrink-0" size={20} />
                            <span className="truncate font-medium">{location}</span>
                        </div>

                        <div className="flex flex-col items-center justify-center py-8">
                            <div className={`relative ${sosActive ? 'animate-pulse' : ''}`}>
                                {sosActive && <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-75 blur-md"></div>}
                                <button onClick={handleSOS} className={`relative z-10 w-56 h-56 rounded-full shadow-2xl flex flex-col items-center justify-center border-4 border-white transition-all active:scale-95 ${sosActive ? 'bg-red-700' : 'bg-red-600 hover:bg-red-700'}`}>
                                    <AlertCircle size={56} className="text-white mb-2" />
                                    <span className="text-white text-4xl font-black tracking-widest">SOS</span>
                                    <span className="text-red-100 text-sm mt-1 font-bold">TAP TO ALERT</span>
                                </button>
                            </div>
                            {sosActive && (
                                <button onClick={() => setSosActive(false)} className="mt-8 px-4 py-2 bg-gray-200 rounded-full text-gray-700 text-sm font-bold hover:bg-gray-300">
                                    Cancel Emergency Mode
                                </button>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <ActionButton isActive={sirenActive} onClick={() => sirenActive ? stopSiren() : playSiren()} icon={Bell} iconColor="text-orange-500" text={sirenActive ? 'Stop Siren' : 'Loud Siren'} />
                            <ActionButton onClick={() => { setActiveTab('fakecall'); setTimeout(() => setFakeCallStatus('ringing'), 100); }} icon={PhoneCall} iconColor="text-green-500" text="Fake Call" />
                        </div>
                    </div>
                )}

                {activeTab === 'helplines' && (
                    <div className="space-y-4 animate-fade-in">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Helplines</h2>
                        {HELPLINES.map((hl, idx) => (
                            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 flex items-center justify-between">
                                <div><h3 className="font-bold text-gray-900 text-lg">{hl.name}</h3><p className="text-gray-500 text-sm">{hl.desc}</p></div>
                                <a href={`tel:${hl.number}`} className="bg-green-100 text-green-800 font-bold px-4 py-2 rounded-full flex gap-2"><Phone size={16} /> {hl.number}</a>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'fakecall' && (
                    <Card className="text-center">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3"><PhoneCall size={32} /></div>
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Schedule Fake Call</h2>
                        <div className="space-y-3">
                            {[{ l: 'Call Now', t: 0 }, { l: 'In 10 Seconds', t: 10 }, { l: 'In 30 Seconds', t: 30 }].map(btn => (
                                <button key={btn.t} onClick={() => setTimeout(() => setFakeCallStatus('ringing'), btn.t * 1000)} className="w-full py-4 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-800 font-bold rounded-xl transition">{btn.l}</button>
                            ))}
                        </div>
                    </Card>
                )}

                {activeTab === 'map' && (
                    <div className="space-y-4 animate-fade-in h-[500px] relative bg-gray-200 rounded-2xl overflow-hidden shadow-inner border border-gray-300">
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500">
                            <Navigation size={48} className="mb-2 opacity-50" /><p className="font-medium">Map View</p>
                        </div>
                        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur p-3 rounded-xl shadow-sm flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div><span className="text-sm font-bold text-gray-800">Live Location Active</span>
                        </div>
                    </div>
                )}
            </div>

            <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-40">
                <div className="max-w-md w-full flex justify-around p-2 pb-safe">
                    {[{ id: 'home', icon: Power, label: 'SOS' }, { id: 'map', icon: Navigation, label: 'Map' }, { id: 'fakecall', icon: PhoneCall, label: 'Call' }, { id: 'helplines', icon: BookOpen, label: 'Guide' }].map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id as EmergencyTab)} className={`flex flex-col items-center gap-1 w-16 p-2 rounded-xl transition ${activeTab === tab.id ? 'text-purple-700 bg-purple-50 font-bold' : 'text-gray-500 hover:text-gray-800 font-medium'}`}>
                            <tab.icon size={24} className={activeTab === tab.id ? 'fill-purple-100' : ''} />
                            <span className="text-[11px] uppercase tracking-wider">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            <style dangerouslySetInnerHTML={{ __html: `.animate-fade-in { animation: fadeIn 0.4s ease-out forwards; } @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }` }} />
        </div>
    );
}