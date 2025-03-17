import Image from "next/image";
import ButtonJoinNow from "@/components/ButtonJoinNow";
import { MdOutlinePets } from "react-icons/md";

export default function Branding() {
  return (
    <article className="relative w-full h-48 md:h-[36rem]">
      <Image
        src="/ImagenBranding.png"
        alt="perro en caja"
        fill
        sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
        className="h-full object-cover"
        priority
      />
      <section className="absolute top-8 left-0 w-full h-full grid grid-cols-12 md:grid-cols-8 pt-3 pl-8 md:pl-8">
        <div className="col-span-12 md:col-span-3 md:p-4">
          <h1 className="text-congress-950 text-5xl md:text-128px font-black">
            peek
          </h1>
          <h5 className="text-congress-950 text-base md:text-2xl font-black py-2 md:py-6">
            Cuida a tu <span className="text-orange-500">componañero</span>{" "}
            <br /> como se merece
          </h5>
          <div className="lg:py-4">
            <ButtonJoinNow className="md:text-sm md:px-4 md:py-2">
              <span className="pr-2">
                <MdOutlinePets />
              </span>
              ¡Únete ahora!
            </ButtonJoinNow>
          </div>
        </div>
      </section>
    </article>
  );
}
