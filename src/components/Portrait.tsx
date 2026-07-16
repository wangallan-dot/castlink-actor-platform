import type { CSSProperties } from 'react';

type PortraitProps = {
  name: string;
  initials: string;
  gradient: string;
  accent?: string;
  className?: string;
};

export function Portrait({ name, initials, gradient, accent, className = '' }: PortraitProps) {
  return (
    <div
      className={`portrait ${className}`}
      style={{ '--portrait-gradient': gradient } as CSSProperties}
      role="img"
      aria-label={`${name}的演员形象占位图`}
    >
      <div className="portrait-noise" />
      <div className="portrait-orbit portrait-orbit-a" />
      <div className="portrait-orbit portrait-orbit-b" />
      <div className="portrait-initials">{initials}</div>
      {accent && <span className="portrait-accent">{accent}</span>}
    </div>
  );
}
