import { useState } from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="space-y-2">
        <label
          className="block text-sm font-semibold text-on-surface-variant ml-1"
          htmlFor="email"
        >
          Correo Electrónico
        </label>
        <div className="relative group ghost-border-focus rounded-lg transition-all">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-lg">mail</span>
          </div>
          <input
            className="block w-full pl-11 pr-4 py-4 bg-surface-container-highest text-on-surface border-none rounded-lg focus:ring-0 placeholder:text-outline transition-colors"
            id="email"
            name="email"
            placeholder="nombre@mericano.com"
            type="email"
            autoComplete="email"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <label
            className="block text-sm font-semibold text-on-surface-variant"
            htmlFor="password"
          >
            Contraseña
          </label>
          <a
            className="text-xs font-bold text-primary hover:text-primary-container transition-colors"
            href="#"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
        <div className="relative group ghost-border-focus rounded-lg transition-all">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-lg">lock</span>
          </div>
          <input
            className="block w-full pl-11 pr-12 py-4 bg-surface-container-highest text-on-surface border-none rounded-lg focus:ring-0 placeholder:text-outline transition-colors"
            id="password"
            name="password"
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
          />
          <button
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-outline hover:text-primary transition-colors"
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            <span className="material-symbols-outlined text-lg">
              {showPassword ? "visibility_off" : "visibility"}
            </span>
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <label className="flex items-center group cursor-pointer">
          <div className="relative flex items-center">
            <input
              className="peer h-5 w-5 border-none bg-surface-container-highest rounded text-secondary focus:ring-offset-0 focus:ring-2 focus:ring-secondary/20 cursor-pointer"
              type="checkbox"
              name="remember"
            />
            <span className="material-symbols-outlined absolute opacity-0 peer-checked:opacity-100 text-on-secondary pointer-events-none text-sm left-1/2 -translate-x-1/2">
              check
            </span>
          </div>
          <span className="ml-3 text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors">
            Recuérdame
          </span>
        </label>
      </div>
      <div className="pt-2">
        <button
          className="w-full py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-lg shadow-lg shadow-primary/20 hover:opacity-90 active:scale-[0.98] transition-all duration-150"
          type="submit"
        >
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
}
