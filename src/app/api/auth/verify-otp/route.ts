import { NextResponse } from 'next/server';
import { hashOtp, signToken } from '@/utils/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();
    const cookieHeader = request.headers.get('cookie') || '';
    const hashMatch = cookieHeader.match(/otp_hash=([^;]+)/);
    const hashCookie = hashMatch ? hashMatch[1] : null;

    if (!email || !otp || !hashCookie) {
      return NextResponse.json({ error: 'Invalid request or OTP expired' }, { status: 400 });
    }

    const expectedHash = hashOtp(email, otp);
    if (expectedHash !== hashCookie) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 401 });
    }

    // Sync with Database
    let dbUser = await prisma.user.findUnique({ where: { email } });
    
    if (!dbUser) {
      // For initial setup, check env
      let defaultRole = 'employee';
      if (email === process.env.CEO_EMAIL || email.includes('ceo')) defaultRole = 'ceo';
      else if (email === process.env.MANAGER_EMAIL || email.includes('manager')) defaultRole = 'manager';
      else if (email.includes('tl')) defaultRole = 'tl';
      
      dbUser = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0],
          role: defaultRole
        }
      });
    }

    const token = await signToken({ email: dbUser.email, role: dbUser.role, id: dbUser.id });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });
    // clear the OTP hash
    response.cookies.delete('otp_hash');

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
