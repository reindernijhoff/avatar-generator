import { useEffect, useRef } from 'react';
import { generateAvatar } from '../themes/interference/index.js';
import type { InterferenceOptions } from '../themes/interference/types.js';

export interface AvatarInterferenceProps extends Partial<Omit<InterferenceOptions, 'id' | 'size'>> {
  /** Unique identifier for deterministic generation */
  id: string;
  /** Canvas size in pixels (default: 256) */
  size?: number;
  /** Optional className for the container div */
  className?: string;
  /** Optional inline styles for the container div */
  style?: React.CSSProperties;
  /** Callback when avatar is generated */
  onGenerate?: (canvas: HTMLCanvasElement) => void;
}

/**
 * Interference Avatar React Component
 * 
 * @example
 * ```tsx
 * <AvatarInterference 
 *   id="user@example.com" 
 *   size={256}
 *   sources={3}
 * />
 * ```
 */
export function AvatarInterference({
  id,
  size = 256,
  className,
  style,
  onGenerate,
  ...options
}: AvatarInterferenceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = generateAvatar({ id, size, ...options });
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(canvas);
    }
    
    onGenerate?.(canvas);
  }, [id, size, JSON.stringify(options)]);

  return <div ref={containerRef} className={className} style={style} />;
}
