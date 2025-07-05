// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import consultation from "../app/components/RequestService/RequestService";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ar", [
        "appointments",
        "menuComponent",
        "footer",
      ])),
    },
  };
};

export default consultation;
