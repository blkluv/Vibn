import Head from "next/head";
import NavContent from "../ui/contents/NavContent";
import cn from "classnames";
import { useState } from "react";
import SimpleBar from "simplebar-react";

export default function Container({ children, title }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="leading-relaxed text-justify text-align-last-right hyphen-auto">
      <Head>
        <title>{title}</title>
      </Head>
      <div>
        <div
          className={cn(
            "transition-all duration-500 block md:hidden sm:hidden fixed bg-black dark:bg-white text-white dark:text-black ",
            isOpen
              ? "bottom-0 right-0 top-0 left-0 h-screen z-[99999999]"
              : "right-4 bottom-24  rounded-full w-12 h-12 z-[999]"
          )}
        >
          <button
            onClick={() => setIsOpen(true)}
            className={cn(isOpen && "hidden")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              class="main-grid-item-icon mt-3 ml-3"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
              <line x1="9" x2="9" y1="3" y2="21" />
            </svg>
          </button>
          {isOpen && (
            <div className="p-8"> 
              <button
                onClick={() => setIsOpen(false)}
                className="z-[99999999]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  class="main-grid-item-icon"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
              <br />
              <NavContent />
            </div>
          )}
        </div>
        <div className="overflow-y-auto fixed w-full md:w-1/6 sm:w-1/6 top-0 left-0 md:left-0 sm:left-0 p-12 md:px-4 hidden md:block sm:block">
          <NavContent />
        </div>
        <SimpleBar style={{ maxHeight: 999999 }}>
          <div className="fixed right-0 h-screen overflow-y-scroll w-full md:w-5/6 sm:w-5/6 px-6 md:px-10 sm:px-9 p-12 overflow-x-auto">
            <main className="mb-16">{children}</main>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
