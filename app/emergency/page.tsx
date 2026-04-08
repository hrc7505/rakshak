import Card from "@/app/components/card/card";
import PageHeader from "@/app/components/pageHeader/pageHeader";
import { Info, Shield } from "lucide-react";

export default function UnderstandingPage() {
    const sections = [
        {
            title: "Police Encounters & FIRs", icon: Info,
            items: [
                { title: "Zero FIR", desc: "A Zero FIR can be filed at any police station, regardless of where the incident occurred." },
                { title: "Protection Against Night Arrests", desc: "Under Section 46(4) of the CrPC, a woman cannot be arrested after sunset and before sunrise." }
            ]
        },
        {
            title: "Workplace & Digital Safety", icon: Shield,
            items: [
                { title: "The POSH Act (2013)", desc: "Mandates that every workplace with >10 employees must have an Internal Complaints Committee (ICC)." },
                { title: "Cybercrime Reporting (1930)", desc: "Report anonymously on cybercrime.gov.in or call 1930." }
            ]
        }
    ];

    return (
        <div className="animate-fade-in py-16 px-4 max-w-4xl mx-auto space-y-10">
            <PageHeader title="Understanding Your Rights" subtitle="Familiarize yourself with the legal frameworks in India designed to protect you." />
            <div className="space-y-8">
                {sections.map((sec, i) => (
                    <Card key={i}>
                        <h2 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                            <sec.icon className="text-purple-500" /> {sec.title}
                        </h2>
                        <div className="space-y-4">
                            {sec.items.map((item, j) => (
                                <div key={j} className="p-4 bg-gray-50 rounded-lg">
                                    <h3 className="font-bold text-lg text-gray-900 mb-1">{item.title}</h3>
                                    <p className="text-gray-700">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}