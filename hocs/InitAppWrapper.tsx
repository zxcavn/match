import { PropsWithChildren, useEffect, useState } from 'react';

import { Loader } from '@/lib/xfi.lib/components/atoms';

import { Page } from '@/components/templates';

const InitAppWrapper = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //TODO: loading screen condition
    setLoading(false);
  }, []);

  return <Page>{loading ? <Loader variant="page" /> : children}</Page>;
};

export default InitAppWrapper;
