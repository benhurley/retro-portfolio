import ProjectCard from "./card";
import logoLight from "../img/logo-light.svg";
import { websites } from "../websites";
import Newport65 from "../img/newport-65.webp";

export function Welcome() {
  return (
<main className="flex-1 flex flex-col flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-12 min-h-0">
        <header className="flex flex-col items-center gap-4">
          <div className="relative w-full max-w-[500px] mx-auto">
            <img
              src={logoLight}
              alt="justben.fyi argyle logo"
              className="block w-full"
            />
            {/* Enhanced handwritten “1965 Version” */}
            <div className="absolute bottom-[-5%] right-[1%] pointer-events-none rotate-[-3deg] leading-[0.85] text-left">
              <span className='block text-[16px] font-["Special_Elite",monospace]'>
                (1965 Edition)
              </span>
            </div>
          </div>
        </header>
        <div className="w-full text-center font-mono uppercase text-xs tracking-widest border-y md:border-x border-black py-2 bg-[#faf4d3] shadow-md">
          Seeking a website? Inquire at{" "}
          <a href="mailto:justbenfyi@pm.me" className="underline">
            justbenfyi@pm.me
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 max-w-5xl mx-auto place-items-center">
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
        <footer className="mt-16 px-4 text-center max-w-3xl mx-auto">
          <p className="font-mono text-xs uppercase tracking-wider mb-6">
            This design was inspired by the 1965 Newport Folk Festival.
          </p>

          <div className="relative max-w-md mx-auto border border-black shadow-[6px_6px_0_rgba(0,0,0,0.5)] contrast-125">
            <img
              src={Newport65}
              alt="1965 Newport Folk Festival"
              className="w-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-white/80 px-2 py-1 text-[10px] font-mono uppercase border border-black">
              Paul Butterfield Blues Band
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
