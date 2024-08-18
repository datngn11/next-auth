import { UserRole } from "@prisma/client";
import { currentUser } from "lib/user";
import { NextResponse } from "next/server";

export async function GET() {
  const { userRole } = await currentUser();

  if (userRole === UserRole.ADMIN) {
    return new NextResponse(null, {
      status: 200,
      statusText: "OK",
    });
  }

  return new NextResponse(null, { status: 403 });
}
