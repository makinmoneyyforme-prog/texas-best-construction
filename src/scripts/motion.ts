// motion.ts — the site-wide motion layer. Loaded once from BaseLayout, so it
// runs on every (full) page load across the multi-page site.
//
// Two pieces, both tuned for restraint (ORYZO-level: subtle, fast, elegant —
// never bouncy):
//   1. Lenis smooth scrolling, wired into GSAP's ticker.
//   2. GSAP ScrollTrigger scroll-reveals for elements marked [data-reveal] or
//      children of [data-reveal-group].
//
// Reduced-motion users get nothing: the `motion` class is never added to <html>
// (see the inline gate in BaseLayout), so reveal targets stay fully visible and
// this whole module no-ops.

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  try {
    gsap.registerPlugin(ScrollTrigger);

    // ── Smooth scrolling ───────────────────────────────────────────────
    const lenis = new Lenis({
      duration: 1.05, // settles quickly — calm, not floaty
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)), // expo-out
      smoothWheel: true,
    });
    // Expose for in-page programmatic scrolls (calculator CTA, form success, etc.).
    (window as any).lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Route in-page anchor clicks through Lenis, offset for the 80px sticky header.
    document.addEventListener('click', (e) => {
      const link = (e.target as Element)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!link || e.defaultPrevented) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
    });

    // ── Scroll-reveal ──────────────────────────────────────────────────
    const items: Element[] = [
      ...document.querySelectorAll('[data-reveal]'),
      ...document.querySelectorAll('[data-reveal-group] > *'),
    ];

    if (items.length) {
      // Initial offset; opacity is already 0 via CSS (html.motion), so no flash.
      gsap.set(items, { y: 16 });

      // batch() groups whatever enters together and staggers it — keeps tall
      // grids revealing row by row instead of all at once.
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: true,
            onComplete: () => gsap.set(batch, { clearProps: 'will-change' }),
          }),
      });
    }

    // ── Count-up stat numbers ──────────────────────────────────────────
    // Animates real numbers (from client.ts) up when scrolled in. Non-numeric
    // values (e.g. "Family") are left untouched. Reduced motion skips this
    // whole module, so those users see the final numbers immediately.
    document.querySelectorAll('[data-countup]').forEach((el) => {
      const raw = (el.textContent || '').trim();
      const match = raw.match(/^(\D*)(\d[\d,]*)(.*)$/);
      if (!match) return;
      const prefix = match[1];
      const hasComma = match[2].includes(',');
      const suffix = match[3];
      const target = parseInt(match[2].replace(/,/g, ''), 10);
      const render = (n: number) =>
        prefix + (hasComma ? n.toLocaleString('en-US') : String(n)) + suffix;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          const obj = { v: 0 };
          gsap.to(obj, {
            v: target,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => { el.textContent = render(Math.round(obj.v)); },
          });
        },
      });
    });

    // ── Image/card "wipe" reveal ───────────────────────────────────────
    // A tasteful clip-path wipe for image slots, layered on the fade reveal.
    document.querySelectorAll('[data-reveal-img]').forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.fromTo(
            el,
            { clipPath: 'inset(0 0 100% 0 round 0.125rem)' },
            {
              clipPath: 'inset(0 0 0% 0 round 0.125rem)',
              duration: 0.8,
              ease: 'power3.out',
              onComplete: () => gsap.set(el, { clearProps: 'will-change' }),
            }
          ),
      });
    });

    // Recompute trigger positions once fonts/images have settled.
    window.addEventListener('load', () => ScrollTrigger.refresh());
  } catch (err) {
    // If init fails for any reason, never leave reveal targets stuck hidden.
    document.documentElement.classList.remove('motion');
    // eslint-disable-next-line no-console
    console.error('[motion] init failed:', err);
  }
}
