import { RxPerson, RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { MdOutlinePets } from "react-icons/md";
import ButtonJoinNow from "@/components/ButtonJoinNow";
import RoundedButton from "@/components/RoundedButton";
import RoundedFilledButton from "./RoundedFilledButton";

import { useState } from "react";

export default function Navbar() {
  const [isShowingNavBar, setIsShowingNavBar] = useState(false);

  return (
    <>
      <nav className="grid grid-cols-1 bg-[#ECEADE] px-8 py-5 md:grid-cols-2 xl:grid-cols-6 sticky top-0 z-50 shadow-md ">
        <div className="block xl:hidden">
          <button
            className="text-[#0E2139] text-xl"
            href=""
            onClick={() => setIsShowingNavBar(true)}
          >
            <RxHamburgerMenu />
          </button>
        </div>
        <div className="hidden flex-col justify-center md:flex">
          <img src="/logo.png" className="size-11" alt="" />
        </div>
        <div className="col-span-3 hidden justify-center gap-16 font-bold text-[#0E2139] xl:flex">
          <button>Veterinarios</button>
          <button>Conocenos</button>
          <button>Contacto</button>
        </div>
        <div className="col-span-2 hidden justify-center gap-4 xl:flex">
          <RoundedFilledButton
            text={`¡Únete ahora!`}
            destination={`/create-account`}
          >
            <MdOutlinePets className="mr-2" />
          </RoundedFilledButton>
          <RoundedButton text={`Iniciar sesión`} destination={`/login`}>
            <RxPerson className="mr-2" />
          </RoundedButton>
        </div>
      </nav>

      {isShowingNavBar && (
        <aside className="p-3 z-50 fixed top-0 left-0 bg-white h-screen w-60 shadow-lg transition-all duration-300 ease-in-out ">
          <div className="flex flex-col gap-8 text-orange-500 ">
            <div className="text-right">
              <button
                className="text-xl"
                href=""
                onClick={() => setIsShowingNavBar(false)}
              >
                <RxCross1 />
              </button>
            </div>
            <div className="flex flex-col gap-4">
              <button>Veterinarios</button>

              <button>Conocenos</button>

              <button>Contacto</button>
            </div>
            <div className="flex flex-col gap-4  border-t-[1px] border-orange-500 pt-8 ">
              <ButtonJoinNow className="w-full">
                <span className="pr-4 ">
                  <MdOutlinePets />
                </span>
                ¡Únete ahora!
              </ButtonJoinNow>
              <RoundedButton text={`Iniciar sesión`} destination={`/login`}>
                <RxPerson className="mr-2" />
              </RoundedButton>
            </div>
            <div></div>
          </div>
        </aside>
      )}
    </>
  );
}
