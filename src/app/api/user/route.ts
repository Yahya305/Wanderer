import prisma from '@lib/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
}