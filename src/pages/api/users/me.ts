import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/db";
import withHandler, { ResponseType } from "@/libs/server/withHandler";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const {
        session: { user }
    } = req;
    if (!user?.id) {
        return res.status(401).end();
    }
    const dbUser = await db.user.findUnique({
        where: {
            id: user.id
        }
    });
    if (!dbUser) {
        return res.status(404).json({ ok: false, text: "계정이 존재 하지 않습니다." });
    }
    return res.status(201).json({ ok: true, dbUser });
}

export default withApiSession(
    withHandler({ methods: ["GET"], handler, isPrivate: true })
);
