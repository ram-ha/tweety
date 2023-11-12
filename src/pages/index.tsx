import Item from '@/components/item';
import Layout from '@/components/layout';
import useSWR from 'swr';
import { Tweet } from '@prisma/client';

interface Tweets extends Tweet {
    _count: {
        likes: number;
    };
}
interface TweetsResponse {
    ok: boolean;
    newTweet: Tweets[];
}

export default function Home() {
    const { data: user } = useSWR('/api/users/me');
    const { data } = useSWR<TweetsResponse>('/api/tweets');

    return (
        <Layout title="홈" hasTabBar userName={user?.dbUser?.name}>
            {data ? (
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
            ) : (
                <div className="px-5 py-5 text-sm">
                    아직 게시글이 없습니다😢.
                    <br /> 새로 작성해주세요✏️.
                </div>
            )}
        </Layout>
    );
}
