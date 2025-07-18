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
          throw new Error('Failed to fetch wisdom');
        }
        
        const data = await response.json();
        if (data.success && data.wisdom) {
          setWisdom(`"${data.wisdom.saying}" — ${data.wisdom.religion} wisdom`);
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Failed to fetch daily wisdom:', error);
        setError('Could not load daily wisdom');
        // Enhanced fallback with motivational content
        const fallbackWisdoms = [
          "The journey of a thousand miles begins with a single step — Ancient wisdom",
          "In the midst of winter, I found there was, within me, an invincible summer — Human spirit",
          "What lies behind us and what lies before us are tiny matters compared to what lies within us — Universal truth",
          "The only way to do great work is to love what you do — Life philosophy",
          "Be the change you wish to see in the world — Transformative wisdom"
        ];
        const randomIndex = Math.floor(Math.random() * fallbackWisdoms.length);
        setWisdom(fallbackWisdoms[randomIndex] ?? fallbackWisdoms[0] ?? "Wisdom comes to those who seek it");
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
      <p className="mb-6 max-w-[600px] text-center text-3xl font-bold md:mb-12 text-white">
        <span className="opacity-75">Wisdom comes to those who seek it...</span>
      </p>
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