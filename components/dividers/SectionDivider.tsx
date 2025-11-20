// Section Divider: HUD style SVG
const SectionDivider = () => (
    <svg width="100%" height="120" viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
      <rect width="1800" height="120" fill="#111827" />
      {Array.from({ length: 18 }).map((_, i) => {
        // seedless "random" but deterministic: e.g. use i*large-primes for coordinates
        const pseudoRand = (seed: number) => {
          // Simple xorshift-ish pseudo-random for "shuffling" but deterministic
          let x = Math.sin(seed + 1) * 10000;
          return x - Math.floor(x);
        };
        const cx = 40 + pseudoRand(i * 137) * (1440 - 80); // margin of 40px
        const cy = 20 + pseudoRand(i * 521) * (120 - 40);   // margin of 20px top/bottom
        const r = 0.9 + pseudoRand(i * 353) * 2.1; // radius between 0.9 and 3.0
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="white"
            opacity={0.54 + pseudoRand(i * 727) * 0.3}
          />
        );
      })}
    </svg>
);

export default SectionDivider;