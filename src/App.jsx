
import { useEffect } from 'react';

import Navbar from './components/Navbar';
import CursorFluidBackground from './components/CursorFluidBackground';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Section from './components/Section';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Blog from './components/Blog';
import SideQuests from './components/SideQuests';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { EXPERIENCE, EDUCATION } from './data/portfolio';

export default function App() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <CursorFluidBackground />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <Navbar />

      <main id="main">
        <Hero />

        <Marquee />

        <Section
          id="experience"
          title="Experience"
          eyebrow="01 / WHAT I'VE BEEN BUILDING"
        >
          <Timeline items={EXPERIENCE} />
        </Section>

        <Section
          id="education"
          title="Education"
          eyebrow="02 / FOUNDATIONS"
        >
          <Timeline items={EDUCATION} />
        </Section>

        <Section
          id="projects"
          title="Selected projects"
          eyebrow="03 / BUILT, TESTED, ITERATED"
          className="projects-section"
        >
          <Projects />
        </Section>

        <Section
          id="skills"
          title="Tools of the trade"
          eyebrow="04 / MY CURRENT TOOLKIT"
        >
          <Skills />
        </Section>

        <Section
          id="blog"
          title="Field notes"
          eyebrow="05 / THINGS I'M LEARNING"
        >
          <Blog />
        </Section>

        <Section
          id="sidequests"
          title="Side quests"
          eyebrow="06 / OUTSIDE THE TICKET"
        >
          <SideQuests />
        </Section>

        <Section
          id="contact"
          title="Let's build something"
          eyebrow="07 / OPEN CHANNEL"
          className="contact-section"
        >
          <Contact />
        </Section>
      </main>

      <Footer />

      <div className="corner-note" aria-hidden="true">
        LESS TALK.
        <br />
        MORE SHIPPING.
      </div>
    </>
  );
}
