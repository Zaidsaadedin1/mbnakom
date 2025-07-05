// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import AboutPage from "../app/components/AboutPage/AboutPage";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "about",
        "menuComponent",
        "footer",
      ])),
    },
  };
};

export default AboutPage;
