import React from "react";
import AuthProvider from "./src/components/auth/authProvider";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      {element}
    </AuthProvider>
  )
}