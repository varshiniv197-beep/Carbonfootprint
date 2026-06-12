import { NextResponse } from 'next/server';
import { getMongoClient } from '@/utils/mongodb';
import { sanitizeInput, isValidPasswordHash } from '@/utils/security';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Check presence
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }

    // Shield against NoSQL Injection / Type Confusion
    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Invalid parameter data types' }, { status: 400 });
    }

    // Verify cryptographic payload authenticity
    if (!isValidPasswordHash(password)) {
      return NextResponse.json({ error: 'Malformed authentication credentials' }, { status: 400 });
    }

    const cleanUsername = sanitizeInput(username.trim());
    if (cleanUsername.length === 0) {
      return NextResponse.json({ error: 'Username cannot be empty' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('terrasync');
    const users = db.collection('users');

    const user = await users.findOne({ username: cleanUsername });
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

