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

    const user = await users.findOne({ username });
    if (!user || user.passwordHash !== password) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      username: user.username,
      hasCalculated: user.hasCalculated,
      score: user.score,
      footprintData: user.footprintData
    }, { status: 200 });
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Database Connection Error' }, { status: 500 });
  }
}
