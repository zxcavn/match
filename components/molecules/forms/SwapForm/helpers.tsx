import { Stack, Typography } from '@mui/material';
import { NumberFormatter } from '@xfi/formatters';

import { SwapToken } from '@/hooks/useSwapTokenList';
import { Icon } from '@/lib/xfi.lib/components/atoms';
import { DropdownItem } from '@/lib/xfi.lib/components/atoms/inputs/LargeInput/LargeInput';
import { CURRENCIES } from '@/lib/xfi.lib/constants';
import { getIconBySymbol, TokenSymbol } from '@/shared/constants';

import type { SwapFormValues } from './SwapForm';

export const SWAP_FORM_INITIAL_VALUES: SwapFormValues = {
  tokenInAmount: '',
  tokenInCurrency: TokenSymbol.xfi,

  tokenOutAmount: '',
  tokenOutCurrency: TokenSymbol.usdt,
};

const renderLabel = ({ displayName, symbol }: { displayName?: string; symbol: TokenSymbol }) => {
  return (
    <Stack direction="row" alignItems="center" gap="0.5rem">
      <Icon src={getIconBySymbol(symbol)} viewBox="0 0 32 32" sx={{ fontSize: '1.5rem' }} />
      <Typography variant="body2" color="background.light">
        {displayName || symbol}
      </Typography>
    </Stack>
  );
};

export const getSwapDropdownConfig = (swapTokens: SwapToken[]): DropdownItem[] => {
  if (!swapTokens.length) {
    return [
      {
        label: renderLabel({
          displayName: SWAP_FORM_INITIAL_VALUES.tokenInCurrency.toUpperCase(),
          symbol: SWAP_FORM_INITIAL_VALUES.tokenInCurrency as TokenSymbol,
        }),
        value: SWAP_FORM_INITIAL_VALUES.tokenInCurrency,
      },
      {
        label: renderLabel({
          displayName: SWAP_FORM_INITIAL_VALUES.tokenOutCurrency.toUpperCase(),
          symbol: SWAP_FORM_INITIAL_VALUES.tokenOutCurrency as TokenSymbol,
        }),
        value: SWAP_FORM_INITIAL_VALUES.tokenOutCurrency,
      },
    ];
  }

  return swapTokens.map(token => ({
    label: renderLabel({
      symbol: token.data.symbol,
      displayName: token.data.symbol === TokenSymbol.xfi ? CURRENCIES.xfi.text : token.data.symbol,
    }),
    value: token.data.symbol.toLowerCase(),
  }));
};

export const formatBalance = (balance: string) =>
  NumberFormatter.formatToDisplay(balance, {
    minFractionalLength: 2,
    maxFractionalLength: 6,
  });
