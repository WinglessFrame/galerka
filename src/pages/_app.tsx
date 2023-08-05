import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { AuthProvider } from "@/context/supabase";

const MyApp: AppType = ({
  Component,
}) => {
  return (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
};

export default api.withTRPC(MyApp);
