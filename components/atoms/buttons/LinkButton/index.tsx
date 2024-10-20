import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import Link from 'next/link';

import { StyledLinkButton } from './styles';

type Props = {
  text: string;
  href: string;
  isActive: boolean;
  pageColor?: string;
};

const LinkButton = ({ text, href, isActive, pageColor }: Props) => (
  <Link href={href}>
    <StyledLinkButton className={clsx('step', { isActive })} $pageColor={pageColor}>
      <Typography
        variant={'h4_infynyte'}
        textTransform={'lowercase'}
        whiteSpace={'nowrap'}
        color={'neutrals.secondaryText'}
        zIndex={1}
      >
        {text}
      </Typography>
      <Box className={'line'} />
    </StyledLinkButton>
  </Link>
);

export default LinkButton;
