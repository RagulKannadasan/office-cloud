import { SignJWT, jwtVerify } from 'jose';
import crypto from 'crypto';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret');

export async function signToken(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}

export function hashOtp(email: string, otp: string) {
  const hmac = crypto.createHmac('sha256', process.env.JWT_SECRET || 'fallback');
  hmac.update(`${email}:${otp}`);
  return hmac.digest('hex');
}
