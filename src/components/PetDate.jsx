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
        className="h-full max-w-20 rounded-l-2xl lg:max-w-64 lg:rounded-t-2xl"
      />
      <div className="p-2 text-black text-sm flex flex-col items-start justify-start lg:flex-row lg:justify-between lg:items-center lg:-mt-[70px] lg:text-white">
        <h2 className="font-bold lg:text-2xl">{props.name}</h2>

        <div>
          <p>{formattedDate}</p>
          <p className="lg:text-2xl">{props.hour}</p>
        </div>
      </div>

      <div className="px-3 py-2 text-black text-sm flex flex-col items-end justify-center lg:flex-row lg:justify-start lg:gap-2">
        <div>
          <h2>{props.reason}</h2>
          <p>
            {props.type} - {props.breed}{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
