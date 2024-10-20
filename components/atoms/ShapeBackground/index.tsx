import { Box, styled } from '@mui/material';
import dynamic from 'next/dynamic';

import { FigureType } from '@/lib/xfi.lib/components/atoms/IconShape';
import { AppThemeVariant } from '@/lib/xfi.lib/theme';

const IconShape = dynamic(() => import('@/lib/xfi.lib/components/atoms/IconShape'), { ssr: false });

const ShapeBackground = ({
  className,
  figureType,
  width = 360,
  height = 360,
  cameraFov = 60,
}: {
  className?: string;
  figureType: FigureType;
  width?: number;
  height?: number;
  cameraFov?: number;
}) => {
  return (
    <StyledShapeBackground className={className}>
      <IconShape
        className={'shapeContainer'}
        figureType={figureType}
        width={width}
        height={height}
        cameraFov={cameraFov}
      />
      <div className={'bgContainer'} />
    </StyledShapeBackground>
  );
};

export default ShapeBackground;

const StyledShapeBackground = styled(Box, { name: 'StyledShapeBackground' })(({ theme }) => ({
  '& .bgContainer': {
    position: 'absolute',
    display: theme.palette.mode === AppThemeVariant.dark ? 'initial' : 'none',
    boxSizing: 'content-box',
    backgroundImage: 'url(/images/background/blur.webp)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',

    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));
