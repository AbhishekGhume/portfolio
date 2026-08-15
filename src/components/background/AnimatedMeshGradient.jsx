

import React from 'react';

const AnimatedMeshGradient = () => {
  return (
    <div aria-hidden='true' className='absolute inset-0 overflow-hidden bg-ink'>
      {/* Aurora glow — emerald. Opacities and drift are tuned so the motion is
          actually perceptible: a large, softly-blurred glow needs a strong
          enough tint and a wide enough travel (see the aurora keyframe) to read
          as "breathing" rather than sitting still.

          These three are also the die map's light source — the die layers below
          paint over them, so where a glow is passing the tiles are lit and
          everywhere else they are not. That is why they come first. */}
      <div
        className='absolute -top-32 -left-24 h-[42rem] w-[42rem] rounded-full animate-aurora'
        style={{
          background: 'radial-gradient(circle, rgba(16,185,129,0.30) 0%, transparent 62%)',
          filter: 'blur(36px)',
        }}
      />

      {/* Aurora glow — cyan */}
      <div
        className='absolute top-10 right-[-8rem] h-[40rem] w-[40rem] rounded-full animate-aurora'
        style={{
          background: 'radial-gradient(circle, rgba(34,211,238,0.24) 0%, transparent 62%)',
          filter: 'blur(44px)',
          animationDelay: '-5s',
        }}
      />

      {/* Aurora glow — indigo, low + center for depth */}
      <div
        className='absolute bottom-[-14rem] left-1/3 h-[36rem] w-[36rem] rounded-full animate-aurora'
        style={{
          background: 'radial-gradient(circle, rgba(99,102,241,0.20) 0%, transparent 65%)',
          filter: 'blur(52px)',
          animationDelay: '-10s',
        }}
      />

      {/* Die map. Paint order is the whole effect: the auroras above are the
          light, and this paints an opaque grid of channels over them, so light
          survives only in the tile-shaped gaps between channels. The grid never
          moves, so tiles switch on and off in place as a glow drifts past
          rather than sliding around with it.

          Nothing here animates — deliberately. See the die-map block in
          index.css: every version that added its own animating layer cost
          frames, and reusing the glows that were already on screen is what
          made the effect free. */}
      <div className='die-map'>
        <div className='die-grid' />
        <div className='die-lines' />
        <div className='die-center-damp' />
      </div>

      {/* Radial vignette to keep edges dark and focus the center */}
      <div
        className='absolute inset-0'
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, transparent 40%, rgba(6,10,19,0.65) 100%)',
        }}
      />

      {/* Bottom fade into the next section */}
      <div className='absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-ink to-transparent' />
    </div>
  );
};

export default AnimatedMeshGradient;
