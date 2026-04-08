import { Heart, Shield } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="animate-fade-in py-16 px-4 max-w-4xl mx-auto space-y-16">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-extrabold text-gray-900">About Rakshak</h1>
                <p className="text-xl text-gray-600">Building a safer world through technology and community.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-purple-800 flex items-center gap-3">
                        <Heart className="text-red-500" /> Our Mission
                    </h2>
                    <p className="text-gray-600 leading-relaxed text-lg">
                        Rakshak was born out of a critical necessity: to provide women in India with an accessible, reliable, and instantaneous tool for personal safety.
                    </p>
                </div>
                <div className="bg-purple-100 rounded-3xl p-8 aspect-square flex items-center justify-center text-purple-300">
                    <Shield size={160} />
                </div>
            </div>
        </div>
    );
}