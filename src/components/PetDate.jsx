export default function PetDate() {
  return (
    <div className=" bg-white rounded-2xl shadow-lg min-h-6 flex flex-row gap-1 justify-between lg:flex-col lg:w-1/4 2xl:w-1/6">
      <img
        src="https://www.randomlists.com/img/animals/porpoise.webp"
        alt=""
        className="h-full max-w-20 rounded-l-2xl lg:max-w-64 lg:rounded-t-2xl"
      />
      <div className="p-2 text-black text-sm flex flex-col items-start justify-start lg:flex-row lg:justify-between lg:items-center lg:-mt-[70px] lg:text-white">
        <h2 className="font-bold lg:text-2xl">Dorotea</h2>
        <div>
          <p>Cita:</p>
          <p className="lg:text-2xl">10:30</p>
        </div>
      </div>
      <div className="p-2 text-black text-sm flex flex-col items-end justify-center lg:flex-row lg:justify-start lg:gap-2">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt=""
          className="rounded-full size-10"
        />
        <div>
          <h2>Aitana Dayami</h2>
          <p>+52 33 2112 5668</p>
        </div>
      </div>
    </div>
  );
}
