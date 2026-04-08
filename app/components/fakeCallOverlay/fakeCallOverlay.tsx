import { Phone } from "lucide-react";

const FakeCallOverlay = ({ status, onAnswer, onEnd }: { status: 'ringing' | 'connected', onAnswer: () => void, onEnd: () => void }) => (
    <div className={`fixed inset-0 bg-gray-900 text-white flex flex-col items-center justify-between py-16 z-[100] ${status === 'ringing' ? 'animate-pulse' : ''}`}>
        <div className="text-center space-y-4 mt-10">
            {status === 'ringing' && <h2 className="text-3xl font-light mb-4">Incoming Call</h2>}
            <div className="w-28 h-28 bg-gray-700 rounded-full mx-auto flex items-center justify-center text-5xl mb-2">M</div>
            <h1 className="text-5xl font-bold">Mom</h1>
            <p className={status === 'connected' ? "text-green-400 text-lg" : "text-gray-400 text-lg"}>
                {status === 'connected' ? '00:03' : 'Mobile'}
            </p>
            {status === 'connected' && (
                <p className="text-sm text-gray-400 mt-12 px-8 text-center">(Audio: "Hi beta, I'm waiting outside, are you coming out?")</p>
            )}
        </div>
        <div className={`flex w-full px-16 ${status === 'ringing' ? 'justify-between' : 'justify-center'} mb-10`}>
            <button onClick={onEnd} className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center shadow-lg active:scale-95">
                <Phone size={36} className="rotate-[135deg]" />
            </button>
            {status === 'ringing' && (
                <button onClick={onAnswer} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg active:scale-95 animate-bounce">
                    <Phone size={36} />
                </button>
            )}
        </div>
    </div>
);

export default FakeCallOverlay;