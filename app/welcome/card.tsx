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
      className="group relative w-full max-w-md cursor-pointer z-0 animate-newspaper-drop-up transition-transform duration-300 ease-out hover:translate-y-[-4px] hover:scale-[1.07] hover:z-10 hover:shadow-[6px_8px_0_rgba(0,0,0,0.35)]"
      style={{ ...style, transform: finalTransform ?? undefined }}
    >
      {/* Inner card gets final offset */}
      <div
        className="transition-transform duration-300 ease-out hover:translate-y-[-4px] hover:scale-[1.07] hover:z-10 hover:shadow-[6px_8px_0_rgba(0,0,0,0.35)]"
        style={{
          transform: finalTransform ?? undefined,
          ...style,
        }}
      >
        {/* Pin */}
        <div
          className="absolute top-2 left-1/2 z-20 pointer-events-none"
          style={{
            transform: `translateX(${pinOffset.x}px) translateX(-50%)`,
          }}
        >
          <div
            className={`transform-gpu transition-transform duration-300 ease-in-out
    ${pinInPosition ? "opacity-100" : "opacity-0 -translate-y-16"}
    ${pinHovered ? "pin-animate-tug" : "pin-animate-reset"}
  `}
            style={{
              rotate: `${pinOffset.rotate}deg`,
            }}
          >
            {/* Pin head */}
            <div className="w-3 h-3 bg-black rounded-full shadow-md border border-black mx-auto" />

            {/* Stem that grows on hover */}
            <div className="w-[2px] h-[5px] group-hover:h-[16px] transition-all duration-300 ease-in-out bg-gray-700 mx-auto -mt-[1px]" />
          </div>

          {/* Dot where the pin was */}
          {showPinHole && (
            <div className="w-[4px] h-[4px] bg-black rounded-full opacity-60 mx-auto -mt-[12px] transition-opacity duration-200 ease-out" />
          )}
        </div>

        {/* Poster */}
        <div
          className="relative bg-[#fdf7e2] border border-black px-7 py-6 font-serif text-black z-10 aspect-[4/3] flex flex-col justify-between gap-2"
          style={{
            backgroundImage: "url('/paper.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "200%",
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

          <h3 className="text-xl font-bold uppercase font-['Ledger',serif]">
            {title}
          </h3>

          <div className="mb-3 h-[150px] sm:h-[130px] w-full overflow-hidden border border-black">
            <img
              src={thumbnail}
              alt={thumbnailAlt}
              className="w-full h-full object-cover object-center bg-white"
            />
          </div>

          <p className="text-[13px] font-mono">{description}</p>
        </div>
      </div>
    </a>
  );
};

export default ProjectCard;
