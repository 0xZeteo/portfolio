import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { delay, staggerChildren: 0.04, delayChildren: delay },
  }),
};

const child: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 16, stiffness: 220, mass: 0.85 },
  },
};

// Each letter carries its OWN gradient so background-clip:text actually paints
// (a parent's clipped background does not propagate into inline-block children).
const letterGradient: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(180deg, oklch(0.16 0.03 260) 0%, oklch(0.42 0.13 155) 100%)",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  color: "transparent",
};

export function AnimatedHeading({
  text,
  className,
  delay = 0,
  as: Tag = "h1",
  gradient = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3";
  gradient?: boolean;
}) {
  const MotionTag = motion[Tag] as typeof motion.h1;
  return (
    <MotionTag
      className={className}
      style={{
        lineHeight: 1.14,
        paddingBottom: "0.18em",
        overflow: "visible",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {text.split("").map((c, i) => (
        <motion.span
          key={i}
          variants={child}
          className="inline-block align-baseline pb-[0.06em]"
          style={{
            whiteSpace: c === " " ? "pre" : undefined,
            ...(gradient ? letterGradient : null),
          }}
        >
          {c}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function TypewriterLine({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={`inline-block overflow-hidden whitespace-nowrap border-r border-cyan/60 align-middle ${className ?? ""}`}
      initial={{ width: 0 }}
      animate={{ width: "auto" }}
      transition={{ duration: text.length * 0.05, delay, ease: "easeInOut" }}
    >
      {text}
    </motion.span>
  );
}
