import { NextResponse } from 'next/server';
import { OAuth2Client } from 'google-auth-library';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/utils/auth';
import { generateEmployeeId } from '@/actions/user.actions';

const client = new OAuth2Client(
  process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

export async function POST(request: Request) {
  try {
    const { credential } = await request.json();

    if (!credential) {
      return NextResponse.json({ error: 'Missing credential' }, { status: 400 });
    }

    // Verify the Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    });
    
    const payload = ticket.getPayload();
    if (!payload || !payload.email) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const email = payload.email;
    const name = payload.name || email.split('@')[0];

    // Find or create user exactly like OTP flow
    let dbUser = await prisma.user.findUnique({ where: { email } });
    
    if (!dbUser) {
      // Sync defaults
      let defaultRole = 'employee';
      let defaultStatus = 'Pending';
      
      if (email === process.env.CEO_EMAIL || email.includes('ceo')) {
        defaultRole = 'ceo';
        defaultStatus = 'Active';
      } else if (email === process.env.MANAGER_EMAIL || email.includes('manager')) {
        defaultRole = 'manager';
        defaultStatus = 'Active';
      } else if (email.includes('tl')) {
        defaultRole = 'tl';
      }
      
      const empId = await generateEmployeeId();
      
      dbUser = await prisma.user.create({
        data: {
          email,
          name,
          role: defaultRole,
          status: defaultStatus,
          employeeId: empId
        }
      });
    }

    if (dbUser.status === 'Pending') {
      return NextResponse.json({ pending: true });
    }

    // Issue custom JWT for session exactly like OTP flow
    const token = await signToken({ email: dbUser.email, role: dbUser.role, id: dbUser.id });

    const response = NextResponse.json({ success: true });
    
    response.cookies.set('session_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Google Auth Error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}
