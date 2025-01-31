import { useState } from "react";
import clsx from "clsx";

import { BsGrid, BsCalendar4Week } from "react-icons/bs";
import { MdOutlineFindInPage, MdOutlinePets } from "react-icons/md";

import {
  PiCalendarDotsLight,
  PiUserLight,
  PiUserListLight,
  PiQuestionLight,
  PiSquaresFourLight,
  PiFileMagnifyingGlassLight,
  PiGearLight,
  PiTextAlignJustifyLight,
  PiXLight,
} from "react-icons/pi";

import sideBar from "../../public/sideBar.json";

const iconMap = {
  BsGrid: BsGrid,
  BsCalendar4Week: BsCalendar4Week,
  MdOutlineFindInPage: MdOutlineFindInPage,
  MdOutlinePets: MdOutlinePets,
  PiUserLight: PiUserLight,
  PiCalendarDotsLight: PiCalendarDotsLight,
  PiUserListLight: PiUserListLight,
  PiQuestionLight: PiQuestionLight,
  PiSquaresFourLight: PiSquaresFourLight,
  PiFileMagnifyingGlassLight: PiFileMagnifyingGlassLight,
};

export default function SideBar() {
  const [isShowingNavBar, setIsShowingNavBar] = useState(false);

  return (
    <aside
      className=" bg-slate-900 h-[100vh] fixed bg-gradient-landing pt-5 top-0 min-w-20 text-center transition-all duration-300 ease-in-out z-[3]"
      onMouseOver={() => setIsShowingNavBar(true)}
      onMouseOut={() => setIsShowingNavBar(false)}
    >
      <div className="items-center h-screen flex flex-col justify-between ">
        <div className="text-white ">
          <div className="flex flex-col items-center text-white">
            <h2 className="font-urbanist font-bold text-2xl hidden lg:flex ">
              Peek
            </h2>

            <button
              className="flex lg:hidden"
              href=""
              onClick={() => setIsShowingNavBar(!isShowingNavBar)}
            >
              {isShowingNavBar ? (
                <PiXLight className="w-6 h-6" />
              ) : (
                <PiTextAlignJustifyLight className="w-6 h-6" />
              )}
            </button>
          </div>
          <ul className="flex flex-col gap-5 mt-12 ">
            {sideBar[0].user.map((item, index) => {
              const IconComponent = iconMap[item.icon];
              return (
                <a href={item.url}>
                  <li
                    key={index}
                    className={clsx(
                      "flex items-center  gap-4 cursor-pointer w-full h-10 transition-all duration-200 ease-in-out",
                      {
                        "px-4 justify-start": isShowingNavBar,
                        "justify-center": !isShowingNavBar,
                      }
                    )}
                  >
                    {IconComponent ? (
                      <IconComponent className="w-6 h-6" />
                    ) : null}

                    {isShowingNavBar ? (
                      <span className="text-lg">{item.text}</span>
                    ) : null}
                  </li>
                </a>
              );
            })}
          </ul>
        </div>
        <div className="text-white pb-10 flex flex-col justify-center items-center gap-11">
          <PiGearLight className="w-6 h-6" />
        </div>
      </div>
    </aside>
  );
}
