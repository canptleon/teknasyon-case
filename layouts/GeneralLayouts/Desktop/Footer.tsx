import React, { memo } from "react";
import Link from "next/link";

function DesktopFooter() {
  return (
    <footer className="w-full my-[40px]">
      <div className="max-w-[1440px] mx-auto w-full px-[16px] md:px-[80px] flex flex-col items-center">
        <div className="flex justify-center space-x-8 mb-6">
          
        </div>
        <div className="text-center text-sm text-[black] pl-[20px] pr-[20px] font-semibold bg-[#ffffff] p-[5px] rounded-[50px]">
          &copy; 2024 Arda Keyişoğlu. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default memo(DesktopFooter);
