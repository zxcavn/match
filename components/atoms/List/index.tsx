import { Stack, styled, Typography } from '@mui/material';
import { type ReactNode, Fragment } from 'react';

import { Divider } from '@/lib/xfi.lib/components/atoms';

import Block from '../Block';

type Props = {
  title: ReactNode;
  rows: ListRowProps[];
};

const List = ({ title, rows }: Props) => (
  <Block title={<Typography variant={'h4'}>{title}</Typography>}>
    <Stack gap={'2rem'} mt={'3rem'} divider={<Divider />}>
      {rows.map((row, index) => (
        <Fragment key={index}>
          <ListRow label={row.label} value={row.value} />
        </Fragment>
      ))}
    </Stack>
  </Block>
);

type ListRowProps = {
  label: ReactNode;
  value: ReactNode;
};

const ListRow = ({ label, value }: ListRowProps) => (
  <StyledListRowWrapper>
    <div>{label}</div>
    <div>{value}</div>
  </StyledListRowWrapper>
);

const StyledListRowWrapper = styled(Stack, { name: 'StyledListRowWrapper' })(({ theme }) => ({
  justifyContent: 'space-between',
  gap: '1rem',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

export default List;
