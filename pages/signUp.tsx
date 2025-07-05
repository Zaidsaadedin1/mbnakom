// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";
import SignUp from "../app/components/SignUp/SignUp";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", [
        "signUp",
        "menuComponent",
        "footer",
      ])),
    },
  };
};

export default SignUp;
