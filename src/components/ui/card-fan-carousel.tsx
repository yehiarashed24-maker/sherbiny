import { useState, useEffect, useRef, useCallback, type ReactNode } from "react";
import gsap from "gsap";

export interface CardItem {
  imgUrl: string;
  title?: string;
  content?: ReactNode;
  alt?: string;
  linkUrl?: string;
}

interface SocialCardsProps {
  cards: CardItem[];
  autoPlay?: boolean;
  interval?: number;
}

const MAX_VISIBLE = 7;

const FAN_POSITIONS = [
  { rot: -21, scale: 0.7756, x: -30, y: 7.3, zIndex: 1 },
  { rot: -14, scale: 0.8498, x: -22, y: 4.0, zIndex: 2 },
  { rot: -7,  scale: 0.9346, x: -11, y: 1.3, zIndex: 3 },
  { rot: 0,   scale: 1.0,    x: 0,   y: 0.0, zIndex: 10 },
  { rot: 7,   scale: 0.9346, x: 11,  y: 1.3, zIndex: 3 },
  { rot: 14,  scale: 0.8498, x: 22,  y: 4.0, zIndex: 2 },
  { rot: 21,  scale: 0.7756, x: 30,  y: 7.3, zIndex: 1 },
];

function getResponsiveMultiplier(width: number) {
  if (width < 480) return 0.28;
  if (width < 640) return 0.38;
  if (width < 768) return 0.5;
  if (width < 1024) return 0.75;
  return 1.0;
}

/**
 * Returns a multiplier (0..1] that scales y-offsets and entry animation
 * distances when the viewport is too short for the ideal layout height.
 */
function getHeightMultiplier(width: number) {
  // Ideal layout heights (in px at 16px root) matching the CSS breakpoints
  let idealPx: number;
  if (width < 480) idealPx = 22 * 16;       // 352px
  else if (width < 640) idealPx = 26 * 16;  // 416px
  else if (width < 768) idealPx = 28 * 16;  // 448px
  else if (width < 1024) idealPx = 34 * 16; // 544px
  else idealPx = 38 * 16;                    // 608px

  const available = window.innerHeight * 0.7; // 70vh budget
  if (available >= idealPx) return 1;
  return available / idealPx;
}

function getSlotConfig(totalCards: number, slot: number) {
  if (totalCards >= MAX_VISIBLE) return FAN_POSITIONS[slot];
  const center = totalCards >> 1;
  const distance = totalCards > 1 ? (slot - center) / center : 0;
  const absDistance = Math.abs(distance);
  return {
    rot: distance * 21,
    scale: 1.0 - 0.2244 * absDistance * absDistance,
    x: distance * 30,
    y: absDistance * absDistance * 7.3,
    zIndex: 10 - Math.abs(slot - center),
  };
}

const ARROW_CLASSES =
  "relative flex items-center justify-center rounded-full bg-black text-white cursor-pointer shrink-0 z-30 outline-none shadow-md hover:bg-black/80 hover:scale-105 active:scale-95 transition-all duration-300";

