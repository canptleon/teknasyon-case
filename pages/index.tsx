import React from "react";
import { getNativeWebDevice } from "@/utils/formatting/render";
import DesktopHomepageLayout from "@/layouts/HomepageLayouts/Desktop";
import MobileHomepageLayout from "@/layouts/HomepageLayouts/Mobile";
import Layout from "@/layouts/Layout";
import HtmlHead from "@/components/HtmlHead";

interface Props {
  isMobile: boolean;
}

function Homepage(props: Props) {
  const {
    isMobile,
  } = props;

  return (
    <>
      <HtmlHead 
        title="Teknasyon Case"
      />
      <Layout isMobile={isMobile}>
        {isMobile ? (
          <MobileHomepageLayout />
        ) : (
          <DesktopHomepageLayout />
        )}
      </Layout>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const userAgent = context.req.headers["user-agent"] || "";
  const deviceType = getNativeWebDevice(userAgent);

  const props: Props = {
    isMobile: deviceType === "Mobile",
  };

  return { props };
}

export default Homepage;
