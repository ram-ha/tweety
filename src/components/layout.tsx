import React from 'react';
import Link from 'next/link';
import { cls } from '@/libs/client/utils';
import { useRouter } from 'next/router';
import FloatingButton from './floating-button';
import { useSWRConfig } from 'swr';

interface LayoutProps {
    title?: string;
    canGoBack?: boolean;
    hasTabBar?: boolean;
    children: React.ReactNode;
    userName?: string;
}

export default function Layout({ title, canGoBack, hasTabBar, children, userName }: LayoutProps) {
    const router = useRouter();
    const { mutate } = useSWRConfig();
    const onClick = () => {
        router.back();
    };

    const onLogout = () => {
        mutate('/api/users/me', (prev: any) => ({ ok: !prev.ok }), false);
    };
    return (
        <div className="mx-auto max-w-xl w-full h-full min-h-screen bg-pink-50">
            <div className="bg-black w-full h-12 max-w-xl justify-center text-lg px-10 font-medium  fixed text-white border-b top-0  flex items-center">
                {canGoBack ? (
                    <button onClick={onClick} className="absolute left-4">
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
                {userName ? (
                    <span className="absolute right-5 border-b-2 border-pink-100 px-2 text-pink-400">{userName}</span>
                ) : null}
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
                    <button
                        onClick={onLogout}
                        className={cls(
                            'flex flex-col items-center space-y-2 ',
                            router.pathname === '/profile' ? 'text-pink-500' : 'hover:text-gray-500 transition-colors'
                        )}
                    >
                        <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                            />
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                            />
                        </svg>
                    </button>
                </nav>
            ) : null}
        </div>
    );
}
