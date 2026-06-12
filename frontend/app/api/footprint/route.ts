import { NextResponse } from 'next/server';
import { getMongoClient } from '@/utils/mongodb';
import { sanitizeInput } from '@/utils/security';

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { username, footprintData, score } = body;

    // Presence check
    if (!username || !footprintData) {
      return NextResponse.json({ error: 'Username and footprintData are required' }, { status: 400 });
    }

    // Type and schema structure validation
    if (
      typeof username !== 'string' ||
      typeof score !== 'number' ||
      typeof footprintData !== 'object' ||
      typeof footprintData.transport !== 'number' ||
      typeof footprintData.energy !== 'number' ||
      typeof footprintData.diet !== 'number' ||
      typeof footprintData.habits !== 'number'
    ) {
      return NextResponse.json({ error: 'Invalid parameter data types or schema configuration' }, { status: 400 });
    }

    const cleanUsername = sanitizeInput(username.trim());
    if (cleanUsername.length === 0) {
      return NextResponse.json({ error: 'Username cannot be empty' }, { status: 400 });
    }

    // Validate boundaries for emissions variables
    const { transport, energy, diet, habits } = footprintData;
    if (transport < 0 || energy < 0 || diet < 0 || habits < 0 || score < 0 || score > 100) {
      return NextResponse.json({ error: 'Data boundary validation failed' }, { status: 400 });
    }

    const client = await getMongoClient();
    const db = client.db('terrasync');
    const users = db.collection('users');

    const result = await users.updateOne(
      { username: cleanUsername },
      {
        $set: {
          footprintData: {
            transport,
            energy,
            diet,
            habits
          },
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
    return NextResponse.json({ error: 'Database Connection Error' }, { status: 500 });
  }
}

