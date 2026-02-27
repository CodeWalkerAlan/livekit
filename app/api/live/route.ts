import { AccessToken } from "livekit-server-sdk";
import type { NextApiRequest, NextApiResponse } from "next";

function getString(param: string | string[] | undefined) {
  return typeof param === "string" ? param : undefined;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const identity = getString(req.query.identity);
  const room = getString(req.query.room);

  if (!identity || !room) {
    return res.status(400).json({ error: "missing params" });
  }

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
    { identity }
  );

  at.addGrant({
    roomJoin: true,
    room,
    canPublish: identity == "host",
    canSubscribe: true
  })

  res.json({token: at.toJwt()})
}