import { NextApiRequest, NextApiResponse } from 'next';
import withHandler, { ResponseType } from '@/libs/server/withHandler';
import db from '@/libs/server/db';
import { withApiSession } from '@/libs/server/withSession';

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const {
        query: { id },
        session: { user },
    } = req;
    const alreadyExists = await db.like.findFirst({
        where: {
            tweetId: +id!,
            userId: user?.id,
        },
    });
    if (alreadyExists) {
        await db.like.delete({
            where: {
                id: alreadyExists.id,
            },
        });
    } else {
        await db.like.create({
            data: {
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                tweet: {
                    connect: {
                        id: +id!,
                    },
                },
            },
        });
    }

    res.json({
        ok: true,
    })
}
export default withApiSession(
    withHandler({
        method: 'POST',
        handler,
    })
);
