import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Props } from "react-native-tab-view/lib/typescript/src/TabBarIndicator";
import { supabase } from "../lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<null | Session>(null);
  const [profile, setProfile] = useState<null | any>(null); // [1
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Check if the user is already signed in
    const fetchUser = async () => {
      setLoading(true);
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      setSession(session);
      if (session) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data);
      }
      setLoading(false);
    };

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
