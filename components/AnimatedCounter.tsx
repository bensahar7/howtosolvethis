"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * AnimatedCounter Component
 * Animates a number from 0 to target value with spring physics
 * Features:
 * - Smooth ease-out animation
 * - Slight overshoot effect (spring)
 * - Triggers when component enters viewport
 * - Preserves prefix/suffix during animation
 */
export default function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  className = "text-4xl md:text-5xl font-bold text-white",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Create a spring-based motion value (0 to target)
  const motionValue = useSpring(0, {
    stiffness: 100,      // How stiff the spring is (lower = more bouncy)
    damping: 20,         // How quickly it settles (lower = more overshoot)
    mass: 1,             // Weight of the object
  });

  // Transform the motion value to rounded integer
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      // Animate from 0 to target value
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
