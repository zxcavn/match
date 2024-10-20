import { NumberFormatter } from '@xfi/formatters';
import { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { useValidationRules, ValidationData } from '@/lib/xfi.lib/hooks';
import { MAX_DECIMALS_COUNT, ZERO } from '@/shared/constants';

type AppValidationData = ValidationData & { tokenInBalance?: string };

export const useAppValidationRules = (data: AppValidationData = {}) => {
  const validationRules = useValidationRules(data);
  const { formatMessage } = useIntl();
  const { validNumber } = useValidationRules();

  const tokenInBalance = data?.tokenInBalance || ZERO.toString();

  return useMemo(
    () => ({
      ...validationRules,
      tokenInAmount: validNumber.test(
        'isExceedBalance',
        formatMessage({ id: 'ERRORS.EXCEEDS_BALANCE' }),
        value =>
          !!value &&
          NumberFormatter.parseUnits(value, MAX_DECIMALS_COUNT) <=
            NumberFormatter.parseUnits(tokenInBalance, MAX_DECIMALS_COUNT)
      ),
    }),
    [validationRules, tokenInBalance, validNumber]
  );
};

export default useAppValidationRules;
