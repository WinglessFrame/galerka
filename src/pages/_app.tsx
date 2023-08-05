import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType = ({
  Component,
}) => {
  return (
    <Component />
  );
};

export default api.withTRPC(MyApp);
