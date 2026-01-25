// app/api/auth/signup/route.ts

// 🔥 CRITICAL: Force Node.js runtime (MongoDB / Mongoose need this)
export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { signupSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';

export async function POST(req: NextRequest) {
  try {
    // Parse body
    const body = await req.json();

    // Validate input
    const validatedData = signupSchema.parse(body);

    // Connect DB
    await dbConnect();

    // Check existing user
    const existingUser = await User.findOne({
      email: validatedData.email.toLowerCase(),
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create user
    const user = await User.create({
      email: validatedData.email.toLowerCase(),
      password: validatedData.password, // ⚠️ hash if not already
      name: validatedData.name,
      profilePhoto: validatedData.profilePhoto || undefined,
      primaryLanguageToLearn: validatedData.primaryLanguageToLearn,
      secondaryLanguageToLearn: validatedData.secondaryLanguageToLearn,
      languagesKnow: validatedData.languagesKnow,
      primaryRole: validatedData.primaryRole,
      state: validatedData.state,
      country: validatedData.country,
      emailUpdates: validatedData.emailUpdates,
      provider: 'email',
    });

    // Remove password before sending
    const userResponse = user.toObject();
    delete userResponse.password;

    return NextResponse.json(
      {
        message: 'Account created successfully',
        user: {
          id: userResponse._id,
          email: userResponse.email,
          name: userResponse.name,
          primaryRole: userResponse.primaryRole,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/* ---------------------------------------------------------------
   OPTIONAL: Email existence check (frontend validation)
----------------------------------------------------------------*/
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email parameter required' },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    return NextResponse.json({
      exists: Boolean(existingUser),
    });
  } catch (error) {
    console.error('Email check error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
