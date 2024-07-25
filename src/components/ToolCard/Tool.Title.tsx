import mergeTW from '@/utils/mergeTW';
import { ReactNode } from 'react';

export default ({ className, children }: { className?: string; children?: ReactNode }) => (
  <p
    style={{ fontSize: 'smaller' }}
    className={mergeTW(`text-gray-400 text-sm sm:text-base ${className}`)}>
    {children}
  </p>
);
