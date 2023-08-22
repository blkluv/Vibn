import { useTheme } from "next-themes";
import Head from "next/head";
import Lazyload from 'react-lazy-load'

export default function Beta() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="max-w-2xl px-6 md:px-12 sm:px-20 py-32 border-l border-neutral-200 dark:border-neutral-800 ml-2 md:mx-auto sm:mx-auto min-h-screen">
      <Head>
        <title>GENG YUE - STUDENT, SELF-TAUGHT DEVELOPER</title>
      </Head>

      <h1>GENG YUE</h1>
      <p className="opacity-75 mt-1">STUDENT, SELF-TAUGHT DEVELOPER</p>

      <p className="mt-16 text-xs text-red-600">
        Notice: I'm currently preparing for the National Colleage Entrance Exam
        in 2025. To focus on my study, I'll limit my online time. And I maybe
        slow to respond.
      </p>

      <div className="mt-32 leading-normal">
        <p>
          I'm now a senior grade 2 student of {""}
          <a href="http://www.ytyz.net/">
            Yantai No.1 Middle School of Shandong
          </a>{" "}
          and is also a self-taught developer. I'm not a good student, not a
          good developer, not writing good codes, not a good minimalist. BUT I
          always have dream. I want to build something, for there is something
          which I haven't gained. Like the saying "Because it is there!"
        </p>
      </div>

      <div className="mt-32 leading-normal">
        <h1>TOPIC</h1>

        <p className="mt-1">
          1. The summer vacation is going to be end in less than 2 days (we are
          going to start a new term in Aug 24, 2023.). This is horrible.
        </p>

        <p className="mt-4">
          2. I've finished most of the work of building {""}
          <a href="https://music.gengyue.eu.org">The DM Music Company (?)</a>.
          Thus I've registed a domain for it to use seperatedly, I shall be
          waiting for months till it was checked I thought :(
        </p>

        <div className="flex flex-col space-y-6 mt-8">
          <div className="">
            <Lazyload offset={25}>
              <img src="/static/main.png" alt="main page" />
            </Lazyload>

            <p className="mt-1 text-xs opacity-75">
              This is the homepage of DM Music.
            </p>
          </div>

          <div className="mt-4">
            <Lazyload offset={25}>
              <img src="/static/play.png" alt="player page" />
            </Lazyload>

            <p className="mt-1 text-xs opacity-75">
              This is the player page of DM Music.
            </p>
          </div>
        </div>

        <p className="mt-8">
          3. I got a new physical teacher. That's exciting!
        </p>
      </div>

      <div className="mt-32 leading-normal">
        <h1>THOUGHTS</h1>
        <p className="mt-1">
          Why do everyone around me is always in a hurry. Even across China,
          everyone is in a hurry. We rushed out of the door to go to school at
          6:50 a.m. and rushed back home at 9:30 p.m.. Can we stop to slowing
          down, is everyday is just blur? That's the question we really need to
          consider seriously.
        </p>

        <p className="text-right mt-4 text-xs opacity-75">
          Last published on Aug 22, 2023.
        </p>
      </div>

      <div className="mt-32 leading-normal">
        <h1>CONNECT</h1>
        <p className="mt-1">
          I DO NOT using social media frequently, but if you wanna get contact
          with me. You can do it by the following:
        </p>

        <div className="mt-12 flex flex-col space-y-4">
          <div>
            <p className="mb-1 text-xs opacity-75">GitHub</p>
            <a href="https://github.com/Cloudflare233">@Cloudflare233</a>
          </div>

          <div>
            <p className="mb-1 text-xs opacity-75">E-mail</p>
            <a href="mailto:Cloudflare233@yandex.com">
              Cloudflare233@yandex.com
            </a>
          </div>
        </div>
        <div className="mt-32"></div>
        <p className="text-xs mb-1">
          <span className="opacity-75 mr-1">
            The default theme doesn't suit you?
          </span>
          <span
            className="cursor-pointer"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Change Theme
          </span>
        </p>

        <p className="mb-1 text-xs opacity-75">
          Site last released Aug 22, 2023. © 2023 Geng Yue.
        </p>
      </div>
    </div>
  );
}
