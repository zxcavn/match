import { Box } from '@mui/material';
import { useMemo } from 'react';

import { getPercent } from '../helpers';
import { StyledSegmentedProgressLine } from './styles';

export const TEST_ID = 'segmented-progress-line-test-id';
export const SEGMENT_TEST_ID = 'segment-test-id';

type Segment = {
  background: string;
  value: number;
};

type SegmentWithPercent = Segment & {
  percent: string | number;
};

type Props = {
  segments?: Segment[];
  className?: string;
};

const SegmentedProgressLine = ({ segments, className }: Props) => {
  const { segmentsToRender, isEmpty } = useMemo(() => {
    const totalValue = (segments || []).reduce((acc, segment) => acc + segment.value, 0);
    const segmentsToRender: SegmentWithPercent[] = [];

    (segments || []).forEach(segment => {
      if (segment.value > 0) {
        segmentsToRender.push({ ...segment, percent: getPercent({ currentValue: segment.value, totalValue }) });
      }
    });

    const isEmpty = !segmentsToRender.length;

    return { segmentsToRender, isEmpty };
  }, [segments]);

  return (
    <StyledSegmentedProgressLine $isEmpty={isEmpty} className={className} data-testid={TEST_ID}>
      {segmentsToRender?.map(item => (
        <Box
          className={'progress'}
          key={item.background}
          sx={{
            background: item.background,
            width: `${item.percent}%`,
          }}
          data-testid={SEGMENT_TEST_ID}
        />
      ))}
    </StyledSegmentedProgressLine>
  );
};

export default SegmentedProgressLine;
