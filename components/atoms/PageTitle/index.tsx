import { alpha, Stack, styled, tooltipClasses, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { Tooltip } from '@/lib/xfi.lib/components/atoms';
import { shouldForwardProp } from '@/lib/xfi.lib/helpers';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

export type Props = {
  /** @type {FormattedMessageId}  */
  title: string;
  /** @type {FormattedMessageId}  */
  infoText?: string;
  pageColor: string;
};

const PageTitle = ({ title, infoText, pageColor }: Props) => (
  <StyledPageTitleContainer>
    <Typography variant={'h1'} textAlign={'center'} fontSize={'4rem'} lineHeight={'4.5rem'}>
      <FormattedMessage id={title} />
    </Typography>
    {infoText && <Info pageColor={pageColor} className="info" text={infoText} />}
  </StyledPageTitleContainer>
);

type InfoProps = {
  text: string;
  pageColor: string;
  className?: string;
};

const Info = ({ text, className, pageColor }: InfoProps) => {
  const [isShow, setIsShow] = useState(false);
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const placement = isMobile ? 'bottom' : 'right-start';
  const offset = useMemo(() => (isMobile ? [0, 15] : [0, -5]), [isMobile]);

  return (
    <StyledTooltip
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: offset,
              },
            },
          ],
        },
      }}
      open={isShow}
      placement={placement}
      title={text}
    >
      <StyledInfo
        onMouseEnter={() => setIsShow(true)}
        onMouseLeave={() => setIsShow(false)}
        $pageColor={pageColor}
        className={className}
      >
        ?
      </StyledInfo>
    </StyledTooltip>
  );
};

const StyledTooltip = styled(Tooltip, { name: 'StyledTooltip' })(({ theme }) => ({
  [`&& .${tooltipClasses.tooltip}`]: {
    borderRadius: '1rem',
    height: 'fit-content',
    padding: '0.75rem 1rem',
    ...theme.typography.body2,
    maxWidth: '13.5rem',
  },
}));

const StyledPageTitleContainer = styled(Stack, { name: 'StyledPageTitleContainer' })(({ theme }) => ({
  position: 'relative',
  justifyContent: 'center',
  flexDirection: 'row',
  width: 'fit-content',

  '& .info': {
    position: 'absolute',
    top: 0,
    right: '-2.5rem',

    [theme.breakpoints.down('md')]: {
      right: '-2rem',
    },
  },
}));

const StyledInfo = styled('div', { name: 'StyledInfo', shouldForwardProp })<{ $pageColor: string }>(
  ({ theme, $pageColor }) => ({
    height: '2rem',
    width: '2rem',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.typography.body1,
    fontSize: '1rem',
    lineHeight: '1.125rem',
    color: theme.palette.primary.main,
    background: alpha($pageColor, 0.15),
    boxShadow: `0px 2.67px 2.67px 0px ${alpha($pageColor, 0.5)} inset`,
    cursor: 'pointer',

    [theme.breakpoints.down('md')]: {
      height: '1.5rem',
      width: '1.5rem',
    },
  })
);

export default PageTitle;
