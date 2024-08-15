import mergeTW from '@/utils/mergeTW';
import { ReactNode } from 'react';

export const Tabs = ({
  children,
  className = '',
  ulClassName = '',
  variant,
}: {
  children: ReactNode;
  className?: string;
  ulClassName?: string;
  variant?: 'vertical' | 'horizontal';
}) => {
  return (
    <div
      className={mergeTW(
        `border-b border-gray-800 text-sm text-gray-400 font-medium ${className}`
      )}>
      <ul className={mergeTW(`flex items-center gap-x-4 overflow-auto w-full ${ulClassName}`)}>
        {children}
      </ul>
    </div>
  );
};
