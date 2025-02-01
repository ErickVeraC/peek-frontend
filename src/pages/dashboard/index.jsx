import { useAccount } from "@/context/AccountContext";
import { useEffect } from "react";
import { getUser } from "../api/services/users/User";

import DashboardOwner from "@/components/DashboardOwner";
import DashboardVets from "@/components/DashboardVets";

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

        setAccount({
          name: accountInfo.name,
          lastName: accountInfo.lastName,
          email: accountInfo.email,
          role: accountInfo.role,
          birthday: accountInfo.birthday,
          profilePic: accountInfo.profilePic,
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
