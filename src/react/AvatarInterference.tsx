import { useEffect, useRef } from 'react';
import { generateAvatar } from '../themes/interference/index.js';
import type { InterferenceOptions } from '../themes/interference/types.js';

export interface AvatarInterferenceProps extends Partial<Omit<InterferenceOptions, 'id' | 'size'>> {
  /** Unique identifier for deterministic generation */
  id: string;
  /** Canvas size in pixels (default: 256) */
  size?: number;
  /** Optional className for the canvas element */
  className?: string;
  /** Optional inline styles for the canvas element */
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Generate avatar directly into the canvas ref
    const canvas = generateAvatar({ 
      id, 
      size, 
      canvas: canvasRef.current,
      ...options 
    });

    // Trigger callback
    onGenerate?.(canvas);
  }, [id, size, JSON.stringify(options)]);

  return <canvas ref={canvasRef} className={className} style={style} />;
}
