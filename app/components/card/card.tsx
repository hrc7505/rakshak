const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 ${className}`}>
        {children}
    </div>
);

export default Card;