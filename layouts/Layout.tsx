import React, { ReactElement, ReactNode, memo } from "react";
import MobileHeader from "./GeneralLayouts/Mobile/Header";

interface LayoutProps {
  children: ReactElement | ReactElement[] | ReactNode;
  activeIndex?: number;
  isMobile?: boolean;
}

function Layout(props: LayoutProps) {

  return (
    <>
      {props.isMobile ? (
        <>
          <MobileHeader />
          {props.children}
        </>
      ) : (
        <>
          {props.children}
        </>
      )}
    </>
  );
}

export default memo(Layout);
