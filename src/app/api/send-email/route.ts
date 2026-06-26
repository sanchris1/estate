import PropertyInquiryEmail from "@/components/emails/InquiryEmail";
import { resend } from "@/lib/resend";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      senderPhone,
      senderMessage,
      senderName,
      senderEmail,
      price,
      propertyTitle,
      ownerName,
      ownerEmail,
    } = body;

    //   send the email

    resend.emails.send({
      from: process.env.EMAIL_FROM!,
      to: "samchris12737@gmail.com",
      subject: `Property inquiry from ${senderName}`,
      react: PropertyInquiryEmail({
        senderPhone,
        senderMessage,
        senderName,
        senderEmail,
        price,
        propertyTitle,
        ownerName,
        ownerEmail,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error sharing the email" },
      { status: 500 },
    );
  }
}
