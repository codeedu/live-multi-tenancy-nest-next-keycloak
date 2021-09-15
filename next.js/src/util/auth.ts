import jwt, { JwtPayload } from "jsonwebtoken";
import { KeycloakProfile, KeycloakTokenParsed } from "keycloak-js";
import { parseCookies } from "./cookies";

export const KEYCLOAK_CONFIG = {
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
};

export function isTokenExpired(token: string) {
  const payload = getPayload(token);

  const clockTimestamp = Math.floor(Date.now() / 1000);

  return clockTimestamp > payload.exp;
}

export function getPayload(token: string) {
  return JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString("utf8")
  );
}

export type Payload = KeycloakTokenParsed &
  KeycloakProfile;

export type Token = { token: string; payload: Payload };

type Request = { headers: { cookie?: any } };

export function validateAuth(req?: Request): Token | boolean {
  const cookies = parseCookies(req);
  if (!cookies.kcToken) {
    return false;
  }
  const token = Buffer.from(cookies.kcToken, "base64").toString("utf8");
  const payloadOrFalse = verifyToken(token, process.env.JWT_SECRET as string);
  return payloadOrFalse
    ? ({ token, payload: payloadOrFalse } as any)
    : payloadOrFalse;
}
//verificação completa
export function verifyToken(token: string, key: string): JwtPayload | false {
  try {
    return jwt.verify(token, key, { ignoreExpiration: false }) as JwtPayload;
  } catch (e) {
    console.error(e, token, key);
    return false;
  }
}


//header.payload.signature {}
