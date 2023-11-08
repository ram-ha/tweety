import Link from 'next/link';
import React from 'react';

interface FloatingButton {
    children: React.ReactNode;
    href: string;
}

export default function FloatingButton({ children, href }: FloatingButton) {
    return (
        <Link
            href={href}
            className="fixed hover:bg-pink-600 border-0 aspect-square border-transparent transition-colors cursor-pointer  bottom-10 right-105 shadow-xl bg-pink-500 rounded-full w-16 flex items-center justify-center text-white"
        >
            {children}
        </Link>
    );
}
