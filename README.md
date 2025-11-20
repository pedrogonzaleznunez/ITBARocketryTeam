# ITBA Rocketry Team - Product Landing Page

A premium, Apple-like product landing page built with Next.js 14, featuring smooth scrolling and immersive scroll-driven animations.

## 🚀 Features

- **Smooth Scrolling**: Lenis smooth scroll with seamless GSAP integration
- **Canvas Image Sequence**: Scroll-controlled flipbook animation in the hero section
- **Scroll Animations**: GSAP ScrollTrigger for pinning, reveals, and parallax effects
- **Premium Design**: Minimal, elegant UI with generous whitespace
- **Fully Responsive**: Optimized for 360px to 1440px+ screens
- **Accessibility First**: Semantic HTML, ARIA labels, keyboard navigation, reduced motion support
- **SEO Optimized**: Complete metadata, OpenGraph, Twitter cards
- **Performance**: Lazy loading, optimized assets, Lighthouse score ≥85

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: GSAP + ScrollTrigger
- **Smooth Scroll**: Lenis by Studio Freight
- **Utilities**: clsx

## 📦 Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Add image sequence** (optional):
   - Create image frames: `frame_0001.jpg`, `frame_0002.jpg`, etc.
   - Place them in `/public/sequence/`
   - See `/public/sequence/README.md` for detailed instructions
   - If omitted, a gradient fallback will display

3. **Run development server**:
```bash
npm run dev
```

4. **Open browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with metadata & fonts
│   ├── page.tsx            # Homepage (only page)
│   └── globals.css         # Global styles & Tailwind
├── components/
│   ├── Nav.tsx             # Sticky navigation
│   ├── Section.tsx         # Section wrapper
│   ├── Reveal.tsx          # Scroll reveal animations
│   ├── CanvasSequence.tsx  # Canvas image sequence
│   ├── SmoothScroller.tsx  # Lenis + GSAP bridge
│   └── sections/           # Page sections
│       ├── HeroSection.tsx
│       ├── HighlightsSection.tsx
│       ├── SpecsSection.tsx
│       ├── GallerySection.tsx
│       └── CTASection.tsx
├── lib/
│   └── gsap.ts             # GSAP configuration
└── public/
    └── sequence/           # Canvas image frames
```

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to modify the color palette:
```ts
colors: {
  primary: {
    500: '#0ea5e9', // Change brand color
    // ...
  },
}
```

### Typography
Fluid type scales are defined in `tailwind.config.ts`:
```ts
fontSize: {
  'fluid-5xl': 'clamp(3rem, 2.25rem + 3.75vw, 4rem)',
  // ...
}
```

### Content
All text content is in the section components under `components/sections/`. Edit these files to change copy.

### Canvas Sequence
- Frame count: Adjust `frameCount` prop in `HeroSection.tsx`
- Path pattern: Modify `pathTemplate` if using different naming
- Duration: Edit ScrollTrigger `end` value in `CanvasSequence.tsx`

## 🎯 Sections

1. **Hero**: Full-viewport with canvas sequence and headline
2. **Highlights**: Feature grid with 4 key capabilities
3. **Specs**: Sticky step-by-step story (4 steps)
4. **Gallery**: Edge-to-edge media showcase
5. **CTA**: Final call-to-action with stats

## ♿️ Accessibility

- Semantic HTML5 elements
- ARIA labels and roles
- Keyboard navigation support
- Focus indicators on all interactive elements
- Respects `prefers-reduced-motion` (disables animations)
- High contrast ratios (WCAG AA compliant)

## 🚢 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm run start
```

## 📝 Adding Canvas Frames

The hero section uses a canvas-based image sequence. To add your frames:

1. **Prepare frames**:
   - 30-60 JPG images
   - 1600-2000px width
   - Optimized (50-200KB each)
   - Sequential naming: `frame_0001.jpg`, `frame_0002.jpg`, etc.

2. **Place in directory**:
   ```
   public/sequence/frame_0001.jpg
   public/sequence/frame_0002.jpg
   ...
   ```

3. **Update frame count** (if different from 30):
   Edit `components/sections/HeroSection.tsx`:
   ```tsx
   <CanvasSequence frameCount={60} />
   ```

See `/public/sequence/README.md` for more details.

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Credits

- **Design**: Inspired by Apple's product pages
- **Smooth Scroll**: [Lenis](https://github.com/studio-freight/lenis) by Studio Freight
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Framework**: [Next.js](https://nextjs.org/)

---

Built with ❤️ by the ITBA Rocketry Team
