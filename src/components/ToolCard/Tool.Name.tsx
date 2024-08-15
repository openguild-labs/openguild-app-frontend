'use client';

import mergeTW from '@/utils/mergeTW';
import { ReactNode } from 'react';
import Link from 'next/link';
import { LinkOutlined } from '@ant-design/icons';

export default ({
  className,
  children,
  href,
  toolHref,
}: {
  className?: string;
  href?: string;
  toolHref?: string;
  children?: ReactNode;
}) => (
  <h3 className={mergeTW(`text-black font-medium flex gap-x-3 items-center ${className}`)}>
    {toolHref ? <Link href={toolHref}>{children}</Link> : children}
    <a
      id="tool-title"
      href={`${href}?ref=levelup`}
      onClick={() => window.open(`${href}?ref=levelup`)}
      target="_blank"
      className="hidden group-hover/card:block">
      <LinkOutlined className="w-4 h-4 pointer-events-none" />
    </a>
  </h3>
);
