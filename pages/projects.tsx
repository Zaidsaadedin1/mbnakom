// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import OurProjects from "../app/components/OurProjects/OurProjects";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ar", [
        "ourProjects",
        "common",
      ])),
    },
  };
};

export default OurProjects;
