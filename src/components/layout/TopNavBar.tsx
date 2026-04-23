import { MaterialIcon } from "@/components/ui/MaterialIcon";

interface TopNavBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  /** When true, search is read-only (e.g. routes without product search). */
  searchDisabled?: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
}

export function TopNavBar({
  searchPlaceholder = "Search product archive...",
  searchValue = "",
  onSearchChange,
  searchDisabled = false,
  avatarSrc = "https://lh3.googleusercontent.com/aida-public/AB6AXuAOkL0h2zk7CNzvWD87ZDd0d1YcfaKW9hx8Odj5DFK8X0AthdeDqHfLglNLvvANNCQm4-p6MJcFXFCb8YlYDEMzMHRK7EBhQZdtybkFsidAHXfNHXBpkdfPr5EGiCgiZVg5auCZsQfVJz4bAJkmG-A_7K7pj1b2LQOI3-veJDZ6HTQX08x9WUrMITleYjXECB5vb3CmpJUQPI2_ORTjsvyl0mc906JKfwmLNV7Ut52_J4PHYlE6264DVoiNlwIh0j-RCB1kkFhhJw",
  avatarAlt = "User avatar",
}: TopNavBarProps) {
  return (
    <header className="fixed top-0 right-0 z-40 ml-64 flex h-16 w-[calc(100%-16rem)] items-center justify-between bg-white/80 px-8 shadow-sm backdrop-blur-xl dark:bg-stone-900/80 dark:shadow-none">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <MaterialIcon
            name="search"
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${searchDisabled ? "text-outline/50" : "text-outline"}`}
          />
          <input
            type="search"
            placeholder={searchPlaceholder}
            value={searchValue}
            readOnly={searchDisabled}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className={`w-full rounded-full border-none bg-surface-container-highest py-2 pl-10 pr-4 text-sm outline-none transition-all focus:ring-2 focus:ring-secondary/40 ${searchDisabled ? "cursor-default opacity-60" : ""}`.trim()}
            aria-label="Search products"
            aria-disabled={searchDisabled}
          />
        </div>
      </div>
      <div className="flex items-center gap-6">
        <button
          type="button"
          className="text-stone-600 opacity-90 transition-all hover:text-lime-600 active:opacity-100"
          aria-label="Notifications"
        >
          <MaterialIcon name="notifications" />
        </button>
        <button
          type="button"
          className="text-stone-600 opacity-90 transition-all hover:text-lime-600 active:opacity-100"
          aria-label="Settings"
        >
          <MaterialIcon name="settings" />
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full bg-stone-200">
          <img
            src={avatarSrc}
            alt={avatarAlt}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </header>
  );
}
