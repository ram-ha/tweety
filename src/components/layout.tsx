import React from 'react';
import Link from 'next/link';
import { cls } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import FloatingButton from './floating-button';

interface LayoutProps {
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode;
}

export default function Layout({ title, canGoBack, hasTabBar, children }: LayoutProps) {
    const router = useRouter();
    const onClick = () => {
        router.back();
    };
    return (
        <div className="mx-auto max-w-xl w-full h-screen bg-pink-50">
            <div className="bg-black w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center">
                {canGoBack ? (
                    <button onClick={onClick} className="absolute left-4 text-white">
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            ></path>
                        </svg>
                    </button>
                ) : null}
                {title ? <span className={cls(canGoBack ? 'mx-auto' : '', 'text-white')}>{title}</span> : null}
            </div>
            <div className={cls('pt-12', hasTabBar ? 'pb-24' : '')}>{children}</div>
            {hasTabBar ? (
                <nav className="bg-black max-w-xl text-gray-700 border-t rounded-t-3xl fixed bottom-0 w-full px-28 pb-7 pt-5 flex justify-around text-xs">
                    <Link
                        href="/"
                        className={cls(
                            'flex flex-col items-center space-y-2 ',
                            router.pathname === '/' ? 'text-pink-500' : 'hover:text-gray-500 transition-colors'
                        )}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            ></path>
                        </svg>
                    </Link>
                    <FloatingButton href="/tweet/upload">
                        <svg
                            className="h-7 w-7"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>
                    </FloatingButton>
                    <Link
                        href="/profile"
                        className={cls(
                            'flex flex-col items-center space-y-2 ',
                            router.pathname === '/profile' ? 'text-pink-500' : 'hover:text-gray-500 transition-colors'
                        )}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            ></path>
                        </svg>
                    </Link>
                </nav>
            ) : null}
        </div>
    );
}
