import { createContext, useContext } from "react";
import { ApiClient } from "../api/client";

export const ApiContext = createContext<ApiClient | undefined>(undefined);

export function useApiContext(): ApiClient | undefined {
  const context = useContext(ApiContext);

  if (context === undefined) {
    throw new Error("useApiContext must be used within an ApiProvider");
  }

  return context;
}