export default function SocialCards({ cards, autoPlay = true, interval = 3000 }: SocialCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);
  const hasEntered = useRef(false);
  const directionRef = useRef<"left" | "right" | null>(null);
  const prevVisible = useRef<Set<number>>(new Set());
  const [isHovered, setIsHovered] = useState(false);

  const totalCards = cards.length;
  const visibleCount = Math.min(7, totalCards);
  const half = Math.floor(visibleCount / 2);
  const [centerIndex, setCenterIndex] = useState(half);

  const getVisibleMap = useCallback((center: number) => {
    const map = new Map<number, number>();
    for (let slot = 0; slot < visibleCount; slot++) {
      map.set(((center + slot - half) % totalCards + totalCards) % totalCards, slot);
    }
    return map;
  }, [totalCards, visibleCount, half]);

  const cycle = useCallback((direction: "left" | "right") => {
    if (isAnimating.current || totalCards <= 1) return;
    isAnimating.current = true;
    directionRef.current = direction;
    setCenterIndex(prev =>
      direction === "right" ? (prev + 1) % totalCards : (prev - 1 + totalCards) % totalCards
    );
  }, [totalCards]);

  useEffect(() => {
    if (!autoPlay || isHovered) return;
    const timer = setInterval(() => cycle("right"), interval);
    return () => clearInterval(timer);
  }, [autoPlay, isHovered, interval, cycle]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !totalCards) return;

    const cardElements = Array.from(container.querySelectorAll<HTMLElement>(".fan-card"));
    if (!cardElements.length) return;

    const visibleMap = getVisibleMap(centerIndex);
    const previouslyVisible = prevVisible.current;
    const direction = directionRef.current;
    const isFirstMount = !hasEntered.current;
    const multiplier = getResponsiveMultiplier(window.innerWidth);
    const hMult = getHeightMultiplier(window.innerWidth);
    const config = (slot: number) => getSlotConfig(visibleCount, slot);

    if (isFirstMount) isAnimating.current = true;

    let completedCount = 0;
    const visibleCount = visibleMap.size;
    const onCardDone = () => {
      if (++completedCount >= visibleCount) {
        isAnimating.current = false;
        if (isFirstMount) hasEntered.current = true;
      }
    };

    cardElements.forEach((card, cardIndex) => {
      const slot = visibleMap.get(cardIndex);
      const wasVisible = previouslyVisible.has(cardIndex);

      if (slot !== undefined) {
        const { x, y, rot, scale, zIndex } = config(slot);
        const target = {
          x: `${x * multiplier}rem`,
          y: `${y * hMult}rem`,
          rotation: rot,
          scale,
          opacity: 1,
          zIndex,
        };

        if (isFirstMount) {
          gsap.set(card, { x: 0, y: `${12 * hMult}rem`, rotation: 0, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 1.2, ease: "elastic.out(1.05,.78)", delay: 0.2 + slot * 0.06, onComplete: onCardDone });
        } else if (!wasVisible) {
          const enterX = direction === "right" ? 40 : -40;
          gsap.set(card, { x: `${enterX}rem`, y: `${y * hMult}rem`, rotation: direction === "right" ? 30 : -30, scale: 0.5, opacity: 0 });
          gsap.to(card, { ...target, duration: 0.6, ease: "power2.out", onComplete: onCardDone });
        } else {
          gsap.to(card, { ...target, duration: 0.5, ease: "power2.out", onComplete: onCardDone });
        }
      } else if (wasVisible) {
        const exitX = direction === "right" ? -40 : 40;
        gsap.to(card, { x: `${exitX}rem`, opacity: 0, scale: 0.5, rotation: direction === "right" ? -30 : 30, duration: 0.4, ease: "power2.in", zIndex: 0 });
      } else if (isFirstMount) {
        gsap.set(card, { opacity: 0, scale: 0.3, x: 0, y: 0, zIndex: 0 });
      }
    });

    prevVisible.current = new Set(visibleMap.keys());

    const hoverHandlers: { el: HTMLElement, enter: () => void, leave: () => void }[] = [];
    cardElements.forEach((el, i) => {
      const slot = visibleMap.get(i);
      if (slot !== undefined) {
        const c = config(slot);
        const enter = () => {
            gsap.to(el, { scale: c.scale * 1.05, y: `${(c.y * hMult) - 1.5}rem`, zIndex: 50, duration: 0.3, ease: "power2.out" });
        };
        const leave = () => {
            gsap.to(el, { scale: c.scale, y: `${c.y * hMult}rem`, zIndex: c.zIndex, duration: 0.3, ease: "power2.out" });
        };
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
        hoverHandlers.push({ el, enter, leave });
      }
    });
    return () => {
      hoverHandlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [centerIndex, totalCards, getVisibleMap, autoPlay, visibleCount]);

  if (!totalCards) return null;

  const chevron = (direction: "left" | "right") => (
    <svg className="relative z-[2] w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );

  return (
    <section 
        className="flex flex-col items-center w-full py-4 lg:py-8 px-4 md:px-8 relative z-20 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-center w-full max-w-[90rem]">
        <div ref={containerRef} className="fan-layout flex relative justify-center items-center w-full max-w-[80rem] h-[400px] md:h-[500px]">
          {cards.map((card, index) => {
            const image = (
              <div className="relative w-full h-full overflow-hidden rounded-[24px] shadow-2xl border-[4px] border-white/10 group">
                <img src={card.imgUrl} loading="lazy" alt={card.alt || `Card ${index}`} className="absolute inset-0 w-full h-full object-cover z-10" />
                
                {card.title && (
                  <div className="absolute inset-x-0 bottom-0 z-15 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-6 pt-16 flex items-end opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white text-center w-full drop-shadow-md">{card.title}</h3>
                  </div>
                )}

                {card.content && (
                  <div className="absolute inset-0 z-20 bg-black/75 backdrop-blur-md p-6 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                    <h3 className="text-2xl font-bold text-white mb-4 border-b border-white/20 pb-3">{card.title}</h3>
                    <div className="text-white/90 text-sm leading-relaxed">
                      {card.content}
                    </div>
                  </div>
                )}
              </div>
            );
            return card.linkUrl ? (
              <a key={index} href={card.linkUrl} target={card.linkUrl.startsWith("http") ? "_blank" : "_self"} rel="noopener noreferrer" className="fan-card absolute w-[240px] h-[340px] md:w-[320px] md:h-[450px] cursor-pointer" style={{ opacity: 0 }}>{image}</a>
            ) : (
              <div key={index} className="fan-card absolute w-[240px] h-[340px] md:w-[320px] md:h-[450px]" style={{ opacity: 0 }}>{image}</div>
            );
          })}
        </div>
      </div>

      {totalCards > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8 md:mt-12 z-30">
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("left")} aria-label="Previous">
            {chevron("left")}
          </button>
          <div className="flex items-center gap-3 px-4">
            {cards.map((_, i) => (
              <span key={i} className={`rounded-full transition-all duration-300 ${i === centerIndex ? "w-3 h-3 bg-black scale-110" : "w-2 h-2 bg-black/20"}`} />
            ))}
          </div>
          <button className={`${ARROW_CLASSES} w-10 h-10 md:w-12 md:h-12`} onClick={() => cycle("right")} aria-label="Next">
            {chevron("right")}
          </button>
        </div>
      )}
    </section>
  );
}
