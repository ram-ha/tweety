import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import db from "@/libs/server/db";

async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
) {
    const { name, email } = req.body;
    const user = await db.user.findUnique({
        where: {
            email
        }
    });
    if (user) {
        return res.status(400).json({ ok: false, text: "이미 존재하는 이메일 입니다. 다른 이메일을 사용해주세요." });
    }
    await db.user.create({
        data: {
            name,
            email
        }
    });
    return res.status(201).json({ ok: true, text: "회원가입 완료! 로그인 해주세요." });
}

export default withHandler({ method: "POST", handler, isPrivate: false });