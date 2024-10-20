import { Stack, StackProps, Typography } from '@mui/material';
import { formatAddressToDisplay } from '@xfi/formatters';
import Link from 'next/link';
import { PropsWithChildren, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { CopyButton, Icon } from '@/lib/xfi.lib/components/atoms';
import { StyledLink } from '@/lib/xfi.lib/components/atoms/Link/styles';
import { LinkIcon } from '@/lib/xfi.lib/icons';
import { useMediaQuery } from '@/lib/xfi.lib/theme';

type Props = {
  hash: string;
  href?: string;
} & Pick<StackProps, 'className' | 'sx'>;

const TransactionHash = ({ hash, href, sx = {}, className }: Props) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
  const displayHashValue = useMemo(() => (isMobile ? formatAddressToDisplay(hash) : hash), [isMobile, hash]);

  const LinkContainer = ({ children }: PropsWithChildren) => {
    if (!href) return children;

    return (
      <Link target="_blank" className="ellipsis" href={href}>
        {children}
      </Link>
    );
  };

  return (
    <Stack
      className={className}
      gap="0.5rem"
      width="100%"
      sx={{
        padding: '1rem',
        borderRadius: '1rem',
        border: theme => `1px solid ${theme.palette.neutrals.border}`,
        '& .ellipsis': {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          width: 'initial',
        },
        ...sx,
      }}
    >
      <Typography variant="body2" color="neutrals.secondaryText">
        <FormattedMessage id="SUMMARY.TRANSACTION_HASH" />
      </Typography>
      <Stack direction="row" alignItems="center">
        <Stack
          display={'grid'}
          gridTemplateColumns={'auto auto'}
          alignItems="center"
          justifyContent={'start'}
          gap="0.25rem"
        >
          <Icon
            src={LinkIcon}
            viewBox="0 0 20 20"
            sx={{ fontSize: '1.25rem', '*': { stroke: theme => theme.palette.secondary.main } }}
          />
          <LinkContainer>
            <StyledLink className="ellipsis" color="background.light">
              {displayHashValue}
            </StyledLink>
          </LinkContainer>
        </Stack>
        <CopyButton hasText={false} sxProps={{ ml: '1rem' }} value={hash} />
      </Stack>
    </Stack>
  );
};

export default TransactionHash;
