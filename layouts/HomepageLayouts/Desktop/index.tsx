import React from "react";
import dynamic from "next/dynamic";

const KonvaCanvas = dynamic(() => import("../../../components/Desktop/KonvaCanvas"), {
  ssr: false,
});

function DesktopHomepageLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[83vh]">
      <KonvaCanvas />
    </div>
  );
}

export default DesktopHomepageLayout;