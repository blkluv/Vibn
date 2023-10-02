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
      <div className="text-neutral-700 dark:text-neutral-300 flex flex-col space-y-2">
        <Huge>Hello.</Huge>
        <Huge>I'm currently a senior grade 2 student.</Huge>
        <Huge>
          Mostly I'm interested in <b>design, craft and personal websites</b>.
        </Huge>
        <Huge>It's nice to see you here man.</Huge>
        <br />

        <Huge>I'm current reading</Huge>
        <br />
        <img src="/static/17_1594953929397087142.jpg" className="rounded-xl w-1/2 md:w-1/6 sm:w-1/6" />
        <Huge>
          <b>O'Henry's collection of short stories.</b>
        </Huge>
        <br />
        <img src="/static/u=81140869,825352128&fm=224&app=112&f=JPEG.jpg" className="rounded-xl w-3/4 md:w-1/4 sm:w-1/4" />
        <Huge>
          <b>The Unbearable Lightness of Being</b> by Milan Kundera.
        </Huge>
        <br />
        <img src="/static/u=2567528224,3866395835&fm=224&app=112&f=JPEG.jpg" className="rounded-xl w-1/2 md:w-1/6 sm:w-1/6" />
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
