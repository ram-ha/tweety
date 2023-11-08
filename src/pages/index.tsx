import { useEffect } from 'react';
import Item from '@/components/item';
import Layout from '@/components/layout';
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
            </div>
        </Layout>
    );
}
