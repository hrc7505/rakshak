const ActionButton = ({ onClick, icon: Icon, text, isActive = false, activeColor = 'bg-red-600 text-white', defaultColor = 'bg-white text-gray-800', iconColor = '' }: any) => (
    <button
        onClick={onClick}
        className={`${isActive ? activeColor : defaultColor} p-5 rounded-2xl shadow-sm border border-gray-200 flex flex-col items-center gap-3 transition-colors active:scale-95`}
    >
        <Icon size={32} className={`${iconColor} ${isActive ? 'animate-bounce' : ''}`} />
        <span className="font-bold">{text}</span>
    </button>
);

export default ActionButton;