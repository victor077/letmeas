import { createContext, ReactNode, useEffect, useState } from "react";

import { auth, firebase } from "../Services/firebase";

type User = {
  id: string;
  name: string;
  avatar: string;
};

type AuthContextType = {
  user: User | undefined;
  singInWithLogin: () => Promise<void>;
};

type AuthContextProviderTypes = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderTypes) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsucribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error("Ausencia de inforações na sua conta do google");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL,
        });
      }
    });

    return () => {
      unsucribe();
    };
  }, []);

  async function singInWithLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Ausencia de inforações na sua conta do google");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL,
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, singInWithLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
}
