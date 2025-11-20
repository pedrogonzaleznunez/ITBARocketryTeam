/**
 * Section Component
 * 
 * Generic wrapper for page sections with consistent spacing and layout.
 */

import { ReactNode } from 'react';
import clsx from 'clsx';

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  containerClassName?: string;
  fullWidth?: boolean;
  noPadding?: boolean;
}

export default function Section({
  children,
  id,
  className,
  containerClassName,
  fullWidth = false,
  noPadding = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={clsx(
        !noPadding && 'py-16 md:py-24 lg:py-32',
        className
      )}
    >
      {fullWidth ? (
        children
      ) : (
        <div className={clsx('container-custom', containerClassName)}>
          {children}
        </div>
      )}
    </section>
  );
}

