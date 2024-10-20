import { redirect } from '@xfi/helpers';
import { useIsomorphicLayoutEffect } from '@xfi/hooks';
import { useRouter } from 'next/router';
import { ComponentType, useState } from 'react';

import { useIsAuthenticated } from '@/hooks';
import { PAGES } from '@/shared/constants';

const withAuth = <T extends object>(Wrapped: ComponentType<T>) => {
  return function WithAuthWrapper(props: T) {
    const { isReady: isRouterReady } = useRouter();
    const [redirecting, setRedirecting] = useState(false);
    const isAuthenticated = useIsAuthenticated();

    const handleRedirect = async (path: string) => {
      setRedirecting(true);
      await redirect(path);
      setRedirecting(false);
    };

    useIsomorphicLayoutEffect(() => {
      if (isRouterReady) {
        !isAuthenticated && handleRedirect(PAGES.join.pathname);
      }
    }, [isRouterReady, isAuthenticated]);

    if (redirecting || !isAuthenticated) return null;

    return <Wrapped {...props} />;
  };
};

export default withAuth;