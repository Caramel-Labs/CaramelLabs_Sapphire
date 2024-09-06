import Link from 'next/link';

export default function Navbar() {
    const navItems = [
        {
            name: 'Home',
            href: '/home',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path fill="gray" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
                </svg>
            ),
        },
        {
            name: 'Itinerary',
            href: '/itinerary',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="none"
                        stroke="gray"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 8a3 3 0 1 0 6 0M3 16.8V7.2c0-1.12 0-1.68.218-2.108c.192-.377.497-.682.874-.874C4.52 4 5.08 4 6.2 4h11.6c1.12 0 1.68 0 2.107.218c.377.192.683.497.875.874c.218.427.218.987.218 2.105v9.607c0 1.118 0 1.677-.218 2.104a2 2 0 0 1-.875.874c-.427.218-.986.218-2.104.218H6.197c-1.118 0-1.678 0-2.105-.218a2 2 0 0 1-.874-.874C3 18.48 3 17.92 3 16.8"
                    />
                </svg>
            ),
        },
        {
            name: '',
            href: '/chat',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="white"
                        d="m19 1l-1.26 2.75L15 5l2.74 1.26L19 9l1.25-2.74L23 5l-2.75-1.25M9 4L6.5 9.5L1 12l5.5 2.5L9 20l2.5-5.5L17 12l-5.5-2.5M19 15l-1.26 2.74L15 19l2.74 1.25L19 23l1.25-2.75L23 19l-2.75-1.26"
                    />
                </svg>
            ),
        },
        {
            name: 'E-Visa',
            href: '/visa',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="gray"
                        fill-rule="evenodd"
                        d="M4.172 3.172C3 4.343 3 6.229 3 10v4c0 3.771 0 5.657 1.172 6.828S7.229 22 11 22h2c3.771 0 5.657 0 6.828-1.172S21 17.771 21 14v-4c0-3.771 0-5.657-1.172-6.828S16.771 2 13 2h-2C7.229 2 5.343 2 4.172 3.172M8 9.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5zm0 4a.75.75 0 0 0 0 1.5h5a.75.75 0 0 0 0-1.5z"
                        clip-rule="evenodd"
                    />
                </svg>
            ),
        },
        {
            name: 'Profile',
            href: '/profile/66d1fba57c2ac1b30482e2b2',
            icon: (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <path
                        fill="gray"
                        fill-rule="evenodd"
                        d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                        clip-rule="evenodd"
                    />
                </svg>
            ),
        },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <div className="max-w-screen-xl mx-auto px-4 relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-8 w-20 h-20 bg-transparent rounded-full flex items-center justify-center">
                    <Link href={navItems[2].href}>
                        {' '}
                        {/* Middle button link */}
                        <div className="w-16 h-16 rounded-full bg-sapphire flex items-center justify-center text-white text-2xl shadow-lg">
                            {navItems[2].icon}
                        </div>
                    </Link>
                </div>
                <ul className="flex justify-between items-center">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className={`flex-1 text-center ${
                                index === 2 ? 'py-2' : ''
                            }`}
                        >
                            {index === 2 ? (
                                <div className="h-12"></div> // Placeholder to maintain navbar height
                            ) : (
                                <Link href={item.href}>
                                    <button className="w-full pt-2 pb-1 flex flex-col items-center justify-center text-gray-500 hover:text-teal-500 transition-colors duration-200">
                                        <div className="text-2xl mb-1">
                                            {item.icon}
                                        </div>
                                        <span className="text-xs">
                                            {item.name}
                                        </span>
                                    </button>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}
