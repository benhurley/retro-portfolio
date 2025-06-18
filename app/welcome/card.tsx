import React, { useEffect, useMemo, useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  link: string;
  framework: string;
  role: string;
  thumbnail: string;
  thumbnailAlt: string;
  style?: React.CSSProperties;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  link,
  framework,
  role,
  thumbnail,
  thumbnailAlt,
  style,
}) => {
  const [finalTransform, setFinalTransform] = useState<string | null>(null);
  const [pinOffset, setPinOffset] = useState({ x: 0, rotate: 0 });
  const [pinInPosition, setPinInPosition] = useState(false);
  const [showPinHole, setShowPinHole] = useState(false);
  const [pinHovered, setPinHovered] = useState(false);

  const labelRotation = useMemo(
    () => `${(Math.random() * 6 - 3).toFixed(2)}deg`, // -3° to +3° tilt
    []
  );

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        const pin = document.querySelector(".pin-wrapper");
        if (pin) {
          // Force layout refresh by toggling display
          (pin as HTMLElement).style.display = "none";
          void (pin as HTMLElement).offsetHeight; // trigger reflow
          (pin as HTMLElement).style.display = "";
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const rotate = (Math.random() * 5 - 2.5).toFixed(2);
    const tx = (Math.random() * 4 - 2).toFixed(1);
    const ty = (Math.random() * 4 - 2).toFixed(1);
    const transformValue = `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`;

    const offsetTimeout = setTimeout(() => {
      setFinalTransform(transformValue);
    }, 300); // After animation ends

    const pinX = Math.floor(Math.random() * 10 - 5);
    const pinR = (Math.random() * 4 - 2).toFixed(1);
    setPinOffset({ x: pinX, rotate: parseFloat(pinR) });

    const pinFadeIn = setTimeout(() => {
      setTimeout(() => setPinInPosition(true), 200);
    }, 800);

    return () => {
      clearTimeout(offsetTimeout);
      clearTimeout(pinFadeIn);
    };
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 768) return; // Skip on desktop

    const images = document.querySelectorAll("[data-mobile-in-view]");

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      const range = 200; // <-- widen this to control sensitivity

      images.forEach((img) => {
        const rect = img.getBoundingClientRect();
        const imgCenter = rect.top + rect.height / 2;
        const isCentered =
          imgCenter > viewportCenter - range &&
          imgCenter < viewportCenter + range;

        if (isCentered) {
          img.classList.add("grayscale-0");
          img.classList.remove("grayscale");
        } else {
          img.classList.remove("grayscale-0");
          img.classList.add("grayscale");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll(); // initial run

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => {
        setShowPinHole(true);
        setPinHovered(true);
      }}
      onMouseLeave={() => {
        setShowPinHole(false);
        setPinHovered(false);
      }}
      className="group relative w-full max-w-md cursor-pointer z-0 animate-newspaper-drop-up transition-transform duration-500 ease-in-out hover:translate-y-[-4px] hover:scale-[1.04] hover:z-10 hover:shadow-[6px_8px_0_rgba(0,0,0,0.2)]"
      style={{ ...style, transform: finalTransform ?? undefined }}
    >
      {/* Pin */}
      <div
        className="pin-wrapper absolute top-2 left-1/2 z-20 pointer-events-none"
        style={{
          transform: `translateX(${pinOffset.x}px) translateX(-50%)`,
          willChange: "transform",
        }}
      >
        <div
          className={`transform-gpu transition-transform duration-300 ease-in-out
    ${pinInPosition ? "opacity-100" : "opacity-0"}
    ${pinHovered ? "pin-animate-tug" : ""}
  `}
          style={{
            rotate: `${pinOffset.rotate}deg`,
            transform: pinInPosition
              ? "translateY(0) scale(1)"
              : "translateY(-1rem) scale(1.25)", // Bigger & higher before it “pierces”
          }}
        >
          {/* Pin head */}
          <div className="w-3 h-3 bg-white rounded-full shadow-md border border-black mx-auto -mt-[4px]" />
          <div className="flex flex-col items-center -mt-[1px] z-20">
            {/* Stem */}
            <div className="w-[2px] h-[5px] group-hover:h-[16px] transition-all duration-300 ease-in-out bg-gray-700" />

            {/* Triangle tip (only visible on hover) */}
            <div
              className="w-0 h-0 invisible group-hover:visible 
               border-l-[1px] border-r-[1px] border-t-[4px] 
               border-l-transparent border-r-transparent border-t-gray-700 
               transition-opacity duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Dot where the pin was */}
        {showPinHole && (
          <div className="w-[4px] h-[4px] bg-[#a0bed0] rounded-full mx-auto -mt-[12px] transition-opacity border border-black border-opacity-30" />
        )}
      </div>

      {/* Poster */}
      <div
        className="relative bg-[#fdf7e2] border border-black px-7 py-6 font-serif text-black z-10 aspect-[4/3] flex flex-col justify-between gap-2"
        style={{
          backgroundImage: "url('/paper.png')",
          backgroundSize: "200%",
          backgroundColor: "#faf4d3",
        }}
      >
        <div className="flex justify-between items-center text-[11px] font-mono uppercase tracking-widest opacity-80">
          <span>{role}</span>
          <div
            className="text-black text-[10px] font-bold uppercase px-2 py-1 border border-black shadow -mt-1 mr-0 bg-white"
            style={{
              rotate: labelRotation,
            }}
          >
            {framework}
          </div>
        </div>

        <h3 className='text-xl font-bold uppercase font-["Special_Elite",monospace] tracking-wide'>
          {title}
        </h3>

        <div className="mb-3 h-[150px] sm:h-[130px] w-full overflow-hidden border border-black">
          <img
            src={thumbnail}
            alt={thumbnailAlt}
            className={`w-full h-full object-cover object-center bg-white
    grayscale contrast-110 transition-all duration-500
    md:grayscale-100
    group-hover:grayscale-0 group-hover:contrast-100 hovver:grayscale-0`}
            data-mobile-in-view
          />
        </div>

        <p className="text-[13px] font-mono">{description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;
