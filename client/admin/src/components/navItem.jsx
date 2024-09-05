import Link from 'next/link';

export default function NavItem({ text, route }) {
    return (
        <li>
            <Link href={route}>
                <div className="flex items-center p-2 hover:bg-gray-100 rounded">
                    <span className="mr-2"></span>
                    <span>{text}</span>
                </div>
            </Link>
        </li>
    );
}