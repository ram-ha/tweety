import type { NextPage } from 'next';
import Layout from '../../components/layout';
import { useRouter } from 'next/router';
import useSWR from 'node_modules/swr/core/dist';
import { Tweet } from '@prisma/client';
import { cls } from '@/libs/client/utils';
import useMutation from '@/libs/client/useMutation';

interface ItemDetailResponse {
    ok: boolean;
    tweet: Tweet[];
    isLiked: boolean;
}

const ItemDetail: NextPage = () => {
    const router = useRouter();
    const { data, mutate } = useSWR<ItemDetailResponse>(router.query.id ? `/api/tweets/${router.query.id}` : null);
    const [toggleFav] = useMutation(`/api/tweets/${router.query.id}/likes`);
    const onFavClick = () => {
        if (!data) return;
        mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
        toggleFav({});
    };
    return (
        <Layout canGoBack>
            <div className="px-4  py-2">
                <div className="flex justify-between border-b border-pink-400">
                    <div className="flex cursor-pointer py-3 items-center space-x-3">
                        <div className="w-3 h-14 bg-pink-400 rounded-xl" />
                        <div>
                            <p className="text-md font-medium text-gray-700">{data?.tweet?.user?.name}</p>
                            <p className="text-xs font-medium text-gray-500">{data?.tweet?.createdAt.substr(0, 10)}</p>
                        </div>
                    </div>
                    <button
                        onClick={onFavClick}
                        className={cls(
                            'p-3 rounded-md flex items-center justify-center hover:outline-dotted',
                            data?.isLiked ? 'text-red-500  hover:text-red-600' : 'text-gray-400  hover:text-pink-300'
                        )}
                    >
                        <svg
                            className="h-6 w-6 "
                            xmlns="http://www.w3.org/2000/svg"
                            fill={data?.isLiked ? 'currentColor' : 'none'}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                    </button>
                </div>
                <p className=" my-3 text-gray-700 bg-white rounded-lg p-2">{data?.tweet?.text}</p>
            </div>
        </Layout>
    );
};

export default ItemDetail;
