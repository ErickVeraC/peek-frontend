import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";

// Asegúrate de que se use DataTable con DT
DataTable.use(DT);

export default function TableProcedures({ petId, procedures }) {
  const [tableData, setTableData] = useState([]); // Inicializa vacío para esperar los datos

  useEffect(() => {
    const mappedProcedures = procedures.map((item) => ({
      date: new Date(item.createdAt).toLocaleDateString(), // Formato de fecha
      reason: item.reason,
      diagnosis: item.diagnosis,
      prescription: item.prescription,
    }));

    setTableData(mappedProcedures);
  }, [procedures]);

  return (
    <div className="text-black bg-white rounded-2xl shadow-lg min-h-6 overflow-x-auto w-full p-5">
      <h2 className="text-black">Procedimientos clínicos</h2>
      <DataTable
        data={tableData}
        className="display text-center"
        options={{
          searching: false, // Desactiva la búsqueda
          pageLength: 3, // Limita a 3 registros por página
          lengthChange: false, // Desactiva el cambio de número de registros por página
          columns: [
            { title: "Fecha", data: "date" },
            { title: "Razón", data: "reason" },
            { title: "Diagnóstico", data: "diagnosis" },
            { title: "Prescripción", data: "prescription" },
          ],
        }}
      />
    </div>
  );
}
