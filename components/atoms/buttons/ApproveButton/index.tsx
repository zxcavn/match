import { FormattedMessage } from 'react-intl';

import { APP_COLORS } from '@/shared/constants';

import OperationButton, { OperationButtonProps } from '../OperationButton';

type ApproveButtonProps = Omit<OperationButtonProps, 'children' | 'color'> & {
  currency?: string;
};

const ApproveButton = ({ feeAmount, currency, ...buttonProps }: ApproveButtonProps) => {
  return (
    <OperationButton color={APP_COLORS.addLiquidity} feeAmount={feeAmount} {...buttonProps}>
      <FormattedMessage id="OPERATION.APPROVE" /> {currency?.toUpperCase()}
    </OperationButton>
  );
};

export default ApproveButton;
