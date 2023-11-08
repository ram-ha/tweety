import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
    ok: boolean;
    [key: string]: any;
}

interface ConfigType {
    method: "GET" | "POST" | "DELETE";
    handler: NextApiHandler;
    isPrivate?: boolean;
}

export default function withHandler({
    method,
    handler,
    isPrivate,
}: ConfigType) {
    return async function (req: NextApiRequest, res: NextApiResponse) {
        if (req.method !== method) return res.status(405).end();
        if (isPrivate && !req.session.user)
            return res.status(404).json({ ok: false, error: "잘못된 접근입니다." });
        try {
            await handler(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
}