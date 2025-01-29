import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";
import { getAllPetsByVet } from "@/pages/api/services/pets/crudPet";

// Inicializa DataTable con el uso de su plugin de estilo
DataTable.use(DT);

export default function PatientsCard() {
  const [tableData, setTableData] = useState([]); // Inicializa vacío para esperar los datos

  useEffect(() => {
    async function fetchPets() {
      try {
        const petsData = await getAllPetsByVet();

        const formattedData = petsData.map((pet) => [
          `<img src="${pet.picture}" alt="Cover" width="50" height="10"  style="border-radius:100px" >`,
          pet.name,
          pet.typeAnimal,
          pet.breed, // Raza
          pet.birthday.slice(0, 10),
          pet.petOwner.name + " " + pet.petOwner.lastName,
          pet.petOwner.phone,
          pet.petOwner.email,
        ]);
        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    }

    fetchPets();
  }, []);

  return (
    <div className="text-black bg-white rounded-2xl shadow-lg min-h-6 overflow-x-auto w-full p-5">
      <h2 className="text-black">Mascotas</h2>
      <DataTable data={tableData} className="display text-center">
        <thead className="border border-gray-300 p-2">
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Nacimiento</th>
            <th>Dueño</th>
            <th>Telefono</th>
            <th>Email</th>
          </tr>
        </thead>
      </DataTable>
    </div>
  );
}
