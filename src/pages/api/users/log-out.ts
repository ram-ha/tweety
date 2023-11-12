import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import withHandler, { ResponseType } from "@/libs/server/withHandler";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    req.session.destroy();
    return res.status(200).json({ ok: true, text: "로그아웃 되었습니다." });
}

export default withApiSession(
    withHandler({ methods: ["POST"], handler, isPrivate: false })
);
