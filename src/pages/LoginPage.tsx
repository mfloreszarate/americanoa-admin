import { LoginBrandPanel } from "@/components/auth/LoginBrandPanel";
import { LoginForm } from "@/components/auth/LoginForm";
import { LoginLegalFooter } from "@/components/auth/LoginLegalFooter";
import { LoginSupportFooter } from "@/components/auth/LoginSupportFooter";

export function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-surface text-on-surface selection:bg-secondary-container selection:text-on-secondary-container">
      <LoginBrandPanel />
      <section className="flex-1 flex flex-col items-center justify-center bg-surface-container-lowest px-6 py-12 md:px-16 lg:px-24">
        <div className="w-full max-w-md">
          <div className="mb-12 text-center md:text-left">
            <div className="mb-8 inline-block">
              <span className="text-primary text-3xl font-black font-headline tracking-tighter">
                América NOA
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-headline font-extrabold text-on-surface tracking-tight mb-2">
              Bienvenido de nuevo
            </h1>
            <p className="text-on-surface-variant font-body">
              Accede a tu cuenta de América NOA
            </p>
          </div>
          <LoginForm />
          <LoginSupportFooter />
        </div>
        <LoginLegalFooter />
      </section>
    </main>
  );
}
