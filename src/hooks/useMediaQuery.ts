import { useEffect, useState } from "react";

/**
 * Tracks a media query so layout decisions that can't be expressed in CSS
 * alone — such as whether the sidebar is a drawer or a permanent rail — stay
 * in sync with the Tailwind breakpoints.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const list = window.matchMedia(query);
    const onChange = (event: MediaQueryListEvent) => setMatches(event.matches);

    setMatches(list.matches);
    list.addEventListener("change", onChange);
    return () => list.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** Tailwind's `lg` breakpoint — where the sidebar becomes permanent. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
