import Link from "next/link";
import React from "react";
import AppContainer from "../container/container";
import { FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <>
      <AppContainer>
        <div className="w-4/5 mx-auto py-2 md:mt-12 text-sm">
          <hr className="h-px bg-gray-500 opacity-30 border-0 mb-4" />
          <div className="flex items-center mx-auto text-gray-600 container justify-center md:justify-between py-2">
            <div>
              <span className="text-[16px]">
                © Powered by Aon 2023, All Rights Reserved{" "}
              </span>
            </div>
            <Link
              className="items-center gap-2 hidden md:flex"
              href="https://www.instagram.com/aon.iq/?hl=ar"
              rel="noopener noreferrer"
            >
              <span className="text-[20px] hover:underline focus-visible:underline">
                <FaInstagram />
              </span>
            </Link>
          </div>
        </div>
      </AppContainer>
    </>
  );
}

export default Footer;
