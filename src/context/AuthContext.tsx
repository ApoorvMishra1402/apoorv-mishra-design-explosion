import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDb } from "@/lib/firebase";
import { initializeApp, getApps } from "firebase/app";
import { getAppConfig } from "@/lib/appConfig";

type AuthContextValue = {
  user: { uid: string; email: string | null } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthContextValue["user"]>(null);
  const [auth, setAuth] = useState<ReturnType<typeof getAuth> | null>(null);

  useEffect(() => {
    (async () => {
      await getDb();
      const cfg = await getAppConfig();
      const app = getApps().length ? getApps()[0] : initializeApp(cfg.firebase);
      const authInstance = getAuth(app);
      setAuth(authInstance);
      onAuthStateChanged(authInstance, (u) => {
        setUser(u ? { uid: u.uid, email: u.email } : null);
      });
    })();
  }, []);

  const login = async (email: string, password: string) => {
    if (!auth) throw new Error("Auth not initialized");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
