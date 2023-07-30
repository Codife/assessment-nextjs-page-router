import React from "react";
import Head from "next/head";
import { RecoilRoot } from 'recoil';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>NextJs Assessment</title>
        <meta name="description" content="NextJs assessment for job." />
      </Head>
      <main>{children}</main>
    </RecoilRoot>
  );
};

export default Layout;
