// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import ServicesPage from "../app/components/ServicesPage/ServicesPage";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ar", [
        "services",
        "menuComponent",
        "footer",
        "home",
      ])),
    },
  };
};

export default ServicesPage;
