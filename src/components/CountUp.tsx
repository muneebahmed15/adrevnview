import { useEffect, useRef, useState } from "react";

type ParsedValue = {
  prefix: string;
  end: number;
  suffix: string;
  decimals: number;
  padStart: number;
};

function parseValue(value: string): ParsedValue {
  const trimmed = value.trim();

  const dollarMatch = trimmed.match(/^\$(\d+(?:\.\d+)?)$/);
  if (dollarMatch) {
    const num = parseFloat(dollarMatch[1]);
    const decimals = dollarMatch[1].includes(".") ? dollarMatch[1].split(".")[1].length : 0;
    return { prefix: "$", end: num, suffix: "", decimals, padStart: 0 };
  }

  const hashMatch = trimmed.match(/^#(\d+(?:\.\d+)?)$/);
  if (hashMatch) {
    const num = parseFloat(hashMatch[1]);
    const decimals = hashMatch[1].includes(".") ? hashMatch[1].split(".")[1].length : 0;
    return { prefix: "#", end: num, suffix: "", decimals, padStart: 0 };
  }

  const match = trimmed.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", end: 0, suffix: trimmed, decimals: 0, padStart: 0 };
  }

  const [, numStr, suffix] = match;
  const end = parseFloat(numStr);
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const padStart = suffix === "" && /^\d+$/.test(trimmed) ? trimmed.length : 0;

  return { prefix: "", end, suffix, decimals, padStart };
}

function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function formatCount(current: number, parsed: ParsedValue): string {
  const rounded =
    parsed.decimals > 0
      ? current.toFixed(parsed.decimals)
      : String(Math.round(current));

  const padded =
    parsed.padStart > 0 ? rounded.padStart(parsed.padStart, "0") : rounded;

  return `${parsed.prefix}${padded}${parsed.suffix}`;
}

function useCountUp(value: string, duration = 2000) {
  const [display, setDisplay] = useState(() => formatCount(0, parseValue(value)));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const parsed = parseValue(value);
    hasAnimated.current = false;
    setDisplay(formatCount(0, parsed));

    const el = ref.current;
    if (!el || parsed.end === 0) {
      setDisplay(formatCount(parsed.end, parsed));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;

        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = parsed.end * easeOutExpo(progress);
          setDisplay(formatCount(current, parsed));

          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            setDisplay(formatCount(parsed.end, parsed));
          }
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return { ref, display };
}

type CountUpProps = {
  value: string;
  duration?: number;
  className?: string;
};

export function CountUp({ value, duration = 2000, className }: CountUpProps) {
  const { ref, display } = useCountUp(value, duration);
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}

const NUMBER_TOKEN = /(?:\$\d+(?:\.\d+)?|#\d+(?:\.\d+)?|\d+(?:\.\d+)?[+★%]?)/g;

type AnimatedNumberTextProps = {
  children: string;
  className?: string;
  duration?: number;
};

export function AnimatedNumberText({ children, className, duration = 2000 }: AnimatedNumberTextProps) {
  const parts = children.split(NUMBER_TOKEN);
  const tokens = children.match(NUMBER_TOKEN) ?? [];

  return (
    <span className={className}>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {tokens[i] ? <CountUp value={tokens[i]} duration={duration} /> : null}
        </span>
      ))}
    </span>
  );
}
