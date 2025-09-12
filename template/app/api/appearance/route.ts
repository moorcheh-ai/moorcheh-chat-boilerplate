import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  try {
    // Read the current appearance.json file
    const configPath = join(process.cwd(), 'config', 'appearance.json');
    const configData = readFileSync(configPath, 'utf8');
    const config = JSON.parse(configData);

    return NextResponse.json(config);
  } catch (error) {
    console.error('Error reading appearance configuration:', error);
    return NextResponse.json(
      { error: 'Failed to read appearance configuration' },
      { status: 500 }
    );
  }
}
