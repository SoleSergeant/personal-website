import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Impact from "@/components/Impact";
import Experience from "@/components/Experience";
import Initiatives from "@/components/Initiatives";
import Projects from "@/components/Projects";
import Honors from "@/components/Honors";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Impact />
        <Experience />
        <Initiatives />
        <Projects />
        <Honors />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
