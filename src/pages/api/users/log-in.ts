import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import db from "@/libs/server/db";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { email } = req.body;
    const user = await db.user.findUnique({
        where: {
            email
        }
    });
    if (!user) {
        return res.status(404).json({ ok: false, text: "계정이 존재 하지 않습니다." });
    }
    req.session.user = {
        id: user.id
    };
    await req.session.save();
    return res.status(200).json({ ok: true, text: "로그인 되었습니다." });
}

export default withApiSession(
    withHandler({ methods: ["POST"], handler, isPrivate: false })
);
