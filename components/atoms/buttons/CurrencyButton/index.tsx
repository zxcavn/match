import { Typography } from '@mui/material';
import { ElementType } from 'react';

import { Icon } from '@/lib/xfi.lib/components/atoms';
import { ThemeIcon } from '@/lib/xfi.lib/icons/types';

import { StylesCurrencyButton } from './styles';

export type Props<T> = {
  icon: ElementType | ThemeIcon;
  name: T;
  visibleName: string;
  isActive: boolean;
  handleClick: (value: T) => void;
};

const CurrencyButton = <T extends string>({ icon, name, visibleName, isActive, handleClick }: Props<T>) => {
  const onButtonClick = () => {
    handleClick(name);
  };

  return (
    <StylesCurrencyButton onClick={onButtonClick} value={name} $isActive={isActive}>
      <Icon className="icon" src={icon} viewBox="0 0 32 32" sx={{ fontSize: '2rem' }} />
      <Typography className="currency" variant="h4" color="background.light">
        {visibleName}
      </Typography>
    </StylesCurrencyButton>
  );
};

export default CurrencyButton;
