

import React from 'react';
import { Mail, Terminal, ArrowUp } from 'lucide-react';
import { Github, Linkedin, LeetCode } from '../icons/BrandIcons.jsx';
import { EMAIL } from '../../data/links.js';

const SOCIALS = [
  { icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abhishekghume/', label: 'LinkedIn' },
  { icon: LeetCode, href: 'https://leetcode.com/u/ghumeabhi04/', label: 'LeetCode' },
  { icon: Github, href: 'https://github.com/AbhishekGhume', label: 'GitHub' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='relative overflow-hidden border-t border-hairline bg-canvas'>
      <div className='container-custom py-14'>
        <div className='flex flex-col gap-10 md:flex-row md:items-start md:justify-between'>
          {/* Brand + tagline */}
          <div className='max-w-sm'>
            <div className='flex items-center gap-2.5'>
              <span className='flex h-9 w-9 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-300'>
                <Terminal size={18} />
              </span>
              <span className='font-mono text-sm font-semibold text-white'>
                ghume<span className='text-brand-400'>abhi04</span>
              </span>
            </div>
            <p className='mt-4 text-sm leading-relaxed text-slate-500'>
              Software engineer building backend systems, automation workflows, and AI-powered
              apps.
            </p>
            {/* The address itself, readable and selectable — a mailto: icon alone
                is a dead end for visitors with no mail app configured, which on
                desktop is most of them. */}
            <a
              href={`mailto:${EMAIL}`}
              className='mt-4 inline-flex items-center gap-2 font-mono text-sm text-slate-300 transition-colors hover:text-brand-300'
            >
              <Mail size={15} className='text-brand-400' />
              {EMAIL}
            </a>
            <div className='mt-5 flex items-center gap-2.5'>
              {SOCIALS.map(social => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={social.label}
                  className='flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-surface text-slate-400 transition-colors hover:border-brand-500/40 hover:text-brand-300'
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-hairline pt-6 sm:flex-row'>
          
          {/* -my-1.5 keeps the row's visual height unchanged while the padding
              lifts the 16px-tall link over the 24px WCAG 2.5.8 target floor. */}
          <a
            href='#home'
            className='-my-1.5 inline-flex items-center gap-1.5 py-1.5 font-mono text-xs text-slate-500 transition-colors hover:text-brand-300'
          >
            Back to top
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
