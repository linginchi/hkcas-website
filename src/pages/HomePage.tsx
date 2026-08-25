import { Cases } from "../sections/Cases";
import { About } from "../sections/About";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";
import { Hero } from "../sections/Hero";
import { MissionVision } from "../sections/MissionVision";
import { Navigation } from "../sections/Navigation";
import { Partners } from "../sections/Partners";
import { Philanthropy } from "../sections/Philanthropy";
import { Services } from "../sections/Services";

export function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <MissionVision />
        <About />
        <Services />
        <Cases />
        <Partners />
        <Philanthropy />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
