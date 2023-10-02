import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import Huge from "@/components/ui/headings/Huge";
import Medium from "@/components/ui/headings/Medium";
import Vercel from "@/components/contents/vercel";
import Horizon from "@/components/layout/HorizonScroll";
import Dns from "@/components/contents/dns";

export default function Home() {
  return (
    <Container title="Geng Yue">
      <Huge>Explore</Huge>
      <Medium>Focus On</Medium>
      <Horizon>
        <Vercel />
      </Horizon>

      <Horizon>
        <Dns />
      </Horizon>

      <br />

      <Medium>Introduction</Medium>
      <br />
      <img src="/static/title.svg" />
      <br />
      <div className="opacity-75 flex flex-col space-y-2">
        <Huge>Hello.</Huge>
        <Huge>I'm currently a senior grade 2 student.</Huge>
        <Huge>
          Mostly I'm interested in <b>design, craft and personal websites</b>.
        </Huge>
        <Huge>It's nice to see you here man.</Huge>
        <br />

        <Huge>I'm current reading</Huge>
        <br />
        <Huge>
          <b>O'Henry's collection of short stories.</b>
        </Huge>
        <br />
        <Huge>
          <b>The unbearable lightness of life</b> by Milan Kundera.
        </Huge>
        <br />
        <Huge>
          <b>Immensee</b> by Storm.
        </Huge>

        <br />
        <div className="w-full sm:w-2/3 dark:text-red-200 text-red-600">
          <Huge>
            Sadly, my music service went down after Vercel has been blocked
            since Oct 1, 2023.
          </Huge>
        </div>
      </div>
    </Container>
  );
}
