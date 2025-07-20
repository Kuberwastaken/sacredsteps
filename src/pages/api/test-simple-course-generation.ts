import type { NextApiRequest, NextApiResponse } from 'next';
import { generateComprehensiveCourse } from '../../ai/flows/generate-comprehensive-course';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('Testing course generation with simpler approach...');
    
    const result = await generateComprehensiveCourse({
      religion: 'Christianity',
      targetAudience: 'complete_beginner',
      focusAreas: ['Historical foundations', 'Core beliefs']
    });

    console.log('Course generation successful!');
    console.log('Generated course:', JSON.stringify(result, null, 2));
    
    res.status(200).json({
      success: true,
      course: result
    });
  } catch (error: any) {
    console.error('Course generation failed:', error);
    res.status(500).json({
      error: error.message,
      stack: error.stack
    });
  }
}
