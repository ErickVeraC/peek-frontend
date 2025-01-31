import DashboardOwner from "@/components/DashboardOwner";
import DashboardVets from "@/components/DashboardVets";
import { useAccount } from "@/context/AccountContext";
import { useEffect } from "react";
import { getUser } from "../api/services/users/User";

export default function Dashboard() {
  const storedId = localStorage.getItem("access-id");
  if (storedId == null) {
    //  alert("sin acceso");
    window.location.href = "/";
  }
  const { setAccount } = useAccount();

  useEffect(() => {
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
        throw error;
      }
    };
    getAccountInfo();
  }, []);

  const { account } = useAccount();
  return <>{account.role == 1 ? <DashboardOwner /> : <DashboardVets />}</>;
}
