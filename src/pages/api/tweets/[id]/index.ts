import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import db from '@/libs/server/db';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const { query: { id }, session: { user } } = req;
    const tweet = await db.tweet.findUnique({
        where: {
            id: +id!,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    })
    const isLiked = Boolean(
        await db.like.findFirst({
            where: {
                tweetId: tweet?.id,
                userId: user?.id,
            },
            select: {
                id: true,
            }
        })
    )
    res.json({
        ok: true,
        tweet,
        isLiked,
    })
}
export default withApiSession(
    withHandler({
        methods: ['GET'],
        handler,
    })
);
