'use client';

const SmoothIgnitionDivider = () => {
  const transform = 'scale(1, -1) translate(0, -160)';
  return (
    <svg
      viewBox="0 0 1440 160"
      width="100%"
      height="160"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="smokeFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E5E7EB" stopOpacity="0.1" />
          <stop offset="30%" stopColor="#1F2937" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#111727" stopOpacity="1" />
        </linearGradient>
      </defs>

      <path
        d="M0,40 Q360,80 720,50 T1440,60 L1440,160 L0,160 Z"
        fill="url(#smokeFade)"
        transform={transform}
      />
    </svg>
  );
};

export default SmoothIgnitionDivider;