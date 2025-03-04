import DataTable from "datatables.net-react";
import DT from "datatables.net-dt";
import { useEffect, useState } from "react";
import { getAllPetsByVet } from "@/pages/api/services/pets/crudPet";
import { getUser } from "@/pages/api/services/users/User";

import { useAccount } from "@/context/AccountContext";

// Inicializa DataTable con el uso de su plugin de estilo
DataTable.use(DT);

export default function PatientsCard() {
  const [tableData, setTableData] = useState([]); // Inicializa vacío para esperar los datos
  const { account } = useAccount();
  useEffect(() => {
    async function fetchPets() {
      try {
        let petsData = await getAllPetsByVet(account.roleInfo._id);

        console.log(JSON.stringify(petsData));
        if (!petsData || petsData.length === 0) {
          console.log("No se encontraron mascotas");
          setTableData([]);
          return;
        }

        const formattedData = petsData.map((pet) => [
          `<img src="${pet.picture}" alt="Cover" width="50" height="10" class="rounded-full" >`,
          pet.name,
          pet.typeAnimal,
          pet.breed,
          pet.birthday.slice(0, 10),
          pet.petOwner
            ? pet.petOwner.name + " " + pet.petOwner.lastName
            : "No disponible",
          pet.petOwner.phone ? pet.petOwner.phone : "No disponible",
          pet.petOwner.email ? pet.petOwner.email : "No disponible",
          `<a class=" px-5 py-1 bg-slate-800 text-white rounded-lg" href="pets/${pet._id}">Ver perfil</a>`,
        ]);

        setTableData(formattedData);
      } catch (error) {
        console.error("Error fetching pets:", error);
        // Aquí podrías manejar el error de forma más amigable con el usuario (por ejemplo, mostrar un mensaje)
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
            <th></th>
            <th>Nombre</th>
            <th>Tipo</th>
            <th>Raza</th>
            <th>Nacimiento</th>
            <th>Nombre</th>
            <th>Telefono</th>
            <th>Email</th>
            <th className="w-52 p-2"></th>
          </tr>
        </thead>
      </DataTable>
    </div>
  );
}
