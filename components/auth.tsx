"use client";

import { useEffect } from "react";

type Props = {
  token: string | undefined | null;
};

const Auth = ({ token }: Props) => {
  useEffect(() => {
    if (token) {
      localStorage.setItem("ttk", token);
    }
  }, [token]);
  return <></>;
};

export default Auth;
