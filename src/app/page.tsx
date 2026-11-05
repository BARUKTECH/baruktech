import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Closing } from "@/components/sections/Closing";
import { Contact } from "@/components/sections/Contact";
import { Differentials } from "@/components/sections/Differentials";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Education } from "@/components/sections/Education";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { FounderStory } from "@/components/sections/FounderStory";
import { Hero } from "@/components/sections/Hero";
import { Lab } from "@/components/sections/Lab";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <Differentials />
        <Ecosystem />
        <Manifesto />
        <FeaturedProjects />
        <Lab />
        <FounderStory />
        <Services />
        <Education />
        <Closing />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
