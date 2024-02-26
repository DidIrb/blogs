import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AuthContextValue } from "../util/types";

export const Navbar = () => {
  const { signout } = useContext(AuthContext) as AuthContextValue;

  return (
    <div>
      <button className="bg-red-400 p-3 rounded " onClick={signout}>Sign out</button>
    </div>
  )
}
