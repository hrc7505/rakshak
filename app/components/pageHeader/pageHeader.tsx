const PageHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
    <div className="text-center space-y-4 max-w-2xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">{title}</h1>
        <p className="text-xl text-gray-600 border-l-4 border-purple-600 pl-4 mx-auto text-left max-w-lg">{subtitle}</p>
    </div>
);

export default PageHeader;