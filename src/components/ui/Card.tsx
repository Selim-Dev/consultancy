import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl shadow-sm border border-border bg-white',
        className,
      )}
    >
      {children}
    </div>
  );
}
