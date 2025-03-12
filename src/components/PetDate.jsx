export default function PetDate(props) {
  const dateStr = props.day;
  const dateObj = new Date(dateStr);

  // Formateamos solo la fecha
  const formattedDate = dateObj.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return (
    <div className=" bg-white rounded-2xl shadow-lg min-h-6 flex flex-row gap-1 justify-between lg:flex-col lg:w-1/4 2xl:w-1/6">
      <img
        src={props.petImage}
        alt=""
        className="h-full max-w-20 rounded-l-2xl lg:max-w-64 lg:rounded-t-2xl object-cover "
      />
      <div className="p-2 mt-5 text-black text-sm flex flex-col items-start justify-start lg:flex-row lg:justify-between lg:items-end lg:-mt-[70px] lg:text-white bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent">
        <h2 className="font-bold lg:text-xl">{formattedDate}</h2>

        <div className="h-14 flex flex-col justify-end">
          <p className="lg:text-2xl">{props.hour}</p>
        </div>
      </div>

      <div className="px-3 py-2 text-black text-sm flex flex-col items-end justify-center lg:flex-row lg:justify-start lg:gap-2">
        <div>
          <h2 className="font-bold text-lg">
            <span className="font-semibold">Nombre: </span>
            {props.name}
          </h2>
          <h2 className="font-bold text-md">
            <span className="font-semibold">Razón: </span>
            {props.reason}
          </h2>
          <p>
            {props.type} - {props.breed}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
