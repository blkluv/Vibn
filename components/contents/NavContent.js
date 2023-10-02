import { useRouter } from "next/router";
import Small from "../ui/headings/Small";
import NavButton from "../ui/buttons/NavButton";
import { Hash } from "../icons/HashIcon";
import { Feather } from "../icons/FeatherIcon";
import { Layers } from "../icons/LayerIcon";
import { Github } from "../icons/GitHubIcon";
import { Mail } from "../icons/MailIcon";
import { useTheme } from "next-themes";
import { Globe } from "../icons/GlobeIcon";
import { Sun } from "../icons/SunIcon";
import { Moon } from "../icons/MoonIcon";

export default function NavContent() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  return (
    <div>
      <Small>Navigation</Small>
      <div className="flex flex-col">
        <NavButton onClick={() => router.push("/")}>
          <Hash />
          <span>Explore</span>
        </NavButton>
        <NavButton onClick={() => router.push("/thoughts")}>
          <Feather />
          <span>Thoughts</span>
        </NavButton>
        <NavButton onClick={() => router.push("/design")}>
          <Layers />
          <span>Design</span>
        </NavButton>
      </div>

      <Small>Social</Small>
      <div className="flex flex-col">
        <NavButton
          onClick={() => router.push("https://github.com/Cloudflare233")}
        >
          <Github />
          <span>GitHub</span>
        </NavButton>
        <NavButton
          onClick={() => router.push("maito:Cloudflare233@yandex.com")}
        >
          <Mail />
          <span>E-Mail</span>
        </NavButton>
      </div>

      <Small>Theme</Small>
      <div className="flex flex-col">
        <NavButton onClick={() => setTheme("system")}>
          <Globe />
          <span>System</span>
        </NavButton>
        <NavButton onClick={() => setTheme("light")}>
          <Sun />
          <span>Light</span>
        </NavButton>
        <NavButton onClick={() => setTheme("dark")}>
          <Moon />
          <span>Dark</span>
        </NavButton>
      </div>
    </div>
  );
}
