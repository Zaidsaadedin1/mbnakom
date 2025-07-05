import Login from "../app/components/Login/Login";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetStaticPropsContext } from "next";

export async function getStaticProps(context: GetStaticPropsContext) {
  const locale = context.locale;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "ar", ["common", "login"])),
    },
  };
}

export default Login;
