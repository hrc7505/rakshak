import Card from "@/app/components/card/card";
import PageHeader from "@/app/components/pageHeader/pageHeader";
import { SERVICES_DATA } from "@/app/services/page";
import { ShieldCheck, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <section className="bg-purple-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-purple-900 to-black"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 bg-purple-800/50 rounded-full px-4 py-2 text-sm text-purple-200 border border-purple-700">
            <ShieldCheck size={16} /> Verified Safety Platform
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Your Safety, <br />
            <span className="text-purple-300">Our Absolute Priority.</span>
          </h1>
          <p className="text-lg md:text-xl text-purple-100 max-w-2xl mx-auto">
            A comprehensive digital companion designed to protect, educate, and empower women across India.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link href={'emergency_dashboard'} className="bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition shadow-lg flex items-center justify-center gap-2">
              <AlertCircle size={22} /> Access Emergency Tools
            </Link>
            <Link href={'services'} className="bg-white text-purple-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg flex items-center justify-center gap-2">
              Explore Features <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <PageHeader title="Empowering Features" subtitle="Built with cutting-edge technology to provide immediate assistance." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES_DATA.slice(0, 3).map((feat, idx) => (
            <Card key={idx} className="hover:shadow-md transition hover:-translate-y-1">
              <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-6">
                <feat.icon size={32} className={feat.color} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feat.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};