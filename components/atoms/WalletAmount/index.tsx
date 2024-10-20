import { Stack, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import { FormattedMessage } from 'react-intl';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { WalletIcon } from '@/public/icons';

type Props = PropsWithChildren<{
  onClickMax?: () => void;
}>;

const WalletAmount = ({ onClickMax, children }: Props) => {
  return (
    <Stack flexDirection={'row'} gap={'0.5rem'}>
      {onClickMax && (
        <Typography
          variant={'body2'}
          color={'primary.main'}
          onClick={onClickMax}
          sx={{ '&:hover': { cursor: 'pointer' } }}
        >
          <FormattedMessage id="SUMMARY.MAX" />
        </Typography>
      )}
      <Stack alignItems="center" flexDirection={'row'} gap={'0.25rem'}>
        <Icon
          src={WalletIcon}
          viewBox="0 0 16 16"
          sx={theme => ({ fill: 'transparent', stroke: theme.palette.neutrals.secondaryText, fontSize: '1rem' })}
        />
        <Typography variant={'body2'} color={'neutrals.secondaryText'}>
          {children}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default WalletAmount;
