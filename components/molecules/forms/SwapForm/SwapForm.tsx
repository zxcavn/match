import { Box } from '@mui/material';
import { ForwardedRef, forwardRef, ReactNode, useCallback, useImperativeHandle, useMemo, useRef } from 'react';

import { useAppValidationRules } from '@/hooks';
import type { SwapToken } from '@/hooks/useSwapTokenList';
import { Icon, InputText, LargeInput } from '@/lib/xfi.lib/components/atoms';
import { FormBlock, FormBlockInputTypesEnum } from '@/lib/xfi.lib/components/molecules';
import { ArrowUpDownIcon } from '@/public/icons';

import { WalletAmount } from '@/components/atoms';

import { formatBalance, getSwapDropdownConfig, SWAP_FORM_INITIAL_VALUES } from './helpers';
import { StyledFormContainer, StyledSwapButton } from './styles';

export type SwapFormValues = {
  tokenInAmount: string;
  tokenInCurrency: string;

  tokenOutAmount: string;
  tokenOutCurrency: string;
};

export type SwapFormHandlers = {
  setFieldValue?: (field: keyof SwapFormValues, value: string, shouldValidate?: boolean) => void;
  resetForm?: () => void;
};

const INPUT_PLACEHOLDER: InputText = {
  type: 'text',
  text: '0',
};

type Props = {
  onChange?: (values: SwapFormValues) => void;
  onSubmit?: (values: SwapFormValues) => void;
  children: (props: { isDisabled?: boolean }) => ReactNode;
  swapTokens: SwapToken[];
  tokenInBalance: string;
  tokenOutBalance: string;
};

const SwapForm = (
  { onChange, onSubmit, swapTokens, children, tokenInBalance, tokenOutBalance }: Props,
  ref: ForwardedRef<SwapFormHandlers>
) => {
  const { tokenInAmount: tokenInAmountValidationRules } = useAppValidationRules({ tokenInBalance });
  const handlersRef = useRef<SwapFormHandlers['setFieldValue']>();
  const dropdownConfig = useMemo(() => getSwapDropdownConfig(swapTokens), [swapTokens]);
  const { displayTokenInBalance, displayTokenOutBalance } = useMemo(
    () => ({
      displayTokenInBalance: formatBalance(tokenInBalance),
      displayTokenOutBalance: formatBalance(tokenOutBalance),
    }),
    [tokenInBalance, tokenOutBalance]
  );
  const isLoadingDropdownConfig = !dropdownConfig.length;

  const resetForm = useCallback(() => {
    handlersRef?.current?.('tokenInAmount', '', false);
    handlersRef?.current?.('tokenOutAmount', '', false);
    handlersRef?.current?.('tokenInCurrency', SWAP_FORM_INITIAL_VALUES.tokenInCurrency, false);
    handlersRef?.current?.('tokenOutCurrency', SWAP_FORM_INITIAL_VALUES.tokenOutAmount, false);
  }, []);

  useImperativeHandle(ref, () => ({
    setFieldValue: handlersRef.current,
    resetForm,
  }));

  return (
    <StyledFormContainer>
      <FormBlock<SwapFormValues>
        id="swap-form"
        cbSetField={cb => (handlersRef.current = cb)}
        observerHandler={onChange}
        onSubmit={onSubmit}
        initialValues={SWAP_FORM_INITIAL_VALUES}
        validationRules={{ tokenInAmount: tokenInAmountValidationRules }}
        inputsData={[
          {
            type: FormBlockInputTypesEnum.component,
            inputProps: {
              render: ({ getField, handleBlur, handleChange, setFieldValue }) => {
                const { value: tokenInAmount, error: tokenInAmountError } = getField('tokenInAmount');
                const { value: tokenOutAmount } = getField('tokenOutAmount');
                const { value: tokenInCurrency } = getField('tokenInCurrency');
                const { value: tokenOutCurrency } = getField('tokenOutCurrency');
                const config = dropdownConfig.filter(
                  ({ value }) => value.toLowerCase() !== tokenOutCurrency.toLowerCase()
                );

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
                      dropdownConfig={config}
                      dropdownValue={tokenInCurrency}
                      isEditable={!isLoadingDropdownConfig}
                      isDisabled={isLoadingDropdownConfig}
                      onDropdownChange={currency => setFieldValue('tokenInCurrency', currency)}
                      action={
                        <WalletAmount
                          onClickMax={
                            isLoadingDropdownConfig ? undefined : () => setFieldValue('tokenInAmount', tokenInBalance)
                          }
                        >
                          {displayTokenInBalance}
                        </WalletAmount>
                      }
                    />
                    <StyledSwapButton
                      onClick={() => {
                        setFieldValue('tokenInCurrency', tokenOutCurrency);
                        setFieldValue('tokenOutCurrency', tokenInCurrency);
                        setFieldValue('tokenInAmount', tokenOutAmount);
                        setFieldValue('tokenOutAmount', tokenInAmount);
                      }}
                      variant="secondary"
                      size="largeIcon"
                    >
                      <Icon src={ArrowUpDownIcon} viewBox="0 0 20 20" sx={{ fontSize: '1.25rem' }} />
                    </StyledSwapButton>
                  </Box>
                );
              },
            },
          },
          {
            type: FormBlockInputTypesEnum.component,
            inputProps: {
              render: ({ getField, setFieldValue }) => {
                const { value: tokenOutAmount } = getField('tokenOutAmount');
                const { value: tokenOutCurrency } = getField('tokenOutCurrency');
                const { value: tokenInCurrency } = getField('tokenInCurrency');
                const config = dropdownConfig.filter(
                  ({ value }) => value.toLowerCase() !== tokenInCurrency.toLowerCase()
                );

                return (
                  <LargeInput
                    inputType="number"
                    type="dropdown"
                    id="tokenOutAmount"
                    name="tokenOutAmount"
                    value={tokenOutAmount}
                    placeholder={INPUT_PLACEHOLDER}
                    label={{ type: 'intl', id: 'SUMMARY.YOU_RECEIVE' }}
                    isEditable={false}
                    dropdownConfig={config}
                    dropdownValue={tokenOutCurrency}
                    onDropdownChange={currency => setFieldValue('tokenOutCurrency', currency)}
                    action={<WalletAmount>{displayTokenOutBalance}</WalletAmount>}
                  />
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

export default forwardRef(SwapForm);
