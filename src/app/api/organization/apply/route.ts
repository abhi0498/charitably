import * as nodemailer from "nodemailer";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, description, mission, adminEmail, adminName, taxId } =
    await req.json();

  //find if application already exists
  const existingApplication = await prisma.organizationApplication.findFirst({
    where: {
      adminEmail,
    },
  });

  if (existingApplication) {
    return NextResponse.json(
      { message: "Application already exists" },
      { status: 400 }
    );
  }

  // find if organization already exists
  const existingOrganization = await prisma.organization.findFirst({
    where: {
      users: {
        some: {
          email: adminEmail,
        },
      },
    },
  });

  if (existingOrganization) {
    //send error message to user with status 400
    return NextResponse.json(
      { message: "Organization already exists" },
      { status: 400 }
    );
  }

  //send email to info@charitably.com through nodemailer
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST!,
    port: parseInt(process.env.EMAIL_SERVER_PORT!),
    auth: {
      user: process.env.EMAIL_SERVER_USER!,
      pass: process.env.EMAIL_SERVER_PASSWORD!,
    },
  });

  const mailOptions = {
    from: "info@charitably.in",
    to: "info@charitably.in",
    subject: "New Organization Application",
    text: `Name: ${name}\nDescription: ${description}\nMission: ${mission}\nAdmin Email: ${adminEmail}\nAdmin Name: ${adminName}`,
  };

  await transporter.sendMail(mailOptions);

  await prisma.organizationApplication.create({
    data: {
      name,
      description,
      mission,
      adminEmail,
      adminName,
      taxId,
    },
  });

  return NextResponse.json({ message: "Application submitted" });
}
