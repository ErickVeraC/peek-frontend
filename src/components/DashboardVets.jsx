import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { useState } from "react";
import { useAccount } from "@/context/AccountContext";
import Image from "next/image";
import { TfiArrowCircleRight, TfiArrowCircleDown } from "react-icons/tfi";
import PetDate from "./PetDate";

export default function DashboardVets() {
  const { account } = useAccount();
  return (
    <main className="bg-gray-100 min-h-screen">
      <Header />
      <SideBar />
      <div className="bg-gray-100 ml-20 p-8 grid gap-4 grid-cols-1 lg:grid-cols-12">
        <div className="bg-white min-h-10 gap-4 shadow-lg rounded-2xl p-4 flex flex-row lg:flex-col lg:col-span-3 2xl:col-span-2 ">
          <img
            src={account.profilePic}
            alt=""
            className="rounded-lg max-h-52"
          />
          <div className="text-black flex flex-col w-full justify-start ">
            <h2 className="font-semibold text-sm sm:text-2xl lg:text-2xl">
              Dr. {account.name + account.lastName}
            </h2>
            <h2 className="text-xs sm:text-lg">Médico veterinario</h2>
            <h2 className="text-sm sm:text-lg">CED. PROF. 1265689894</h2>
          </div>
        </div>
        <div
          name="citas"
          className="flex flex-col gap-3 lg:flex-row lg:flex-wrap  lg:col-span-9 2xl:col-span-10 w-full"
        >
          <div className=" bg-white rounded-2xl shadow-lg flex flex-row gap-1 justify-center items-center lg:w-1/6 xl:w-1/6">
            <div className="p-2 text-black flex flex-col items-center justify-center text-2xl gap-3 text-center">
              <h2>Proximas citas</h2>
              <TfiArrowCircleRight className="hidden lg:block" />
              <TfiArrowCircleDown className="block lg:hidden" />
            </div>
          </div>
          <PetDate></PetDate>
          <PetDate></PetDate>
          <PetDate></PetDate>
          <PetDate></PetDate>
        </div>
      </div>
      <div className="bg-gray-100 ml-20 p-8 pt-0 grid gap-4 grid-cols-1 lg:grid-cols-12">
        <div className="bg-white min-h-10 gap-4 shadow-lg rounded-2xl p-4 flex flex-row lg:flex-col lg:col-span-3 2xl:col-span-2 ">
          <img
            src={account.profilePic}
            alt=""
            className="rounded-lg max-h-52"
          />
          <div className="text-black flex flex-col w-full justify-start ">
            <h2 className="font-semibold text-sm sm:text-2xl lg:text-2xl">
              Dr. {account.name + account.lastName}
            </h2>
            <h2 className="text-xs sm:text-lg">Médico veterinario</h2>
            <h2 className="text-sm sm:text-lg">CED. PROF. 1265689894</h2>
          </div>
        </div>
        <div
          name="citas"
          className="flex flex-col gap-3 lg:flex-row lg:flex-wrap  lg:col-span-9 2xl:col-span-10 w-full"
        >
          <div className=" bg-white rounded-2xl shadow-lg flex flex-row gap-1 justify-center items-center lg:w-1/6 xl:w-1/6">
            <div className="p-2 text-black flex flex-col items-center justify-center text-2xl gap-3 text-center">
              <h2>Proximas citas</h2>
              <TfiArrowCircleRight className="hidden lg:block" />
              <TfiArrowCircleDown className="block lg:hidden" />
            </div>
          </div>
          <PetDate></PetDate>
          <PetDate></PetDate>
          <PetDate></PetDate>
          <PetDate></PetDate>
        </div>
      </div>
    </main>
  );
}
