import { Stack, Typography } from '@mui/material';
import { NumberFormatter } from '@xfi/formatters';

import { StakingToken } from '@/hooks/useStakingTokens';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { DropdownItem } from '@/lib/xfi.lib/components/atoms/inputs/LargeInput/LargeInput';
import { getIconBySymbol, TokenSymbol } from '@/shared/constants';

export type StakingFormValues = {
  tokenInAmount: string;
  tokenInCurrency: string;
};

export const STAKING_FORM_INITIAL_VALUES: StakingFormValues = {
  tokenInAmount: '',
  tokenInCurrency: TokenSymbol.lpXFI,
};

const renderLabel = (symbol: TokenSymbol) => {
  return (
    <Stack direction="row" alignItems="center" gap="0.5rem">
      <Icon src={getIconBySymbol(symbol)} viewBox="0 0 32 32" sx={{ fontSize: '1.5rem' }} />
      <Typography variant="body2" color="background.light">
        {symbol}
      </Typography>
    </Stack>
  );
};

export const getStakingDropdownConfig = (swapTokens: Pick<StakingToken, 'symbol'>[]): DropdownItem[] => {
  return swapTokens.map(token => ({
    label: renderLabel(token.symbol),
    value: token.symbol.toLowerCase(),
  }));
};

export const formatBalance = (balance: string) =>
  NumberFormatter.formatToDisplay(balance, {
    minFractionalLength: 2,
    maxFractionalLength: 6,
  });
