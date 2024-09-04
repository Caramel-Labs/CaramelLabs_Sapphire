import NavItem from "@/components/navItem";

export default function Navbar() {
    const navItem = [
        {
            emoji: '🏠',
            text: 'Home'
        },
        {
            emoji: '📄',
            text: 'Analytics'
        },
        {
            emoji: '📱',
            text: 'Sign out',
        }
    ];

    return (
        <nav className="fixed top-0 left-0 w-64 bg-white h-screen p-4 border-r shadow-lg z-50">
            <img src="/emblem.png" width={50} height={50} alt="Emblem" />
            <h2 className="text-black text-lg mt-4">
                Department of Immigration and Emigration
            </h2>
            <ul className="mt-8">
                {navItem.map((item, index) => (
                    <NavItem key={index} emoji={item.emoji} text={item.text} />
                ))}
            </ul>
            <div className="mt-auto pt-4 border-t">
                <div className="flex items-center">
                    <span className="mr-2">👤</span>
                    <div>
                        <p className="font-semibold text-black">
                            Kalana Kariyawasam
                        </p>
                        <p className="text-sm text-gray-500">
                            kalana@gov.lk
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    );
}
