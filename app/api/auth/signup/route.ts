import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/user";   // ✅ correct case
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // optional: check if user already exists
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
      premium: false
    });

    // ✅ SAFE RESPONSE (no password)
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          premium: user.premium
        }
      },
      { status: 201 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
