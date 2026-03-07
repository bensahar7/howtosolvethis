"use client";

import Image from "next/image";

/**
 * InfiniteLogoScroll Component
 * Premium infinite scrolling carousel of company logos
 * Features: CSS mask fade, grayscale-to-color hover, smooth 60fps animation
 */
export default function InfiniteLogoScroll() {
  // All logos from public/logos
  const logos = [
    { src: "/logos/beehero.png", alt: "BeeHero", name: "BeeHero" },
    { src: "/logos/brevel.png", alt: "Brevel", name: "Brevel" },
    { src: "/logos/polymertal.png", alt: "Polymertal", name: "Polymertal" },
    { src: "/logos/econcrete.png", alt: "ECOncrete", name: "ECOncrete" },
    { src: "/logos/greeneye.png", alt: "GreenEye Technology", name: "GreenEye" },
    { src: "/logos/firewave.png", alt: "FireWave", name: "FireWave" },
    { src: "/logos/tobee.jpg", alt: "ToBee", name: "ToBee" },
    { src: "/logos/boson.jpg", alt: "Boson Energy", name: "Boson" },
    { src: "/logos/daikawood.png", alt: "Daikawood", name: "Daikawood" },
    { src: "/logos/textre.jpg", alt: "Textre", name: "Textre" },
    { src: "/logos/rewind.jpg", alt: "Rewind", name: "Rewind" },
    { src: "/logos/salicrop.jpg", alt: "Salicrop", name: "Salicrop" },
    { src: "/logos/structurepal.jpg", alt: "StructurePal", name: "StructurePal" },
    { src: "/logos/oshi.jpeg", alt: "Oshi", name: "Oshi" },
    { src: "/logos/asterra.jpg", alt: "Asterra", name: "Asterra" },
  ];

  // Triple the logos for seamless infinite scroll (no visible reset)
  const tripleLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 md:py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-12 md:mb-16">
        <h3 className="text-2xl md:text-3xl font-bold text-white/90">
          עם מי יצא לנו לדבר?
        </h3>
      </div>

      {/* Carousel Container with CSS Mask Fade */}
      <div className="relative logo-carousel-wrapper">
        
        {/* Scrolling Logos with Perfect Vertical Centering */}
        <div className="logo-scroll-track">
          {tripleLogos.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className="logo-item-wrapper"
            >
              <div className="logo-image-container">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="logo-image"
                  sizes="(max-width: 768px) 120px, 160px"
                  priority={index < 5} // Prioritize first visible logos
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
