import type { NextPage } from "next";
import { useBoundStore } from "~/hooks/useBoundStore";
import { LessonTopBarHeart, LessonTopBarEmptyHeart } from "~/components/Svgs";
import { Button } from "~/components/ui/button";
import Link from "next/link";

const HeartsDemo: NextPage = () => {
  const hearts = useBoundStore((x) => x.hearts);
  const maxHearts = useBoundStore((x) => x.maxHearts);
  const loseHeart = useBoundStore((x) => x.loseHeart);
  const resetHearts = useBoundStore((x) => x.resetHearts);
  const addHeart = useBoundStore((x) => x.addHeart);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-glass p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold text-white mb-6">Hearts System Demo</h1>
        
        {/* Hearts Display */}
        <div className="flex justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((heart) => {
            if (heart <= hearts) {
              return <LessonTopBarHeart key={heart} className="w-8 h-8" />;
            }
            return <LessonTopBarEmptyHeart key={heart} className="w-8 h-8" />;
          })}
        </div>

        <p className="text-white/80 mb-6">
          Hearts: {hearts} / {maxHearts}
        </p>

        {/* Game Over State */}
        {hearts <= 0 && (
          <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-6">
            <div className="text-4xl mb-2">💔</div>
            <h2 className="text-xl font-bold text-red-400">Out of Hearts!</h2>
            <p className="text-red-300 text-sm">You need hearts to continue learning</p>
          </div>
        )}

        {/* Controls */}
        <div className="space-y-4">
          <div className="flex gap-2 justify-center">
            <Button 
              onClick={loseHeart}
              disabled={hearts <= 0}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Lose Heart ❤️‍🩹
            </Button>
            <Button 
              onClick={addHeart}
              disabled={hearts >= maxHearts}
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              Add Heart ❤️
            </Button>
          </div>
          
          <Button 
            onClick={resetHearts}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            Reset Hearts 🔄
          </Button>

          <div className="pt-4 border-t border-white/20">
            <Link href="/lesson" className="block">
              <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white">
                Try Lesson with Hearts 🎓
              </Button>
            </Link>
            <Link href="/learn" className="block mt-2">
              <Button variant="outline" className="w-full">
                Back to Learn
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-xs text-white/60">
          <p>Hearts System Features:</p>
          <ul className="text-left mt-2 space-y-1">
            <li>• Start with 5 hearts</li>
            <li>• Lose 1 heart per wrong answer</li>
            <li>• Game over when hearts = 0</li>
            <li>• Hearts reset at lesson start</li>
            <li>• Progress bar shows completion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeartsDemo;
