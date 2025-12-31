import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/user";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await connectDB();

    // 🔐 Get token
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 🔐 Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as { id: string };

    const userId = decoded.id;

    // 📦 Get update data
    const {
      nativeLang,
      targetLang,
      purpose,
      bio
    } = await req.json();

    // ❗ Basic validation
    if (!nativeLang || !targetLang || !purpose) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // 🔄 Update user
    const user = await User.findByIdAndUpdate(
      userId,
      {
        nativeLang,
        targetLang,
        purpose,
        bio
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Safe response
    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        nativeLang: user.nativeLang,
        targetLang: user.targetLang,
        purpose: user.purpose,
        bio: user.bio,
        premium: user.premium
      }
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
