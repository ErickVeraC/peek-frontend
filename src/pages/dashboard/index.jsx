import { useAccount } from "@/context/AccountContext";
import { useEffect } from "react";
import { getUser } from "../api/services/users/User";
import DashboardOwner from "@/components/DashboardOwner";
import DashboardVets from "@/components/DashboardVets";
import { getAllVets } from "../api/services/vets/Vet";
import { getAllOwners } from "../api/services/owners/Owner";

export default function Dashboard() {
  const { account, setAccount } = useAccount();

  useEffect(() => {
    const storedId = localStorage.getItem("access-id");
    if (storedId == null) {
      //  alert("sin acceso");
      window.location.href = "/";
      return;
    }

    const getAccountInfo = async () => {
      try {
        const userInfo = await getUser(storedId);
        const accountInfo = userInfo?.data?.user;
        let roleInfo = null;

        if (accountInfo.role == 1) {
          let owners = await getAllOwners();
          owners = owners?.data?.owners;
          const owner = owners.filter((owner) => owner.user === storedId);
          roleInfo = owner[0];
        }

        if (accountInfo.role == 0) {
          let vets = await getAllVets();
          vets = vets?.data?.vets;
          const vet = vets.filter((vet) => vet.user === storedId);
          roleInfo = vet[0];
        }

        //console.log(roleInfo);

        setAccount({
          name: accountInfo.name,
          lastName: accountInfo.lastName,
          email: accountInfo.email,
          role: accountInfo.role,
          birthday: accountInfo.birthday,
          profilePic: accountInfo.profilePic,
          roleInfo: roleInfo,
        });
      } catch (error) {
        console.error("Error fetching account info:", error);
      }
    };

    getAccountInfo();
  }, [setAccount]);

  if (!account) {
    return <div>Loading...</div>;
  }

  return <>{account.role == 1 ? <DashboardOwner /> : <DashboardVets />}</>;
}
