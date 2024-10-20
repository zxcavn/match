import { Box, styled } from '@mui/material';

import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { WithKeyPrefix } from '@/shared/types';

type Px = number;
type Percent = number;

export type GlowProps = {
  color: string;
} & Partial<{
  opacity: number;
  width: Px;
  height: Px;
  rotation: number;
  /**
   * Transform origin is center of glow box
   */
  x: Percent;
  y: Percent;
  blur: number;
}>;

export const DEFAULT_GLOW_PROPS: Omit<Required<GlowProps>, 'color'> = {
  width: 210,
  height: 460,
  x: 105,
  y: 50,
  rotation: 45,
  opacity: 0.45,
  blur: 60,
};

const Glow = ({ color, width, height, rotation, x, y, opacity, blur }: GlowProps) => {
  return (
    <StyledGlowContainer
      {...{
        $color: color,
        $opacity: opacity ?? DEFAULT_GLOW_PROPS.opacity,
        $width: width ?? DEFAULT_GLOW_PROPS.width,
        $height: height ?? DEFAULT_GLOW_PROPS.height,
        $rotation: rotation ?? DEFAULT_GLOW_PROPS.rotation,
        $x: x ?? DEFAULT_GLOW_PROPS.x,
        $y: y ?? DEFAULT_GLOW_PROPS.y,
        $blur: blur ?? DEFAULT_GLOW_PROPS.blur,
      }}
    />
  );
};

const getPositionStyles = (positionPercent: number, offset: number): string => {
  if (!positionPercent) {
    return `-${offset}px`;
  }

  return `calc(-${offset}px + ${positionPercent}%)`;
};

type GlowContainerProps = WithKeyPrefix<Required<GlowProps>, '$'>;

const StyledGlowContainer = styled(Box, { name: 'StyledGlowContainer', shouldForwardProp })<GlowContainerProps>(
  ({ $color, $opacity, $width, $height, $rotation, $x, $y, $blur }) => {
    const transformOriginOffset = {
      x: $width / 2,
      y: $height / 2,
    };

    return {
      zIndex: 1,
      position: 'absolute',
      width: `${$width}px`,
      height: `${$height}px`,
      borderRadius: '50%',
      pointerEvents: 'none',
      background: $color,
      opacity: $opacity,
      filter: `blur(${$blur}px)`,
      top: getPositionStyles($y, transformOriginOffset.y),
      left: getPositionStyles($x, transformOriginOffset.x),
      transform: `rotate(${$rotation}deg) scale(1.1)`,
    };
  }
);

export default Glow;
