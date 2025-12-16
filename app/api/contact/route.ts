import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { checkBotId } from 'botid/server';

export async function POST(req: NextRequest) {
  // Server-side BotID check
  const verification = await checkBotId();
  if (verification.isBot) {
    return NextResponse.json(
      { error: 'Bot detected. Access denied.' },
      { status: 403 }
    );
  }

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: 'Please fill in all fields.' },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    logger: true,
    debug: true,
  });

  try {
    await transporter.sendMail({
      from: `"NuView Website" <${process.env.CONTACT_EMAIL}>`,
      replyTo: `${name} <${email}>`,
      to: process.env.CONTACT_EMAIL,
      subject: `New Contact Form Submission from ${name}`,
      text: `${message}\n\nFrom: ${name} (${email})`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color:#111;">
          <h2 style="color:#394FA2;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <div style="padding:10px; border-left:3px solid #394FA2; background:#f9f9f9;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <hr style="margin:20px 0;" />
          <p>This message was submitted via the NuView contact form.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Email error:', err);
    return NextResponse.json(
      { error: 'Failed to send message.' },
      { status: 500 }
    );
  }
}
