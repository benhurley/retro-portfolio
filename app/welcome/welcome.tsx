import ProjectCard from "./card";
import logoLight from "../img/logo-light.svg";
import { websites } from "../websites";
import Newport65 from "../img/newport-65.webp";

export function Welcome() {
  return (
    <main className="flex-1 flex flex-col flex items-center justify-center pt-8 md:pt-16 md:pb-4">
      <div className="flex-1 flex flex-col items-center gap-12 min-h-0">
        <header className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[500px] mx-auto">
            <img
              src={logoLight}
              alt="justben.fyi argyle logo"
              className="block w-full"
            />
            {/* Enhanced handwritten “1965 Version” */}
            <div className="absolute bottom-[-5%] right-[4%] md:right-[-8%] pointer-events-none rotate-[-3deg] leading-[0.85] text-left">
              <span className='block text-[16px] font-["Special_Elite",monospace]'>
                Retro Edition
              </span>
            </div>
          </div>
        </header>
        <div>
          <h2
            className={`font-["Special_Elite",monospace] uppercase tracking-wider text-2xl text-center mb-2`}
          >
            Project Board
          </h2>
          <div className="relative w-full px-1 max-w-6xl mx-auto">
            <div className="p-2 bg-[#dbbd86] rounded-[12px] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
              <div className="bg-[url('/corkboard.webp')] bg-repeat bg-center rounded-md shadow-inner p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
                  {websites.map((website, index) => (
                    <ProjectCard
                      key={website.title}
                      title={website.title}
                      description={website.description}
                      link={website.url}
                      thumbnail={website.imgUrl}
                      thumbnailAlt={website.imgAlt}
                      framework={website.framework}
                      role={website.role}
                      style={{
                        animationDelay: `${index * 150}ms`,
                        transform: `rotate(${Math.random() * 3 - 1.5}deg)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center font-mono uppercase text-xs tracking-widest border-y md:border-x border-black py-2 px-10 bg-[#faf4d3] shadow-md">
          Seeking one of your own? Inquire at{" "}
          <a href="mailto:justbenfyi@pm.me" className="underline">
            justbenfyi@pm.me
          </a>
        </div>
        <div className="text-center max-w-3xl mx-auto">
          <div className="relative max-w-md mx-auto border border-black contrast-125">
            <img
              src={Newport65}
              alt="1965 Newport Folk Festival"
              className="w-full object-cover"
            />
          </div>
          <div className="w-full text-center font-mono uppercase text-[10px] tracking-widest mt-3">
            Design Inspired by the 1965 Newport Folk Festival
          </div>
        </div>
        <a
          href="https://justben.fyi"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-xs uppercase tracking-wider block text-center underline mt-2"
        >
          Back to my main site
        </a>
      </div>
    </main>
  );
}
