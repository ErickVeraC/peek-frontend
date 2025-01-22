import { loginUser, getUser } from "./users/User";

export async function handleLogin(email, password, setUser, setAccount) {
  try {
    const userData = await loginUser(email, password);
    if (!userData) {
      throw new Error("User data not found");
    }
    localStorage.setItem("access-token", userData.token);
    localStorage.setItem("access-id", userData.userId);
    /*const userInfo = await getUser(userData.userId);
    //console.log(JSON.stringify(userInfo, null, 2));
    let accountInfo = JSON.stringify(userInfo, null, 2);
    accountInfo = userInfo?.data?.user;

    setAccount({
      name: accountInfo.name,
      lastName: accountInfo.lastName,
      email: accountInfo.email,
      role: accountInfo.role,
      birthday: accountInfo.birthday,
      profilePic: accountInfo.profilePic,
    });*/
    sessionStorage.setItem("user", JSON.stringify(userInfo?.data.user));
    setUser(userData);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
