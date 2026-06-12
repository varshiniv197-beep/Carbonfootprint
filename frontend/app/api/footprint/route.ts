import { NextResponse } from 'next/server';
import clientPromise from '@/utils/mongodb';

export async function PUT(request: Request) {
  try {
    const { username, footprintData, score } = await request.json();

    if (!username || !footprintData) {
      return NextResponse.json({ error: 'Username and footprintData are required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('terrasync');
    const users = db.collection('users');

    const result = await users.updateOne(
      { username },
      {
        $set: {
          footprintData,
          score,
          hasCalculated: true
        }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Footprint updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Footprint update API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
