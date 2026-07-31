"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const EXIT_DELAY_MS = 1_050;
const REMOVE_DELAY_MS = 1_700;

export function IntroSplash() {
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const body = document.body;
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(false);
      return;
    }

    root.classList.add("intro-is-active");
    body.classList.add("intro-is-active");

    const exitTimer = window.setTimeout(() => {
      setIsExiting(true);
    }, EXIT_DELAY_MS);
    const removeTimer = window.setTimeout(() => {
      setIsVisible(false);
      root.classList.remove("intro-is-active");
      body.classList.remove("intro-is-active");
    }, REMOVE_DELAY_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      root.classList.remove("intro-is-active");
      body.classList.remove("intro-is-active");
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={isExiting ? "intro-splash is-exiting" : "intro-splash"}
      aria-hidden="true"
    >
      <div className="intro-splash__content">
        <div className="intro-splash__mark">
          <span className="intro-splash__spark intro-splash__spark--left">
            ✦
          </span>
          <Image
            src="/art/sticky-stack-intro-v3.webp"
            alt=""
            width={196}
            height={196}
            priority
          />
          <span className="intro-splash__spark intro-splash__spark--right">
            ♥
          </span>
        </div>

        <p>One Million Notes</p>
        <div className="intro-splash__rule">
          <span />
        </div>
      </div>
    </div>
  );
}
