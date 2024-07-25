import mergeTW from '@/utils/mergeTW';
import Link from 'next/link';
import { ReactNode } from 'react';

const customStyle =
  'flex-none text-sm text-gray-400 font-medium border border-gray-700 bg-slate-500/50 rounded-full px-3 py-1';
export const Tag = ({
  children,
  href,
  className = '',
}: {
  children: ReactNode;
  href?: string;
  className?: string;
}) => (
  <li className={mergeTW(`${!href ? customStyle : ''} ${className}`)}>
    {href ? (
      <Link href={href} className={mergeTW(`${customStyle} ${className}`)}>
        {children}
      </Link>
    ) : (
      <>{children}</>
    )}
  </li>
);
