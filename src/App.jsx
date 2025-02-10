import { useRef, useEffect } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
gsap.registerPlugin(ScrollTrigger)

import "./App.css"
import Section1 from "./components/Section1"
import Section2 from "./components/Section2"
import Section3 from "./components/Section3"
import Section4 from "./components/Section4"

const sections = [
  { id: 0, content: <Section1 /> },
  { id: 1, content: <Section2 /> },
  { id: 2, content: <Section3 /> },
  { id: 3, content: <Section4 /> },
]

const steps = [
  { x: "-100vw" },
  { x: "-100vw", y: "-100vh" },
  { x: "-200vw", y: "-100vh" },
  { x: "-200vw", y: "-300vh" },
]

export function App() {
  const containerRef = useRef(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true })
    timeline
      .to(containerRef.current, { x: steps[0].x })
      .to(containerRef.current, { x: steps[0].x, y: steps[0].y })
      .to(containerRef.current, { x: steps[1].x, y: steps[1].y })
      .to(containerRef.current, { x: steps[2].x, y: steps[2].y })
      .to(containerRef.current, { x: steps[3].x, y: steps[3].y })

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      animation: timeline,
      markers: true,
    })
  })

  return (
    <div id="container" ref={containerRef}>
      {sections.map(({ id, content }) => (
        <section 
          key={`section-${id}`}
          ref={(el) => (sectionRefs.current[id] = el)}
        >
          {content}
        </section>
      ))}
    </div>
  )
}