import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { useContext, useState, useEffect, createContext, useMemo } from 'react';

// create a context for authentication
// eslint-disable-next-line @typescript-eslint/no-empty-function
const AuthContext = createContext<{ session: Session | null | undefined, user: User | null | undefined, supabaseClient: SupabaseClient | null }>({ session: null, user: null, supabaseClient: null });

export const AuthProvider = ({ children }: any) => {
  const supabaseClient = useMemo(() => createClientComponentClient(), [])
  const [user, setUser] = useState<User>()
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      setSession(session)
      setUser(session?.user)
      setLoading(false);
    };

    const { data: listener } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user)
      setLoading(false)
    });

    void setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [supabaseClient.auth]);

  const value = {
    session,
    user,
    supabaseClient,
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};