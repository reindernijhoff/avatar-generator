import { useEffect, useRef } from 'react';
import { generateAvatar } from '../themes/digidoodle/index.js';
import type { DigiDoodleOptions } from '../themes/digidoodle/types.js';

export interface AvatarDigiDoodleProps extends Partial<Omit<DigiDoodleOptions, 'id' | 'size'>> {
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
 * DigiDoodle Avatar React Component
 * 
 * @example
 * ```tsx
 * <AvatarDigiDoodle 
 *   id="user@example.com" 
 *   size={256}
 *   gridSize={8}
 *   density={0.5}
 * />
 * ```
 */
export function AvatarDigiDoodle({
  id,
  size = 256,
  className,
  style,
  onGenerate,
  ...options
}: AvatarDigiDoodleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Generate new avatar
    const canvas = generateAvatar({ id, size, ...options });
    canvasRef.current = canvas;

    // Mount to DOM
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
      containerRef.current.appendChild(canvas);
    }

    // Trigger callback
    onGenerate?.(canvas);
  }, [id, size, JSON.stringify(options)]);

  return <div ref={containerRef} className={className} style={style} />;
}
