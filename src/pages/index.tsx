import { useEffect } from 'react';
import Item from '@/components/item';
import Layout from '@/components/layout';
import useSWR from 'swr';
import { Tweet } from '@prisma/client';
import useUser from '@/libs/client/useUser';
import { useRouter } from 'next/router';

interface TweetsResponse {
    ok: boolean;
    newTweet: Tweet[];
}

export default function Home() {
    const { user, isLoading } = useUser();
    const router = useRouter();
    const { data, error } = useSWR<TweetsResponse>('/api/tweets');

    return (
        <Layout title="홈" hasTabBar userName={user?.name}>
            {data?.newTweet.length === 0 ? (
                <div className="px-5 py-5 text-sm">
                    아직 게시글이 없습니다😢.
                    <br /> 새로 작성해주세요✏️.
                </div>
            ) : (
                <div className="flex flex-col space-y-5 px-5 py-5">
                    {data?.newTweet?.map((tweet) => (
                        <Item
                            id={tweet.id}
                            key={tweet.id}
                            title={tweet.title}
                            text={tweet.text}
                            hearts={tweet._count.likes}
                        />
                    ))}
                </div>
            )}
        </Layout>
    );
}
