import { loginUser, getUser } from "./users/User";

export async function handleLogin(email, password, setUser, setAccount) {
  try {
    const userData = await loginUser(email, password);

    if (!userData.token || !userData.userId) {
      throw new Error("Invalid response getting data of login user operation");
    }

    localStorage.setItem("access-token", userData.token);
    localStorage.setItem("access-id", userData.userId);
    setUser(userData);
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
}
