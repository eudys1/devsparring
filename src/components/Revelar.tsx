'use client';

import { useEffect, useRef } from 'react';

/**
 * Revelado al entrar en pantalla con IntersectionObserver, nunca con un oyente
 * de scroll. Lo que ya está visible al cargar no se oculta jamás: la página se
 * lee entera sin JavaScript y sin esperar a que nada se anime.
 */
export function Revelar({
  children,
  className = '',
  as: Etiqueta = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'li';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Solo se oculta lo que está claramente por debajo del pliegue.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) return;
    el.dataset.fuera = 'true';
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.fuera = 'false';
            obs.unobserve(e.target);
          }
        }
      },
      { rootMargin: '-40px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Etiqueta ref={ref as never} className={`al-ver ${className}`}>
      {children}
    </Etiqueta>
  );
}
