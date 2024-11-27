import React, { memo } from "react";

function MobileHeader() {
  return (
    <header className="w-full text-center">
      <h1 className="mx-[auto] my-[20px] text-center text-[16px] font-semibold">
        Konva Masking and Drawing Tool
      </h1>
      <p className="max-w-[92%] mx-[auto] my-[10px] text-center text-[13px] mb-[85px]">
        A web-based image manipulation tool built with React and Konva.js, allowing users to upload
        images, draw shapes (Brush, Lasso, Rectangle), and export masked images in PNG, JPG, or JPEG
        formats.
      </p>
    </header>
  );
}

export default memo(MobileHeader);
