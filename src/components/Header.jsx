import { useState, useEffect } from "react";
import { PiBellLight, PiCaretDownLight } from "react-icons/pi";
import { useAccount } from "@/context/AccountContext";
import Avatar from "@/components/Avatar";
import clsx from "clsx";

export default function Header() {
  const { account } = useAccount();

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const closeMenu = (e) => {
    if (!e.target.closest("#menu-button") && !e.target.closest("#menu")) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);

  const handleSignOut = () => {
    // Eliminar las dos variables del localStorage
    localStorage.removeItem("access-id");
    localStorage.removeItem("access-token");

    // Refrescar la página
    window.location.reload();
  };

  return (
    <header className="bg-white h-16 w-full">
      <div className="flex flex-row items-center justify-end gap-8 mr-10 h-full">
        <PiBellLight className="text-slate-900 size-8" />

        <div className="relative inline-block text-left">
          <div className="flex flex-row justify-between items-center gap-4">
            <Avatar />
            <button
              type="button"
              id="menu-button"
              className="flex flex-row justify-between items-center gap-1 text-orange-500"
              onClick={toggleMenu}
            >
              {account ? `Hola, ${account.name}` : "Hola, Invitado"}
              <PiCaretDownLight className="text size-6" />
            </button>
          </div>

          <div
            id="menu"
            className={clsx(
              "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none",
              {
                hidden: !isOpen, // Agrega o quita la clase 'hidden' según el estado
              }
            )}
            role="menu"
            tabIndex="-1"
          >
            <div className="py-1" role="none">
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-0"
              >
                Account settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700"
                role="menuitem"
                tabIndex="-1"
                id="menu-item-1"
              >
                Support
              </a>
              <button
                className="block px-4 py-2 text-sm text-gray-700"
                tabIndex="-1"
                id="menu-item-2"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
