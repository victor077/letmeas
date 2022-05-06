import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export function useAuth() {
  const value = useContext(AuthContext);

  return value;
}

// aqui eu fiz essa pasta para poder passsar o useContext e AuthContext
// ser uma importação só criando o useAuth então quando vê o useAuth se refere ao useContext e AuthContext
