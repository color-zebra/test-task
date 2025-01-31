import { useEffect, useRef } from 'react';

type SentinelProps = {
  getIntersectionContainer: () => HTMLElement | null;
  onInView: () => void;
};

export const Sentinel = ({
  onInView,
  getIntersectionContainer,
}: SentinelProps) => {
  const targetRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const target = targetRef.current;
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isInView = entries[0].isIntersecting;
        if (isInView) {
          onInView();
        }
      },
      {
        root: getIntersectionContainer(),
        rootMargin: '0px',
        threshold: 1,
      },
    );

    observer.observe(target);

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  });
  return <div ref={targetRef} />;
};
