// app/api/health-tips/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const healthTips = [
    "Drink at least 8 glasses of water a day.",
    "Get 7-8 hours of quality sleep each night.",
    "Exercise for at least 30 minutes daily.",
    "Eat a balanced diet rich in fruits and vegetables.",
    "Take short breaks to stretch during long work sessions."
  ];

  return NextResponse.json({ tips: healthTips });
}
