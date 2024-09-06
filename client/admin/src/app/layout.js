import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/lib/AuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Sapphire Visa Console',
    description: 'Government Adminstrative Portal for Sapphire',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
            <AuthProvider>
        {children}
        </AuthProvider></body>
        </html>
    );
}
