import { useEffect } from 'react';
import FloatingButton from '../components/floating-button';
import Item from '../components/item';
import Layout from '../components/layout';
import { useRouter } from 'next/router';
import useSWR from 'swr';

export default function Home() {
    const router = useRouter();
    const { data, error } = useSWR('/api/users/me');
    useEffect(() => {
        if (error) {
            router.replace('/create-account');
        }
    }, [router, error]);
    return (
        <Layout title="홈" hasTabBar>
            <div className="flex flex-col space-y-5 divide-y">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
                    <Item id={i} key={i} title="iPhone 14" price={99} hearts={1} />
                ))}
                <FloatingButton href="/items/upload">
                    <svg
                        className="h-6 w-6"
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
            </div>
        </Layout>
    );
}
