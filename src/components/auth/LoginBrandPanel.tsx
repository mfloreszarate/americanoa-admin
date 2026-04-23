
export function LoginBrandPanel() {
  return (
    <section className="hidden md:flex relative md:w-1/2 lg:w-3/5 h-full min-h-screen items-center justify-center overflow-hidden botanical-gradient">
      <div className="absolute inset-0 botanical-pattern" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-20">
        <svg
          className="w-[120%] h-[120%] text-secondary-container"
          fill="currentColor"
          viewBox="0 0 100 100"
          aria-hidden
        >
          <path
            d="M50 0 C 60 20, 90 20, 100 50 C 90 80, 60 80, 50 100 C 40 80, 10 80, 0 50 C 10 20, 40 20, 50 0"
            opacity="0.3"
          />
          <path
            d="M50 20 C 55 35, 75 35, 80 50 C 75 65, 55 65, 50 80 C 45 65, 25 65, 20 50 C 25 35, 45 35, 50 20"
            opacity="0.5"
          />
        </svg>
      </div>
      <div className="relative z-10 text-center px-12">
        <div className="mb-8 flex justify-center">
          {/* <img
            className="h-24 md:h-32 drop-shadow-2xl brightness-0 invert opacity-90"
            alt="América NOA"
            src={LOGO_SRC}
          /> */}
        </div>
        <div className="space-y-4 max-w-md mx-auto">
          <p className="text-surface-container-lowest text-lg md:text-xl font-headline font-light tracking-wide opacity-80 italic">
          </p>
        </div>
      </div>
      <div className="absolute bottom-12 left-12 z-10 flex items-center gap-3">
        {/* <div className="w-12 h-px bg-secondary-container opacity-40" aria-hidden /> */}
        <span className="text-secondary-container text-xs uppercase tracking-[0.3em] font-headline font-semibold">
          {/* Botanical Archivist v2.4 */}
        </span>
      </div>
    </section>
  );
}
