import Link from "next/link";

import buttonListPets from "../../public/buttonListPets.json";

export default function ButtonList() {
  return (
    <>
      {buttonListPets[0].buttonList.map((item) => {
        return (
          <Link
            key={item.id}
            href={item.to}
            className="w-full sm:w-32  bg-white p-4 rounded-xl flex flex-row md:flex-col justify-center sm:justify-normal items-center gap-2"
          >
            <span className="text-neutral-700 text-l">{item.text}</span>
            <img
              className="w-[24px] h-[24px]"
              alt={item.text}
              src={item.icon}
            />
          </Link>
        );
      })}
    </>
  );
}
