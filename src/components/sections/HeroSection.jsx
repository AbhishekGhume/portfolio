import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { Github, Linkedin, LeetCode } from '../icons/BrandIcons.jsx';
import { useThrottledScroll } from '../../hooks';
import { AnimatedMeshGradient } from '../background';
import { EMAIL } from '../../data/links.js';
import {
  HERO_HEADLINE_LINES,
  HERO_HEADLINE_ACCENT,
  HERO_EYEBROW,
  HERO_INTRO,
  HERO_INTRO_EMPHASIS,
  splitAround,
} from '../../data/heroContent.js';

const HEADLINE = HERO_HEADLINE_LINES.map((line) =>
  splitAround(line, HERO_HEADLINE_ACCENT)
);

const INTRO = splitAround(HERO_INTRO, HERO_INTRO_EMPHASIS);

const SOCIALS = [
  {
    icon: Github,
    href: 'https://github.com/AbhishekGhume',
    label: 'GitHub',
  },
  {
    icon: Linkedin,
    href: 'https://www.linkedin.com/in/abhishekghume/',
    label: 'LinkedIn',
  },
  {
    icon: LeetCode,
    href: 'https://leetcode.com/u/ghumeabhi04/',
    label: 'LeetCode',
  },
];

const HeroSection = React.memo(function HeroSection() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const handleScrollIndicator = React.useCallback(() => {
    setShowScrollIndicator(window.scrollY <= 50);
  }, []);

  useThrottledScroll(handleScrollIndicator);

  return (
    <section
      id="home"
      className="relative flex min-h-dvh flex-col overflow-hidden"
    >
      <AnimatedMeshGradient />

      {/* Main hero content */}
      <div className="container-custom relative z-10 flex flex-1 flex-col">
        <div
          className="
            mx-auto flex w-full max-w-5xl flex-1
            flex-col items-center justify-center
            px-4 pb-12 pt-24
            sm:px-6 sm:pb-14 sm:pt-28
            lg:px-8 lg:pt-24
          "
        >
          {/* Availability + role */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              mb-6 flex flex-wrap items-center justify-center
              gap-x-4 gap-y-3
              sm:mb-7
            "
          >
            <span
              className="
                inline-flex items-center gap-2.5 rounded-full
                border border-hairline bg-surface/60
                px-4 py-1.5 backdrop-blur-sm
              "
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-400" />
              </span>

              <span className="font-mono text-xs tracking-wide text-slate-300">
                Available for interesting problems
              </span>
            </span>

            <span className="eyebrow text-brand-300">
              {HERO_EYEBROW}
            </span>
          </motion.div>

          {/* Headline */}
          <h1
            className="
              max-w-5xl text-balance text-center
              text-4xl font-bold leading-[1.02]
              tracking-tight
              sm:text-6xl
              lg:text-7xl
              xl:text-8xl
            "
          >
            {HEADLINE.map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}

                {line.before}

                {line.match && (
                  <span className="gradient-text-shimmer">
                    {line.match}
                  </span>
                )}

                {line.after}
              </React.Fragment>
            ))}
          </h1>

          {/* Intro */}
          <p
            className="
              mx-auto mt-5 max-w-3xl
              text-pretty text-center
              text-sm leading-relaxed text-slate-400
              sm:mt-6 sm:text-lg sm:leading-relaxed
              lg:text-xl
            "
          >
            {INTRO.before}

            {INTRO.match && (
              <span className="font-semibold text-slate-200">
                {INTRO.match}
              </span>
            )}

            {INTRO.after}
          </p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex items-center justify-center gap-3 sm:mt-9"
          >
            {SOCIALS.map((social, i) => {
              const Icon = social.icon;

              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4 + i * 0.06,
                  }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    border border-hairline
                    bg-surface/60
                    text-slate-400
                    backdrop-blur-sm
                    transition-all duration-200
                    hover:border-brand-500/40
                    hover:bg-surface
                    hover:text-brand-300
                  "
                  aria-label={`Visit my ${social.label} profile`}
                >
                  <Icon size={20} />
                </motion.a>
              );
            })}
          </motion.div>

          {/* Email - normal text, NOT clickable */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="
              mt-4
              flex
              min-w-[155px]
              max-w-full
              items-center
              justify-center
              rounded-lg
              border border-hairline
              bg-surface/40
              px-3
              py-2
              font-mono
              text-[11px]
              tracking-wide
              text-slate-500
              backdrop-blur-sm
            "
          >
            {EMAIL}
          </motion.span>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        initial={{ opacity: 0 }}
        animate={{
          opacity: showScrollIndicator ? 1 : 0,
        }}
        transition={{ duration: 0.4 }}
        className="
          relative z-10 mx-auto
          hidden shrink-0
          flex-col items-center
          gap-1
          pb-5 pt-1
          text-slate-500
          transition-colors
          hover:text-slate-300
          md:flex
        "
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
          Scroll
        </span>

        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <ArrowDown size={16} />
        </motion.span>
      </motion.a>
    </section>
  );
});

export default HeroSection;