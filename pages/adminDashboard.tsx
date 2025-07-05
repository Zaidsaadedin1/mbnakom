// pages/login.tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import userController from "../app/Apis/controllers/userController";
import { GetServerSideProps } from "next";
import appointmentController from "../app/Apis/controllers/appointmentControllers";
import { decodeToken } from "../app/utils/authDecode"; // use server-safe version
import { parse } from "cookie";
import AdminDashboard from "../app/components/AdminDashboard/AdminDashboard";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale, req } = context;

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (token) {
    const decoded = decodeToken(token);
    if (!decoded?.Roles?.includes("Admin")) {
      return {
        redirect: {
          destination: `/${locale}/unAuthorized`,
          permanent: false,
        },
      };
    }
  }
  const users = await userController.getAllUsers();
  const appointments = await appointmentController.GetAppointments();
  console.log(users, appointments);
  return {
    props: {
      ...(await serverSideTranslations(locale || "ar", [
        "adminDashboard",
        "menuComponent",
        "footer",
      ])),
      users: users || [],
      appointments: appointments || [],
    },
  };
};

export default AdminDashboard;
