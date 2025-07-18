'use client';
import {useEffect, useState} from 'react';
import {generateDailyWisdom} from '~/ai/flows/generate-daily-wisdom';

export default function DailyWisdom() {
  const [wisdom, setWisdom] = useState<string>('The free, fun, and effective way to learn about world religions!');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    (async () => {
      try {
        const {saying, religion} = await generateDailyWisdom({});
        setWisdom(`"${saying}" — ${religion}`);
      } catch (error) {
        console.error('Failed to generate daily wisdom:', error);
        // Keep the default text if AI fails
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  
  return (
    <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12 text-white">
      {loading ? (
        <span className="animate-pulse">Loading wisdom...</span>
      ) : (
        wisdom
      )}
    </p>
  );
} 