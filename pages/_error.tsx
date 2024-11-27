import React from "react";
import HtmlHead from "@/components/HtmlHead";
import NotFound from "@/layouts/NotFound";
import Layout from "@/layouts/Layout";
import { getNativeWebDevice } from "@/utils/formatting/render";

interface Props {
  isMobile: boolean;
}

function Error(props: Props) {
  const {
    isMobile
  } = props;

  return (
    <>
      <HtmlHead title="Sayfa Bulunamadı"/>
      <Layout isMobile={isMobile}>
        <NotFound/>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {

  const userAgent = context.req.headers['user-agent'] || '';
  const deviceType = getNativeWebDevice(userAgent);
 
  const props: Props = {
    isMobile: deviceType === "Mobile"
  };

  return { props };
}


export default Error;
