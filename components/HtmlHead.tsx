import React, { memo } from "react";
import Head from "next/head";

interface Props {
  title: string;
}

function HtmlHead(props: Props) {
  const { title } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Welcome to my case."/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

      <link rel="icon" href={`/favicon.ico`} />
    </Head>
  );
}

export default memo(HtmlHead);
