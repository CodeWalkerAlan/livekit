import { AccessToken } from "livekit-server-sdk";

export async function GET() {

  const at = new AccessToken(
    process.env.LIVEKIT_API_KEY,
    process.env.LIVEKIT_API_SECRET,
    {
      identity: "viewer-" + Math.random(),
    }
  );

  at.addGrant({
    roomJoin: true,
    room: "padre-live",
    canSubscribe: true,
  });

  const token = await at.toJwt();

  return Response.json({ token });
}