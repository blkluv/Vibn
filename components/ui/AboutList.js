import moment from "moment";
import cn from "classnames";
import { useState } from "react";
import Link from "next/link";

export default function AboutList() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        onClick={() => setIsOpen(isOpen === false ? true : false)}
        className={cn(
          "cursor-pointer flex flex-row justify-between",
          isOpen ? "opacity-100" : "opacity-75 hover:opacity-100"
        )}
      >
        <h1>About</h1>
        <span>{moment("2007-01-26").fromNow(true)}</span>
      </div>

      {isOpen && (
        <div className="flex flex-col">
          <Link href="#">Personal Details</Link>
        </div>
      )}
    </div>
  );
}
