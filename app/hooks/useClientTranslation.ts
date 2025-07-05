// app/hooks/useClientTranslation.ts
import { useTranslation } from "next-i18next";

export const useClientTranslation = (ns?: string) => {
  return useTranslation(ns);
};
