import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usersTable } from "@/lib/db/userschema";
import { eq } from "drizzle-orm/expressions";

export async function GET() {
  const users = await db.select().from(usersTable);
  return NextResponse.json(users);
}
