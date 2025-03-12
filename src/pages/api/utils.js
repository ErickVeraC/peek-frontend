import { getClinicalProcedures } from "@/pages/api/services/pets/crudPet";

export async function getClinicalProceduresByPet(petId) {
  try {
    let clinicalProcedures = await getClinicalProcedures();
    //alert(petId);
    //

    // Check if clinicalProcedures exists and contains data
    if (!clinicalProcedures || clinicalProcedures.length === 0) {
      console.log("No clinical procedures found.");
      return [];
    }

    // Filter the procedures based on petId and map them
    const mappedProcedures = clinicalProcedures.filter(
      (item) => item.petId == petId
    );
    //alert(JSON.stringify(mappedProcedures));
    return mappedProcedures;
  } catch (error) {
    console.error("Error fetching clinical procedures:", error);
    return [];
  }
}
