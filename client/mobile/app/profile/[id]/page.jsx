import MenuItem from '@/app/components/profile/menuItem';
import Link from 'next/link';

export default function Profile() {
    // Define the array of menu items
    const menuItems = [
        { icon: '🎫', text: 'View CeylonCard', route: '/ceylonCard/1' },
        { icon: '✏️', text: 'Edit profile', route: '/edit-profile' },
        { icon: '❤️', text: 'Update interests', route: '/update-interests' },
        { icon: 'ℹ️', text: 'About this app', route: '/about' },
        { icon: '🚪', text: 'Log out', route: '/logout', isLast: true },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Profile header */}
            <div className="relative">
                <img
                    src="/images/headerImg.png" // Make sure this path points to your desired header image
                    alt="Background"
                    className="w-[360px] h-[200px] object-cover"
                />
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                    <img
                        src="/images/headerImg.png" // Make sure this path points to your desired profile image
                        alt="Profile"
                        className="w-[140px] h-[140px] rounded-full border-4 border-white object-cover"
                    />
                </div>
            </div>

            {/* Profile info */}
            <div className="mt-20 text-center">
                <h1 className="text-xl font-semibold text-gray-900">
                    Lasindu Ranasinghe
                </h1>
                <div className="relative flex items-center justify-center mt-1">
                    <div className="absolute w-[100px] h-[36px] bg-gray-200 rounded-[12px] mt-4"></div>{' '}
                    {/* Shadow behind */}
                    <img
                        src="/images/usa.webp" // Make sure this path points to the Portugal flag image
                        alt="USA flag"
                        className="relative w-5 h-5 mr-2 mt-5"
                    />
                    <span className="relative text-gray-600 text-xs mt-5">
                        USA
                    </span>
                </div>
            </div>

            {/* Menu items */}
            <div className="mt-8 px-4">
                {menuItems.map((item, index) => (
                    <Link key={index} href={item.route} passHref>
                        <div>
                            <MenuItem
                                icon={item.icon}
                                text={item.text}
                                isLast={item.isLast}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
