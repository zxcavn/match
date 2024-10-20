import { useRouter } from 'next/router';

const useIsRootPage = () => {
  const { asPath, pathname } = useRouter();

  return pathname === '/' && asPath === '/';
};

export default useIsRootPage;
