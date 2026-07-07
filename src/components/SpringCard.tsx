import { motion, type HTMLMotionProps } from "motion/react";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router";
import { usePerformanceTier } from "@/lib/performance";

export const springCardTransition = {
  type: "spring" as const,
  stiffness: 360,
  damping: 24,
  mass: 0.95,
};

const cardHover = { scale: 1.018, y: -5 };
const cardTap = { scale: 0.992, y: -1 };

type SpringCardProps = HTMLMotionProps<"div"> & {
  interactive?: boolean;
};

export const SpringCard = forwardRef<HTMLDivElement, SpringCardProps>(
  ({ className, children, interactive = true, ...props }, ref) => {
    const { springMotion } = usePerformanceTier();

    if (!springMotion || !interactive) {
      return (
        <div ref={ref} className={className} {...(props as React.ComponentProps<"div">)}>
          {children}
        </div>
      );
    }

    return (
      <motion.div
        ref={ref}
        whileHover={cardHover}
        whileTap={cardTap}
        transition={springCardTransition}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);
SpringCard.displayName = "SpringCard";

const MotionLink = motion.create(Link);

type SpringCardLinkProps = LinkProps & {
  className?: string;
  interactive?: boolean;
};

export function SpringCardLink({
  className,
  children,
  interactive = true,
  ...props
}: SpringCardLinkProps) {
  const { springMotion } = usePerformanceTier();

  if (!springMotion || !interactive) {
    return (
      <Link className={className} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <MotionLink
      whileHover={cardHover}
      whileTap={cardTap}
      transition={springCardTransition}
      className={className}
      {...props}
    >
      {children}
    </MotionLink>
  );
}
