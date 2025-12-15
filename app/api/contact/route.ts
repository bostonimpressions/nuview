import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Please fill in all fields.' }, { status: 400 });
  }

  // Configure SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"NuView Website" <${process.env.CONTACT_EMAIL}>`, // use your verified email
      replyTo: `${name} <${email}>`, // so you can reply to the user
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
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
