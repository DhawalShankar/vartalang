// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { updateProfileSchema } from '@/lib/validations/auth';
import { ZodError } from 'zod';

// GET current user profile
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const user = await User.findById(session.user.id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT update user profile
export async function PUT(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const body = await req.json();
    
    // Validate input
    const validatedData = updateProfileSchema.parse(body);
    
    await dbConnect();
    
    const user = await User.findById(session.user.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Update fields
    if (validatedData.name) user.name = validatedData.name;
    if (validatedData.bio !== undefined) user.bio = validatedData.bio;
    if (validatedData.age) user.age = validatedData.age;
    if (validatedData.city !== undefined) user.city = validatedData.city;
    if (validatedData.interests) user.interests = validatedData.interests;
    if (validatedData.profilePhoto) user.profilePhoto = validatedData.profilePhoto;
    if (validatedData.emailUpdates !== undefined) {
      user.emailUpdates = validatedData.emailUpdates;
    }
    
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.password;
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: userResponse,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.issues.map(e => ({
            field: e.path.join('.'),
            message: e.message,
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

// app/api/profile/[userId]/route.ts
export async function GET_USER_PROFILE(
  req: NextRequest,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    await dbConnect();
    
    const user = await User.findById(params.userId).select(
      '-password -emailUpdates'
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Only show full profile if users are connected (check this later)
    // For now, show public fields only
    const publicProfile = {
      _id: user._id,
      name: user.name,
      profilePhoto: user.profilePhoto,
      primaryLanguageToLearn: user.primaryLanguageToLearn,
      secondaryLanguageToLearn: user.secondaryLanguageToLearn,
      languagesKnow: user.languagesKnow,
      primaryRole: user.primaryRole,
      state: user.state,
      country: user.country,
      bio: user.bio,
      interests: user.interests,
      createdAt: user.createdAt,
    };
    
    return NextResponse.json({ user: publicProfile });
  } catch (error) {
    console.error('Get user profile error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}