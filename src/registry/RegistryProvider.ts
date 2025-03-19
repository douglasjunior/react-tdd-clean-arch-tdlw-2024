import { createContext, useContext } from "react";

const registryContext = createContext<Record<string, any>>({})

export const RegistryProvider = registryContext.Provider;

export const useInject = <T>(key: string): T => {
  return useContext(registryContext)[key] as T;
}
