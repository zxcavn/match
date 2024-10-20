import NextHead from 'next/head';
import { PropsWithChildren } from 'react';

type Props = {
  title?: string;
} & PropsWithChildren;

// todo add default title
const Page = ({ children, title = '' }: Props) => {
  return (
    <>
      <NextHead>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"
        />
        <meta name="keywords" content="CrossFi dApp, CrossFi blockchain" />

        <meta property="og:title" />
        <meta property="og:site_name" content="CrossFi dApp" />
        <meta property="og:url" content="/" />
        <meta property="og:description" />
        {/*//TODO: add meta image*/}
        {/*<meta property="og:image" content="/images/meta_console.png" />*/}
        <meta property="og:image:type" content="image/png" />

        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-config" content="/favicon/browserconfig.xml" />

        <title>xAPP </title>
      </NextHead>
      <noscript>no script</noscript>
      {children}
    </>
  );
};

export default Page;
