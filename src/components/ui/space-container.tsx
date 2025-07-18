import { cn } from "~/lib/utils";

interface SpaceContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const SpaceContainer = ({ children, className }: SpaceContainerProps) => {
  return (
    <div
      className={cn(
        "space-glass backdrop-blur-xl rounded-lg shadow-lg border border-white/10 dark:border-white/5",
        className
      )}
    >
      {children}
    </div>
  );
};
