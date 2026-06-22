import { NextResponse } from 'next/server';
import { sendEmail } from '@/utils/mailer';
import { hashOtp } from '@/utils/auth';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digits

    const result = await sendEmail({
      to: email,
      subject: 'Your Login Code',
      text: `Your Office Cloud login code is: ${otp}`,
      html: `<h2>Office Cloud Login</h2><p>Your 6-digit login code is: <strong>${otp}</strong></p>`,
    });

    if (!result.success) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    const hash = hashOtp(email, otp);
    const response = NextResponse.json({ success: true });
    response.cookies.set('otp_hash', hash, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 300, // 5 minutes
      path: '/',
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
