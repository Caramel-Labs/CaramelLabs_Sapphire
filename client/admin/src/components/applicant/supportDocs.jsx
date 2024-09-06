export default function SupportDocs({ data }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h2 className="text-xl font-bold mb-4 text-gray-500">
                Supportive Documents
            </h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-500 font-medium">Bank Statement</p>
                    <a
                        href={data.bankStatement}
                        className="text-purple-500 hover:text-purple-700"
                    >
                        View Document
                    </a>
                </div>
                <div>
                    <p className="text-gray-500 font-medium">Travel History</p>
                    <a
                        href={data.travelHistory}
                        className="text-purple-500 hover:text-purple-700"
                    >
                        View Document
                    </a>
                </div>
                <div>
                    <p className="text-gray-500 font-medium">Passport Photo</p>
                    <a
                        href={data.passportPhoto}
                        className="text-purple-500 hover:text-purple-700"
                    >
                        View Document
                    </a>
                </div>
            </div>
        </div>
    );
}
