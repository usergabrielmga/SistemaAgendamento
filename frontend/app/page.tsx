import { Contact } from "lucide-react";
import About from "./components/home/About/About";
import Gallery from "./components/home/Gallery/Gallery";
import Header from "./components/home/Header/Header";
import Hero from "./components/home/Hero/Hero";
import Services from "./components/home/Services/Services";
import CTA from "./components/home/CTA/CTA";
import Footer from "./components/home/Footer/Footer"

export default function Home() {
  return (
    <>
        <Header />
        <Hero />
        <About />
        <Services />
        <Gallery />
        <CTA />
        <Footer />
    </>
  );
}