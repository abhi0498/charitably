import { NextResponse } from "next/server";
import { generateUploadURL } from "@/lib/s3";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.organization?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const { filename } = await request.json();
    const key = `organizations/${session.user.organization.id}/${filename}`;
    const url = await generateUploadURL(key);

    return NextResponse.json({ url, key });
  } catch (error) {
    console.error("Upload error:", error);
    return new NextResponse("Error generating upload URL", { status: 500 });
  }
}
