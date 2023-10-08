import SimpleBar from "simplebar-react";

export default function Horizon({ children }) {
  return (
    <SimpleBar forceVisible="y">
      <div className="mt-4 flex flex-row space-x-4 overflow-x-auto w-full">
        {children}
      </div>{" "}
    </SimpleBar>
  );
}
