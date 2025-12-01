'use client';

/**
 * Componente SocialLinks
 * 
 * Componente reutilizable de enlaces a redes sociales con soporte para diferentes variantes.
 * Incluye Instagram, LinkedIn y Email.
 */

import { FaInstagram, FaLinkedin, FaEnvelope } from 'react-icons/fa';

interface SocialLinksProps {
  variant?: 'hero' | 'footer';
  className?: string;
}

export default function SocialLinks({ variant = 'footer', className = '' }: SocialLinksProps) {
  const socialLinks = [
    {
      href: 'https://www.instagram.com/itbarocketry/',
      label: 'Instagram',
      icon: FaInstagram,
    },
    {
      href: 'https://www.linkedin.com/company/itba-rocketry/posts/?feedView=all',
      label: 'LinkedIn',
      icon: FaLinkedin,
    },
    {
      href: 'mailto:info@itbarocketry.com',
      label: 'Email',
      icon: FaEnvelope,
    },
  ];

  if (variant === 'hero') {
    return (
      <div className={`flex gap-6 ${className}`}>
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto:') ? undefined : '_blank'}
            rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
            aria-label={label}
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/30 text-white transition-all duration-300 hover:scale-110 focus-ring"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
    );
  }

  // Variante footer
  return (
    <div className={`flex gap-6 ${className}`}>
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
          aria-label={label}
          className="hover:text-white transition-colors focus-ring rounded p-2"
        >
          <Icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}

