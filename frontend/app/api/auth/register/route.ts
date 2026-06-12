import { NextResponse } from 'next/server';
import { getMongoClient } from '@/utils/mongodb';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('terrasync');
    const users = db.collection('users');

    const existingUser = await users.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    await users.insertOne({
      username,
      passwordHash: password,
      hasCalculated: false,
      score: 0,
      footprintData: { transport: 0, energy: 0, diet: 0, habits: 0 }
    });

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    console.error('Registration API error:', error);
    return NextResponse.json({ error: 'Database Connection Error' }, { status: 500 });
  }
}
