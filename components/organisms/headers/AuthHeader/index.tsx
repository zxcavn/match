import { Box, styled } from '@mui/material';

import { Icon, ThemeToggle } from '@/lib/xfi.lib/components/atoms';
import { LogoIcon } from '@/public/icons';

const StyledHeader = styled('header', { name: 'StyledHeader' })(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

type Props = { className?: string };

const AuthHeader = ({ className }: Props) => {
  return (
    <StyledHeader className={className}>
      <Icon
        src={LogoIcon}
        viewBox="0 0 179 42"
        sx={{
          width: { md: '10rem', xs: '8rem' },
          height: 'auto',
        }}
      />
      <Box display={'flex'} alignItems={'center'} gap={{ xs: '1rem', sm: '1.5rem' }}>
        <ThemeToggle size={'large'} />
      </Box>
    </StyledHeader>
  );
};

export default AuthHeader;
