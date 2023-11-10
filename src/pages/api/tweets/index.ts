import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/db";
import withHandler, { ResponseType } from "@/libs/server/withHandler";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    if (req.method === "GET") {
        const newTweet = await db.tweet.findMany({
            include: {
                _count: {
                    select: {
                        likes: true,
                    }
                }
            }
        });
        res.json({
            ok: true,
            newTweet,
        })
    }
    if (req.method === "POST") {
        const { body: { title, text }, session: { user } } = req;
        console.log(req)
        const newTweet = await db.tweet.create({
            data: {
                title,
                text,
                user: {
                    connect: {
                        id: user?.id,
                    }
                }
            }
        })
        res.json({
            ok: true,
            newTweet,
        })
    }
}

export default withApiSession(
    withHandler({ methods: ["GET", "POST"], handler, isPrivate: true })
);
