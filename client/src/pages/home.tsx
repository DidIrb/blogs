import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { AuthContextValue } from "../util/types";

export const Home = () => {
  const { isAuthenticated } = useContext(AuthContext) as AuthContextValue;

  return (
    <>
    {isAuthenticated ? <p>User is authenticated!</p> : <p>User is not authenticated.</p>}
    <div>This is a landing page to welcome the user </div>
    </>
  )
}
