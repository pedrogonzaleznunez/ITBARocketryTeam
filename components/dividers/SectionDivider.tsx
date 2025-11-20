import { CSSProperties } from 'react';

const starCount = 50;

const pseudoRand = (seed: number) => {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
};

const stars = Array.from({ length: starCount }, (_, i) => {
  const cx = 40 + pseudoRand(i * 137) * (1440 - 80);
  const cy = 20 + pseudoRand(i * 521) * (120 - 40);
  const r = 0.8 + pseudoRand(i * 353) * 2.2;
  const opacity = 0.4 + pseudoRand(i * 727) * 0.5;
  const delay = pseudoRand(i * 911) * 4;
  const duration = 4 + pseudoRand(i * 613) * 4;
  const driftX = (pseudoRand(i * 419) - 0.5) * 20;
  const driftY = (pseudoRand(i * 281) - 0.5) * 10;

  return { cx, cy, r, opacity, delay, duration, driftX, driftY };
});

const SectionDivider = () => (
  <svg width="100%" height="120" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
    <style>{`
      @keyframes starDrift {
        0% { transform: translate(0, 0); opacity: var(--twinkle-start); }
        50% { opacity: var(--twinkle-mid); }
        100% { transform: translate(var(--drift-x), var(--drift-y)); opacity: var(--twinkle-end); }
      }
      .star {
        transform-box: fill-box;
        transform-origin: center;
        animation-name: starDrift;
        animation-iteration-count: infinite;
      }
    `}</style>
    <rect width="1440" height="120" fill="#111727" />
    {stars.map((star, index) => (
      <circle
        key={index}
        className="star"
        cx={star.cx}
        cy={star.cy}
        r={star.r}
        fill="white"
        style={
          {
            opacity: star.opacity,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            '--drift-x': `${star.driftX}px`,
            '--drift-y': `${star.driftY}px`,
            '--twinkle-start': star.opacity,
            '--twinkle-mid': Math.min(1, star.opacity + 0.3),
            '--twinkle-end': star.opacity * 0.7,
          } as CSSProperties
        }
      />
    ))}
  </svg>
);

export default SectionDivider;