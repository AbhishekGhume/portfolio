

import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { TumblingCube } from '../background/index.js';

const ApproachBand = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    // canvas → ink bridges the two neighbours (About is bg-canvas, Experience
    // is bg-ink), so the band reads as a transition rather than a third colour.
    <section className='relative overflow-hidden section-seam bg-linear-to-b from-canvas to-ink py-20 lg:py-24'>
      <div className='absolute inset-0 grid-bg opacity-50' />

      <div className='container-custom relative z-10'>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          // The row is centred as a unit and the copy column is allowed to
          // grow, so the pair sits optically centred instead of hugging the
          // left gutter. px-8 on the stage gives the cube room to swing: its
          // corners and its ground ellipse both reach past --cube-size, and the
          // section is overflow-hidden.
          className='mx-auto flex max-w-3xl flex-col items-center gap-10 md:flex-row md:gap-14'
        >
          <div className='shrink-0 px-8'>
            <TumblingCube />
          </div>

          <div className='text-center md:text-left'>
            {/* text-brand-300 explicitly: `eyebrow` carries no colour, and this
                band has no SectionHeader to supply it. */}
            <p className='eyebrow mb-5 text-brand-300'>Approach</p>
            <h2 className='text-3xl font-bold leading-tight sm:text-4xl'>
              Always <span className='gradient-text'>iterating toward better</span>
            </h2>
            <p className='mt-4 text-lg leading-relaxed text-slate-400'>
              Build, test, refine, repeat. I like work that starts with a practical problem and ends
              with something reliable, maintainable, and ready to ship.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ApproachBand;
