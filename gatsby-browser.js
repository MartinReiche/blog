import React from "react";
import AuthProvider from "./src/components/auth-provider";

export const wrapRootElement = ({ element }) => {
  return (
    <AuthProvider>
      {element}
    </AuthProvider>
  )
}