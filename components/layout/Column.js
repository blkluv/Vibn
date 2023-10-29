import cn from "classnames";
import React, { useState } from "react";

export default function Column({ children, mdCols, smCols, cols }) {
  const [more, setMore] = useState(false);
  const parsedCols = parseInt(cols);
  const pcCols = parsedCols.toString();

  return (
    <div className={cn("mt-4 relative")}>
      <div className="sticky top-0 z-[60]">
        <button
          className="z-[60] absolute text-sm bg-neutral-200/75 dark:bg-neutral-800/75 right-4 top-1 backdrop-blur-3xl rounded-md px-2.5 py-1 text-neutral-600 dark:text-neutral-400"
          onClick={() => setMore(!more)}
        >
          {more ? "折叠显示" : "显示全部"}
        </button>
      </div>

      <div
        className={cn(
          `grid grid-cols-${smCols} md:grid-cols-${mdCols} sm:grid-cols-${pcCols}`
        )}
      >
        {React.Children.map(children, (child, index) => {
          const shouldHide = more === false && index >= parsedCols * 2; // 隐藏元素

          return (
            <div
              className={cn("relative", { hidden: shouldHide })}
              style={{ gridColumn: `span ${shouldHide ? 0 : 1}` }}
            >
              {child}
            </div>
          );
        })}
      </div>
    </div>
  );
}
