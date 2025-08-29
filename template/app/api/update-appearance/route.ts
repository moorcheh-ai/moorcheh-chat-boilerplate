import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync } from 'fs';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const config = await request.json();

    // Validate the configuration structure
    if (!config.fonts || !config.theme || !config.branding) {
      return NextResponse.json(
        { error: 'Invalid configuration structure' },
        { status: 400 }
      );
    }

    // Write to appearance.json
    const configPath = join(process.cwd(), 'config', 'appearance.json');
    const configJson = JSON.stringify(config, null, 2);

    writeFileSync(configPath, configJson, 'utf8');

    return NextResponse.json({
      success: true,
      message: 'Appearance configuration updated successfully'
    });
  } catch (error) {
    console.error('Error updating appearance configuration:', error);
    return NextResponse.json(
      { error: 'Failed to update appearance configuration' },
      { status: 500 }
    );
  }
}
