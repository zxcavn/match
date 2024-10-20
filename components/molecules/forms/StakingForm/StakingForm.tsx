import { Box } from '@mui/material';
import { BigNumber } from 'ethers';
import { type ReactNode, ForwardedRef, forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import { useAppValidationRules } from '@/hooks';
import { StakingToken } from '@/hooks/useStakingTokens';
import { InputText, LargeInput } from '@/lib/xfi.lib/components/atoms';
import { FormBlock, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules';

import { WalletAmount } from '@/components/atoms';

import { formatBalance, getStakingDropdownConfig, STAKING_FORM_INITIAL_VALUES, StakingFormValues } from './helpers';
import { StyledFormContainer } from './styles';

export type StakingFormHandlers = {
  setFieldValue?: (field: keyof StakingFormValues, value: string, shouldValidate?: boolean) => void;
  resetForm?: () => void;
};

const INPUT_PLACEHOLDER: InputText = {
  type: 'text',
  text: '0',
};

type Props = {
  onChange?: (values: StakingFormValues) => void;
  onSubmit?: (values: StakingFormValues) => void;
  children: (props: { isDisabled?: boolean }) => ReactNode;
  stakingTokens: StakingToken[];
  maxButtonBalance: { balance: string | BigNumber; formattedBalance: string };
};

const StakingForm = (
  { onChange, onSubmit, stakingTokens, children, maxButtonBalance }: Props,
  ref: ForwardedRef<StakingFormHandlers>
) => {
  const { tokenInAmount: tokenInAmountValidationRules } = useAppValidationRules({
    tokenInBalance: maxButtonBalance.formattedBalance,
  });
  const handlersRef = useRef<StakingFormHandlers['setFieldValue']>();
  const dropdownConfig = useMemo(() => getStakingDropdownConfig(stakingTokens), [stakingTokens]);

  const { displayTokenInBalance } = useMemo(
    () => ({
      displayTokenInBalance: formatBalance(maxButtonBalance?.formattedBalance || '0'),
    }),
    [maxButtonBalance]
  );
  const isLoadingDropdownConfig = !dropdownConfig.length;

  const resetForm = useCallback(() => {
    handlersRef?.current?.('tokenInAmount', '', false);
    handlersRef?.current?.('tokenInCurrency', STAKING_FORM_INITIAL_VALUES.tokenInCurrency, false);
  }, []);

  useImperativeHandle(ref, () => ({
    setFieldValue: handlersRef.current,
    resetForm,
  }));

  return (
    <StyledFormContainer>
      <FormBlock<StakingFormValues>
        id="staking-form"
        cbSetField={cb => (handlersRef.current = cb)}
        observerHandler={onChange}
        onSubmit={onSubmit}
        initialValues={STAKING_FORM_INITIAL_VALUES}
        validationRules={{ tokenInAmount: tokenInAmountValidationRules }}
        inputsData={[
          {
            type: FormBlockInputTypesEnum.component,
            inputProps: {
              render: ({ getField, handleBlur, handleChange, setFieldValue }) => {
                const { value: tokenInAmount, error: tokenInAmountError } = getField('tokenInAmount');
                const { value: tokenInCurrency } = getField('tokenInCurrency');

                return (
                  <Box position="relative">
                    <LargeInput
                      type="dropdown"
                      id="tokenInAmount"
                      name="tokenInAmount"
                      inputType="number"
                      value={tokenInAmount}
                      placeholder={INPUT_PLACEHOLDER}
                      label={{ type: 'intl', id: 'SUMMARY.YOU_SEND' }}
                      isError={!!tokenInAmountError}
                      caption={tokenInAmountError ? { type: 'text', text: tokenInAmountError } : undefined}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      dropdownConfig={dropdownConfig}
                      dropdownValue={tokenInCurrency}
                      isEditable={!isLoadingDropdownConfig}
                      isDisabled={isLoadingDropdownConfig}
                      onDropdownChange={currency => setFieldValue('tokenInCurrency', currency)}
                      action={
                        <WalletAmount
                          onClickMax={
                            isLoadingDropdownConfig
                              ? undefined
                              : () => setFieldValue('tokenInAmount', maxButtonBalance.formattedBalance)
                          }
                        >
                          {displayTokenInBalance}
                        </WalletAmount>
                      }
                    />
                  </Box>
                );
              },
            },
          },
          {
            type: FormBlockInputTypesEnum.component,
            inputProps: {
              render: ({ isDisabled }) => children({ isDisabled: isDisabled || isLoadingDropdownConfig }),
            },
          },
        ]}
      />
    </StyledFormContainer>
  );
};

export default forwardRef(StakingForm);
