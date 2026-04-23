export function LoginLegalFooter() {
  return (
    <footer className="w-full mt-auto pt-12 pb-4">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-on-surface-variant opacity-50 font-headline font-bold">
        <span>© 2026 América NOA. Botanical Archivist System.</span>
        <div className="flex gap-6">
          <a className="hover:text-primary transition-colors" href="#">
            Privacy Policy
          </a>
          <a className="hover:text-primary transition-colors" href="#">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
