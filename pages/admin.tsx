// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import Admin from "../app/components/Admin/Admin";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "admin",
        "menuComponent",
        "footer",
      ])),
    },
  };
};

export default Admin;
