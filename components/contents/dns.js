import InvertButton from "../ui/buttons/InvertButton";

export default function Dns() {
  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 rounded-xl w-full sm:w-3/4 h-auto sm:h-auto border border-neutral-200 dark:border-neutral-800 relative">
      <div className="px-6 sm:px-16 py-8 sm:py-12">
        <h1>More related info: </h1>
        <p>
          1. The domains all point to the correct ips, which means the DNS works
          fine.
        </p>
        <p>
          2. But (almost) all of the requests are redirected to "Anti-Fraud"
          pages or simply cannot be accessed (ERR_CONNECTION_RESET).{" "}
        </p>
        <p>
          3. Seems like most of Vercel's Anycast ip's have been hijacked or
          blocked.
        </p>
        <p>
          Here are some of the response headers when accessing a Vercel site in
          CNmainland: China Telecom in Sichuan, Chengdu
        </p>
        <br />
        <InvertButton
          onClick={() =>
            open("https://github.com/orgs/vercel/discussions/4308")
          }
        >
          See the Details
        </InvertButton>
      </div>
    </div>
  );
}
