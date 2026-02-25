import { Clock, FileCheck,Lock, ShieldCheck, Video } from 'lucide-react';

const badges = [
  {
    icon: ShieldCheck,
    label: 'الدفع الآمن',
  },
  {
    icon: Clock,
    label: 'التأكيد الفوري',
  },
  {
    icon: Video,
    label: 'جلسات فيديو',
  },
  {
    icon: Lock,
    label: 'تشفير TLS',
  },
  {
    icon: FileCheck,
    label: 'جاهزية ZATCA',
  },
];

export default function TrustBadges() {
  return (
    <div className='flex flex-wrap items-center justify-center gap-6 md:gap-8'>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div key={index} className='flex items-center gap-2 text-text-muted'>
            <Icon className='w-5 h-5' />
            <span className='text-sm font-medium'>{badge.label}</span>
          </div>
        );
      })}
    </div>
  );
}
