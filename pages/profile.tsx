import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Profile from "../app/components/Profile/Profile";
import { checkAuth } from "../checkIsAuthMiddleware";
import userController from "../app/Apis/controllers/userController";
import i18nConfig from "../next-i18next.config";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  const authCheck = await checkAuth(context);

  if (!authCheck.authenticated) {
    return {
      redirect: {
        destination: `/${locale || i18nConfig.i18n.defaultLocale}/unAuthorized`,
        permanent: false,
      },
    };
  }
  const user = (await userController.getUserById(authCheck.user?.id)).data;
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [
        "profile",
        "menuComponent",
        "footer",
      ])),
      user,
    },
  };
};

export default Profile;
