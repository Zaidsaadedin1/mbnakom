// pages/index.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import { HomePage } from "../app/components/Home/Home";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "home",
        "menuComponent",
        "footer",
        "common",
      ])),
    },
  };
};

export default HomePage;
