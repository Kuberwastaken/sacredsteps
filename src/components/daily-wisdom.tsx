'use client';
import {useEffect, useState} from 'react';

export default function DailyWisdom() {
  const [wisdom, setWisdom] = useState<string>('The free, fun, and effective way to learn about religions!');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchWisdom = async () => {
      try {
        const response = await fetch('/api/daily-wisdom', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        });
        
        if (!response.ok) {
          if (response.status === 503) {
            console.warn('AI service temporarily overloaded');
          } else {
            console.warn(`Daily wisdom API returned ${response.status}: ${response.statusText}`);
          }
          throw new Error('Failed to fetch wisdom');
        }
        
        const data = await response.json();
        if (data.success && data.wisdom) {
          setWisdom(`"${data.wisdom.saying}"`);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (error) {
        console.log('Daily wisdom generation failed:', error);
        setError('Unable to generate daily wisdom. Please try again later.');
        setWisdom(''); // Clear any previous wisdom
      } finally {
        setLoading(false);
      }
    };

    fetchWisdom();
  }, []);
  
  if (loading) {
    return (
      <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12 text-white">
        <span className="animate-pulse">Discovering today's wisdom...</span>
      </p>
    );
  }

  if (error) {
    return (
      <div className="mb-6 max-w-[600px] text-center md:mb-12">
        <p className="text-3xl font-bold text-white mb-2 opacity-75">
          AI wisdom service unavailable
        </p>
        <p className="text-sm text-white/75 italic">
          Please try again later
        </p>
      </div>
    );
  }
  
  return (
    <div className="mb-6 max-w-[600px] text-center md:mb-12">
      <p className="text-3xl font-bold text-white mb-2">
        {wisdom}
      </p>
      <p className="text-sm text-white/75 italic">
        Daily wisdom refreshes each visit
      </p>
    </div>
  );
} 