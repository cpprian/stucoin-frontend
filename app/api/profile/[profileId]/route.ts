import { NextResponse } from "next/server";

import { db } from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId;
  try {
    const user = await db.user.findFirst({
      where: { id }
    });

    console.log("taki sexi user ", user);
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}