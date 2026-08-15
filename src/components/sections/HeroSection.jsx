

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, FileText, ArrowDown } from 'lucide-react';
import { Github, Linkedin, LeetCode } from '../icons/BrandIcons.jsx';
import { useThrottledScroll, useRipple } from '../../hooks';
import { AnimatedMeshGradient } from '../background';
import { buttonMotion } from '../../utils/microInteractions';
import { RESUME_URL, EMAIL } from '../../data/links.js';
import {
  HERO_HEADLINE_LINES,
  HERO_HEADLINE_ACCENT,
  HERO_EYEBROW,
  HERO_INTRO,
  HERO_INTRO_EMPHASIS,
  splitAround,
} from '../../data/heroContent.js';

// The headline and intro are read from data rather than written out here,
// because the build-time prerender in scripts/vite-plugin-prerender-hero.js
// puts the same words into the static shell's <h1>. Two hand-written copies of
// one sentence is the drift this repo keeps having to undo.
const HEADLINE = HERO_HEADLINE_LINES.map(line => splitAround(line, HERO_HEADLINE_ACCENT));
const INTRO = splitAround(HERO_INTRO, HERO_INTRO_EMPHASIS);

const SOCIALS = [
  { icon: Github, href: 'https://github.com/AbhishekGhume', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/abhishekghume/', label: 'LinkedIn' },
  { icon: LeetCode, href: 'https://leetcode.com/u/ghumeabhi04/', label: 'LeetCode' },
  { icon: Mail, href: `mailto:${EMAIL}`, label: 'Email' },
];

const HeroSection = React.memo(function HeroSection() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { createRipple } = useRipple();
  const contactButtonRef = useRef(null);

  const handleScrollIndicator = React.useCallback(() => {
    setShowScrollIndicator(window.scrollY <= 50);
  }, []);
  useThrottledScroll(handleScrollIndicator);

  return (
    <section id='home' className='relative flex min-h-dvh flex-col overflow-hidden'>
      <AnimatedMeshGradient />

        {/* Content is centered in the space below the fixed nav. `my-auto`
          (rather than justify-center) centers when there's room but lets the
          block grow past the fold on very short viewports without clipping the
          top or bottom — a rare short screen scrolls instead of cutting off. */}
      <div className='container-custom relative z-10 flex flex-1 flex-col pb-3 pt-16'>
        <div className='mx-auto my-auto max-w-4xl text-center'>
          {/* Availability chip + role — one centered line, wraps only on the
              narrowest screens. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='mb-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mb-6 sm:gap-y-3'
          >
            <span className='inline-flex items-center gap-2.5 rounded-full border border-hairline bg-surface/60 px-4 py-1.5 backdrop-blur-sm'>
              <span className='relative flex h-2 w-2'>
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75' />
                <span className='relative inline-flex h-2 w-2 rounded-full bg-brand-400' />
              </span>
              <span className='font-mono text-xs tracking-wide text-slate-300'>
                Available for interesting problems
              </span>
            </span>

            {/* text-brand-300 explicitly: `eyebrow` carries no colour, and this
                one has no SectionHeader to supply it. */}
            <span className='eyebrow text-brand-300'>{HERO_EYEBROW}</span>
          </motion.div>

          {/* Headline. No entrance animation, unlike everything around it: these
              two elements are already on screen before React runs, written into
              the static shell by scripts/vite-plugin-prerender-hero.js. Fading
              them in from opacity 0 made the headline visibly vanish and
              reappear at mount — measured at 645ms of flicker, which is worse
              than the animation was ever worth. The elements below this are not
              prerendered, so they still animate and the hero still assembles. */}
          <h1 className='text-balance text-4xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl'>
            {HEADLINE.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line.before}
                {line.match && <span className='gradient-text-shimmer'>{line.match}</span>}
                {line.after}
              </React.Fragment>
            ))}
          </h1>

          {/* Sub copy — prerendered too, so likewise unanimated. */}
          <p className='mx-auto mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-lg'>
            {INTRO.before}
            {INTRO.match && <span className='font-semibold text-slate-200'>{INTRO.match}</span>}
            {INTRO.after}
          </p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='mt-6 flex flex-col items-center justify-center gap-3 sm:mt-7 sm:flex-row'
          >
            <motion.a
              ref={contactButtonRef}
              href={`mailto:${EMAIL}`}
              onClick={e => createRipple(e, contactButtonRef.current)}
              whileHover={buttonMotion.hover}
              whileTap={buttonMotion.tap}
              className='group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-linear-to-r from-brand-500 to-cyan-500 px-7 py-3.5 font-semibold text-ink shadow-lg shadow-brand-500/20 transition-shadow hover:shadow-xl hover:shadow-brand-500/30 sm:w-auto'
            >
              <Mail size={18} />
              <span>Get in touch</span>
            </motion.a>

            <div className='grid w-full gap-3 sm:contents'>
              <motion.a
                href={RESUME_URL}
                target='_blank'
                rel='noopener noreferrer'
                whileHover={buttonMotion.hover}
                whileTap={buttonMotion.tap}
                className='group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-hairline bg-surface/60 px-5 py-3.5 font-semibold text-slate-200 backdrop-blur-sm transition-colors hover:border-slate-600 hover:bg-surface sm:w-auto sm:px-7'
                aria-label='View résumé (opens in a new tab)'
              >
                <FileText size={18} />
                <span>Résumé</span>
                <ArrowRight
                  size={16}
                  className='hidden transition-transform duration-200 group-hover:translate-x-0.5 sm:inline'
                />
              </motion.a>

            </div>
          </motion.div>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='mt-4 flex items-center justify-center gap-3 sm:mt-5'
          >
            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                /* target='_blank' on a mailto: forces an empty browser tab and
                   only then hands off to the mail client — or, with no client
                   configured, leaves the visitor staring at the blank tab. Only
                   real URLs get a new tab. */
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                className='flex h-11 w-11 items-center justify-center rounded-xl border border-hairline bg-surface/60 text-slate-400 backdrop-blur-sm transition-colors hover:border-brand-500/40 hover:text-brand-300'
                aria-label={`Visit ${social.label} profile`}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — a flow child pinned to the bottom of the hero
          column, so it always sits just above the fold. */}
      <motion.a
        href='#about'
        aria-label='Scroll to about section'
        initial={{ opacity: 0 }}
        animate={{ opacity: showScrollIndicator ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className='relative z-10 mx-auto hidden shrink-0 flex-col items-center gap-1 pb-4 pt-3 text-slate-500 transition-colors hover:text-slate-300 md:flex'
      >
        <span className='font-mono text-[10px] uppercase tracking-[0.2em]'>Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
});

export default HeroSection;
